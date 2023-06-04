import React, { ReactElement, useState } from 'react';
import {
  EuiButtonEmpty,
  EuiIcon,
  EuiSideNav,
  slugify,
  useEuiTheme,
} from '@elastic/eui';
import paintingLibrary, {
  PaintingLibrary,
} from '../../../../resources/paintingsLibrary';
import {
  usePaintingNameStore,
  useProgressStore,
  useThemeStore,
} from '../../../../state-management/Store';

export const SidePanel: React.FC = () => {
  const { euiTheme } = useEuiTheme();

  const [isNavOpenOnDesktop, setIsNavOpenOnDesktop] = useState(false);
  const [selectedItemName, setSelectedItem] = useState('Paintings');

  const toggleSelectedItem = (name: string) => {
    if (selectedItemName === name) {
      setSelectedItem('None');
    } else {
      setSelectedItem(name);
    }
  };

  type Item = {
    id: string;
    name: string;
    isSelected: boolean;
    onClick: () => void;
  };

  type ItemData = {
    style?: React.CSSProperties;
    icon?: ReactElement;
    disabled?: boolean;
    href?: string;
    items?: Item[];
    onClick?: () => void;
  };

  //(dev) try get rid of any
  const createItem = (name: string, data: ItemData = {}) => {
    let baseCss = {
      color: euiTheme.colors.text,
    };

    if (data.style) {
      baseCss = {
        ...baseCss,
        ...data.style,
      };
    }

    return {
      id: slugify(name),
      name,
      isSelected: selectedItemName === name,
      onClick: () => toggleSelectedItem(name),
      ...data,
      css: {
        ...baseCss,
      },
    };
  };

  const { paintingName: currentPaintingName, setPaintingName } =
    usePaintingNameStore();
  const { paintings } = useProgressStore();

  const createPaintingItemList = (paintingLibrary: PaintingLibrary) => {
    const paintingItemList = [];

    for (const paintingName in paintingLibrary) {
      const paintingIsComplete = paintings[paintingName].isComplete;
      let fullPaintingName = paintingLibrary[paintingName].name;
      if (paintingIsComplete) {
        const completedTime = paintings[paintingName].timeSpent_seconds;
        fullPaintingName +=
          completedTime >= 60
            ? ' (' +
              Math.floor(completedTime / 60) +
              ':' +
              (completedTime % 60).toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false,
              }) +
              ')'
            : ' (' + completedTime + ')';
      }
      const completeIcon = paintingIsComplete ? (
        <EuiIcon type="check" color="success" />
      ) : (
        <EuiIcon type="empty" color="text" />
      );
      paintingItemList.push(
        createItem(fullPaintingName, {
          onClick: () => {
            setPaintingName(paintingName);
          },
          disabled: paintingName === currentPaintingName,
          icon: completeIcon,
        })
      );
    }
    return paintingItemList;
  };

  const paintingItemList = createPaintingItemList(paintingLibrary);

  const { theme, toggleTheme } = useThemeStore();

  const { resetAllPaintings } = useProgressStore();

  const confirmResetProgress = () => {
    if (
      window.confirm('Are you sure? This will reset progress on all paintings.')
    ) {
      resetAllPaintings();
    }
  };

  let sideNav = [
    createItem('Paintings', {
      onClick: () => toggleSelectedItem('Paintings'),
      icon: <EuiIcon type="image" color="text" />,
      items: selectedItemName == 'Paintings' ? paintingItemList : [],
    }),
    createItem('Settings', {
      onClick: () => toggleSelectedItem('Settings'),
      icon: <EuiIcon type="gear" />,
      items: [
        createItem(theme == 'dark' ? 'Light Mode' : 'Dark Mode', {
          onClick: toggleTheme,
          icon:
            theme == 'dark' ? <EuiIcon type="sun" /> : <EuiIcon type="moon" />,
        }),
        createItem('Reset all progress', {
          onClick: confirmResetProgress,
          icon: <EuiIcon type="refresh" />,
        }),
      ],
    }),
    createItem('About', {
      href: './about',
      icon: <EuiIcon type="questionInCircle" />,
    }),
  ];

  const toggleIsNavOpenOnDesktop = () => {
    setIsNavOpenOnDesktop(!isNavOpenOnDesktop);
  };

  const width = isNavOpenOnDesktop ? '35rem' : '0rem';
  sideNav = isNavOpenOnDesktop ? sideNav : [];

  const transitionModifier = '0.2s ease-out';

  const backgroundImage = `linear-gradient(to right, ${euiTheme.colors.lightestShade} , transparent)`;

  return (
    <>
      <EuiSideNav
        aria-label="Drop down"
        mobileBreakpoints={[]}
        items={sideNav}
        style={{
          width: width,
          display: 'block',
          position: 'absolute',
          left: 0,
          top: 0,
          height: '100%',
          paddingLeft: euiTheme.size.s,
          color: euiTheme.colors.text,

          backgroundImage,
          transition: 'width ' + transitionModifier,
        }}
      />
      <EuiButtonEmpty
        id="desktopNavToggle"
        style={{
          position: 'absolute',
          top: 0,
          left: width,
          transition: 'left ' + transitionModifier,
          color: euiTheme.colors.darkestShade,
          paddingLeft: euiTheme.size.s,
        }}
        onClick={toggleIsNavOpenOnDesktop}
        flush="both"
        color={'text'}
      >
        <EuiIcon
          type={isNavOpenOnDesktop ? 'menuLeft' : 'menuRight'}
          size="l"
        />
      </EuiButtonEmpty>
    </>
  );
};

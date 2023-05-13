import React, { useState } from 'react';
import { EuiButtonEmpty, EuiIcon, EuiSideNav, slugify, useEuiTheme} from '@elastic/eui';
import paintingLibrary, {PaintingLibrary} from '../../resources/paintingsLibrary';
import { usePaintingNameStore, useProgressStore, useThemeStore } from '../Store';

export const SidePanel: React.FC =  () => {
  const {euiTheme} = useEuiTheme();
  
  const [isNavOpenOnDesktop, setIsNavOpenOnDesktop] = useState(false);
  const [isSideNavOpenOnMobile, setIsSideNavOpenOnMobile] = useState(false);
  const [selectedItemName, setSelectedItem] = useState('Paintings');

  const toggleOpenOnMobile = () => {
    setIsSideNavOpenOnMobile(!isSideNavOpenOnMobile);
  };

  const toggleSelectedItem = (name: string) => {
    if (selectedItemName === name) {
      setSelectedItem('None');
    } else {
      setSelectedItem(name);
    }
  };

  type ItemData = {style?:{}}

  //(dev) try get rid of any
  const createItem = (name: string, data: (ItemData | any) = {} ) => {
    let baseCss = {
      color: euiTheme.colors.text,
    };

    if (data.style) {
      baseCss = {
        ...baseCss,
        ...data.style,
      }
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

  const {paintingName: currentPaintingName, setPaintingName} = usePaintingNameStore();
  const {paintings} = useProgressStore();

  console.log(paintings)

  const isComplete = paintings[currentPaintingName].isComplete;

  const createPaintingItemList = (paintingLibrary: PaintingLibrary) => {
    const paintingItemList = [];

    for (const paintingName in paintingLibrary) {
      let fullPaintingName = paintingLibrary[paintingName].name;
      if (isComplete) {
        const completedTime = paintings[paintingName].timeSpent_seconds;
        fullPaintingName += completedTime >= 60 ? ' (' + Math.floor(completedTime/60) + ':' + (completedTime%60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + ')' : ' (' + completedTime + ')';
      }
      const completeIcon = isComplete ? <EuiIcon type="check" color='success'/> : <EuiIcon type="empty" color='text'/>;
      paintingItemList.push(
        createItem(fullPaintingName,
        {
          onClick: () => {
            setPaintingName(paintingName);
          },
          disabled: paintingName === 'banana',
          icon: completeIcon,
        }
      ));
    }
    return paintingItemList;
  };

  const paintingItemList = createPaintingItemList(paintingLibrary);

  const {theme, toggleTheme} = useThemeStore();

  const {resetAllPaintings} = useProgressStore();

  const confirmResetProgress = () => {
    if (window.confirm('Are you sure? This will reset progress on all paintings.')) {
      resetAllPaintings();
    }
  }


  let sideNav = [
    createItem('Paintings', {
      onClick: () => toggleSelectedItem('Paintings'),
      icon: <EuiIcon type="image" color='text'/>,
      items: selectedItemName == 'Paintings' ? paintingItemList : [],
    }),
    createItem('Settings', {
      onClick: () => toggleSelectedItem('Settings'), 
      icon: <EuiIcon type="gear"/>,
      items: [
        createItem(theme == 'dark' ? 'Light Mode' : 'Dark Mode', {
          onClick: toggleTheme,
          icon: theme == 'dark' ? <EuiIcon type="sun"/> : <EuiIcon type="moon"/>,
        }),
        createItem('Reset all progress', {
          onClick: confirmResetProgress,
          icon: <EuiIcon type="refresh"/>,
        })
      ],
    }),
    createItem('About', {
      href: 'https://example.com/about',
      icon: <EuiIcon type="questionInCircle"/>,
    }),
  ];

  let width = isNavOpenOnDesktop ? '35rem' : '0rem';

  const toggleIsNavOpenOnDesktop = () => {
    setIsNavOpenOnDesktop(!isNavOpenOnDesktop);
  };

  sideNav = isNavOpenOnDesktop ? sideNav : []
  const transitionModifier = '0.2s ease-out';

  return (
    <>
      <EuiSideNav
        aria-label="Complex example"
        mobileTitle="Navigate within $APP_NAME"
        toggleOpenOnMobile={toggleOpenOnMobile}
        isOpenOnMobile={isSideNavOpenOnMobile}
        items={sideNav}        
        style={{
          width: width,
          position: 'absolute',
          left: 0,
          top: 0,
          height: '100%',
          paddingLeft: euiTheme.size.s,
          color: euiTheme.colors.text,
          
          backgroundImage: `linear-gradient(to right, ${euiTheme.colors.lightestShade} , transparent)`,
          transition: 'width ' + transitionModifier
        }}
      />
      
      <EuiButtonEmpty
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
        color={"text"}
      >
        <EuiIcon type={isNavOpenOnDesktop ? 'menuLeft' : 'menuRight'} size='l'/>
      </EuiButtonEmpty>
    </>
  );
};
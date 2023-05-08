import React, { useState } from 'react';
import { EuiSideNav, htmlIdGenerator } from '@elastic/eui';

export const SidePanel: React.FC = () => {
  const [isSideNavOpenOnMobile, setisSideNavOpenOnMobile] = useState(false);

  const toggleOpenOnMobile = () => {
    setisSideNavOpenOnMobile(!isSideNavOpenOnMobile);
  };

  const sideNav = [
    {
      name: 'Root item',
      id: htmlIdGenerator('basicExample')(),
      items: [
        {
          name: 'Item with onClick',
          id: htmlIdGenerator('basicExample')(),
          onClick: () => {},
        },
        {
          name: 'Item with href',
          id: htmlIdGenerator('basicExample')(),
          href: '#/navigation/side-nav',
        },
        {
          name: 'Selected item',
          id: htmlIdGenerator('basicExample')(),
          onClick: () => {},
          isSelected: true,
        },
        {
          name: 'Disabled item',
          id: htmlIdGenerator('basicExample')(),
          disabled: true,
        },
      ],
    },
  ];

  return (
    <EuiSideNav
      className='SidePanel'
      heading="Nav heading"
      toggleOpenOnMobile={() => toggleOpenOnMobile()}
      isOpenOnMobile={isSideNavOpenOnMobile}
      style={{ width: 192 }}
      items={sideNav}
      css={
        {
          position: "absolute",
          display: "inline-flex",
          flexDirection: "column",
          textAlign: "justify",
          top: "0px",
          right: "0px",
          width: "auto",
        }
      }
    />
  );
};
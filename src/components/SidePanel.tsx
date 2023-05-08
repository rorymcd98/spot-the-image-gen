import React, { useState } from 'react';
import {
  EuiCollapsibleNav,
  EuiButton,
  EuiTitle,
  EuiSpacer,
  EuiText,
  EuiCode,
} from '@elastic/eui';

export const SidePanel: React.FC = () => {
  const [navIsOpen, setNavIsOpen] = useState<boolean>(
    JSON.parse(
      String(localStorage.getItem('euiCollapsibleNavExample--isDocked'))
    ) || false
  );
  const [navIsDocked, setNavIsDocked] = useState<boolean>(
    JSON.parse(
      String(localStorage.getItem('euiCollapsibleNavExample--isDocked'))
    ) || false
  );

  return (
    <>
      <EuiCollapsibleNav
        isOpen={navIsOpen}
        isDocked={navIsDocked}
        size={240}
        button={
          <EuiButton onClick={() => setNavIsOpen((isOpen) => !isOpen)}>
            Toggle nav
          </EuiButton>
        }
        onClose={() => setNavIsOpen(false)}
        style={{
          position: 'absolute',
          top: 0,
          zIndex: 9999,
        }}
      >
        <div style={{ padding: 16 }}>
          <EuiTitle>
            <h2>I am some nav</h2>
          </EuiTitle>
          <EuiSpacer />
          <EuiText size="s" color="subdued">
            <p>
              The docked status is being stored in{' '}
              <EuiCode>localStorage</EuiCode>.
            </p>
          </EuiText>
          <EuiSpacer />
          <EuiButton
            onClick={() => {
              setNavIsDocked(!navIsDocked);
              localStorage.setItem(
                'euiCollapsibleNavExample--isDocked',
                JSON.stringify(!navIsDocked)
              );
            }}
          >
            Docked: {navIsDocked ? 'on' : 'off'}
          </EuiButton>
        </div>
      </EuiCollapsibleNav>

      {navIsDocked && (
        <EuiText size="s" color="subdued">
          <p>
            The <EuiCode>button</EuiCode> gets hidden by default when the nav is
            docked unless you set{' '}
            <EuiCode language="js">showButtonIfDocked = true</EuiCode>.
          </p>
        </EuiText>
      )}
    </>
  );
};
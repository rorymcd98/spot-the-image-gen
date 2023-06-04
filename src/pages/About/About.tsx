import { EuiPanel, EuiText, EuiIcon, EuiButtonIcon } from '@elastic/eui';
import React from 'react';
import { SidePanel } from '../Home/components/SidePanel/SidePanel';
import { useEuiTheme } from '@elastic/eui';

const About: React.FC = () => {
    const euiTheme = useEuiTheme();

    const text = [
        <h1>
            <EuiIcon type="questionInCircle" size="xl" /> About
        </h1>,
        <p>
            This is a Spot the Gen - an app which uses generative AI to create{' '}
            <em>differences</em> in paintings. Find all the differences between
            the images to reveal information about the painting. The motivation
            for this project was to:
        </p>,
        <ul>
            <li>Familiarising with webdev skills in the following stack:</li>
            <ul>
                <li>Typescript</li>
                <li>React</li>
                <li>Zustand</li>
                <li>React router</li>
                <li>Elastic UI (EUI)</li>
            </ul>
            <li>
                Explore the use of stable diffusion and other image generators
                for in-painting.
            </li>
        </ul>,
        <p>
            The project is open source and can be found on{' '}
            <a href="https://github.com/rorymcd98/spot-the-image-gen">Github</a>
            .
        </p>,
        <p>This project is licensed under the MPL 2.0 license.</p>,
    ];

    return (
        <>
            <EuiPanel
                style={{ maxWidth: 600, margin: 'auto', position: 'relative' }}
            >
                <EuiButtonIcon
                    style={{ position: 'absolute', right: '5px' }}
                    iconType="arrowLeft"
                    size="m"
                    href="./"
                />
                <EuiText color={euiTheme.euiTheme.colors.text}>{text}</EuiText>
            </EuiPanel>

            <SidePanel />
        </>
    );
};

export default About;

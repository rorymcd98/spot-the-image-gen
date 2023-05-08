/// <reference types="vite/client" />


//Gets rid of type errors for css props
import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme extends Record<string, any> {} // You can define your theme shape here if you have a custom theme
}

declare module 'react' {
  interface Attributes {
    css?: CSSProp<Theme>;
  }
}
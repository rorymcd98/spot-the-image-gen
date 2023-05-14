/// <reference types="vite/client" />


//Gets rid of type errors for css props
import '@emotion/react';

declare module 'react' {
  interface Attributes {
    css?: CSSProp<Theme>;
  }
}
// theme/index.js
// import { extendTheme } from '@chakra-ui/react'
import {
  extendTheme,
  withDefaultColorScheme,
  theme as baseTheme,
} from "@chakra-ui/react";

// Global style overrides
import styles from "./styles";
import Button from "./styles";
import colors from "./colors";

// Foundational style overrides
// import borders from './foundations/borders'

// Component style overrides
// import Button from './components/button'

const overrides = {
  styles,
  //   borders,
  // colors,
  colors: {
    brand: baseTheme.colors.green[300],
    // brand: {
    //   100: "#68d391",
    // },
  },
  // Other foundational style overrides go here
  components: {
    Button,
    // Other components go here
  },
  breakpoints: {
    sm: "320px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
    "2xl": "1536px",
  },
};

const breakpoints = {
  /*
  base: 0-479
  sm: 480-767
  md: 768-991
  lg: 992-1279
  xl: 1280-1535
  '2xl': 1536 - 
  
  */
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
}

export default extendTheme({breakpoints});

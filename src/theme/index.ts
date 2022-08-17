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
};

export default extendTheme(overrides);

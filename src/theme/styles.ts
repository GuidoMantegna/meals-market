//  # all my global style overrides

// theme.js
import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

// Version 1: Using objects
// const styles = extendTheme({
//   styles: {
//     global: {
//       // styles for the `body`
//       body: {
//         bg: 'gray.400',
//         color: 'white',
//       },
//       // styles for the `a`
//       a: {
//         color: 'teal.500',
//         _hover: {
//           textDecoration: 'none',
//         },
//       },
//     },
//   },
// })

// Version 2: Using functions
const styles ={
  // styles: {
    global: (props: any) => ({
      body: {
        fontFamily: 'body',
        color: mode('gray.800', 'whiteAlpha.900')(props),
        bg: mode('white', 'gray.800')(props),
        lineHeight: 'base',
      },
      a: {
        _hover: {
          
        }
      }
    }),
  // },
}

export default styles;
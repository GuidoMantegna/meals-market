import * as React from 'react';
import {Flex} from '@chakra-ui/react';

interface ILeftModalProps {
    children: React.ReactNode
    isOpen: boolean
}

const LeftModal: React.FunctionComponent<ILeftModalProps> = ({children, isOpen}) => {
  return (
    <Flex
          w={{ base: "100%", lg: "40%" }}
          h={{ base: "100%", lg: "initial" }}
          pos={{ base: "fixed", lg: "initial" }}
          zIndex={3}
          bgColor={{ base: "blackAlpha.700", lg: "initial" }}
          top={0}
          transform={{
            base: isOpen ? "initial" : "translateX(-100%)",
            lg: "initial",
          }}
          transition=".5s all"
        >
            {children}
        </Flex>
  );
};

export default LeftModal;

import * as React from "react";
import {
  Flex,
  useMediaQuery,
  CloseButton,
  VStack,
  Center,
  useColorMode,
} from "@chakra-ui/react";
// REDUX
import { useAppDispatch } from "store/hooks";
import { toggleUser } from "store/features/toggle";
// UTILS
import { utils } from "utils";

interface ILeftModalProps {
  children: React.ReactNode;
  isOpen: boolean;
}

const LeftModal: React.FunctionComponent<ILeftModalProps> = ({
  children,
  isOpen,
}) => {
  const dispatch = useAppDispatch();
  const [isLarge] = useMediaQuery("(min-width: 992px)");
  const { colorMode } = useColorMode();
  return (
    <Flex
      w={{ base: "100%", lg: "40%" }}
      h={{ base: "100%", lg: "initial" }}
      pos={{ base: "fixed", lg: "initial" }}
      zIndex={3}
      bgColor={{ base: "blackAlpha.800", lg: "initial" }}
      top={0}
      transform={{
        base: isOpen ? "initial" : "translateX(-100%)",
        lg: "initial",
      }}
      transition=".5s all"
      justify="center"
    >
      <Center flexDirection="column" w="100%">
        <Flex
          border="1px solid #ccc"
          p="20px 0"
          w={{ base: "90%", sm: "50%", lg: "95%" }}
          borderRadius="15px"
          flexDirection="column"
          boxShadow="2px 3px 3px rgba(100, 100, 100, .5)"
          pos="relative"
          bgColor={colorMode === "light" ? "gray.100" : "blue.900"}
        >
          {!isLarge && (
            <Flex justify="flex-end" pr="15px">
              <CloseButton onClick={() => dispatch(toggleUser())} />
            </Flex>
          )}
          <VStack
            flexDirection="column"
            p="20px 40px 0 40px"
            spacing={4}
            w="100%"
            minHeight="50vh"
            overflowX="scroll"
            css={utils.customScrollBar}
          >
            {children}
          </VStack>
        </Flex>
      </Center>
    </Flex>
  );
};

export default LeftModal;

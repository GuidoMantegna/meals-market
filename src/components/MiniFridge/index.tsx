import * as React from "react";
import {
  Center,
  Icon,
  Divider,
  VStack,
  Flex,
  Text,
  CloseButton,
  useMediaQuery,
} from "@chakra-ui/react";
import { FaTemperatureLow } from "react-icons/fa";
// REDUX
import { useAppSelector } from "store/hooks";
import { utils } from "utils";

interface IMiniFridgeProps {
  children: React.ReactNode;
  totals: { qty: number; price: number };
  // toggle: (isFridgeOpen: boolean) => void;
  // isFridgeOpen: boolean;
  closeFridge: () => void
}

const MiniFridge: React.FunctionComponent<IMiniFridgeProps> = ({
  children,
  totals,
  // toggle,
  // isFridgeOpen,
  closeFridge,
}) => {
  const products = useAppSelector((state) => state.products.selectedProducts);
  const [isLargerThan1280] = useMediaQuery("(min-width: 1100px)");
  return (
    <Center flexDirection="column" w="100%">
      <Flex
        border="1px solid #ccc"
        p="20px 0"
        w={{base: "90%", sm: "50%", lg: "90%"}}
        borderRadius="15px"
        flexDirection="column"
        boxShadow="2px 3px 3px rgba(100, 100, 100, .5)"
        pos="relative"
        bgColor="white"
      >
        {!isLargerThan1280 && <Flex justify="flex-end" pr="15px">
          <CloseButton onClick={closeFridge}/>
        </Flex>}
        <VStack
          flexDirection="column"
          p="20px 40px 0 40px"
          spacing={4}
          w="100%"
          h="50vh"
          overflowX="scroll"
          css={utils.customScrollBar}
        >
          {totals.qty === 0 && (
            <>
              <Flex w="100%" justifyContent="space-around">
                <Text>Your fridge is empty</Text>
                <Icon
                  as={FaTemperatureLow}
                  boxSize={8}
                  color="blackAlpha.700"
                  mb="12px"
                  alignSelf="end"
                />
              </Flex>
              <Divider />
            </>
          )}
          {children}
        </VStack>
      </Flex>
    </Center>
  );
};

export default MiniFridge;

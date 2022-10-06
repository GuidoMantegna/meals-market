import * as React from "react";
import FridgeItem from "components/FridgeItem";
import {
  Center,
  Icon,
  Divider,
  HStack,
  VStack,
  Button,
  Flex,
  Text,
  Box,
  Collapse,
} from "@chakra-ui/react";
import { RiFridgeFill, RiArrowUpSFill } from "react-icons/ri";
import { FaTemperatureLow } from "react-icons/fa";

// REDUX
import { useAppSelector } from "store/hooks";
import { utils } from "utils";

interface IMiniFridgeProps {
  children: React.ReactNode;
  // totatQty: number;
  // totalPrice: number;
  totals: { qty: number; price: number };
}

const MiniFridge: React.FunctionComponent<IMiniFridgeProps> = ({
  children,
  // totalPrice,
  // totatQty,
  totals,
}) => {
  const products = useAppSelector((state) => state.products.selectedProducts);
  return (
    <Center flexDirection="column" w="100%" mt="90px">
      <Flex
        border="1px solid #ccc"
        p="20px 0"
        w="90%"
        h="100%"
        borderRadius="5px"
        flexDirection="column"
        boxShadow="2px 3px 3px rgba(100, 100, 100, .5)"
        pos="relative"
      >
        <Flex
          pos="absolute"
          top="-63px"
          align="center"
          width="100%"
          flexDirection="column"
        >
          <Icon as={RiFridgeFill} boxSize={8} color="gray.600" mb="12px" />
          <Center
            borderRadius="50%"
            border="1px solid"
            backgroundColor="gray.600"
            color="white"
            fontSize="0.65em"
            h="25px"
            w="25px"
            pos="absolute"
            left="50%"
            bottom="67px"
          >
            {totals.qty}
          </Center>
          <Icon as={RiArrowUpSFill} boxSize={8} color="blackAlpha.400" />
        </Flex>
        <Collapse in={totals.qty !== 0} animateOpacity>
          <Box>
            <HStack marginBottom="15px" justifyContent="center">
              <Button
                variant="outline"
                minW="100px"
                colorScheme="green"
                disabled={products.length === 0}
              >
                BUY
              </Button>
              <Button
                variant="outline"
                minW="100px"
                colorScheme="red"
                disabled={products.length === 0}
              >
                FORGET
              </Button>
            </HStack>
            <Text textAlign="center" fontWeight="bold" mb="15px">
              Total: $ {totals.price.toFixed(2)}
            </Text>
            <Divider />
          </Box>
        </Collapse>
        <VStack
          flexDirection="column"
          p="20px 40px 0 40px"
          spacing={4}
          w="100%"
          overflowX="scroll"
          css={utils.customScrollBar}
        >
          {totals.qty === 0 && (
            <Icon
              as={FaTemperatureLow}
              boxSize={8}
              color="blackAlpha.700"
              mb="12px"
              alignSelf="end"
            />
          )}
          {children}
        </VStack>
      </Flex>
    </Center>
  );
};

export default MiniFridge;

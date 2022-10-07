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
  useMediaQuery,
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
  const [isLargerThan1280] = useMediaQuery("(min-width: 1100px)");
  return (
    <Center flexDirection="column" w="100%">
      <Flex
        border="1px solid #ccc"
        p="20px 0"
        w="90%"
        // h="100%"
        borderRadius="15px"
        flexDirection="column"
        boxShadow="2px 3px 3px rgba(100, 100, 100, .5)"
        pos="relative"
        bgColor="white"
      >
          {/* <Flex
            pos="absolute"
            top="-63px"
            align={{base: "end", lg:"center"}}
            width="100%"
            flexDirection="column"
            p="0 13%"
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
          </Flex> */}
        {/* <Collapse in={totals.qty !== 0} animateOpacity>
          <Box>
            <HStack marginBottom="15px" justifyContent="center">
              <Button
                variant="outline"
                minW={{base: "80px", lg:"100px"}}
                colorScheme="green"
                disabled={products.length === 0}
                size={{base: "xs", lg: "sm"}}
              >
                BUY
              </Button>
              <Button
                variant="outline"
                minW={{base: "80px", lg:"100px"}}
                colorScheme="red"
                disabled={products.length === 0}
                size={{base: "xs", lg: "sm"}}
              >
                FORGET
              </Button>
            </HStack>
            <Text textAlign="center" fontWeight="bold" mb="15px">
              Total: $ {totals.price.toFixed(2)}
            </Text>
            <Divider />
          </Box>
        </Collapse> */}
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
              <Divider/>
            </>
          )}
          {children}
        </VStack>
      </Flex>
    </Center>
  );
};

export default MiniFridge;

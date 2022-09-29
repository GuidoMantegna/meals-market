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
} from "@chakra-ui/react";
import { RiFridgeFill, RiArrowUpSFill, RiTempColdLine } from "react-icons/ri";
// REDUX
import { useAppSelector } from "store/hooks";

interface IMiniFridgeProps {
  children: React.ReactNode;
}

const MiniFridge: React.FunctionComponent<IMiniFridgeProps> = ({
  children,
}) => {
  const products = useAppSelector((state) => state.products.selectedProducts);
  return (
    <Center flexDirection="column" w="100%">
      <Flex
        border="1px solid #ccc"
        p="20px 0"
        w="90%"
        minHeight="65%"
        borderRadius="5px"
        flexDirection="column"
        boxShadow="2px 3px 3px rgba(100, 100, 100, .5)"
        pos="relative"
      >
        <Flex pos="absolute" top="-51px" align="center" width="100%" flexDirection="column">
          <Icon as={RiFridgeFill} boxSize={8} color="blackAlpha.700" mb="12px" />
          <Icon
            as={RiArrowUpSFill}
            boxSize={8}
            color="blackAlpha.400"
          />
        </Flex>
        <HStack marginBottom="20px" justifyContent="center">
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
        <Divider />
        <VStack
          flexDirection="column"
          p="20px 40px 0 40px"
          spacing={4}
          w="100%"
          // minHeight="50%"
        >
          {/* {products.map((product) => {
            return (
              <FridgeItem
                strIngredient={product.strIngredient}
                key={product.idIngredient}
                idIngredient={product.idIngredient}
              />
            );
          })} */}
          {/* <Icon as={RiTempColdLine} boxSize={8} color="blackAlpha.700" mb="12px" /> */}

          {children}
        </VStack>
      </Flex>
    </Center>
  );
};

export default MiniFridge;

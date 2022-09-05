import * as React from "react";
import FridgeItem from "components/FridgeItem";
import {
  Center,
  Icon,
  Avatar,
  Heading,
  Text,
  Divider,
  HStack,
  VStack,
  StatArrow,
  Button,
  Flex,
} from "@chakra-ui/react";
import { RiFridgeFill, RiArrowUpSFill } from "react-icons/ri";
import {useAppSelector} from "store/hooks";

interface IMiniFridgeProps {}

const MiniFridge: React.FunctionComponent<IMiniFridgeProps> = (props) => {
  const products = useAppSelector((state) => state.products.selectedProducts);
  return (
    <Center flexDirection="column" pos="relative" w="100%">
      <Icon as={RiFridgeFill} boxSize={8} color="blackAlpha.700" mb="12px" />
      <Icon
        as={RiArrowUpSFill}
        boxSize={8}
        color="blackAlpha.700"
        pos="absolute"
        top="26px"
      />
      <Center
        border="1px solid #ccc"
        p="20px 0"
        w="90%"
        borderRadius="5px"
        flexDirection="column"
        boxShadow="2px 3px 3px rgba(100, 100, 100, .5)"
      >
        <HStack marginBottom="20px">
          <Button variant="outline" minW="100px" colorScheme="green">
            BUY
          </Button>
          <Button variant="outline" minW="100px" colorScheme="red">
            FORGET
          </Button>
        </HStack>
        <Divider />
        <VStack
          flexDirection="column"
          p="20px 40px 0 40px"
          spacing={4}
          w="100%"
        >
          {products.map(product => {
            return (

              <FridgeItem strIngredient={product.strIngredient}/>
            )
          })}
        </VStack>
      </Center>
    </Center>
  );
};

export default MiniFridge;
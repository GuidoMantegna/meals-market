import * as React from "react";
import { Flex, Icon, Text, Button, HStack } from "@chakra-ui/react";
import { GiIceCube } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { useAppDispatch } from "store/hooks";
import { deleteProduct } from "store/features/products";

interface IFridgeItemProps {
  strIngredient: string;
  idIngredient: string;
  qty: number;
}

const FridgeItem: React.FunctionComponent<IFridgeItemProps> = ({
  strIngredient,
  idIngredient,
  qty,
}) => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteProduct(idIngredient));
  };

  return (
    <Flex width="100%" justifyContent="space-between" alignItems="center">
      <HStack>
        <Icon as={GiIceCube} boxSize={8} />
        <Text fontSize="sm" fontWeight="bold">
          {strIngredient}
        </Text>
        <Text fontSize="sm">x {qty}</Text>
      </HStack>
      <Button
        variant="ghost"
        colorScheme="red"
        size="xs"
        onClick={() => handleDelete()}
      >
        <Icon as={ImCross} boxSize={4} />
      </Button>
    </Flex>
  );
};

export default FridgeItem;

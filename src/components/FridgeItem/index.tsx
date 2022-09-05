import * as React from "react";
import { Flex, Icon, Text, Button, HStack } from "@chakra-ui/react";
import { GiIceCube } from "react-icons/gi";
import { ImCross } from "react-icons/im";

interface IFridgeItemProps {
  strIngredient: string
}

const FridgeItem: React.FunctionComponent<IFridgeItemProps> = ({strIngredient}) => {
  return (
    <Flex width="100%" justifyContent="space-between" alignItems="center">
      <HStack>
        <Icon as={GiIceCube} boxSize={8} />
        <Text fontSize="sm" fontWeight="bold">
          {strIngredient}
        </Text>
        <Text fontSize="sm">x 2</Text>
      </HStack>
      <Button variant="ghost" colorScheme="red" size="xs">
        <Icon as={ImCross} boxSize={4} />
      </Button>
    </Flex>
  );
};

export default FridgeItem;

import * as React from "react";
import { Flex, Icon, Text, Button, HStack } from "@chakra-ui/react";
import { GiIceCube } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { utils } from "utils";

interface IFridgeItemProps {
  strIngredient: string;
  idIngredient: string;
  qty: number;
  removeItem: () => void;
  hasPrice?: boolean;
}

const FridgeItem: React.FunctionComponent<IFridgeItemProps> = ({
  strIngredient,
  idIngredient,
  qty,
  removeItem,
  hasPrice,
}) => {
  return (
    <Flex width="100%" justifyContent="space-between" alignItems="center">
      <HStack>
        <Icon as={GiIceCube} boxSize={{ base: 6, lg: 8 }} />
        <Text fontSize={{ base: "xs", lg: "sm" }} fontWeight="bold">
          <>{strIngredient}</>
        </Text>
        <Text fontSize={{ base: "xs", lg: "sm" }} whiteSpace="nowrap">
          x {qty}
        </Text>
        {hasPrice && (
          <Text fontSize={{ base: "xs", lg: "sm" }} whiteSpace="nowrap">
            - ${qty * utils.stringToInt(strIngredient)}
          </Text>
        )}
      </HStack>
      <Button variant="ghost" colorScheme="red" size="xs" onClick={removeItem}>
        <Icon as={ImCross} boxSize={{ base: 3, lg: 4 }} />
      </Button>
    </Flex>
  );
};

export default FridgeItem;

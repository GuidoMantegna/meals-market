import * as React from "react";
import { Flex, HStack, Heading, Image, Button, Icon } from "@chakra-ui/react";
import { AiOutlineStar } from "react-icons/ai";

interface IIngItemProps {
  strIngredient: string;
  idIngredient: string;
  addItem: (id: string) => void;
}

const IngItem: React.FunctionComponent<IIngItemProps> = ({
  strIngredient,
  idIngredient,
  addItem,
}) => {
  return (
    <Flex
      w="100%"
      justifyContent="space-between"
      p="0 10px"
      borderRadius="10px"
      boxShadow="1px 1px 2px #cbcbcb80"
    >
      <HStack>
        <Image
          fallbackSrc="https://via.placeholder.com/50"
          boxSize="50px"
          alt="Aubergine"
          src={`https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png`}
        />
        <Heading as="h5" size="sm">
          {strIngredient}
        </Heading>
      </HStack>
      <HStack alignItems="center">
        <Icon as={AiOutlineStar} boxSize={6} color="yellow.300" />
        <Button
          colorScheme="whatsapp"
          variant="outline"
          size="xs"
          id={idIngredient}
          onClick={() => addItem(idIngredient)}
        >
          ADD
        </Button>
      </HStack>
    </Flex>
  );
};

export default IngItem;

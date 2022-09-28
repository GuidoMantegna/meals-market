import * as React from "react";
import { Flex, HStack, Heading, Image, Button, Icon } from "@chakra-ui/react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { Ingredient } from "types";
// REDUX
import { useAppDispatch } from "store/hooks";
import { addFav } from "store/features/products";
import { useAppSelector } from "store/hooks";

interface IIngItemProps {
  strIngredient: string;
  idIngredient: string;
  addItem: () => void;
  ingredient: Ingredient;
}

const IngItem: React.FunctionComponent<IIngItemProps> = ({
  strIngredient,
  idIngredient,
  addItem,
}) => {
  const dispatch = useAppDispatch();
  const favs = useAppSelector((state) => state.products.favs);

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
        <Icon
          as={favs[idIngredient] ? AiFillStar : AiOutlineStar}
          boxSize={6}
          color="yellow.300"
          onClick={() => dispatch(addFav(idIngredient))}
        />
        <Button
          colorScheme="whatsapp"
          variant="outline"
          size="xs"
          id={idIngredient}
          onClick={addItem}
        >
          ADD
        </Button>
      </HStack>
    </Flex>
  );
};

export default IngItem;

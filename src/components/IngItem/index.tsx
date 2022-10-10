import * as React from "react";
import {
  Flex,
  HStack,
  Heading,
  Image,
  Button,
  Icon,
  ButtonGroup,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { GoPlusSmall } from "react-icons/go";
import { Ingredient } from "types";
// REDUX
import { useAppDispatch, useAppSelector } from "store/hooks";
import { addFav } from "store/features/products";
import { utils } from "utils";

interface IIngItemProps {
  strIngredient: string;
  idIngredient: string;
  addItem: () => void;
  ingredient: Ingredient;
  isBTNDisabled: boolean;
}

const IngItem: React.FunctionComponent<IIngItemProps> = ({
  strIngredient,
  idIngredient,
  addItem,
  isBTNDisabled,
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
        <Heading
          as="h6"
          size={{ base: "xs", lg: "sm" }}
          w={{ base: "min-content", lg: "initial" }}
        >
          {strIngredient}
        </Heading>
        <Text fontSize={{ base: "xs", lg: "sm" }} whiteSpace="nowrap">
          $ {utils.stringToInt(strIngredient)}
        </Text>
      </HStack>
      <HStack alignItems="center">
        <Button
          onClick={() => dispatch(addFav(idIngredient))}
          colorScheme="yellow"
          variant="ghost"
        >
          <Icon
            as={favs[idIngredient] ? AiFillStar : AiOutlineStar}
            boxSize={{ base: 4, lg: 6 }}
          />
        </Button>
        <ButtonGroup
          size="xs"
          isAttached
          variant="outline"
          colorScheme="whatsapp"
          onClick={addItem}
          isDisabled={isBTNDisabled}
        >
          <Button p={{ base: "4px", lg: "8px" }}>ADD</Button>
          <IconButton
            aria-label="Add to friends"
            icon={<Icon as={GoPlusSmall} />}
          />
        </ButtonGroup>
      </HStack>
    </Flex>
  );
};

export default IngItem;

// snippet tsrsfc

import * as React from "react";
import {
  Box,
  Image,
  Heading,
  Text,
  HStack,
  Center,
  Grid,
  Icon,
  Button,
} from "@chakra-ui/react";
import { AiOutlineStar } from "react-icons/ai";
import cardBack from "../../images/food.png";

interface IFoodCardProps {}

const FoodCard: React.FunctionComponent<IFoodCardProps> = (props) => {
  return (
    <>
      <Box
        w="100%"
        /*h={['auto', '40vh']}*/ 
        // boxShadow="1px 1px 2px 1px #c6c6c6"
        borderRadius={10}
        border="1px solid #CDCDCD"
        p="30px 10px"
        bg='white'
      >
        <Box w="100%" h="100%">
          {/* IMAGE MAIN */}
          <Box pos="relative">
            <Image src={cardBack} w="100%" />
            {/* FOOD DESC. */}
            <Box
              pos="absolute"
              top="10"
              left="0"
              bg="white"
              opacity="75%"
              borderRadius="0 5px 5px 0"
              w="80%"
              p="10px 20px"
            >
              <Heading as="h2" size="md">
                Chicken salad
              </Heading>
              <Text as="h2" fontSize="xs" /*noOfLines={1}*/>
                avocado, rice, chicken, tomato, korn
              </Text>
            </Box>
            {/* PRICE */}
            <Box
              pos="absolute"
              top="7"
              right="0"
              bg="red.500"
              opacity="75%"
              borderRadius="5px 0 0 5px"
              w="25%"
              p={2}
            >
              <Heading as="h2" size="sm" textAlign="center" color="white">
                $2,35
              </Heading>
            </Box>
            {/* QTY SELECTOR */}
            <Center>
              <Grid
                templateColumns="repeat(3, 1fr)"
                pos="absolute"
                bottom="5"
                bg="green.300"
                borderRadius="5px"
                w="110px"
                color="white"
              >
                <Center w="100%" p={1}>
                  -
                </Center>
                <Center
                  w="100%"
                  p={1}
                  borderLeft="1px"
                  borderRight="1px"
                  borderColor="white"
                  fontWeight="bold"
                >
                  0
                </Center>
                <Center w="100%" p={1}>
                  +
                </Center>
              </Grid>
            </Center>
          </Box>

          {/* CARD BUTTONS */}
          <HStack justifyContent="space-around" m="10px 0">
            <HStack>
              <Text fontSize="sm">Total: $0,00</Text>
              <Button colorScheme="whatsapp" variant="outline" size="xs">
                ADD
              </Button>
            </HStack>
            <Box>
              <Icon as={AiOutlineStar} boxSize={6} color="yellow.300" />
            </Box>
          </HStack>
        </Box>
      </Box>
    </>
  );
};

export default FoodCard;

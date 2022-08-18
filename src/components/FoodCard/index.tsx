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
  Spinner,
} from "@chakra-ui/react";
import { AiOutlineStar } from "react-icons/ai";
import CardBack from "../../images/form-background.jpg";
import ImgFallback from "../../images/spinner.gif"

interface IFoodCardProps {
  title: string;
  img?: string;
  status: string;
}

const FoodCard: React.FunctionComponent<IFoodCardProps> = ({
  title,
  img,
  status,
}) => {
  return (
    <>
      {status === "idle" || status === "loading" ? (
        <Box
          w="100%"
          /*h={['auto', '40vh']}*/
          // boxShadow="1px 1px 2px 1px #c6c6c6"
          borderRadius={10}
          border="1px solid #CDCDCD"
          p="30px 10px"
          bg="white"
        >
          {status === "loading" && (
            <Center
              pos="absolute"
              w="100%"
              h="100%"
              top={0}
              left={0}
              bg="whiteAlpha.800"
              zIndex={1}
              borderRadius={10}
            >
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="teal"
                size="xl"
              />
            </Center>
          )}
          <Box w="100%" h="100%">
            {/* IMAGE MAIN */}
            <Box pos="relative">
              <Image src={CardBack} w="100%" />
              {/* FOOD DESC. */}
              <Box
                pos="absolute"
                top="10"
                left="0"
                bg="white"
                opacity="85%"
                borderRadius="0 5px 5px 0"
                w="80%"
                p="10px 20px"
              >
                <Heading as="h2" size="md">
                  {title}
                </Heading>
                {/* <Text as="h2" fontSize="xs">
                avocado, rice, chicken, tomato, korn
              </Text> */}
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
                h="30px"
                p={2}
              >
                {/* <Heading as="h2" size="sm" textAlign="center" color="white">
                  $2,35
                </Heading> */}
              </Box>
              {/* QTY SELECTOR */}
              <Center>
                <Grid
                  templateColumns="repeat(3, 1fr)"
                  pos="absolute"
                  bottom="5"
                  bg="green.200"
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
                <Button
                  colorScheme="whatsapp"
                  variant="outline"
                  size="xs"
                  disabled
                >
                  ADD
                </Button>
              </HStack>
              <Box>
                <Icon as={AiOutlineStar} boxSize={6} color="yellow.200" />
              </Box>
            </HStack>
          </Box>
        </Box>
      ) : (
        <Box
          w="100%"
          /*h={['auto', '40vh']}*/
          // boxShadow="1px 1px 2px 1px #c6c6c6"
          borderRadius={10}
          border="1px solid #CDCDCD"
          p="30px 10px"
          bg="white"
        >
          <Box w="100%" h="100%">
            {/* IMAGE MAIN */}
            <Box pos="relative">
              <Image src={img} alt={title} w="100%" minH="300px" fallbackSrc={ImgFallback}/>
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
                  {title}
                </Heading>
                {/* <Text as="h2" fontSize="xs">
                  avocado, rice, chicken, tomato, korn
                </Text> */}
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
      )}
    </>
  );
};

export default FoodCard;

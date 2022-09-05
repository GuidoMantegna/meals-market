import * as React from "react";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { decrement, increment } from "store/features/counter";
import { Link, Outlet } from "react-router-dom";
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
  useColorMode,
} from "@chakra-ui/react";
import { AiOutlineStar } from "react-icons/ai";
import CardBack from "images/form-background.jpg";
import ImgFallback from "images/spinner.gif";

interface IFoodCardProps {
  title: string;
  img?: string;
  status: string;
  id: string;
}

const FoodCard: React.FunctionComponent<IFoodCardProps> = ({
  title,
  img,
  status,
  id,
}) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.counter.value);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const button: HTMLButtonElement = e.currentTarget;
    const { name, textContent } = button;

    textContent === "+" ? dispatch(increment()) : dispatch(decrement());
  };
  return (
    <>
      {status === "idle" || status === "loading" ? (
        <Box
          w="90%"
          // boxShadow="1px 1px 2px 1px #c6c6c6"
          borderRadius={10}
          border="1px solid #CDCDCD"
          p="30px 10px"
          bg="white"
        >
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
                w="100%"
                p="10px 20px"
              >
                <Heading as="h2" size="md" textAlign="center">
                  {title}
                </Heading>
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
                    {count}
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
          // boxShadow="1px 1px 2px 1px #c6c6c6"
          borderRadius={10}
          border={
            colorMode === "light" ? "1px solid #CDCDCD" : "1px solid #5b5b5b"
          }
          p="30px 10px"
          // bg="white"
          bgColor={colorMode === "light" ? "white" : "gray.700"}
        >
          <Box w="100%" h="100%">
            {/* IMAGE MAIN */}
            <Box pos="relative">
              <Image
                src={img}
                alt={title}
                w="100%"
                minH="300px"
                fallbackSrc={ImgFallback}
              />
              {/* FOOD DESC. */}
              <Box
                pos="absolute"
                top="10"
                left="0"
                bgColor={
                  colorMode === "light" ? "whiteAlpha.700" : "blackAlpha.700"
                }
                // bg="white"
                // opacity="75%"
                borderRadius="0 5px 5px 0"
                w="80%"
                p="10px 20px"
              >
                <Heading as="h2" size="md">
                  {title}
                </Heading>
                <Link to={`/market/${id}`}>
                {/* <Link to={id}> */}
                  + More Info
                </Link>
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
                  <Button
                    name={title}
                    onClick={handleClick}
                    variant="ghost"
                    colorScheme="whatsapp"
                    color="white"
                    _hover={{ bgColor: "transparent" }}
                    borderRadius="5px 0 0 5px"
                  >
                    -
                  </Button>
                  <Center
                    w="100%"
                    p={1}
                    borderLeft="1px"
                    borderRight="1px"
                    borderColor="white"
                    fontWeight="bold"
                  >
                    {count}
                  </Center>
                  <Button
                    name={title}
                    onClick={handleClick}
                    variant="ghost"
                    colorScheme="whatsapp"
                    color="white"
                    _hover={{ bgColor: "transparent" }}
                    borderRadius="0 5px 5px 0"
                  >
                    +
                  </Button>
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

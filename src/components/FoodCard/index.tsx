import * as React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  Box,
  Text,
  Image,
  Heading,
  HStack,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import ImgFallback from "images/spinner.gif";
interface IFoodCardProps {
  title: string;
  img?: string;
  status: string;
  id: string;
  category: string;
}

const FoodCard: React.FunctionComponent<IFoodCardProps> = ({
  title,
  img,
  status,
  id,
  category,
}) => {
  const { colorMode } = useColorMode();

  return (
    <>
        <Box
          w="100%"
          h="100%"
          borderRadius={10}
          border={
            colorMode === "light" ? "1px solid #CDCDCD" : "1px solid #5b5b5b"
          }
          p={{base: "15px", md: "30px 10px"}}
          bgColor={colorMode === "light" ? "white" : "gray.700"}
        >
          <Box w="100%" h="100%">
            {/* IMAGE MAIN */}
            <Box pos="relative">
              <Image
                src={img}
                alt={title}
                w="100%"
                fallbackSrc={ImgFallback}
              />
              <Box
                pos="absolute"
                top="7"
                right="0"
                bg="red.500"
                opacity="75%"
                borderRadius="5px 0 0 5px"
                p="3"
              >
                <Heading as="h2" size="sm" textAlign="center" color="white">
                  {category}
                </Heading>
              </Box>
            </Box>

            <HStack /*justifyContent="space-around"*/ m="10px">
              <VStack alignItems="flex-start" spacing={0}>
                <Heading as="h2" size={{ base: "xs", md: "md" }} m={{ md: "10px 0 5px "}}>
                  {title}
                </Heading>
                <Link to={`/meals/${id}`}><Text fontSize={{ base: "xs", md: "md" }}>+ More Info</Text></Link>
              </VStack>
            </HStack>
          </Box>
        </Box>
      
    </>
  );
};

export default FoodCard;

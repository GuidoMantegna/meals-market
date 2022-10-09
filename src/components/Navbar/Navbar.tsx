import * as React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import Language from "../Language";
import {
  Flex,
  Icon,
  HStack,
  StackDivider,
  Link,
  useMediaQuery,
  useColorMode,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { RiMapPinUserFill } from "react-icons/ri";
import { ColorModeSwitcher } from "../index";
// REDUX
import { useAppDispatch } from "store/hooks";

interface NavbarProps {}

const Navbar: React.FunctionComponent<NavbarProps> = (props) => {
  const [isLarge] = useMediaQuery("(min-width: 540px)");
  const location = useLocation();
  const { colorMode } = useColorMode();
  const dispatch = useAppDispatch();

  return (
    <>
      <Flex
        bgColor={colorMode === "light" ? "gray.800" : "blackAlpha.900"}
        color="gray.300"
        w="100%"
        p="15px 20px"
        align="center"
        justify={"space-between"}
      >
        {isLarge ? (
          <>
            <HStack
              fontSize={{ sm: "sm", md: "md" }}
              spacing={4}
              divider={<StackDivider borderColor="gray.300" />}
            >
              <Link
                as={RouterLink}
                to="/market"
                fontWeight={
                  location.pathname === "/market" ? "semibold" : "light"
                }
              >
                Market
              </Link>
              <Link
                as={RouterLink}
                to="/meals"
                fontWeight={
                  location.pathname === "/meals" ? "semibold" : "light"
                }
              >
                Meals
              </Link>
              <Link
                as={RouterLink}
                to="/fridge"
                fontWeight={
                  location.pathname === "/fridge" ? "semibold" : "light"
                }
              >
                Fridge
              </Link>
              <Link
                as={RouterLink}
                to="/facts"
                fontWeight={
                  location.pathname === "/facts" ? "semibold" : "light"
                }
              >
                Food Facts
              </Link>
            </HStack>
            <HStack spacing={6}>
              <Language />
              <ColorModeSwitcher />
            </HStack>
          </>
        ) : (
          <>
            <Icon as={FiMenu} boxSize={6} />
            <Icon as={RiMapPinUserFill} boxSize={6} />
          </>
        )}
      </Flex>
    </>
  );
};

export default Navbar;

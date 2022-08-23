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

interface NavbarProps {}

const Navbar: React.FunctionComponent<NavbarProps> = (props) => {
  const [isLarge] = useMediaQuery("(min-width: 540px)");
  const location = useLocation();
  const { colorMode } = useColorMode()

  return (
    <>
      <Flex
        // bg="gray.800"
        bgColor={colorMode === "light" ? "gray.800" : "blackAlpha.900"}
        color="gray.300"
        w="100%"
        p="15px 20px"
        align="center"
        justify={"space-between"}
      >
        {/* <NavMenu /> */}

        {isLarge ? (
          <>
            <HStack
              fontSize={{ sm: "sm", md: "md" }}
              spacing={4}
              divider={<StackDivider borderColor="gray.300" />}
            >
              <Link
                as={RouterLink}
                to="/"
                fontWeight={location.pathname === "/" ? "semibold" : "light"}
              >
                Home
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

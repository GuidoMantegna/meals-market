import * as React from "react";
import { Link as RouterLink, useLocation, NavLink } from "react-router-dom";
import Language from "../Language";
import {
  Flex,
  Icon,
  HStack,
  StackDivider,
  Link,
  useMediaQuery,
  useColorMode,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerFooter,
  DrawerCloseButton,
  DrawerContent,
  useDisclosure,
  DrawerHeader,
  Button,
  VStack,
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);

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
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            {/* <DrawerHeader>Create your account</DrawerHeader> */}

            <VStack spacing={4} mt="60px">
              <HStack
                fontSize={{ base: "sm", md: "md" }}
                spacing={2}
                divider={<StackDivider borderColor="gray.300" />}
                justifyContent="center"
              >
                <Link
                  as={RouterLink}
                  to="/market"
                  fontWeight={
                    location.pathname === "/market" ? "semibold" : "light"
                  }
                  onClick={onClose}
                >
                  Market
                </Link>
                <Link
                  as={RouterLink}
                  to="/meals"
                  fontWeight={
                    location.pathname === "/meals" ? "semibold" : "light"
                  }
                  onClick={onClose}
                >
                  Meals
                </Link>
                <Link
                  as={RouterLink}
                  to="/fridge"
                  fontWeight={
                    location.pathname === "/fridge" ? "semibold" : "light"
                  }
                  onClick={onClose}
                >
                  Fridge
                </Link>
                <Link
                  as={RouterLink}
                  to="/facts"
                  fontWeight={
                    location.pathname === "/facts" ? "semibold" : "light"
                  }
                  onClick={onClose}
                >
                  Food Facts
                </Link>
              </HStack>
              <HStack spacing={6} justify="center">
                <Language />
                <ColorModeSwitcher />
              </HStack>
            </VStack>

            {/* <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter> */}
          </DrawerContent>
        </Drawer>
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
            <Button onClick={onOpen} variant="unstyled">
              <Icon as={FiMenu} boxSize={6} />
            </Button>
            <Icon as={RiMapPinUserFill} boxSize={6} />
          </>
        )}
      </Flex>
    </>
  );
};

export default Navbar;

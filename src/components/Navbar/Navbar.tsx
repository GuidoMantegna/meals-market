import * as React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import Language from "../Language";
import { utils } from "utils";
import { UserBadge, NavLinks } from "components";
import {
  Flex,
  Icon,
  HStack,
  Box,
  useMediaQuery,
  useColorMode,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerContent,
  useDisclosure,
  Button,
  VStack,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { RiMapPinUserFill } from "react-icons/ri";
import { ColorModeSwitcher } from "../index";
// REDUX
import { useAppDispatch, useAppSelector } from "store/hooks";
import { toggleUser } from "store/features/toggle";

interface NavbarProps {}

const Navbar: React.FunctionComponent<NavbarProps> = (props) => {
  const [isLarge] = useMediaQuery("(min-width: 540px)");
  const location = useLocation();
  const { colorMode } = useColorMode();
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);

  const savedItems = useAppSelector((state) => state.products.products);
  const favs = useAppSelector((state) => state.products.favs);
  const user = useAppSelector((state) => state.toggle.user);

  // const fridgeItems = useMemo(() => {
  const products = Object.entries(savedItems);
  // .filter((item) => (savedItems[item.idIngredient] ? item : null))
  // .map((item) => ({ ...item, qty: savedItems[item.idIngredient] }));
  const totalQTY = products.reduce((acc, curr) => acc + curr[1].qty, 0);
  const totalPrice = products.reduce(
    (acc, curr) => acc + curr[1].qty * utils.stringToInt(curr[1].ingredient),
    0
  );
  const totalFavs = Object.entries(favs).filter((item) => item[1]).length;

  //   return { products, totalQTY, totalPrice, totalFavs };
  // }, [ingredients]);

  return (
    <>
      <Flex
        bgColor={colorMode === "light" ? "purple.900" : "blue.900"}
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
            <VStack spacing={4} mt="60px">
              {!isLarge && <NavLinks onClose={onClose} />}
              <Box pt="30px" w="100%">
                <UserBadge
                  items={totalQTY}
                  favs={totalFavs}
                  value={totalPrice}
                />
              </Box>
            </VStack>
          </DrawerContent>
        </Drawer>
        {isLarge ? (
          <>
            <NavLinks onClose={onClose} />
            <HStack spacing={6}>
              <ColorModeSwitcher />
              <Icon
                as={RiMapPinUserFill}
                boxSize={6}
                onClick={() => {
                  dispatch(toggleUser());
                  onOpen();
                }}
              />
            </HStack>
          </>
        ) : (
          <>
            <Button onClick={onOpen} variant="unstyled">
              <Icon as={FiMenu} boxSize={6} />
            </Button>
            <HStack spacing={6} justify="center">
              <ColorModeSwitcher />
            </HStack>
          </>
        )}
      </Flex>
    </>
  );
};

export default Navbar;

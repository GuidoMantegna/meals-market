import * as React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { HStack, StackDivider, Link } from "@chakra-ui/react";

interface INavLinksProps {
  onClose: () => void;
}

const NavLinks: React.FunctionComponent<INavLinksProps> = ({ onClose }) => {
  const location = useLocation();
  return (
    <HStack
      fontSize={{ base: "sm", md: "md" }}
      spacing={2}
      divider={<StackDivider borderColor="gray.300" />}
      justifyContent="center"
    >
      <Link
        as={RouterLink}
        to="/"
        fontWeight={location.pathname === "/" ? "semibold" : "light"}
        onClick={onClose}
      >
        Market
      </Link>
      <Link
        as={RouterLink}
        to="/meals/Beef"
        fontWeight={location.pathname.includes("meals") ? "semibold" : "light"}
        onClick={onClose}
      >
        Meals
      </Link>
      <Link
        as={RouterLink}
        to="/fridge"
        fontWeight={location.pathname === "/fridge" ? "semibold" : "light"}
        onClick={onClose}
      >
        Fridge
      </Link>
      <Link
        as={RouterLink}
        to="/facts"
        fontWeight={location.pathname === "/facts" ? "semibold" : "light"}
        onClick={onClose}
      >
        Food Facts
      </Link>
    </HStack>
  );
};

export default NavLinks;

import * as React from "react";
import { Flex, Box, Image, Heading } from "@chakra-ui/react";
import Logo from "../../images/Logo.png";

interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = (props) => {
  return (
    <>
      <Flex justify="space-between" w="100%" align="center">
        <Box>
          <Image src={Logo} alt="logo" />
        </Box>
        <Box>
          <Heading
            as="h1"
            fontSize={{ base: "sm", xl: "md" }}
            textAlign="right"
          >
            Welcome to the biggest food
            <br />
            market in the net.
          </Heading>
        </Box>
      </Flex>
    </>
  );
};

export default Header;

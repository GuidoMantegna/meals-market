import { Header, Navbar, Footer, UserBadge, MiniFridge } from "components";
import { Flex, useMediaQuery } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

type LayoutProps = {
};

const Layout: React.FunctionComponent<LayoutProps> = (props) => {
  const [isLargerThan1280] = useMediaQuery("(min-width: 1100px)");

  return (
    <>
      <Flex
        p={{ base: "0", sm: "0 5%", md: "0 15%" }}
        // bg="gray.100"
        direction="column"
        h="100vh"
        w="100%"
        borderRadius={4}
      >
        <Flex p={2}>
          <Header />
        </Flex>
        <Flex>
          <Navbar />
        </Flex>
        <Flex /*align="center"*/ justify="center" /*p={2}*/ grow={1} overflow='hidden'>
          {/* {isLargerThan1280 && (
            <Flex grow={1} justify="center">
              <MiniFridge />
            </Flex>
          )} */}
          <Flex grow={2} justifyContent="center">
            <Outlet />
          </Flex>
        </Flex>
        <Flex p={4} justify="flex-end">
          <Footer />
        </Flex>
      </Flex>
    </>
  );
};

export default Layout;

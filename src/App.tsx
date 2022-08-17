import { Route, Routes } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Header, Navbar, Footer, UserBadge } from "./components";
import { Home, FoodFacts, Fridge, NotFound } from "./routes";
import { ChakraProvider, theme, Flex, useMediaQuery } from "@chakra-ui/react";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="fridge" element={<Fridge />} />
        <Route path="facts" element={<FoodFacts />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </ChakraProvider>
);

interface LayoutProps {}

const Layout: React.FunctionComponent<LayoutProps> = (props) => {
  const [isLargerThan1280] = useMediaQuery("(min-width: 1100px)");

  return (
    <>
      <Flex
        p={{ base: "0", sm: "0 5%", md: "0 15%" }}
        direction="column"
        minHeight="100vh"
        w="100%"
        borderRadius={4}
      >
        <Flex p={2}>
          <Header />
        </Flex>
        <Flex>
          <Navbar />
        </Flex>
        <Flex align="center" justify="center" p={2} grow={1}>
          {isLargerThan1280 && (
            <Flex grow={1} justify="center">
              <UserBadge />
            </Flex>
          )}
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

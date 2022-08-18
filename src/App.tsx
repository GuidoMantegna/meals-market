import { Route, Routes } from "react-router-dom";
import { Home, FoodFacts, Fridge, NotFound, Layout } from "./routes";
import { ChakraProvider, theme } from "@chakra-ui/react";

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
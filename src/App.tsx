import { Route, Routes } from "react-router-dom";
import {
  Home,
  FoodFacts,
  Fridge,
  NotFound,
  Layout,
  MealInfo,
  Market,
  Meals,
} from "./routes";
import { ChakraProvider, theme } from "@chakra-ui/react";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Market />} />
        {/* <Route path="/market" element={<Market />} /> */}
        <Route path="/meals/:meal" element={<Meals />} />
        <Route path="/meals/:meal/:idMeal" element={<MealInfo />} />
        {/* <Route path="/market/*" element={<Market />}>
          <Route path="/:idMeal" element={<MealInfo />} />
        </Route> */}
        <Route path="/fridge" element={<Fridge />} />
        <Route path="/facts" element={<FoodFacts />} />
        <Route path="/*" element={<NotFound />} />
      </Route>
    </Routes>
  </ChakraProvider>
);

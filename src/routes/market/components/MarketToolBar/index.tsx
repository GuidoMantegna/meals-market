import * as React from "react";
// CHAKRA
import { Button, Icon, Text, HStack, Box } from "@chakra-ui/react";
// ICONS
import { RiFridgeFill } from "react-icons/ri";

interface IMarketToolBarProps {
  totalQTY: number;
  totalPrice: number;
  openFridge: () => void;
  forgetItems: () => void;
  openModal: () => void;
}

const MarketToolBar: React.FunctionComponent<IMarketToolBarProps> = ({
  totalPrice,
  totalQTY,
  openFridge,
  forgetItems,
  openModal,
}) => {
  return (
    <>
      <HStack justify="space-around" w="100%">
        <HStack pos="relative" spacing={5}>
          <Button
            variant="ghost"
            pos="relative"
            onClick={openFridge}
            colorScheme={totalQTY === 0 ? "facebook" : "teal"}
          >
            <Icon as={RiFridgeFill} boxSize={{ base: 6, lg: 8 }} />
            <Button
              size="xs"
              colorScheme={totalQTY === 0 ? "facebook" : "teal"}
              borderRadius="50%"
              border="1px solid"
              fontSize="0.65em"
              pos="absolute"
              right="8px"
              top="-6px"
            >
              {totalQTY}
            </Button>
          </Button>
          <Text textAlign="center" fontSize={{ base: "xs", lg: "sm" }}>
            Total: $ {totalPrice.toFixed(2)}
          </Text>
        </HStack>

        <Box>
          <Button
            variant="outline"
            w={{ base: "75px", lg: "100px" }}
            colorScheme="green"
            disabled={totalQTY === 0}
            size={{ base: "xs", lg: "sm" }}
            onClick={openModal}
          >
            BUY
          </Button>
          <Button
            variant="outline"
            w={{ base: "75px", lg: "100px" }}
            marginLeft={2}
            colorScheme="red"
            disabled={totalQTY === 0}
            size={{ base: "xs", lg: "sm" }}
            onClick={forgetItems}
          >
            FORGET
          </Button>
        </Box>
      </HStack>
    </>
  );
};

export default MarketToolBar;

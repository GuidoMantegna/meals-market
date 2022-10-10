import * as React from 'react';
// CHAKRA
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Icon,
  VStack,
  Skeleton,
  Flex,
  Text,
  HStack,
  Divider,
} from "@chakra-ui/react";
// ICONS
import { BsSearch } from "react-icons/bs";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
// UTILS
import { utils } from 'utils';

interface IPageSelectorProps {
  // setPage: ((({start: number, end: number}))) => any
  setPage: () => any
  page: {start: number, end: number}
  totalResults: number
}

const PageSelector: React.FunctionComponent<IPageSelectorProps> = ({setPage, page, totalResults}) => {
  return (
    <>
    <HStack spacing={6}>
            <Button
              size="xs"
              variant="outline"
              onClick={() =>
                // setPage(utils.turnPage("prev", page, totalResults))
                setPage()
              }
              disabled={page.start - 10 < -1}
            >
              <Icon as={CgPlayTrackPrev} boxSize={{ base: 4, lg: 6 }} />
              <Text fontSize="xs">Prev</Text>
            </Button>
            <Text>
              {page.start + 1} to{" "}
              {page.end > totalResults
                ? totalResults
                : page.end}{" "}
              ({totalResults})
            </Text>
            <Button
              size="xs"
              variant="outline"
              onClick={() =>
                // setPage(utils.turnPage("next", page, totalResults))
                setPage()
              }
              disabled={
                totalResults < 10 ||
                page.end === totalResults
              }
            >
              <Text fontSize="xs">Next</Text>
              <Icon as={CgPlayTrackNext} boxSize={{ base: 4, lg: 6 }} />
            </Button>
          </HStack>
    </>
  );
};

export default PageSelector;

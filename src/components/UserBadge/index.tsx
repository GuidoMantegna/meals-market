import {
  Center,
  Icon,
  Avatar,
  Heading,
  Text,
  Divider,
  HStack,
  VStack,
  StatArrow,
} from "@chakra-ui/react";
import * as React from "react";
import { BiUserCircle, BiFridge } from "react-icons/bi";
import { FaCoins } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { RiFridgeFill, RiArrowUpSFill } from "react-icons/ri";

import AvatarImg from "../../images/GuidoMantegna-avatar.jpg";

interface IUserBadgeProps {}

const UserBadge: React.FunctionComponent<IUserBadgeProps> = (props) => {
  return (
    <Center flexDirection="column" pos='relative'>
      <Center bgColor="blackAlpha.200" mb='12px' borderRadius="50%" p={1}>
        <Icon as={BiUserCircle} boxSize={6} color="white" />
      </Center>
      {/* <StatArrow type='increase' /> */}
      <Icon as={RiArrowUpSFill} boxSize={8} color='white' pos='absolute' top='26px'/>
      <Center
        bgColor="white"
        p="30px 0"
        borderRadius="5px"
        flexDirection="column"
        width="-webkit-fit-content"
      >
        <Center flexDirection="column" p="0 40px 20px 40px">
          <Avatar src={AvatarImg} size="xl" />
          <Heading whiteSpace="nowrap" as='h2' size='lg'>Guido Mantegna</Heading>
          <Text fontSize="sm">example@example.com</Text>
        </Center>
        <Divider />
        <VStack flexDirection="column" p="20px 40px 0 40px" spacing={4}>
          <HStack>
            <Icon as={RiFridgeFill} boxSize={8} />
            <Text fontSize="sm" fontWeight="bold">
              12 items
            </Text>
          </HStack>
          <HStack>
            <Icon as={FaCoins} boxSize={8} />
            <Text fontSize="sm" fontWeight="bold">
              $9,15
            </Text>
          </HStack>
          <HStack>
            <Icon as={AiFillStar} boxSize={8} />
            <Text fontSize="sm" fontWeight="bold">
              12 items
            </Text>
          </HStack>
        </VStack>
      </Center>
    </Center>
  );
};

export default UserBadge;

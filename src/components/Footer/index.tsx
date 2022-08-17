import * as React from "react";
import { HStack, Link, Icon, Text } from "@chakra-ui/react";
import { FaLinkedin, FaGithubSquare, FaTwitterSquare } from "react-icons/fa";

interface FooterProps {}

const Footer: React.FunctionComponent<FooterProps> = (props) => {
  return (
    <HStack>
      <Text fontSize={{ base: "xs", md: "sm" }}>
        Developed by{" "}
        <Link
          fontWeight="bold"
          isExternal
          href="https://guidomantegna.github.io/GuidoMantegna/"
        >
          Guido Mantegna
        </Link>
      </Text>
      <Link href="https://www.linkedin.com/in/guidomantegna/" isExternal>
        <Icon as={FaLinkedin} boxSize={{ base: 5, md: 6 }} />
      </Link>
      <Link href="https://github.com/GuidoMantegna" isExternal>
        <Icon as={FaGithubSquare} boxSize={{ base: 5, md: 6 }} />
      </Link>
      <Link href="https://twitter.com/GuidoMantegna" isExternal>
        <Icon as={FaTwitterSquare} boxSize={{ base: 5, md: 6 }} />
      </Link>
      {/* <Link href="https://www.linkedin.com/in/guidomantegna/" isExternal>
        <Icon as={ImMail} boxSize={{base: 5, md: 6}} />
      </Link> */}
    </HStack>
  );
};

export default Footer;

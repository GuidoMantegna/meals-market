import * as React from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";

interface LanguageProps {}

const Language: React.FunctionComponent<LanguageProps> = (props) => {
  return (
    <>
      <ButtonGroup isAttached size="xs" >
        <Button color="gray.800" bgColor="gray.300" p={1}>
          EN
        </Button>
        <Button variant="outline" color="gray.300" p={1}>
          ES
        </Button>
      </ButtonGroup>
    </>
  );
};

export default Language;

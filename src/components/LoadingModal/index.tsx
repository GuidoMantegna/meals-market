import * as React from "react";
import ReactDOM from "react-dom";
import { Center, Spinner } from "@chakra-ui/react";

const LoadingModal: React.FunctionComponent = () => {
  const domNode = document.getElementById("modal-root") as HTMLDivElement;

  return ReactDOM.createPortal(
    <Center
      pos="fixed"
      top={0}
      bottom={0}
      left={0}
      right={0}
      bgColor="blackAlpha.700"
    >
      <Spinner color="teal" size="xl" thickness="2px"/>
    </Center>,
    domNode
  );
};

export default LoadingModal;

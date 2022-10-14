import * as React from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

interface IAlertCompProps {
  status: "warning" | "info" | "success" | "error" | "loading" | undefined;
  title: string;
  description: string;
  children?: React.ReactNode
}

const AlertComp: React.FunctionComponent<IAlertCompProps> = ({
  status,
  title,
  description,
  children,
}) => {
  return (
    <>
      <Alert status={status} borderRadius={5} flexWrap="wrap" justifyContent='center'>
        <AlertIcon />
        <AlertTitle whiteSpace="nowrap">{title}</AlertTitle>
        <AlertDescription whiteSpace="nowrap">{description}</AlertDescription>
        {children}
      </Alert>
    </>
  );
};

export default AlertComp;

import { Box, Text } from "@chakra-ui/react";
import { memo } from "react";
import CenteredWrapper from "./CenteredWrapper";

const ErrorFallback = () => (
  <CenteredWrapper>
    <Box bg="tomato">
      <Text fontSize="3xl">An error ocurred, please try again</Text>
    </Box>
  </CenteredWrapper>
);

export default memo(ErrorFallback);

import { Box, SkeletonCircle, SkeletonText, Stack } from "@chakra-ui/react";
import { FC, memo } from "react";

const CardSkeleton: FC = () => (
  <Box>
    <Stack>
      <SkeletonCircle size="10" />
      <SkeletonText mt="4" noOfLines={4} spacing="4" />
    </Stack>
  </Box>
);

export default memo(CardSkeleton);

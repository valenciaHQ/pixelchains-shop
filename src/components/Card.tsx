import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import { FC, memo } from "react";
import { Nft } from "../types";

const Card: FC<{ data: Nft }> = ({ data }) => {
  const { id, image_url, name, owner } = data;
  return (
    <Box>
      <Image
        key={id}
        src={image_url}
        alt={name}
        borderRadius="md"
        fallbackSrc={"https://via.placeholder.com/150"}
      />
      <Flex justifyContent="space-between">
        <Text textAlign="center">{name}</Text>
        {owner?.user?.username && (
          <Flex flexFlow="column" alignItems="center">
            <Text textAlign="right">{`by ${owner.user.username}`}</Text>
            <Avatar src={owner.profile_img_url} />
          </Flex>
        )}
      </Flex>
    </Box>
  );
};
export default memo(Card);

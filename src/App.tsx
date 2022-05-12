import {
  Container,
  Heading,
  SimpleGrid,
  Spinner,
  Alert,
  AlertIcon,
  Flex,
} from "@chakra-ui/react";
import { useCallback, useEffect, useMemo, useRef } from "react";
import useLoadAssets from "./hooks/useLoadAssets";
import debounce from "just-debounce-it";
import useNearScreen from "./hooks/useNearScreen";
import Card from "./components/Card";
import CardSkeleton from "./components/CardSkeleton";

function App() {
  const { items, isMounting, isFetching, loadMore, hasError } = useLoadAssets();
  const externalRef = useRef<HTMLDivElement>(null);
  const { isNearScreen } = useNearScreen({
    externalRef: isMounting ? null : externalRef,
    once: false,
  });

  // Fixing warning https://kyleshevlin.com/debounce-and-throttle-callbacks-with-react-hooks
  const debouncedLoadMore = useMemo(() => debounce(loadMore, 750), [loadMore]);
  const getNextData = useCallback(debouncedLoadMore, [debouncedLoadMore]);

  useEffect(() => {
    if (isNearScreen) getNextData();
  }, [getNextData, isNearScreen]);

  if (isMounting) {
    return (
      <SimpleGrid
        columns={{ sm: 2, md: 3, lg: 4 }}
        spacing={10}
        data-cy="mounting-skeletons-grid"
      >
        {Array(10).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </SimpleGrid>
    );
  }

  return (
    <>
      <Container
        maxW="container.xl"
        display="flex"
        flexFlow="column"
        padding={0}
      >
        <Heading
          as="h1"
          textAlign="center"
          paddingBottom={5}
          paddingTop={5}
          borderBottom={"1px"}
          borderBottomColor="white"
          marginBottom={5}
        >
          Welcome to Pixelchains Shop
        </Heading>
        <SimpleGrid
          columns={{ sm: 2, md: 3, lg: 4 }}
          spacing={10}
          data-cy="data-grid"
        >
          {items.map((item) => (
            <Card data={item} key={item.id} />
          ))}
          <div ref={externalRef} />
        </SimpleGrid>
        {isFetching && (
          <Flex justifyContent="center">
            <Spinner size={"lg"} />
          </Flex>
        )}
        {hasError && (
          <Alert status="error" marginTop="auto">
            <AlertIcon />
            There was an error processing your request
          </Alert>
        )}
      </Container>
    </>
  );
}

export default App;

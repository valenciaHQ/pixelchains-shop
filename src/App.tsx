import {
  Container,
  Heading,
  SimpleGrid,
  Spinner,
  Alert,
  AlertIcon,
  Flex,
} from "@chakra-ui/react";
import { useCallback, useEffect, useRef } from "react";
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

  const debounceHandleNextPage = useCallback(debounce(loadMore, 200), []);

  useEffect(() => {
    if (isNearScreen) debounceHandleNextPage();
  }, [debounceHandleNextPage, isNearScreen]);

  if (isMounting) {
    return (
      <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} spacing={10}>
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
        <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} spacing={10}>
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

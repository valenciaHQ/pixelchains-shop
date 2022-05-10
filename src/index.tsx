import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";

import App from "./App";
import theme from "./theme";
import ErrorFallback from "./components/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container!);
root.render(
  <ChakraProvider theme={theme}>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()}
    >
      <App />
    </ErrorBoundary>
  </ChakraProvider>
);

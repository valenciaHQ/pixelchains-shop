import { ChakraProvider } from "@chakra-ui/react";
import { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";

const Wrapper: FC<{ children: React.ReactNode }> = ({ children }) => (
  <ChakraProvider>{children}</ChakraProvider>
);

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: Wrapper, ...options });

export * from "@testing-library/react";
export { customRender as render };

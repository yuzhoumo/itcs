import "./App.css";
import * as React from "react";
// 1. import `ChakraProvider` component
import {
  ChakraProvider,
  extendTheme,
  Container,
  Flex,
  Stack,
  Box,
  SimpleGrid,
  FormControl,
  Input,
  Button,
  useControllableState,
  getElementById,
} from "@chakra-ui/react";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};
const theme = extendTheme({
  textStyles: {
    h1: {
      // you can also use responsive styles
      fontSize: ["48px", "72px"],
      fontWeight: "bold",
      lineHeight: "110%",
      letterSpacing: "-2%",
    },
    h2: {
      fontSize: ["36px", "48px"],
      fontWeight: "semibold",
      lineHeight: "110%",
      letterSpacing: "-1%",
    },
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <div className="Header">
        <Box textStyle="h2">Inter-Timeline Commenting System</Box>
        <Container maxW="container.x1" p={0}>
          <Flex h="100vh" py={5}>
            <Stack
              w="70%"
              h="full"
              p={5}
              spacing={1}
              alignItems="flex-start"
              rounded="md"
              bg="white"
            >
              <Stack
                w="full"
                h="10%"
                p={1}
                spacing={1}
                bg="gray.100"
                rounded="md"
              >
                //Timeline
              </Stack>
              <Stack w="full" h="90%" p={1} bg="black" rounded="md"></Stack>
            </Stack>
            <Stack
              w="30%"
              h="full"
              p={1}
              spacing={1}
              alignItems="flex-start"
              bg="gray.800"
              rounded="md"
            >
              <Stack h="70%" rounded="md" background="gray">
                <Box
                  overflowX="auto"
                  css={{
                    "&::-webkit-scrollbar": {
                      width: "4px",
                    },
                    "&::-webkit-scrollbar-track": {
                      width: "6px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      background: "white",
                      borderRadius: "24px",
                    },
                  }}
                >
                  <b1 id="CommentSpace" w="full" h="70%">
                    Comment Comment Comment Comment Comment Comment Comment
                    Comment Comment Comment Comment Comment Comment Comment
                    Comment Comment Comment Comment Comment Comment Comment
                    Comment Comment Comment Comment Comment Comment
                  </b1>
                </Box>
              </Stack>
              <Stack h="full" w="full" rounded="md">
                <SimpleGrid columns={1} spacing={1}>
                  <FormControl>
                    <Input placeholder="Name" h="30%" id="Name" />
                    <Input placeholder="Comment" h="50%" id="Comment" />
                  </FormControl>
                </SimpleGrid>
              </Stack>
            </Stack>
          </Flex>
        </Container>
      </div>
    </ChakraProvider>
  );
}

export default App;

import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Button,
  Text,
  Link,
  HStack,
  Code,
  Grid,
  GridItem,
  Heading,
  Input,
  Select,
  FormControl,
  AspectRatio,
  theme,
  useToast,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import { validURL } from './utils';
import Comment from './components/Comment';

function App() {
  const [currentURL, setCurrentURL] = useState();
  const toast = useToast();

  return (
    <ChakraProvider>
      <Grid h="100vh" templateColumns="repeat(3, 1fr)">
        <GridItem colSpan={2} bg="#eee">
          {validURL(currentURL) ? (
            <AspectRatio ratio={5} h="100vh">
              <iframe title="snapshot" src={currentURL} />
            </AspectRatio>
          ) : null}
        </GridItem>
        <GridItem boxShadow="2xl" colSpan={1} p={4}>
          <Heading
            align="center"
            fontSize="xl"
            fontWeight="extrabold"
            marginBottom={5}
          >
            Inter-Timeline Commenting System
          </Heading>
          <Input
            variant="outline"
            placeholder="Website URL"
            onKeyDown={e => {
              if (e.key === 'Enter') setCurrentURL(e.currentTarget.value);
            }}
            isInvalid={currentURL !== null && !validURL(currentURL)}
          />

          <Box
            mt={5}
            borderColor={'#ddd'}
            borderWidth={1}
            borderRadius={10}
            padding={6}
            minH="60vh"
            maxH="70vh"
            bg="#eee"
            overflow="scroll"
          >
            <Comment
              text="The quick brown fox jumps over the lazy dog."
              time={1630604985}
              link="https://example.com"
              setURL={setCurrentURL}
            ></Comment>
            <Comment
              text="The quick brown fox jumps over the lazy dog."
              time={1630604985}
              link="https://example.com"
              setURL={setCurrentURL}
            ></Comment>
          </Box>

          <HStack mt={5}>
            <Input
              variant="outline"
              id="comment-input"
              placeholder="Post a comment"
              onKeyDown={e => {
                if (e.key === 'Enter' && validURL(currentURL)) {
                  // TODO
                }
              }}
            />
            <Button>Submit</Button>
          </HStack>
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}

export default App;

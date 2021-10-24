import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
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

function App() {
  const [currentURL, setCurrentURL] = useState();
  const toast = useToast();

  return (
    <ChakraProvider>
      <Grid h="100vh" templateColumns="repeat(3, 1fr)">
        <GridItem colSpan={2} bg="white">
          {validURL(currentURL) ? (
            <AspectRatio ratio={5} h="100vh">
              <iframe title="snapshot" src={currentURL} />
            </AspectRatio>
          ) : null}
        </GridItem>
        <GridItem boxShadow="2xl" colSpan={1} p={4} bg="white">
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
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}

export default App;

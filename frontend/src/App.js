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
  Select,
  FormControl,
  AspectRatio,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';

function App() {
  const [currentDate, setCurrentDate] = useState();
  return (
    <ChakraProvider theme={theme}>
      <Grid h="100vh" templateColumns="repeat(3, 1fr)">
        <GridItem colSpan={2} bg="white">
          <AspectRatio ratio={1}>
            <iframe title="snapshot" src="https://example.com" />
          </AspectRatio>
        </GridItem>
        <GridItem boxShadow="2xl" colSpan={1} p={4} bg="white">
          <Heading
            //     bgGradient="linear(to-l, #7928CA, #FF0080)"
            //     bgClip="text"
            fontSize="5xl"
            fontWeight="extrabold"
            marginBottom={5}
          >
            Inter-timline
            <br />
            Commenting
            <br />
            System
          </Heading>
          <FormControl>
            <Select
              placeholder="Latest"
              value={currentDate}
              size="lg"
              onChange={event => setCurrentDate(event.currentTarget.value)}
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </FormControl>
          <Text>{currentDate}</Text>
        </GridItem>
        {/* <GridItem rowSpan={2} colSpan={1} bg="blue" /> */}
      </Grid>
      {/* <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Logo h="40vmin" pointerEvents="none" />
            <Text>
              Edit <Code fontSize="xl">src/App.js</Code> and save to reload.
            </Text>
            <Link
              color="teal.500"
              href="https://chakra-ui.com"
              fontSize="2xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn Chakra
            </Link>
          </VStack>
        </Grid>
      </Box> */}
    </ChakraProvider>
  );
}

export default App;

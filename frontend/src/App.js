import React, { useState, useEffect } from 'react';
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
import { validURL } from './utils';

import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyA_Hujux8zJDUj_KZNTGY3frZnRWJ2UjP0',
  authDomain: 'itcs-f33ec.firebaseapp.com',
  projectId: 'itcs-f33ec',
  storageBucket: 'itcs-f33ec.appspot.com',
  messagingSenderId: '569866295101',
  appId: '1:569866295101:web:02ae668ec42301da071754',
};

function App() {
  const [currentURL, setCurrentURL] = useState();
  const [comments, setComments] = useState();

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  useEffect(() => {
    if (currentURL)
      (async () => {
        const querySnapshot = await getDocs(
          collection(db, encodeURIComponent(currentURL))
        );
        setComments(querySnapshot.docs.map(doc => doc.data()));
      })();
  }, [db, currentURL]);
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
          {JSON.stringify(comments)}
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}

export default App;

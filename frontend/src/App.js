import React, { useState, useEffect } from 'react';
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
import { validURL } from './utils';
import Comment from './components/Comment';

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  doc,
  query,
} from 'firebase/firestore';
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

  const submitComment = async text => {
    if (text)
      await addDoc(collection(db, encodeURIComponent(currentURL)), {
        text,
      });
  };

  useEffect(() => {
    if (currentURL) {
      const q = query(collection(db, encodeURIComponent(currentURL)));
      const unsubscribe = onSnapshot(q, querySnapshot => {
        setComments(querySnapshot.docs.map(doc => doc.data()));
      });
    }
  }, [db, currentURL]);
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
                  console.log('dsfsdf');
                  submitComment(e.currentTarget.value);
                  e.currentTarget.value = '';
                }
              }}
            />
            <Button>Submit</Button>
          </HStack>
          {JSON.stringify(comments)}
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}

export default App;

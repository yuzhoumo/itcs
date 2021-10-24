import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  Button,
  Text,
  HStack,
  Grid,
  GridItem,
  Heading,
  Input,
  AspectRatio,
  VStack,
} from '@chakra-ui/react';
import { validURL } from './utils';
import Comment from './components/Comment';

import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  doc,
  query,
  updateDoc,
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
  const [sourceURL, setSourceURL] = useState();
  const [comments, setComments] = useState();
  const [loadingItem, setLoadingItem] = useState();

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const submitComment = async text => {
    if (text) {
      const doc = await addDoc(collection(db, encodeURIComponent(currentURL)), {
        text,
      });
      saveSnapshot(doc.id);
    }
  };

  const saveSnapshot = async id => {
    setLoadingItem(id);
    if (validURL(currentURL)) {
      const data = await fetch(
        `https://jolly-sheep-69.loca.lt/archive?url=${encodeURIComponent(
          currentURL
        )}`
      );

      const realData = await data.json();

      const { timestamp, location } = realData;
      await updateDoc(doc(db, encodeURIComponent(currentURL), id), {
        timestamp,
        location,
      });
    }
    setLoadingItem(null);
  };

  useEffect(() => {
    if (validURL(currentURL)) {
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
          {validURL(sourceURL || currentURL) ? (
            <AspectRatio ratio={5} h="100vh">
              <iframe title="snapshot" src={sourceURL || currentURL} />
            </AspectRatio>
          ) : (
            <VStack>
              <Heading fontSize={80} mt="30vh">
                🕓 🕕 🕥 🕛
              </Heading>
              <Heading fontSize={30}>Inter-Timeline Commenting System</Heading>
            </VStack>
          )}
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
            {comments &&
              comments
                .sort((a, b) => a.timestamp > b.timestamp)
                .map(comment => (
                  <Comment
                    text={comment.text}
                    time={comment.timestamp || Date.now()}
                    link={'https://ipfs.io/ipfs/' + comment.location}
                    setURL={setSourceURL}
                  ></Comment>
                ))}
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
          {sourceURL && (
            <Box maxW={'30vw'}>
              <Text pt={5} pl={2}>
                Source:
                {JSON.stringify(sourceURL)}
              </Text>
            </Box>
          )}
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}

export default App;

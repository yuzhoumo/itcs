import React from 'react';
import { Box, IconButton, Link, Text, HStack } from '@chakra-ui/react';
import { TimeIcon } from '@chakra-ui/icons';

export default function ({ text, time, link, setURL }) {
  let date = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date(time * 1000));

  return (
    <>
      <HStack mb={5}>
        <IconButton
          mr={2}
          px={10}
          size="sm"
          colorScheme="teal"
          onClick={() => setURL(link)}
          icon={<TimeIcon />}
        ></IconButton>
        <Box>
          <Text fontSize="xs" as="em">
            {date}
          </Text>
          <Text fontSize="sm">{text}</Text>
        </Box>
      </HStack>
    </>
  );
}

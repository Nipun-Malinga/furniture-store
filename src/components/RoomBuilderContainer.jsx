import { Box, Flex, GridItem, HStack, SimpleGrid, VStack } from '@chakra-ui/react';
import React from 'react';
import useRoom from '../store/useRoom';
import RoomBuilder from './RoomBuilder';
import RoomSelector from './RoomSelector';
import RoomControllerContainer from './RoomControllerContainer';

const RoomBuilderContainer = () => {
  const { room } = useRoom();

  return (
    <VStack height={'100%'} padding={'0.5rem'}>
      {/* TODO: Response the layout */}
      <Flex
        direction={{ base: 'column-reverse', md: 'row' }}
        alignItems={{ base: 'center', md: 'start' }}
        justifyContent={'flex-end'}
        height={'100%'}
        width={'100%'}
        gap={'0.5rem'}
      >
        {room && <RoomBuilder />}
        <RoomSelector />
      </Flex>

      <RoomControllerContainer />
    </VStack>
  );
};

export default RoomBuilderContainer;

import { Flex, GridItem, HStack, SimpleGrid, VStack } from '@chakra-ui/react';
import React from 'react';
import useRoom from '../store/useRoom';
import RoomBuilder from './RoomBuilder';
import RoomControllerContainer from './RoomControllerContainer';
import RoomSelector from './RoomSelector';

const RoomBuilderContainer = () => {
  const { room } = useRoom();

  return (
    // <VStack height={'100%'} padding={'0.5rem'}>
    //   {/* TODO: Response the layout */}
    //   <Flex
    //     direction={{ base: 'column-reverse', md: 'row' }}
    //     alignItems={{ base: 'center', md: 'start' }}
    //     justifyContent={'center'}
    //     height={'100%'}
    //     width={'100%'}
    //     gap={'0.5rem'}
    //   >
    //     {room && (
    //       <HStack width={'100%'} height={'100%'}>
    //         <RoomBuilder enableModelSaver={true} />
    //         <RoomBuilder mode={'2d'} />
    //       </HStack>
    //     )}
    //     <RoomSelector />
    //   </Flex>

    //   <RoomControllerContainer />
    // </VStack>
    <SimpleGrid
      templateAreas={'repeat(5, 1fr)'}
      templateColumns={'repeat(5, 1fr)'}
      width={'100%'}
      padding={'5'}
      gap={'1rem'}
    >
      <GridItem
        area={{ base: '1 / 1 / 3 / 6', md: '1 / 1 / 4 / 5' }}
      >
        {room && (
          <HStack width={'100%'} height={'100%'}>
            <RoomBuilder enableModelSaver={true} />
            <RoomBuilder mode={'2d'} />
          </HStack>
        )}
      </GridItem>
      <GridItem area={{ base: '3 / 1 / 5 / 6', md: '4 / 1 / 6 / 5' }}>
        <RoomControllerContainer />
      </GridItem>
      <GridItem area={{ base: '5 / 1 / 6 / 6', md: '1 / 5 / 6 / 6' }}>
        <RoomSelector />
      </GridItem>
    </SimpleGrid>
  );
};

export default RoomBuilderContainer;

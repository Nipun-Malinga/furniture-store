import { GridItem, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import useRoom from '../store/useRoom';
import RoomBuilder from './RoomBuilder';
import RoomSelector from './RoomSelector';

const RoomBuilderContainer = () => {
  const { room } = useRoom();

  return (
    <>
      {/* TODO: Response the layout */}
      <SimpleGrid templateColumns={'repeat(5, 1fr)'} templateRows={'repeat(5, 1fr)'} gap={5}>
        <GridItem area={'1 / 1 / 5 / 5'}>{room && <RoomBuilder />}</GridItem>
        <GridItem area={'1 / 5 / 5 / 6'}>
          <RoomSelector />
        </GridItem>
        <GridItem area={'5 / 1 / 6 / 6'}></GridItem>
      </SimpleGrid>
    </>
  );
};

export default RoomBuilderContainer;

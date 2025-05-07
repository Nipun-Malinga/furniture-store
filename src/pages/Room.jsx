import { GridItem, useBreakpointValue } from '@chakra-ui/react';
import React from 'react';
import RoomBuilderContainer from '../components/RoomBuilderContainer';
import SideBar from '../components/SideBar';
import useRoom from '../store/useRoom';

const Room = () => {
  const isDesktop = useBreakpointValue({ base: false, md: true });

  const { room } = useRoom();
  return (
    <>
      {isDesktop && room ? (
        <GridItem area={'aside'}>
          <SideBar />
        </GridItem>
      ) : (
        <GridItem area={'aside'}></GridItem>
      )}
      <GridItem>
        <RoomBuilderContainer />
      </GridItem>
    </>
  );
};

export default Room;

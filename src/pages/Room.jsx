import { GridItem, useBreakpointValue } from '@chakra-ui/react';
import RoomBuilderContainer from '../components/RoomBuilderContainer';
import SideBar from '../components/SideBar';

const Room = () => {
  const isDesktop = useBreakpointValue({ base: false, md: true });

  return (
    <>
      {isDesktop ? (
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

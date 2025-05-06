import { Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import RoomBuilderContainer from '../components/RoomBuilderContainer';
import SideBar from '../components/SideBar';

const Room = () => {
  return (
    <Grid
      templateAreas={{
        base: `"main"`,
        md: `"aside main"`,
      }}
      templateColumns={{
        base: '1fr',
        md: '200px 1fr',
      }}
      height={'100vh'}
      padding={'2.5rem 1rem'}
    >
      <GridItem>
        <SideBar />
      </GridItem>
      <GridItem>
        <RoomBuilderContainer />
      </GridItem>
    </Grid>
  );
};

export default Room;

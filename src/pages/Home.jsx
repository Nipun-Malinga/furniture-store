import { Grid, GridItem, Text, useBreakpointValue } from '@chakra-ui/react';
import React from 'react';
import SideBar from '../components/SideBar';
import FurnitureInfoContainer from '../components/FurnitureInfoContainer';
import { useOutlet } from 'react-router-dom';

const Home = () => {
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const outlet = useOutlet();

  return (
    <>
      <Grid
        templateAreas={{
          base: `"main"`,
          md: `"aside main"`,
        }}
        templateColumns={{
          base: '1fr',
          md: '200px 1fr',
        }}
        height={'100%'}
        padding={'2.5rem 1rem'}
      >
        {isDesktop && (
          <GridItem area={'aside'}>
            <SideBar />
          </GridItem>
        )}
        <GridItem area={'main'}>{outlet || <Text>Implement A Massage</Text>}</GridItem>
      </Grid>
    </>
  );
};

export default Home;

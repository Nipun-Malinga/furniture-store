import { Grid, GridItem, Text, useBreakpointValue } from '@chakra-ui/react';
import React from 'react';
import { useOutlet } from 'react-router-dom';
import SideBar from '../components/SideBar';

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
        height={'100vh'}
        padding={'2.5rem 1rem'}
      >
        {isDesktop && (
          <GridItem area={'aside'}>
            <SideBar type={'navigate'} />
          </GridItem>
        )}
        <GridItem area={'main'}>{outlet || <Text>Implement A Massage</Text>}</GridItem>
      </Grid>
    </>
  );
};

export default Home;

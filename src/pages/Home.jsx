import { Grid, GridItem, Text, useBreakpointValue } from '@chakra-ui/react';
import React from 'react';
import { useOutlet } from 'react-router-dom';
import SideBar from '../components/SideBar';

const Home = () => {
  const isDesktop = useBreakpointValue({ base: false, md: true });

  const outlet = useOutlet();

  return (
    <>
      {isDesktop && (
        <GridItem area={'aside'}>
          <SideBar type={location.pathname == '/room' ? null : 'navigate'} />
        </GridItem>
      )}
      <GridItem>{outlet || <Text>Implement A Massage</Text>}</GridItem>
    </>
  );
};

export default Home;

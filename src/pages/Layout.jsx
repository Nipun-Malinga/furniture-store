import { Box, Grid, GridItem, Text, useBreakpointValue } from '@chakra-ui/react';
import React from 'react';
import { Outlet, useLocation } from 'react-router';
import SideBar from '../components/SideBar';
import Home from './Home';

const Layout = () => {
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const location = useLocation();

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
      gap={'0.5rem'}
    >
      {isDesktop && (
        <GridItem area={'aside'}>
          <SideBar type={location.pathname == '/room' ? null : 'navigate'} />
        </GridItem>
      )}
      <GridItem>
        <Outlet />
      </GridItem>
    </Grid>
  );
};

export default Layout;

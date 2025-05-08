import { Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

const Layout = () => {
  return (
    <Grid
      templateAreas={{
        base: `"header" "main"`,
        md: `"header header" "aside main"`,
      }}
      templateColumns={{
        base: '1fr',
        md: '200px 1fr',
      }}
      templateRows={{
        base: '64px 1fr',
        md: '64px 1fr',
      }}
      height="100%"
      gap="0.5rem"
    >
      <GridItem area="header" zIndex="1000" position="sticky" top="0">
        <NavBar />
      </GridItem>

      <Outlet />
    </Grid>
  );
};

export default Layout;

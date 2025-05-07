import { Grid } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router';

const Layout = () => {
  return (
    <Grid
      templateAreas={{
        base: `"main"`,
        md: `"aside main"`,
      }}
      templateColumns={{
        base: '1fr',
        md: 'auto 1fr',
      }}
      height={'100vh'}
      gap={'0.5rem'}
    >
      <Outlet />
    </Grid>
  );
};

export default Layout;

import { Box, Grid } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router';

const Layout = () => {
  return (
    <>
      <Box padding={5}>
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;

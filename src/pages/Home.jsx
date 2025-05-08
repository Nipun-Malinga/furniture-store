import { Grid, GridItem, Text, useBreakpointValue } from '@chakra-ui/react';
import React from 'react';
import { useOutlet } from 'react-router-dom';
import SideBar from '../components/SideBar';
import homeImage from '../assets/growth2.png';
import homeImageDark from '../assets/dark-home.png';
import { useColorMode } from '../components/ui/color-mode';

const Home = () => {
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const { colorMode } = useColorMode();
  const outlet = useOutlet();

  return (
    <>
      {isDesktop && (
        <GridItem area={'aside'}>
          <SideBar type={'navigate'} />
        </GridItem>
      )}

      <GridItem area={'main'}>
        {outlet || (
          <img width={'100%'} src={colorMode === 'light' ? homeImage : homeImageDark} alt='Home' />
        )}
      </GridItem>
    </>
  );
};

export default Home;

import {
  Box,
  GridItem,
  HStack,
  SimpleGrid,
  Text,
  Grid,
  useBreakpointValue,
} from '@chakra-ui/react';
import React from 'react';
import InfoCard from '../components/InfoCard';
import FurnitureViewer from '../components/FurnitureViewer';
import chair from '../components/3DModels/Chair';

const Home = () => {
  const isDesktop = useBreakpointValue({ base: false, md: true });

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
      height={'100%'}
    >
      {isDesktop && (
        <GridItem area={'aside'}>
          <Text>Aside</Text>
        </GridItem>
      )}
      <GridItem area={'main'}>
        <SimpleGrid columns={{ base: 1, md: 2 }} height={'100%'} alignItems={'center'} gap={'1rem'}>
          <GridItem>
            <InfoCard />
          </GridItem>
          <GridItem>
            <Box width={'100%'} height={'100%'} background={'green.300'}>
              <FurnitureViewer selectedColor='' modelPath='' model={chair} />
            </Box>
          </GridItem>
        </SimpleGrid>
      </GridItem>
    </Grid>
  );
};

export default Home;

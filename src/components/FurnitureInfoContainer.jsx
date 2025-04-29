import { SimpleGrid, GridItem } from '@chakra-ui/react';
import InfoCard from './InfoCard';
import FurnitureViewer from './FurnitureViewer';
import React from 'react';
import chair from './3DModels/Chair';
import data from '../data/data';
import { useParams } from 'react-router-dom';

const FurnitureInfoContainer = (props) => {
  const { categoryId, productId } = useParams();

  return (
    <SimpleGrid
      columns={{ base: 1, md: 2 }}
      height={'100%'}
      width={'100%'}
      gap={'5rem'}
    >
      <GridItem>
        <InfoCard />
      </GridItem>
      <GridItem>
        <FurnitureViewer selectedColor='' modelPath='' model={chair} />
      </GridItem>
    </SimpleGrid>
  );
};

export default FurnitureInfoContainer;

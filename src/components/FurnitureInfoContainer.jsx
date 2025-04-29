import { SimpleGrid, GridItem, Box } from '@chakra-ui/react';
import InfoCard from './InfoCard';
import FurnitureViewer from './FurnitureViewer';
import React from 'react';
import chair from './3DModels/Chair';
import data from '../data/data';
import { useParams } from 'react-router-dom';

const FurnitureInfoContainer = (props) => {
  const { categoryId, productId } = useParams();

  const category = data.filter((category) => category.categoryId == categoryId);

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} height={'100%'} width={'100%'} gap={'5rem'}>
      {category.map((category, key) => (
        <>
          <GridItem>
            {category.products
              .filter((product) => product.productId == productId)
              .map((product, key) => (
                <Box key={key}>
                  <InfoCard
                    category={product.categoryName}
                    productName={product.name}
                    description={product.description}
                    price={product.price}
                    rating={product.rating}
                    ratingCount={product.ratingCount}
                    colors={product.colors}
                  />
                </Box>
              ))}
          </GridItem>
          <GridItem>
            {category.products
              .filter((product) => product.productId == productId)
              .map((product, key) => (
                <Box height={'100%'} key={key}>
                  <FurnitureViewer selectedColor='' modelPath='' model={product.model} />
                </Box>
              ))}
          </GridItem>
        </>
      ))}
    </SimpleGrid>
  );
};

export default FurnitureInfoContainer;

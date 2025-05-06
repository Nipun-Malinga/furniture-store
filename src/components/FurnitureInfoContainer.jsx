import { Box, GridItem, HStack, SimpleGrid } from '@chakra-ui/react';
import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import data from '../data/data';
import FurnitureViewer from './FurnitureViewer';
import InfoCard from './InfoCard';
import useAngleStore from '../store/useAngleStore';
import SideViewGrid from './SideViewGrid';

const FurnitureInfoContainer = (props) => {
  const { categoryId, productId } = useParams();

  const category = data.filter((category) => category.categoryId == categoryId);

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} height={'100%'} gap={'0.5rem'} padding={'0.5rem'}>
      {category.map((category, key) => (
        <Fragment key={key}>
          <GridItem
            display={'flex'}
            flexDirection={'column'}
            gap={'0.5rem'}
            justifyContent={'space-between'}
          >
            {category.products
              .filter((product) => product.productId == productId)
              .map((product, key) => (
                <Box key={key} height={'100%'}>
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
            <SideViewGrid products={category.products} productId={productId} />
          </GridItem>
          <GridItem>
            {category.products
              .filter((product) => product.productId == productId)
              .map((product, key) => (
                <Box height={'100%'} key={key}>
                  <FurnitureViewer
                    selectedColor=''
                    modelPath=''
                    model={product.model}
                    viewDownload={true}
                  />
                </Box>
              ))}
          </GridItem>
        </Fragment>
      ))}
    </SimpleGrid>
  );
};

export default FurnitureInfoContainer;

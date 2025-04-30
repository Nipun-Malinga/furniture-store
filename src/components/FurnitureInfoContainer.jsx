import { Box, GridItem, HStack, SimpleGrid } from '@chakra-ui/react';
import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import data from '../data/data';
import FurnitureViewer from './FurnitureViewer';
import InfoCard from './InfoCard';

const FurnitureInfoContainer = (props) => {
  const { categoryId, productId } = useParams();

  const category = data.filter((category) => category.categoryId == categoryId);

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} height={'100%'} width={'100%'} gap={'5rem'}>
      {category.map((category, key) => (
        <Fragment key={key}>
          <GridItem display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
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
            <SimpleGrid width={'100%'} columns={{ base: 1, md: 2 }} gap={2}>
              {category.products
                .filter((product) => product.productId == productId)
                .map((product, key) => (
                  <Fragment key={key}>
                    <Box height={'100%'}>
                      <FurnitureViewer
                        selectedColor=''
                        modelPath=''
                        model={product.model}
                        camera={'left'}
                      />
                    </Box>
                    <Box height={'100%'}>
                      <FurnitureViewer
                        selectedColor=''
                        modelPath=''
                        model={product.model}
                        camera={'front'}
                      />
                    </Box>
                    <Box height={'100%'}>
                      <FurnitureViewer
                        selectedColor=''
                        modelPath=''
                        model={product.model}
                        camera={'right'}
                      />
                    </Box>
                    <Box height={'100%'}>
                      <FurnitureViewer
                        selectedColor=''
                        modelPath=''
                        model={product.model}
                        camera={'isometric'}
                      />
                    </Box>
                  </Fragment>
                ))}
            </SimpleGrid>
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

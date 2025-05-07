import { Box, Button, Text, VStack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import data from '../data/data';
import useProduct from '../store/useProduct';

const SideBar = (props) => {
  const navigate = useNavigate();
  const { setProduct } = useProduct();

  return (
    <VStack height={'100vh'} overflowY={'scroll'} padding={'1rem'}>
      <Box as='ul'>
        {data.map((data, key) => (
          <Box as='li' mb={5} key={key}>
            <Text fontSize={'1.25rem'} fontWeight={'medium'}>
              {data.categoryName}
            </Text>
            <Box as='ul'>
              {data.products.map((product, key) => (
                <Box as='li' key={key} marginY={1}>
                  <Button
                    onClick={() => {
                      if (props.type === 'navigate') {
                        navigate(`/category/${product.categoryId}/product/${product.productId}`);
                      }
                      product.modelId = Math.round(Math.random() * 100);
                      console.log(product);
                      setProduct(product);
                    }}
                    variant='outline'
                    style={{ width: '100%' }}
                  >
                    {product.name}
                  </Button>
                </Box>
              ))}
            </Box>
            <hr />
          </Box>
        ))}
      </Box>
    </VStack>
  );
};

export default SideBar;

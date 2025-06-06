import { Box, Button, Text, VStack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import data from '../data/data';
import useProduct from '../store/useProduct';
import useRoom from '../store/useRoom';

const SideBar = (props) => {
  const navigate = useNavigate();
  const { setProduct } = useProduct();
  const { room } = useRoom();

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
                    disabled={props.type !== 'navigate' && !room}
                    onClick={() => {
                      if (props.type === 'navigate') {
                        navigate(`category/${product.categoryId}/product/${product.productId}`);
                      } else {
                        product.modelId = Math.round(Math.random() * 100);
                        setProduct({
                          ...product,
                          modelId: `model-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
                        });
                      }
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

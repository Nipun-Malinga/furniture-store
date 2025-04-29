import { Box, Button, VStack, Text } from '@chakra-ui/react';
import React from 'react';
import data from '../data/data';
import { useNavigate } from 'react-router-dom';

const SideBar = (props) => {
  const navigate = useNavigate();

  return (
    <VStack height={'100vh'} overflow={'scroll'}>
      <Box as='ul'>
        {data.map((data, key) => (
          <Box as='li' mb={5} key={key}>
            <Text fontSize={'1.25rem'} fontWeight={'medium'}>
              {data.categoryName}
            </Text>
            <Box as='ul' ml={'1.5rem'}>
              {data.products.map((product, key) => (
                <Box as='li' key={key} marginY={1}>
                  <Button
                    onClick={() =>
                      navigate(`/category/${product.categoryId}/product/${product.productId}`)
                    }
                    variant={'outline'}
                    width={'100%'}
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

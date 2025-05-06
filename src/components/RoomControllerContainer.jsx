import { HStack } from '@chakra-ui/react';
import React from 'react';
import useProduct from '../store/useProduct';
import RoomController from './RoomController';

const RoomControllerContainer = () => {
  const { products } = useProduct();

  return (
    <HStack width={'100%'} height={'100%'} overflowX={'scroll'}>
      {products.map((product, key) => (
        <RoomController key={key} modelId={product.modelId} colors={product.colors} />
      ))}
    </HStack>
  );
};

export default RoomControllerContainer;

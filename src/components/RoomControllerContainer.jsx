import { Box, HStack } from '@chakra-ui/react';
import React from 'react';
import RoomController from './RoomController';
import useProduct from '../store/useProduct';
import useCoordinatesStore from '../store/useCoordinatesStore';

const RoomControllerContainer = () => {
  const { products } = useProduct();
  const { coordinates } = useCoordinatesStore();

  console.log(coordinates);

  return (
    <HStack width={'100%'} overflowX={'scroll'}>
      {products.map((product, key) => (
        <RoomController key={key} modelId={product.modelId} colors={product.colors} />
      ))}
    </HStack>
  );
};

export default RoomControllerContainer;

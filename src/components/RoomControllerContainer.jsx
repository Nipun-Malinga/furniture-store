import { HStack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import useProduct from '../store/useProduct';
import RoomController from './RoomController';

const RoomControllerContainer = () => {
  const { products } = useProduct();

  return (
    <HStack width={'100%'} height={'100%'} overflowX={'auto'} gap={20}>
      {products.map((product, key) => (
        <RoomController key={key} product={product} />
      ))}
    </HStack>
  );
};

export default RoomControllerContainer;

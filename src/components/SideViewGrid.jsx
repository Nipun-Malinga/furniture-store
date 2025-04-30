import { Box, SimpleGrid } from '@chakra-ui/react';
import React, { Fragment } from 'react';
import FurnitureViewer from './FurnitureViewer';
import useAngleStore from '../store/useAngleStore';

const angles = ['top', 'left', 'right', 'isometric'];

const SideViewGrid = (props) => {
  const { setAngle } = useAngleStore();
  console.log(props.products);
  return (
    <SimpleGrid width={'100%'} columns={{ base: 1, md: 2 }} gap={2}>
      {props.products
        .filter((product) => product.productId == props.productId)
        .map((product, key) => (
          <Fragment key={key}>
            {angles.map((angle, key) => (
              <Box
                key={key}
                height={'100%'}
                onClick={() => {
                  setAngle(angle);
                }}
              >
                <FurnitureViewer
                  selectedColor=''
                  modelPath=''
                  model={product.model}
                  camera={angle}
                />
              </Box>
            ))}
          </Fragment>
        ))}
    </SimpleGrid>
  );
};

export default SideViewGrid;

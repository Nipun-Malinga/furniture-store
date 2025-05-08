import { createListCollection } from '@chakra-ui/react';
import rectangleRoom from '../components/3DModels/rooms/rectangleRoom';
import squareRoom from '../components/3DModels/rooms/squareRoom';

const rooms = createListCollection({
  items: [
    {
      label: 'Square Room',
      value: 'square',
      room: squareRoom,
      dimensions: [
        { name: 'Width', value: 'width', default: 5 },
        { name: 'Height', value: 'height', default: 5 },
      ],
    },
    {
      label: 'Rectangle Room',
      value: 'rectangle',
      room: rectangleRoom,
      dimensions: [
        { name: 'Length', value: 'length', default: 60 },
        { name: 'Height', value: 'height', default: 5 },
        { name: 'Width', value: 'width', default: 5 },
      ],
    },
  ],
});

export default rooms;

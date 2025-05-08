import {
  Box,
  Button,
  Field,
  Fieldset,
  HStack,
  Input,
  Portal,
  Select,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import data from '../data/data';
import rooms from '../data/rooms';
import useCoordinatesStore from '../store/useCoordinatesStore';
import useProduct from '../store/useProduct';
import useRoom from '../store/useRoom';
import useLayoutSavedStore from '../store/useLayoutSavedStore';

const RoomSelector = () => {
  const [selectedRoom, setSelectedRoom] = useState();
  const { setRoom } = useRoom();
  const { products, setProduct, clearProducts } = useProduct();
  const { coordinates, setCoordinates, clearCoordinates } = useCoordinatesStore();
  const { savedLayout } = useLayoutSavedStore();
  const [savedLayouts, setSavedLayouts] = useState([]);

  useEffect(() => {
    const layouts = JSON.parse(localStorage.getItem('savedLayouts') || '[]');
    setSavedLayouts(layouts);
  }, [savedLayout]);

  const deleteLayout = (designNameToRemove) => {
    const savedLayoutsRaw = localStorage.getItem('savedLayouts');
    const layouts = savedLayoutsRaw ? JSON.parse(savedLayoutsRaw) : [];

    const updatedLayouts = layouts.filter((layout) => layout.designName !== designNameToRemove);

    localStorage.setItem('savedLayouts', JSON.stringify(updatedLayouts));
  };

  const handleDelete = (designName) => {
    deleteLayout(designName);
    const updatedLayouts = JSON.parse(localStorage.getItem('savedLayouts') || '[]');
    setSavedLayouts(updatedLayouts);
  };

  const handleSubmit = (design) => {
    const room = design.find((model) => model.modelType == 'room');
    setRoom({
      selectedRoom: room.model.name,
      width: room.model.width,
      length: room.model.length,
    });

    const savedMeshes = design.filter((model) => model.modelType === 'mesh');

    const matchedModels = savedMeshes.map((mesh) => {
      const category = data.find((c) => c.categoryId === mesh.categoryId);
      if (!category) return null;

      const product = category.products.find((p) => p.productId === mesh.productId);
      if (!product) return null;

      const enrichedProduct = {
        ...product,
        modelId: mesh.name,
        position: mesh.position,
        rotation: mesh.rotation,
        scale: mesh.scale,
        color: mesh.color,
      };

      return {
        ...mesh,
        productData: enrichedProduct,
      };
    });

    const models = matchedModels
      .filter((model) => model.productData)
      .map((model) => model.productData);

    models.forEach((product) => {
      setProduct(product);
    });
  };

  return (
    <Box
      width={{ base: '100%', md: '25%' }}
      height={'100%'}
      overflowY={'auto'}
      overflowX={'hidden'}
    >
      {/* TODO:Add better validations  */}
      <form
        style={{
          width: '100%',
        }}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const values = Object.fromEntries(formData.entries());

          if (!values.selectedRoom) {
            alert('Please select a room.');
            return;
          }
          const selected = rooms.items.find((room) => room.value === values.selectedRoom);
          if (!selected) {
            alert('Invalid room selection.');
            return;
          }
          const missingDimensions = selected.dimensions.filter((dim) => !values[dim.value]);

          if (missingDimensions.length > 0) {
            alert(`Please fill in: ${missingDimensions.map((d) => d.name).join(', ')}`);
            return;
          }

          console.log(values);
          setRoom(values);
        }}
      >
        <Fieldset.Root size='lg' width={'100%'}>
          <Stack>
            <Fieldset.Legend>Room Creator</Fieldset.Legend>
            <Fieldset.HelperText>Create Your Preferred Room</Fieldset.HelperText>
          </Stack>

          <Select.Root
            collection={rooms}
            size='sm'
            width='320px'
            name={'selectedRoom'}
            onChange={(e) =>
              setSelectedRoom(rooms.items.filter((room) => room.value == e.target.value)[0])
            }
          >
            <Select.HiddenSelect />
            <Select.Label>Select Room</Select.Label>
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder='Select Room' />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {rooms.items.map((room) => (
                    <Select.Item item={room} key={room.value}>
                      {room.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>

          {selectedRoom && (
            <Fieldset.Content>
              {selectedRoom.dimensions.map((dim) => (
                <Field.Root key={dim.value}>
                  <Field.Label>{dim.name}</Field.Label>
                  <Input name={dim.value} width={'100%'} placeholder={dim.name} />
                </Field.Root>
              ))}
            </Fieldset.Content>
          )}

          <Button type='submit' alignSelf='flex-start'>
            Generate
          </Button>
        </Fieldset.Root>
      </form>

      <Box marginY={'1rem'}>
        <Text fontWeight={'medium'}>Saved Layouts</Text>
        <br />
        <VStack alignItems={'start'}>
          {savedLayouts.map((layout, key) => (
            <HStack key={key} width={'100%'} justifyContent={'space-between'}>
              <Button
                variant={'solid'}
                bg='#8b6d5c'
                color='white'
                _hover={{ bg: '' }}
                onClick={() => {
                  clearProducts();
                  clearCoordinates();
                  setTimeout(() => {
                    handleSubmit(layout.design);
                  }, 0);
                }}
              >
                View
              </Button>
              <span> {layout.designName}</span>
              <Button
                size='xs'
                bg='red.500'
                color='white'
                _hover={{ bg: 'red.600' }}
                onClick={() => handleDelete(layout.designName)}
              >
                Delete
              </Button>
            </HStack>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

export default RoomSelector;

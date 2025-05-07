import { Box, Button, Field, Fieldset, Input, Portal, Select, Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import data from '../data/data';
import rooms from '../data/rooms';
import useRoom from '../store/useRoom';
import useProduct from '../store/useProduct';
import useCoordinatesStore from '../store/useCoordinatesStore';

const RoomSelector = () => {
  const [selectedRoom, setSelectedRoom] = useState();
  const { setRoom } = useRoom();
  const { products, setProduct } = useProduct();
  const { coordinates, setCoordinates } = useCoordinatesStore();

  useEffect(() => {
    console.log(coordinates);
  }, [coordinates]);

  const savedLayouts = JSON.parse(localStorage.getItem('savedLayouts') || '[]');

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

    console.log(matchedModels);

    const models = matchedModels
      .filter((model) => model.productData)
      .map((model) => model.productData);

    models.forEach((product) => {
      setProduct(product);
    });

    matchedModels.map((model) => {
      setCoordinates(model);
    });
  };

  return (
    <Box width={{ base: '100%', md: 'auto' }}>
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
        <Fieldset.Root size='lg'>
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
                  <Input name={dim.value} width='10rem' placeholder={dim.name} />
                </Field.Root>
              ))}
            </Fieldset.Content>
          )}

          <Button type='submit' alignSelf='flex-start'>
            Generate
          </Button>
        </Fieldset.Root>
      </form>

      {savedLayouts.map((layout, key) => (
        <Text
          key={key}
          onClick={() => {
            handleSubmit(layout.design);
          }}
        >
          {layout.designName}
        </Text>
      ))}
    </Box>
  );
};

export default RoomSelector;

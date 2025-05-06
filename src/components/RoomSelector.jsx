import { Box, Button, Field, Fieldset, Input, Portal, Select, Stack } from '@chakra-ui/react';
import React, { useState } from 'react';
import rooms from '../data/rooms';
import useRoom from '../store/useRoom';

const RoomSelector = () => {
  const [selectedRoom, setSelectedRoom] = useState();
  const { setRoom } = useRoom();

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
    </Box>
  );
};

export default RoomSelector;

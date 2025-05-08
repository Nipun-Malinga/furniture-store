import { Box, Slider, VStack, RadioGroup, RatingGroup, HStack, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import useCoordinatesStore from '../store/useCoordinatesStore';
import useColorStore from '../store/useColorStore';
import useProduct from '../store/useProduct';

const colors = ['#F56565', '#48BB78', '#4299E1', '#9F7AEA'];

/*TODO: Tune Calculations */
const RoomController = (props) => {
  const { color } = useColorStore();
  const { setCoordinates } = useCoordinatesStore();
  const { products, removeProduct } = useProduct();

  const product = props.product;

  const [localCoordinates, setLocalCoordinates] = useState({
    modelId: product?.modelId ?? '',
    productId: product?.productId ?? '',
    categoryId: product?.categoryId ?? '',
    X: product?.position?.x ?? 0,
    Y: product?.position?.y ?? -2,
    Z: product?.position?.z ?? 0,
    rotation: product?.rotation ?? 0,
    scale: product?.scale ?? 1,
    color: product?.color ?? null,
  });

  const handleChange = (key, value) => {
    const updated = {
      ...localCoordinates,
      [key]: value,
    };
    setLocalCoordinates(updated);
    setCoordinates(updated); // Sync to global store
  };

  useEffect(() => {
    console.log(`Product ID: ${product.productId}`);
    console.log(products);
  }, [products]);

  return (
    <VStack>
      <Button
        bg='red.500'
        color='white'
        _hover={{ bg: 'red.600' }}
        onClick={() => {
          removeProduct(product.modelId);
        }}
      >
        Delete
      </Button>

      {/* POSITION: X */}
      <span style={{ fontWeight: 'bold' }}>{product.name}</span>
      <Slider.Root
        width='200px'
        min={-20}
        max={20}
        defaultValue={[product?.position?.x ? product.position.x * 5 : 0]}
        onValueChange={(val) => handleChange('X', val.value[0] * 0.2)}
      >
        <span>Left-Right</span>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumbs />
        </Slider.Control>
      </Slider.Root>

      {/* POSITION: Y */}
      <Slider.Root
        width='200px'
        min={-100}
        max={100}
        defaultValue={[product?.position?.y ? product.position.y * 5 : -2]}
        onValueChange={(val) => handleChange('Y', val.value[0] * 0.05)}
      >
        <span>Up-Down</span>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumbs />
        </Slider.Control>
      </Slider.Root>

      {/* POSITION: Z */}
      <Slider.Root
        width='200px'
        min={-20}
        max={20}
        defaultValue={[product?.position?.z ? product.position.z * 5 : 0]}
        onValueChange={(val) => handleChange('Z', val.value[0] * 0.2)}
      >
        <span>Forward-Backward</span>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumbs />
        </Slider.Control>
      </Slider.Root>

      {/* ROTATION: Y Axis */}
      <Slider.Root
        width='200px'
        min={-20}
        max={20}
        defaultValue={[product?.rotation ? product.rotation * 5 : 0]}
        onValueChange={(val) => handleChange('rotation', val.value[0] * 0.2)}
      >
        <span>Rotation</span>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumbs />
        </Slider.Control>
      </Slider.Root>

      {/* SCALE: X, Y, X */}
      <Slider.Root
        width='200px'
        min={0.1}
        max={10}
        defaultValue={[product?.scale ? product.scale * 10 : 10]}
        onValueChange={(val) => handleChange('scale', val.value[0] * 0.1)}
      >
        <span>Size</span>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumbs />
        </Slider.Control>
      </Slider.Root>

      <RadioGroup.Root
        defaultValue={color}
        onValueChange={(value) => {
          handleChange('color', value.value);
        }}
      >
        <HStack gap='6'>
          {product.colors
            ? product.colors.map((color, key) => (
                <RadioGroup.Item key={key} value={color}>
                  <RadioGroup.ItemHiddenInput />
                  <RadioGroup.ItemIndicator background={color} />
                </RadioGroup.Item>
              ))
            : colors.map((color, key) => (
                <RadioGroup.Item key={key} value={color}>
                  <RadioGroup.ItemHiddenInput />
                  <RadioGroup.ItemIndicator background={color} />
                </RadioGroup.Item>
              ))}
        </HStack>
      </RadioGroup.Root>
    </VStack>
  );
};

export default RoomController;

import {
  Breadcrumb,
  Heading,
  HStack,
  RadioGroup,
  RatingGroup,
  Span,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import useColorStore from '../store/useColorStore';

const colors = ['#F56565', '#48BB78', '#4299E1', '#9F7AEA'];

const InfoCard = (props) => {
  const [liked, setLiked] = useState(false);
  const { color, setColor } = useColorStore();

  const selectedColor = props.colors ? props.colors[0] : colors[0];
  useEffect(() => {
    setColor(selectedColor);
  }, [props.colors]);

  return (
    <VStack
      width={{ md: '100%' }}
      height={'100%'}
      justifyContent={'center'}
      rowGap={'2rem'}
      alignItems={'start'}
      padding={'0.5rem'}
    >
      <Breadcrumb.Root>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href='#'>{props.category ?? 'Demo Category'}</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.Link href='#' fontWeight={'bold'}>
              {props.productName ?? 'Demo Model'}
            </Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>

      <VStack gap={{ md: '1rem' }} width={'100%'} height={'100%'} alignItems={'start'}>
        <Heading fontWeight='bold' fontSize={{ base: '1.5rem', md: '2.5rem' }}>
          {props.productName ?? 'Demo Model'}
        </Heading>
        <HStack width={'100%'} justifyContent={'space-between'}>
          <Text fontWeight={'medium'} fontSize={{ base: '1rem', md: '1.5rem' }}>
            ${props.price ?? '0.00'}
          </Text>
          <HStack>
            <RatingGroup.Root count={5} defaultValue={props.rating ?? 0} size='sm'>
              <RatingGroup.HiddenInput />
              <RatingGroup.Control />
            </RatingGroup.Root>
            <Text fontSize={{ base: '0.75rem', md: '1rem' }}>
              {props.rating ?? 0} / 5.0 <Span color={'#A2A3B1'}>({props.ratingCount ?? 0})</Span>
            </Text>
          </HStack>
        </HStack>
        <Text width={{ base: '35ch', md: '45ch' }}>{props.description ?? 'No Description'}</Text>
      </VStack>

      <RadioGroup.Root
        defaultValue={color}
        onValueChange={(value) => {
          console.log(value.value);
          setColor(value.value);
        }}
      >
        <HStack gap='6'>
          {props.colors
            ? props.colors.map((color, key) => (
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
      {/* <Button background={'#3AA39F'}>Download</Button> */}

      {/*TODO: Implement Save Changes */}
      {/* <HStack color={'#3AA39F'} fontWeight={'medium'}>
        <FaHeart
          size={20}
          onClick={() => setLiked(!liked)}
          style={{
            cursor: 'pointer',
            color: liked ? '#3AA39F' : 'transparent',
            stroke: '#3AA39F',
            strokeWidth: 40,
          }}
        />
        Save Changes
      </HStack> */}
    </VStack>
  );
};

export default InfoCard;

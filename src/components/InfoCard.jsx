import React, { useState } from 'react';
import {
  Breadcrumb,
  VStack,
  Heading,
  Text,
  HStack,
  RatingGroup,
  Span,
  RadioGroup,
  Button,
} from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';
import useColorStore from '../store/useColorStore';

const colors = [
  { color: 'red.500' },
  { color: 'green.500' },
  { color: 'blue.500' },
  { color: 'purple.500' },
];

const InfoCard = (props) => {
  const [liked, setLiked] = useState(false);
  const { color, setColor } = useColorStore();

  console.log(color);

  return (
    <VStack width={{ md: '100%' }} justifyContent={'center'} rowGap={'2rem'} alignItems={'start'}>
      {/*TODO:Add Category Name And Model Name From the Data*/}
      <Breadcrumb.Root>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href='#'>Demo Category</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.Link href='#' fontWeight={'bold'}>
              Demo Model
            </Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>

      <VStack gap={{ md: '1rem' }} width={'100%'} height={'100%'} alignItems={'start'}>
        <Heading fontWeight='bold' fontSize={{ base: '1.5rem', md: '2.5rem' }}>
          {props.name ?? 'Demo Model'}
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
      </VStack>
      <Text width={{ base: '35ch', md: '45ch' }}>{props.description ?? 'No Description'}</Text>
      <RadioGroup.Root
        defaultValue='red.500'
        onValueChange={(value) => {
          setColor(value);
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
            : colors.map((item, key) => (
                <RadioGroup.Item key={key} value={item.color}>
                  <RadioGroup.ItemHiddenInput />
                  <RadioGroup.ItemIndicator background={item.color} />
                </RadioGroup.Item>
              ))}
        </HStack>
      </RadioGroup.Root>
      <Button background={'#3AA39F'}>Download</Button>

      <HStack color={'#3AA39F'} fontWeight={'medium'}>
        <FaHeart
          size={20}
          onClick={() => setLiked(!liked)}
          style={{
            cursor: 'pointer',
            color: liked || 'transparent',
            stroke: '#3AA39F',
            strokeWidth: 40,
          }}
        />
        Save Changes
      </HStack>
    </VStack>
  );
};

export default InfoCard;

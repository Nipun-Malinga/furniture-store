import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Input,
  Text,
  Heading,
  VStack,
} from '@chakra-ui/react';

import { FormControl, FormLabel } from '@chakra-ui/form-control';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    const defaultEmail = 'admin@example.com';
    const defaultPassword = 'admin123';

    if (email === defaultEmail && password === defaultPassword) {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-br, teal.800, gray.900)"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        bg="whiteAlpha.100"
        p={8}
        rounded="lg"
        shadow="2xl"
        w="full"
        maxW="md"
        border="1px solid"
        borderColor="whiteAlpha.300"
        color="white"
      >
        <Heading mb={6} textAlign="center" fontWeight="bold" color="cyan.200">
          Login
        </Heading>
        {error && (
          <Text color="red.300" mb={3} textAlign="center">
            {error}
          </Text>
        )}
        <form onSubmit={handleLogin}>
          <VStack spacing={5}>
            <FormControl isRequired>
              <FormLabel color="whiteAlpha.800">Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                bg="whiteAlpha.200"
                _placeholder={{ color: 'gray.300' }}
                _hover={{ bg: 'whiteAlpha.300' }}
                _focus={{ borderColor: 'cyan.300' }}
                color="white"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel color="whiteAlpha.800">Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                bg="whiteAlpha.200"
                _placeholder={{ color: 'gray.300' }}
                _hover={{ bg: 'whiteAlpha.300' }}
                _focus={{ borderColor: 'cyan.300' }}
                color="white"
              />
            </FormControl>
            <Button type="submit" colorScheme="cyan" width="full">
              Login
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default LoginPage;
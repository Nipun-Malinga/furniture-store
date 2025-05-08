import { Button, Flex } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    navigate('/');
  };
  return (
    <Flex
      as='nav'
      position='fixed'
      top='0'
      left='0'
      right='0'
      zIndex='1000'
      bg='blue.600'
      color='white'
      padding='4'
      align='center'
      justify='space-between'
      boxShadow='md'
      height='64px'
    >
      <Flex gap='4'>
        <Link to='/dashboard'>
          <Button variant='ghost' color='white'>
            Dashboard
          </Button>
        </Link>
        <Link to='/room'>
          <Button variant='ghost' color='white'>
            Room Builder
          </Button>
        </Link>
      </Flex>

      <Link to='/'>
        <Button onClick={handleLogout}>Logout</Button>
      </Link>
    </Flex>
  );
};

export default NavBar;

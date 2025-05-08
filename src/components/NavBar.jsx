import { Box, Flex, Button } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { ColorModeButton } from './ui/color-mode';
import { useColorMode } from "../components/ui/color-mode";
const NavBar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.setItem('isLoggedIn', 'false');
        navigate('/');
      };
      const { colorMode } = useColorMode();
      const navBg = colorMode === 'dark' ? '#1a202c' : '#f4f1eb';
  return (
    <Flex
      as="nav"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="1000"
      bg={navBg}
      backdropFilter="blur(10px)" 
      
      padding="4"
      align="center"
      justify="space-between"
      boxShadow="md"
      height="64px"
    >
      <Flex gap="4">
        <Link to="/dashboard">
          <Button variant="ghost" color="#8b6d5c">
            Dashboard
          </Button>
        </Link>
        <Link to="/room">
          <Button variant="ghost" color="#8b6d5c">
            Room Builder
          </Button>
        </Link>
        <ColorModeButton />
      </Flex>
      
      <Link to="/">
        <Button  onClick={handleLogout} color="#8b6d5c" variant="ghost">Logout</Button>
      </Link>
    </Flex>
  );
};

export default NavBar;

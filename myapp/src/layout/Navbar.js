import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Link,
    useColorModeValue,
    Image,
    useDisclosure,
} from '@chakra-ui/react';
import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon
} from '@chakra-ui/icons';

import { Link as lee } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CartPreview from '../components/cart/CartPreview';
import { logoutUser } from '../actions/auth';

export default function Navbar() {
    const { isOpen, onToggle } = useDisclosure();
    const { token, user } = useSelector(state => state.authReducer);
    
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logoutUser())
    }

    return (
        <Box>
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}>
                <Flex
                    flex={{ base: 1, md: 'auto' }}
                    ml={{ base: -2 }}
                    display={{ base: 'flex', md: 'none' }}>
                    <IconButton
                        onClick={onToggle}
                        icon={
                            isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
                        }
                        variant={'ghost'}
                    />
                </Flex>
                <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
                    <Link to='/' as={lee} ><Image hr borderRadius="full" boxSize="50px" src='https://www.svgrepo.com/show/174895/orkut-logo.svg' /></Link>
                    <Flex align={'center'} display={{ base: 'none', md: 'flex' }} ml={10}>
                        <DesktopNav NAV_ITEMS={getNavItems(user)}/>
                    </Flex>
                </Flex>

                {token && user ? (
                    <>
                        <CartPreview />
                        <Button
                            as={lee}
                            fontSize={'md'}
                            fontWeight={600}
                            color={'white'}
                            bg={'red.400'}
                            onClick={handleLogout}
                            to={'/'}
                            _hover={{
                                bg: 'red.300',
                            }}>
                            Logout
                        </Button> </> ) : ( <Stack
                            flex={{ base: 1, md: 0 }}
                            justify={'flex-end'}
                            direction={'row'}
                            spacing={6}>
                        <Button
                            as={lee}
                            display={{ base: 'none', md: 'inline-flex' }}
                            fontSize={'md'}
                            fontWeight={400}
                            variant={'link'}
                            to={'/login'}>
                            Sign In
                        </Button>
                        <Button
                            as={lee}
                            fontSize={'md'}
                            fontWeight={600}
                            color={'white'}
                            bg={'blue.400'}
                            to={'/signup'}
                            _hover={{
                                bg: 'blue.300',
                            }}>
                            Sign Up
                        </Button>
                    </Stack> )}
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav NAV_ITEMS={getNavItems(user)}/>
            </Collapse>
        </Box>
    );
}

const DesktopNav = ({ NAV_ITEMS }) => {
    return (
        <Stack direction={'row'} spacing={4}>
            {(NAV_ITEMS || []).map((navItem) => (
                <Box key={navItem.label}>
                    <Link
                        as={lee}
                        to={navItem.to}
                        transition={'all .3s ease'}
                        _groupHover={{ color: 'pink.400' }}
                        fontWeight={400}>
                        {navItem.label}
                    </Link>
                </Box>
            )
            )}
        </Stack>
    );
};


const MobileNav = ({ NAV_ITEMS }) => {
    return (
        <Stack
            bg={useColorModeValue('white', 'gray.800')}
            p={4}
            display={{ md: 'none' }}>
            {(NAV_ITEMS || []).map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    );
};

const MobileNavItem = ({ label, children, href }) => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Flex
                py={2}
                as={Link}
                href={href ?? '#'}
                justify={'space-between'}
                align={'center'}
                _hover={{
                    textDecoration: 'none',
                }}>
                <Text
                    fontWeight={600}
                    color={useColorModeValue('gray.600', 'gray.200')}>
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(180deg)' : ''}
                        w={6}
                        h={6}
                    />
                )}
            </Flex>

            <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    align={'start'}>
                    {children &&
                        children.map((child) => (
                            <Link as={lee} key={child.label} py={2} to={child.to}>
                                {child.label}
                            </Link>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    );
};


const getNavItems = (user) => {
  const items = [
    { label: 'Shop', to: '/shop' },
    { label: 'Shop for iPhone', to: '/shop?q=iphone' },
    { label: 'Shop for Watch', to: '/shop?q=watch' },
  ];

  if (user?.role === 'admin') {
    items.push({ label: 'Admin', to: '/admin' });
  }

  return items;
};

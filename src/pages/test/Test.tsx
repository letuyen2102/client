import {
    Avatar,
    Box,
    Flex,
    Icon,
    Text,
    Stack,
    Image,
    Button,
    Heading,
    BoxProps,
    Drawer,
    DrawerContent,
    IconButton,
    useDisclosure,
    DrawerOverlay,
    useColorModeValue
} from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { FaBell } from 'react-icons/fa';
import { AiOutlineTeam, AiOutlineHome } from 'react-icons/ai';
import { BsFolder2, BsCalendarCheck, BsFillChatRightDotsFill } from 'react-icons/bs';
import { FiMenu } from 'react-icons/fi';
import { RiFlashlightFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const Test: React.FC<{ children: React.ReactNode }> = (props) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const handleLoginAndCart = useSelector((state: RootState) => state.auth)

    return (
        <Box as="section" bg={useColorModeValue('gray.50', 'gray.700')} minH="100vh">
            <SidebarContent display={{ base: 'none', md: 'unset' }} />
            <Drawer isOpen={isOpen} onClose={onClose} placement="left">
                <DrawerOverlay />
                <DrawerContent>
                    <SidebarContent w="full" borderRight="none" />
                </DrawerContent>
            </Drawer>
            <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
                <Flex
                    as="header"
                    align="center"
                    justify={{ base: 'space-between', md: 'flex-end' }}
                    w="full"
                    px="4"
                    borderBottomWidth="1px"
                    borderColor={useColorModeValue('inherit', 'gray.700')}
                    bg={useColorModeValue('white', 'gray.800')}
                    boxShadow="sm"
                    h="14"
                >
                    <IconButton
                        aria-label="Menu"
                        display={{ base: 'inline-flex', md: 'none' }}
                        onClick={onOpen}
                        icon={<FiMenu />}
                        size="md"
                    />

                    <Flex align="center">
                        <Icon color="gray.500" as={FaBell} cursor="pointer" />
                        <Avatar
                            ml="4"
                            size="sm"
                            name="Ahmad"
                            src={handleLoginAndCart.user.photo}
                            cursor="pointer"
                        />
                    </Flex>
                </Flex>

                {/* <Box as="main" p={14} minH="25rem" bg={useColorModeValue('auto', 'gray.800')}>
                    <Stack
                        direction={{ base: 'column', sm: 'row' }}
                        alignItems="center"
                        justifyContent="center"
                        h="100%"
                    >
                        <Stack spacing={8}>
                            <Box>
                                <Heading color="blue.400" fontSize="3xl">
                                    Point of sale
                                </Heading>
                                <Text fontSize="md" color="gray.500">
                                    Manage your inventory and sale effeciently.
                                </Text>
                            </Box>
                            <Stack direction={{ base: 'column', md: 'row' }} spacing={4} justify="center">
                                <Button
                                    rounded="full"
                                    bg="blue.400"
                                    color="white"
                                    _hover={{
                                        bg: 'blue.500'
                                    }}
                                >
                                    Stocks
                                </Button>
                                <Button rounded="full">Vendors</Button>
                            </Stack>
                        </Stack>

                        <Image
                            alt="Homepage Image"
                            objectFit="cover"
                            width="60vh"
                            src={handleLoginAndCart.user.photo}
                        />
                    </Stack>
                </Box> */}
            </Box>
        </Box>
    );
}

const SidebarContent = ({ ...props }: BoxProps) => (
    <Box
        as="nav"
        pos="fixed"
        top="0"
        left="0"
        zIndex="sticky"
        h="full"
        pb="10"
        overflowX="hidden"
        overflowY="auto"
        bg={useColorModeValue('white', 'gray.800')}
        borderColor={useColorModeValue('inherit', 'gray.700')}
        borderRightWidth="1px"
        w="60"
        {...props}
    >
        <Flex px="4" py="5" align="center">
            <Icon as={RiFlashlightFill} h={8} w={8} />
            <Text
                fontSize="2xl"
                ml="2"
                color={useColorModeValue('brand.500', 'white')}
                fontWeight="semibold"
            >
                POS
            </Text>
        </Flex>
        <Flex direction="column" as="nav" fontSize="md" color="gray.600" aria-label="Main Navigation">
            <NavItem icon={AiOutlineHome}>
                <Link to='/myway/admin'>Dashboard</Link>
            </NavItem>
            <NavItem icon={AiOutlineTeam}>
                <Link to='/myway/admin/users'>Khách hàng</Link>
            </NavItem>
            <NavItem icon={BsFolder2}>
                <Link to='/myway/admin/products'>Sản phẩm</Link>
            </NavItem>
            <NavItem icon={BsCalendarCheck}>
                <Link to='/myway/admin/orders'>Đơn hàng</Link>
            </NavItem>
            <NavItem icon={BsFillChatRightDotsFill}>
                <Link to='/myway/admin/chats'>Chat</Link>
            </NavItem>
        </Flex>
    </Box>
);

const NavItem = (props: any) => {
    const color = useColorModeValue('gray.600', 'gray.300');

    const { icon, children } = props;
    return (
        <Flex
            align="center"
            px="4"
            py="3"
            cursor="pointer"
            role="group"
            fontWeight="semibold"
            transition=".15s ease"
            color={useColorModeValue('inherit', 'gray.400')}
            _hover={{
                bg: useColorModeValue('gray.100', 'gray.900'),
                color: useColorModeValue('gray.900', 'gray.200')
            }}
        >
            {icon && (
                <Icon
                    mx="2"
                    boxSize="4"
                    _groupHover={{
                        color: color
                    }}
                    as={icon}
                />
            )}
            {children}
        </Flex>
    );
};

export default Test
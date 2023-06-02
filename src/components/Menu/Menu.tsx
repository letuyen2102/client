import React from 'react';
import {
    Flex,
    Text,
    Link,
    Avatar,
    VStack,
    Menu,
    MenuDivider,
    MenuButton,
    MenuList,
    MenuItem,
    useColorModeValue
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { logout } from '../../slices/authSlice';

const MenuContainer = () => {
    return (
        <Flex
            // w="full"
            // h="350px"
            justifyContent={{ base: 'flex-start', sm: 'center' }}
            alignItems="flex-start"
        // p={{ base: 5, sm: 10 }}
        >
            <DropDownMenu />
        </Flex>
    );
};

// Ideally, only the DropDownMenu component should be used. The MenuContainer component is used to style the preview.
const DropDownMenu = () => {
    const handleLoginAndCart = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            const res = await axios.get('/myway/api/users/logout')
            console.log(res)
            if (res.data.status === "success") {
                dispatch(logout())
                navigate('/admin/login')
            }
        }
        catch (err: any) {
            alert(err.response.data)
        }
    }
    return (
        <Menu isLazy>
            <MenuButton>
                <Avatar
                    size="sm"
                    rounded="full"
                    src={handleLoginAndCart.user.photo}
                />
            </MenuButton>
            <MenuList
                zIndex={5}
                border="2px solid"
                borderColor={useColorModeValue('gray.700', 'gray.100')}
                boxShadow="4px 4px 0"
            >
                <Link href="https://dev.to/m_ahmad" _hover={{ textDecoration: 'none' }} isExternal>
                    <MenuItem>
                        <VStack justify="start" alignItems="left">
                            <Text fontWeight="500">{handleLoginAndCart.user.name}</Text>
                            <Text size="sm" color="gray.500" mt="0 !important">
                                @{handleLoginAndCart.user.name}
                            </Text>
                        </VStack>
                    </MenuItem>
                </Link>
                <MenuDivider />
                <MenuItem>
                    <Text fontWeight="500">
                        <Link href='/myway/admin'>Dashboard</Link>
                    </Text>
                </MenuItem>
                <MenuDivider />
                <MenuItem>
                    <Text fontWeight="500" onClick={event => {
                        // event.stopPropagation()
                        handleLogout()
                    }}>Sign Out</Text>
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

export default MenuContainer;
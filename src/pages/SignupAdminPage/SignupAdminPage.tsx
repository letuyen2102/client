// Chakra imports
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    HStack,
    Icon,
    Input,
    Switch,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
interface Account {
    name: string,
    email: string,
    phone: string,
    address: string,
    password: string,
    passwordConfirm: string
}
function SignupAdminPage() {
    const titleColor = useColorModeValue("teal.300", "teal.200");
    const textColor = useColorModeValue("gray.700", "white");
    const bgColor = useColorModeValue("white", "gray.700");
    const bgIcons = useColorModeValue("teal.200", "rgba(255, 255, 255, 0.5)");
    const navigate = useNavigate()
    const [accountSignup, setAccountSignup] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        passwordConfirm: ''
    })
    const handleSignup = async (objSignup: Account) => {
        try {
            const res = await axios({
                method: 'POST',
                url: '/myway/api/users/signupAdmin',
                data: objSignup
            })

            if (res.data.status === 'success') {
                navigate('/admin/login')
            }
        }
        catch (err: any) {
            alert(err.response.data.message)
            console.log(err)
        }
    }
    return (
        <Flex
            direction='column'
            alignSelf='center'
            justifySelf='center'
            overflow='hidden'>
            <Box
                position='absolute'
                minH={{ base: "70vh", md: "50vh" }}
                w={{ md: "calc(100vw - 50px)" }}
                borderRadius={{ md: "15px" }}
                left='0'
                right='0'
                bgRepeat='no-repeat'
                overflow='hidden'
                zIndex='-1'
                top='0'
                bgImage={'https://github.com/Tuyenleuit212/purity-ui-dashboard/blob/main/src/assets/img/BgSignUp.png?raw=true'}
                bgSize='cover'
                mx={{ md: "auto" }}
                mt={{ md: "14px" }}></Box>
            <Flex
                direction='column'
                textAlign='center'
                justifyContent='center'
                align='center'
                mt='6.5rem'
                mb='30px'>
                <Text fontSize='4xl' color='white' fontWeight='bold'>
                    Welcome!
                </Text>
                <Text
                    fontSize='md'
                    color='white'
                    fontWeight='normal'
                    mt='10px'
                    mb='26px'
                    w={{ base: "90%", sm: "60%", lg: "40%", xl: "30%" }}>
                    Use these awesome forms to login or create new account in your project
                    for free.
                </Text>
            </Flex>
            <Flex alignItems='center' justifyContent='center' mb='60px' mt='20px'>
                <Flex
                    direction='column'
                    w='445px'
                    background='transparent'
                    borderRadius='15px'
                    p='40px'
                    mx={{ base: "100px" }}
                    bg={bgColor}
                    boxShadow='0 20px 27px 0 rgb(0 0 0 / 5%)'>
                    <Text
                        fontSize='xl'
                        color={textColor}
                        fontWeight='bold'
                        textAlign='center'
                        mb='22px'>
                        Register With
                    </Text>
                    <FormControl>
                        <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                            Tên
                        </FormLabel>
                        <Input
                            fontSize='sm'
                            ms='4px'
                            borderRadius='15px'
                            type='text'
                            placeholder='Nhập tên của bạn'
                            mb='24px'
                            size='lg'
                            required
                            value={accountSignup.name}
                            onChange={event => {
                                setAccountSignup({ ...accountSignup, name: event.target.value })
                            }}
                        />
                        <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                            Email
                        </FormLabel>
                        <Input
                            fontSize='sm'
                            ms='4px'
                            borderRadius='15px'
                            type='email'
                            placeholder='Your email address'
                            mb='24px'
                            size='lg'
                            required
                            value={accountSignup.email}
                            onChange={event => {
                                setAccountSignup({ ...accountSignup, email: event.target.value })
                            }}

                        />
                        <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                            SDT
                        </FormLabel>
                        <Input
                            fontSize='sm'
                            ms='4px'
                            borderRadius='15px'
                            type='text'
                            placeholder='Your phone'
                            mb='24px'
                            size='lg'
                            required
                            value={accountSignup.phone}
                            onChange={event => {
                                setAccountSignup({ ...accountSignup, phone: event.target.value })
                            }}

                        />
                        <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                            Địa chỉ
                        </FormLabel>
                        <Input
                            fontSize='sm'
                            ms='4px'
                            borderRadius='15px'
                            type='text'
                            placeholder='Địa chỉ của bạn'
                            mb='24px'
                            size='lg'
                            required
                            value={accountSignup.address}
                            onChange={event => {
                                setAccountSignup({ ...accountSignup, address: event.target.value })
                            }}

                        />
                        <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                            Mật khẩu
                        </FormLabel>
                        <Input
                            fontSize='sm'
                            ms='4px'
                            borderRadius='15px'
                            type='password'
                            placeholder='Nhập mật khẩu'
                            mb='24px'
                            size='lg'
                            required
                            value={accountSignup.password}
                            onChange={event => {
                                setAccountSignup({ ...accountSignup, password: event.target.value })
                            }}
                        />
                        <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                            Nhập lại mật khẩu
                        </FormLabel>
                        <Input
                            fontSize='sm'
                            ms='4px'
                            borderRadius='15px'
                            type='password'
                            placeholder='Nhập lại mật khẩu'
                            mb='24px'
                            size='lg'
                            required
                            value={accountSignup.passwordConfirm}
                            onChange={event => {
                                setAccountSignup({ ...accountSignup, passwordConfirm: event.target.value })
                            }}

                        />
                        <FormControl display='flex' alignItems='center' mb='24px'>
                            <Switch id='remember-login' colorScheme='teal' me='10px' />
                            <FormLabel htmlFor='remember-login' mb='0' fontWeight='normal'>
                                Remember me
                            </FormLabel>
                        </FormControl>
                        <Button
                            type='submit'
                            bg='teal.300'
                            fontSize='10px'
                            color='white'
                            fontWeight='bold'
                            w='100%'
                            h='45'
                            mb='24px'
                            _hover={{
                                bg: "teal.200",
                            }}
                            _active={{
                                bg: "teal.400",
                            }}
                            onClick={event => {
                                handleSignup(accountSignup)
                            }}
                        >
                            SIGN UP
                        </Button>
                    </FormControl>
                    <Flex
                        flexDirection='column'
                        justifyContent='center'
                        alignItems='center'
                        maxW='100%'
                        mt='0px'>
                        <Text color={textColor} fontWeight='medium'>
                            Already have an account?
                            <Link to="/admin/login" style={{ color: '#4FD1C5', fontWeight: '600' }}>
                                Sign In
                            </Link>
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}

export default SignupAdminPage;
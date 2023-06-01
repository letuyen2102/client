import { useState } from 'react';
import {
    Container,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    useColorModeValue,
    VStack,
    Center,
    InputGroup,
    InputRightElement,
    Checkbox,
    Link
} from '@chakra-ui/react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { handleNotify } from '../../slices/notifySlice';
interface CHANGE_ACCOUNT {
    password: string,
    passwordConfirm: string
}
const Reset = () => {
    const { resetToken } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [objReset, setObjReset] = useState<CHANGE_ACCOUNT>({
        password: '',
        passwordConfirm: ""
    })
    const handleClickPassword = () => setShowPassword(!showPassword);
    const handleClickPasswordConfirm = () => setShowPasswordConfirm(!showPasswordConfirm);
    const handleResetPassword = async (changeAccount: CHANGE_ACCOUNT) => {
        try {
            if (objReset.password.trim().length < 8 || objReset.passwordConfirm.trim().length < 8) {
                dispatch(handleNotify({ message: "Mật khẩu có độ dài ít nhất là 8", show: true, status: 400 }))
                setTimeout(() => {
                    dispatch(handleNotify({ message: "", show: false, status: 0 }))
                }, 2000)

                return
            }
            const res = await axios.patch(`/myway/api/users/resetPassword/${resetToken}`, changeAccount)
            if (res.data.status === "success") {
                setTimeout(() => {
                    navigate('/account/login')
                }, 1000)
            }
        }
        catch (err: any) {
            dispatch(handleNotify({ message: err.response.data.message, show: true, status: 400 }))
            setTimeout(() => {
                dispatch(handleNotify({ message: "", show: false, status: 0 }))
            }, 2000)
        }
    }

    return (
        <>
            <Header />
            <Container maxW="7xl" p={{ base: 5, md: 10 }}>
                <Center>
                    <Stack spacing={4}>
                        <Stack align="center">
                            <Heading fontSize="2xl">Đặt lại mật khẩu</Heading>
                        </Stack>
                        <VStack
                            as="form"
                            boxSize={{ base: 'xs', sm: 'sm', md: 'md' }}
                            h="max-content !important"
                            bg={useColorModeValue('white', 'gray.700')}
                            rounded="lg"
                            boxShadow="lg"
                            p={{ base: 5, sm: 10 }}
                            spacing={8}
                        >
                            <VStack spacing={4} w="100%">
                                <FormControl id="password">
                                    <FormLabel>Nhập mật khẩu</FormLabel>
                                    <InputGroup size="md">
                                        <Input rounded="md"
                                            type={showPassword ? 'text' : 'password'}
                                            value={objReset.password}
                                            onChange={event => setObjReset({ ...objReset, password: event.target.value })}
                                            minLength={8}
                                            required
                                        />
                                        <InputRightElement width="4.5rem">
                                            <Button
                                                h="1.75rem"
                                                size="sm"
                                                rounded="md"
                                                bg={useColorModeValue('gray.300', 'gray.700')}
                                                _hover={{
                                                    bg: useColorModeValue('gray.400', 'gray.800')
                                                }}
                                                onClick={handleClickPassword}
                                            >
                                                {showPassword ? 'Hide' : 'Show'}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>
                                <FormControl id="passwordConfirm">
                                    <FormLabel>Nhập lại mật khẩu</FormLabel>
                                    <InputGroup size="md">
                                        <Input rounded="md"
                                            type={showPasswordConfirm ? 'text' : 'password'}
                                            value={objReset.passwordConfirm}
                                            onChange={event => setObjReset({ ...objReset, passwordConfirm: event.target.value })}
                                            minLength={8}
                                            required
                                        />
                                        <InputRightElement width="4.5rem">
                                            <Button
                                                h="1.75rem"
                                                size="sm"
                                                rounded="md"
                                                bg={useColorModeValue('gray.300', 'gray.700')}
                                                _hover={{
                                                    bg: useColorModeValue('gray.400', 'gray.800')
                                                }}
                                                onClick={handleClickPasswordConfirm}
                                            >
                                                {showPasswordConfirm ? 'Hide' : 'Show'}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>
                            </VStack>
                            <VStack w="100%">
                                <Button
                                    bg="green.300"
                                    color="white"
                                    _hover={{
                                        bg: 'green.500'
                                    }}
                                    rounded="md"
                                    w="100%"
                                    onClick={() => handleResetPassword(objReset)}
                                >
                                    Hoàn tất
                                </Button>
                            </VStack>
                        </VStack>
                    </Stack>
                </Center>
            </Container>
            <Footer />
        </>
    );
};

export default Reset;
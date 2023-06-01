import { Box, Button, Flex, FormControl, FormLabel, Input, useDisclosure } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/spinner';
import { ModalOverlay, ModalContent, Modal, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/modal';
import React from 'react';

function Loader() {
    return (
        <Box position="relative">
            <Box
                position="fixed"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                zIndex="9999"
            >
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                />
            </Box>
            <Box
                bg="rgba(0, 0, 0, 0.1)"
                position="fixed"
                top="0"
                left="0"
                width="100vw"
                height="100vh"
                zIndex="9998"
            />
        </Box>
    );
}


export default Loader
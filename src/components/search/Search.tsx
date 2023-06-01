import { Button, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, chakra, useDisclosure } from "@chakra-ui/react"

export default function Search() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button onClick={onOpen}>Open Modal</Button>

            <Modal isOpen={true} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Tìm kiếm sản phẩm</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input placeholder='Search ...' />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
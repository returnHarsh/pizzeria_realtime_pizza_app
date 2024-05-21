import { Flex, Input } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { CiImageOn } from "react-icons/ci";
import { IoIosCloseCircle } from "react-icons/io";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Image,
    Text,
} from '@chakra-ui/react'
import { useDisclosure } from "@chakra-ui/react";
import colors from '../../colors';
import axios from 'axios';

function AddMenu() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const imageRef = useRef();

    const itemNameRef = useRef();
    const itemPriceRef = useRef();

    const [imageUrl, setImageUrl] = useState("");

    const[isLoading , setIsLoading] = useState(false);

    const fileClickHandler = async () => {
        imageRef.current.click();
    }

    const fileChangeHandler = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const result = reader.result;
            setImageUrl(result);
            console.log(result);
        }

        reader.readAsDataURL(file);
    }

    const imageCutHandler = async()=>{
        setImageUrl("");
    }

    const menuUploadHandler = async () => {
        const itemName = itemNameRef.current.value;
        const itemPrice = itemPriceRef.current.value;

        setIsLoading(true);

        const res = await axios({
            method: "post",
            url: "/api/upload/item",
            data: { name : itemName, price : itemPrice, image : imageUrl },
        })

        const data = res.data;
        if(data.error){
            console.log(data.error);
            return;
        }
        setIsLoading(false);
        setImageUrl("");
        onClose();
    }

    return (
        <Flex>
            <Button fontWeight={500} ml={"-10px"} fontSize={"15px"} size={{base : "sm" , lg : "md"}} _hover={{ bg: colors.primary, color: "white" }} bg={"white"} onClick={onOpen}> Add </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add item in menu</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <Flex gap={"10px"} flexDirection={"column"}>
                            <Input ref={itemNameRef} placeholder='menu item name' />
                            <Input ref={itemPriceRef} placeholder='menu item price' />
                            <Input onChange={fileChangeHandler} ref={imageRef} type='file' hidden />
                       

                       <Flex alignItems={"center"} justifyContent={"space-between"}>
                       <CiImageOn onClick={fileClickHandler} cursor={"pointer"} size={"25px"} />

                       {imageUrl && (
                                <IoIosCloseCircle onClick={imageCutHandler} cursor={"pointer"} size={"25px"} />
                            )}

                       </Flex>
                            

                            {imageUrl && (
                                    <Image src={imageUrl} />
                                   
                            )}

                          

                        </Flex>

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button isLoading={isLoading} onClick={menuUploadHandler} color={"white"} bg={colors.primary}> Add </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    )
}

export default AddMenu

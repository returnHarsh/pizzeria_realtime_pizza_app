import { Flex, Image, Select, Text, Button } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import colors from "../../colors.js"
import { AiOutlineDelete } from "react-icons/ai";
import axios from 'axios';
import { UserContext } from '../../context/UserContext.jsx';
import useShowtoast from '../../hooks/UseShowToast.js';

function Items({ item, setMenuItems, menuItems }) {

    const showToast = useShowtoast();

    const deleteMenuItemHandler = async () => {
        const res = await axios({
            url: "/api/delete/menu/item",
            method: "post",
            data: { id: item._id },
        })
        const data = res.data;
        if (data.error) {
            console.log(data.error);
            showToast("error" , data.error , "error");
            return;
        }

        const newMenuItems = menuItems.filter((menu) => {
            return item._id != menu._id;
        })
        console.log(newMenuItems);
        setMenuItems(newMenuItems);

        showToast("success" , data.success , "success");

    }

    const [size, setSize] = useState("80");

    const sizeChangeHandler = async (e) => {
        console.log(e.target.value);
        setSize(e.target.value);
    }

    const {user} = useContext(UserContext); 

    const addToCartHandler = async()=>{
        const userId = user._id;
        const res = await axios({
            method : "post",
            url : "/api/add/cart",
            data : {userId , item},
        })
        const data = res.data;
        if(data.error){
            showToast("error" , data.error , "error");
            return;
        }

        showToast("success" , data.success , "success");
    }

    return (
        <Flex shadow={"xl"} border={"1px solid"} borderColor={"gray.400"}  maxWidth={"400px"} padding={"10px"} gap={"10px"} borderRadius={"8px"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>

            {/* image portion */}

            <Flex alignSelf={"flex-end"}>
                <AiOutlineDelete onClick={deleteMenuItemHandler} size={"25px"} cursor={"pointer"} />
            </Flex>

            <Flex width={"100%"} justifyContent={"center"} borderColor={"gray.400"} alignItems={"center"} borderRadius={"md"}  flex={1} >
                <Image transition={"0.25s ease-in-out"} height={`${size}%`} width={"auto"} borderRadius={"10px"} src={item.image} maxHeight={"200px"} />
            </Flex>


            {/* information portion */}

            <Flex  gap={"10px"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"} width={"100%"}>

                <Flex justifyContent={"center"} alignItems={"center"}>
                    <Text fontWeight={500} color={"gray.600"} fontSize={"20px"} > {item.name} </Text>
                </Flex>

                <Select borderRadius={"8px"} onChange={sizeChangeHandler} width={"90%"} bg={"white"}>
                <option value="80">medium</option>
                    <option value="60">small</option>
                    <option value="100">large</option>
                </Select>

                <Flex width={"80%"} justifyContent={"space-between"} alignItems={"center"}>
                    <Button _active={{transform : "scale(0.9)"}} onClick={addToCartHandler} _hover={{ bg: "gray.500" }} borderRadius={"8px"} bg={colors.primary} color={"white"}> Add to cart </Button>
                    <Text fontWeight={"bold"} color={"gray.600"}> ₹{item.price} </Text>
                </Flex>

            </Flex>

        </Flex>
    )
}

export default Items

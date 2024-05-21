import { Flex , Image , Text } from '@chakra-ui/react'
import axios from 'axios'
import React from 'react'
import useShowtoast from '../../hooks/UseShowToast'
import { AiOutlineDelete } from "react-icons/ai";
import CalculateTotalPrice from '../../hooks/UserCalculateTotal';

function CartItem({cartItem , cart , setCart , setTotal}) {

  const showToast = useShowtoast();

  const deleteCartItemHandler = async()=>{
    const cartId = cartItem._id;
    const res = await axios({
      method : "post",
      url : "/api/delete/cart/item",
      data : {cartId}
    })
    const data = res.data;
    if(data.error){
      showToast("error" , data.error , "error");
      return;
    }
    
    const newCart = cart.filter(e=>{
      return e._id != cartItem._id
    })

   
    setCart(newCart);

    setTotal(CalculateTotalPrice(newCart));

    

    showToast("success" , data.success , "success");

  }
  
  return (

    <Flex border={"1px solid"} borderColor={"gray.400"}  gap={"15px"} flexDirection={"column"} padding={"20px"} borderRadius={"10px"} bg={"white"}  >
        {/* image */}
        <Flex alignItems={"center"}  borderRadius={"md"} p={"15px"} bg={"gray.100"} justifyContent={"center"} flex={1}>
          <Image maxHeight={"200px"} src={cartItem.image} />
        </Flex>


{/* other details */}
        <Flex maxH={"50px"} border={"1px solid"} borderColor={"gray.400"} padding={"8px"} borderRadius={"md"} alignItems={"center"} justifyContent={"space-around"} flex={1} >
            <Text fontWeight={500} fontSize={"20px"} > {cartItem.itemName} </Text>
            <Text fontWeight={500} fontSize={"20px"} >  ₹{cartItem.itemPrice} </Text>
            <AiOutlineDelete cursor={"pointer"} onClick={deleteCartItemHandler} size={"25px"} />
        </Flex>

    </Flex>
  
  )
}

export default CartItem

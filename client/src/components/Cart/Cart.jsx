import { Flex, Spinner , Image, Heading, Button, SimpleGrid , Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import CartItem from './CartItem';
import colors from '../../colors';
import useShowtoast from '../../hooks/UseShowToast';
import CalculateTotalPrice from "../../hooks/UserCalculateTotal"
import {Link} from "react-router-dom";

function Cart() {

    const {user} = useContext(UserContext);

    const [cart , setCart] = useState([]);
    const [isLoading , setIsLoading] = useState(true);
    const showToast = useShowtoast();
    const[total , setTotal] = useState(0);

    useEffect(()=>{

        const userId = user._id

        setIsLoading(true);

        const getCart = async()=>{
            const res = await axios({
                url : "/api/get/cart",
                method : "post",
                data : {userId},               
            })

            const data = res.data;
            setCart(data.cart);
            console.log(data.cart);

            setTotal(CalculateTotalPrice(data.cart));

            setIsLoading(false);
        }
        getCart();

    },[])

    const placeOrderHandler = async()=>{
        
        const userId = user._id;

        const res = await axios({
            url : "/api/order/place",
            method : "post",
            data : {userId, cart},
        })

        const data = res.data;
        if(data.error){
            console.log(data.error);
            showToast("error" , data.error , "error");
            return;
        }

        showToast("success" , data.success , "success");


        const res2 = await axios({
            url : "/api/clear/cart",
            method : "post",
            data : {userId},
        })
        const data2 = res2.data;
        if(data2.error){
            console.log(data2.error);
            return;
        }

        setCart([]);
        
    }

    if(isLoading){
        return <Flex justifyContent={"center"} alignItems={"center"}>
            <Spinner size={"lg"} />
        </Flex>
    }

    if(!isLoading && cart.length == 0){
        return <Flex justifyContent={"center"}  width={"100vw"} height={"86vh"}>
            
            <Flex flexDir={"column"} >
            <Heading>Oops Cart is empty 😓 </Heading>
            <Link to={"/"} ><Button maxW={"170px"} bg={"orange.400"} color={"white"} >  Go Back </Button></Link>
            </Flex>
            
            <Image  src='./img/empty-cart.png' alt='empty-cart' />
        </Flex>
    }


  return (

    <Flex   flexDirection={"column"} gap={"20px"}  width={"100vw"} justifyContent={"center"} alignItems={"center"}>

<Flex gap={"10px"}  alignItems={"center"} height={"100px"} width={"70%"} justifyContent={"flex-end"}>
    <Text bg={"gray.100"} padding={"10px"} fontWeight={"600"} borderRadius={"md"}> total price {total} </Text>
    <Text> <i>ready to oder ?</i> </Text>
            <Button onClick={placeOrderHandler} _hover={{bg : "gray.500"}} color={"white"} bg={colors.primary}> Place Order </Button>
        </Flex>

        {isLoading == false && cart.length > 0 && <>

            <SimpleGrid gap={"25px"} width={"80%"} minChildWidth={"250px"}>
            {cart.map(cartItem => {
                return <CartItem setTotal={setTotal} key={cartItem._id} cartItem={cartItem} cart={cart} setCart = {setCart} />
            })}

            </SimpleGrid>
        </>}

      
        
    </Flex>
    
  )
}

export default Cart

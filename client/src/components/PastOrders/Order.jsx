import { Flex, Spinner, Image ,Text, SimpleGrid } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CalculateTotalPrice from '../../hooks/UserCalculateTotal';

function Order() {

    const {orderId} = useParams();
    const [order , setOrder] = useState({})
    const [orderItems , setOrderItems] = useState([]);
    const [isLoading , setIsLoading] = useState(false);
    const[total , setTotal] = useState(0);

    useEffect(()=>{
        (async()=>{
            setIsLoading(true);
            const res = await axios({
                method : "post",
                url : `/api/order/get/${orderId}`,
            })
            const data = res.data;
            setOrder(data.order);
            setOrderItems(data.order.cart);
            setTotal(CalculateTotalPrice(data.order.cart));
            setIsLoading(false);

        })()
    },[])

    if(isLoading){
        return <Flex justifyContent={"center"} alignItems={"center"}>
            <Spinner size={"lg"} />
        </Flex>
    }

  return (

    <Flex  flexDirection={"column"} justifyContent={"center"} alignItems={"center"}  width={"100vw"}>

        <Flex width={"80%"} justifyContent={"flex-end"}>
            <Text padding={"5px"} color={"white"} px={"20px"} borderRadius={"md"} fontWeight={"bold"} bg={"green.400"}>
                total price : {total}
            </Text>
        </Flex>


        <SimpleGrid columns={4} minChildWidth={"300px"} margin={"10px"} padding={"10px"} gap={"20px"} width={"100%"} >

            {orderItems.map((e)=>{
                return <>
               <Flex bg={"gray.100"} border={"1px solid"} borderColor={"gray.400"} padding={"15px"} borderRadius={"8px"}  flexDirection={"column"} flex={1}>
              <Flex alignItems={"center"} p={"10px"} borderRadius={"md"} flex={1} justifyContent={"center"}>
              <Image src={e.image} maxH={"200px"} alt='item-image' />
              </Flex>

              <Flex bg={"white"} border={"1px solid"} borderColor={"gray.500"} borderRadius={"md"} flexDirection={"column"} alignItems={"center"}>
              <Text color={"gray.600"} fontWeight={600}> {e.itemName} </Text>
                    <Text fontWeight={600}> ₹{e.itemPrice} </Text>
              </Flex>
                   
               </Flex>
                </>
            })}

        </SimpleGrid>
    </Flex>
   
  )
}

export default Order

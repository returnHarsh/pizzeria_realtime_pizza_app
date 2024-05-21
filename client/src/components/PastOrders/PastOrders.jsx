import { Flex, Heading, Spinner , Text} from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import useShowToast from "../../hooks/UseShowToast";
import axios from "axios";
import moment from "moment";
import { Link } from 'react-router-dom';

function PastOrders() {

    const {user} = useContext(UserContext);
    const [orders , setOrders] = useState([]);
    const [isLoading , setIsLoading] = useState(false);
    const showToast = useShowToast();
    
    useEffect(()=>{

      const userId = user._id;

      (async()=>{
        setIsLoading(true);
        const res = await axios({
          method : "post",
          url : "/api/order/get",
          data : {userId},
        })

        const data = res.data;
        if(data.error){
          console.log(data.error);
          showToast("error" , data.error , "error");
          return;
        }

        setOrders(data.orders);
        // showToast("success" , data.success , "success");
        setIsLoading(false);
      })()

    },[])

    if(isLoading){
      return <Flex justifyContent={"center"} alignItems={"center"}>
        <Spinner size={"lg"} />
      </Flex>
    }

  return (
   <Flex   padding={"20px"} height={{base : "auto" , md :"550px"}} mt={"100px"} gap={"10px"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} width={"100%"}>

    {orders.length > 0 && 
    <>
    <Heading color={"gray.600"}> Past Orders </Heading>

<Flex  bg={"white"} borderRadius={"md"}  padding={"12px"} gap={"10px"} flexDirection={"column"} width={{base : "100%" , lg : "95%"}}>
  {orders.map((order)=>{
    return <>
    <Flex bg={"white"} borderBottom={"1px solid"} borderColor={"gray.300"}   padding={"10px"} justifyContent={"space-around"} >

      <Flex   width={"100%"} justifyContent={"flex-start"}>
      <Link to={`/past/orders/${order._id}`}> <Text borderRadius={"5px"} p={"4px"} bg={"white"} transition={"0.25s ease-in-out"} _hover={{bg : "green.400" , color : "white"}} cursor={"pointer"} fontSize={{base : "10px" , lg : "18px"}} fontWeight={600} color={"green.500"}> {order._id} </Text> </Link>
      </Flex>

      <Flex  justifyContent={"center"} width={"100%"}>
        <Link to={`/order/status/${order._id}`}> <Text  _hover={{textDecoration :"underline"}} fontSize={{base : "10px" , lg : "15px"}} fontWeight={"500"} color={"gray.700"}> Track Order </Text> </Link>
      </Flex>

      <Flex  width={"100%"} justifyContent={"flex-end"}>
      <Text cursor={"pointer"} fontSize={{base : "10px" , lg : "18px"}} fontWeight={"400"} color={"gray.700"}> { moment(order.createdAt).format('DD/MM/YYYY') } </Text>
      </Flex>
     
    </Flex>
    </>
  })}
</Flex>

    </>
    }

    {orders.length == 0 && <>
    <Flex>
      <Heading> No past orders found </Heading>
    </Flex>
    </>}

   </Flex>
  )
}

export default PastOrders

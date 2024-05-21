import { Flex, Select, Spinner } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import AdminOrderItem from './AdminOrderItem';

function AllOrders() {

    const [allOrders , setAllOrders] = useState([]);
    const [isLoading , setIsLoading] = useState(true);

    useEffect(()=>{

        (async()=>{
            const res = await axios({
                method : "post",
                url : "/api/admin/all/orders",
            })

            const data = res.data;
            if(data.error){
                console.log(data.error);
                return;
            }
            setAllOrders(data.orders);
            setIsLoading(false);

        })()

    },[])

    if(isLoading){
        return <Flex justifyContent={"center"} alignItems={"center"}>
            <Spinner size={"lg"}/>
        </Flex>
    }

  return (
    <Flex  width={"100%"} justifyContent={"center"} alignItems={"center"}>

        <Flex overflow={"auto"}  justifyContent={"center"}  width={"90%"}>

            <Table size={{base : "sm" , lg : "md"}}>
                <Thead>
                    <Tr>
                        <Th> Orders </Th>
                        <Th> Name </Th>
                        <Th> Address </Th>
                        <Th> Phone </Th>
                        <Th> Status </Th>
                        <Th> Placed At </Th>
                    </Tr>
                    </Thead>

                    <Tbody>
                       {allOrders?.map((order)=>{
                            return <AdminOrderItem order={order} />
                        })}
                    </Tbody>

                
            </Table>

        </Flex>

    </Flex>
  )
}

export default AllOrders

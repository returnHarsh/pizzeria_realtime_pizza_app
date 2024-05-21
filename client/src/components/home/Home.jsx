import { Flex , Heading, Text , Button , Image } from '@chakra-ui/react'
import React, { useState } from 'react'
import colors from '../../colors'
import Menus from '../ShowMenu/Menus';
import {motion} from "framer-motion";

function Home() {

    const [size , setSize] = useState("70%");

  return (

    <Flex  justifyContent={"center"} alignItems={"center"} flexDirection={"column"} >
         <Flex   flexDirection={{base : "column" , lg : "row"}} bg={"gray.100"} gap={{base : "0px" , lg:"20px"}} marginY={"10px"} padding={"10px"} minH={"550px"} h={"550px"} width={"100vw"} >

{/* left side */}
        <Flex  display={{base : "flex" , md : "none" , lg : "flex"}}  justifyContent={"center"} width={{base : "100%" , lg:"30%"}} height={"100%"}>

            <Flex gap={"10px"}   justifyContent={"center"} flexDirection={{base : "row" , lg : "column"}}>
            <Text> <i>are you hungry ? </i> </Text>

           <Flex flexDirection={{base : "column" , lg : "column"}}>
           <Heading fontSize={{base : "20px" , lg : "60px"}}> Don't wait </Heading>
            <Button   _hover={{bg : "gray.500"}} maxWidth={"170px"} bg={{base : "green.400" , lg : colors.primary}} color={"white"}> Order Now </Button>
           </Flex>

            </Flex>
           
        </Flex>

{/* right side */}
        <Flex  justifyContent={"center"} alignItems={"center"} flexDirection={{base : "column" , lg :"row"}}  flex={1} >

{/* pizza size control button */}
            <Flex   width={{base  :"100%" , lg : "auto"}} flexDirection={{base : "row" , lg : "column"}} p={"10px"} gap={"8px"} height={"100%"} justifyContent={"center"} >
                <Button _hover={{bg : "gray.500"}} w={{base : "100%" , lg : "80%"}} maxW={"170px"} onClick={()=> setSize("60%")} color={"white"} bg={colors.primary}> Small </Button>
                <Button _hover={{bg : "gray.500"}} w={{base : "100%" , lg:"90%"}}  maxW={"170px"} onClick={()=>setSize("75%")} color={"white"} bg={colors.primary}> Medium </Button>
                <Button _hover={{bg : "gray.500"}}  w={{base : "100%" , lg:"100%"}} maxW={"170px"} onClick={()=>setSize("90%")} color={"white"} bg={colors.primary}> Large </Button>
            </Flex>

            <Flex    h={"100%"} alignItems={"center"}   flex={1} width={"100%"}  justifyContent={{base : "center" , lg : "flex-end"}}>
                <Image  transition={"0.4s ease-in-out"}  height={size}  width={"auto"} maxWidth={{base : "60%" , lg  :"100%"}}  src='./img/hero-pizza.png' alt='home-logo' />
            </Flex>
        </Flex>
        

    </Flex>

    <Flex mt={"20px"}>
    <Menus/>
    </Flex>

  

    </Flex>
   
  )
}

export default Home

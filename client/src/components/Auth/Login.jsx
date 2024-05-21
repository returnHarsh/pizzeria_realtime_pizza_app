import { Text,  Button, Flex, Heading, Input , InputGroup , InputRightElement} from '@chakra-ui/react'
import React, { useContext, useRef, useState } from 'react'
import colors from '../../colors'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import useShowtoast from '../../hooks/UseShowToast';

function Login() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const {setUser} = useContext(UserContext);
    const showToast = useShowtoast();

    const[showPassword , setShowPassword] = useState(false);

    const togglePassword = async()=>{
        setShowPassword(!showPassword)
    }


    const loginHandler = async()=>{
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if(!email || !password){
          showToast("error" , "all fields are required" ,"error");
          return;
        }

        try{
            const res = await axios({
                url : "/api/login",
                method : "post",
                data : {email , password},
            })

            const data = res.data;

            if(data.error){
                console.log(data.error);
            }
            console.log(data);
            setUser(data.user);
            localStorage.setItem("user" , JSON.stringify(data.user));

            navigate("/");

        }catch(error){
            console.log(error);
        }
    }

  return (
    <Flex  justifyContent={"center"} alignItems={"center"} width={"100vw"} h={"85vh"}>

        <Flex shadow={"md"} padding={"18px"} borderRadius={"8px"} flexDirection={"column"} gap={"15px"} width={{base : "80%" , md : "25%"}} >

            <Flex justifyContent={"center"} alignItems={"center"}>
                <Heading> Login </Heading>
            </Flex>

            <Flex flexDirection={"column"} gap={"20px"}>
            <Input border={"1px solid"} borderColor={"gray.300"} ref={emailRef} bg={"white"} padding={"20px"} type='text' placeholder='enter email' />

            <InputGroup>
        <Input border={"1px solid"} borderColor={"gray.300"}
        bg={"white"} padding={"20px"}
          pr="4.5rem"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
          ref={passwordRef}
        />
        <InputRightElement width="4.5rem">
          <Button onClick={togglePassword} mt={"2px"} h="1.75rem" size="sm">
            {showPassword ? <ViewOffIcon /> : <ViewIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
            
            </Flex>

            <Flex justifyContent={"flex-end"}>
            <Link to={"/register"}> <Text color={"blue.600"} _hover={{textDecoration : "underline"}} > <i>don't have an account?</i> </Text> </Link>
            </Flex>
         
            <Flex   justifyContent={"center"} alignItems={"center"}>
            <Button maxW={"180px"} width={"40%"} onClick={loginHandler} _hover={{bg : "gray.500"}} bg={colors.primary} color={"white"}> Login </Button>
            </Flex>
        </Flex>

    </Flex>
  )
}

export default Login

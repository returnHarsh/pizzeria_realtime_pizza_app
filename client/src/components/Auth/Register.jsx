import { Text ,  Button, Flex, Heading, Input , InputGroup , InputRightElement} from '@chakra-ui/react'
import React, { useContext, useRef, useState } from 'react'
import colors from '../../colors'
import axios from "axios";
import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
  } from '@chakra-ui/react'
import { UserContext } from '../../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import useShowtoast from '../../hooks/UseShowToast';

function Register() {


    const emailRef = useRef();
    const passwordRef = useRef();
    const addressRef = useRef();
    const nameRef = useRef();
    const showToast = useShowtoast();

    const [showPassword , setShowPassword] = useState(false);

    const togglePassword = async()=>{
      setShowPassword(!showPassword);
    }

    const navigate = useNavigate();

    const [sliderValue , setSliderValue] = useState(0);

    const {setUser} = useContext(UserContext);

    const registrationHandler = async()=>{
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const name = nameRef.current.value;
        const address = addressRef.current.value;
        const phone = sliderValue;

        if(!email || !password || !name || !address || !phone){
          showToast("error" , "all fields are required " , "error");
          return;
        }


        const res = await axios({
          method : "post",
          url : "/api/register",
          data : {email , password , name , address , phone},
        })
        const data = res.data;
        console.log(data);
        localStorage.setItem("user" , JSON.stringify(data.user));
        setUser(data.user);
        navigate("/");
    }

    const sliderHandler = async(e)=>{
        setSliderValue(e);
    }


  return (
    <Flex  justifyContent={"center"} alignItems={"center"} width={"100vw"} h={"85vh"}>

    <Flex border={"1px solid gray"} bg={"gray.100"}  padding={"18px"} borderRadius={"8px"} flexDirection={"column"} gap={"10px"} width={{base : "90%" , md:"35%"}} >

        <Flex justifyContent={"center"} alignItems={"center"}>
            <Heading> Register </Heading>
        </Flex>

        <Flex flexDirection={"column"} gap={"10px"}>
       <Flex gap={"10px"}>
       <Input  required ref={emailRef} bg={"white"} border={"1px solid"} borderColor={"gray.400"} padding={"20px"} type='text' placeholder='enter email' />
        <Input  required ref={nameRef} bg={"white"} border={"1px solid"} borderColor={"gray.400"} padding={"20px"} type='text' placeholder='enter name' />
       </Flex>

       {/* range slider */}
        <Flex gap={"10px"} flexDirection={"column"}>
            <Input  required bg={"white"} border={"1px solid"} borderColor={"gray.400"} padding={"20px"} value={sliderValue}  placeholder='phone number' />
        <Slider onChange={sliderHandler} aria-label='slider-ex-1' min={0} max={9999999999} defaultValue={0}>
  <SliderTrack bg={"white"} height={"10px"}>
    <SliderFilledTrack bgColor={"blue.500"} />
  </SliderTrack>
  <SliderThumb />
</Slider>
        </Flex>

        <Input  required ref={addressRef} bg={"white"} border={"1px solid"} borderColor={"gray.400"} padding={"20px"} type='text' placeholder='enter address' />
        {/* <Input ref={passwordRef} bg={"white"} type='password' placeholder='enter password' /> */}

        <InputGroup>
        <Input required 
        bg={"white"} border={"1px solid"} borderColor={"gray.400"} padding={"20px"}
          pr="4.5rem"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
          ref={passwordRef}
        />
        <InputRightElement width="4.5rem">
          <Button onClick={togglePassword} h="1.75rem" size="sm">
            {showPassword ? <ViewOffIcon /> : <ViewIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
            

        </Flex>

        <Flex alignItems={"center"} justifyContent={"space-between"}>

        <Flex  justifyContent={"center"} alignItems={"center"}>
        <Button onClick={registrationHandler} _hover={{bg : "gray.500"}} bg={colors.primary} color={"white"}> Register </Button>
        </Flex>

        <Flex>
          <Link to={"/login"}> <Text _hover={{textDecoration : "underline"}} color={"blue.600"}><i>already have an account?</i></Text> </Link>
        </Flex>
     
        </Flex>

    </Flex>

</Flex>
  )
}

export default Register

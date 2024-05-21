import React, { useState , useContext } from 'react'
import { Divider, Flex , Image, List, ListItem , useBreakpoint} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import colors from "../../colors.js";
import { CiShoppingCart } from "react-icons/ci";
import { UserContext } from '../../context/UserContext.jsx';
import axios from 'axios';
import AddMenu from '../AddMenu/AddMenu.jsx';
import { Box, IconButton, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Stack, useBreakpointValue } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import {useLocation} from "react-router-dom";


function Header() {

  const {user , setUser} = useContext(UserContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };


  const logoutHandler = async()=>{
    const res = await axios({
      url : "/api/logout",
      method : "post",
    })
    const data = res.data;
    console.log(data);
    setUser(null);
    localStorage.clear("user");
  }

  const {pathname} = useLocation();

  const allRoutes = {
    home : "/",
    menu : "/menu",
    allOrders : "/admin/all/orders",
    pastOrders : "/past/orders",
    login : "/login",
    register : "/register"
  }
  

  return (
    <Flex   justifyContent={"center"} alignItems={"center"} margin={"10px"} padding={"10px"} >



        <Flex  alignItems={"center"}  width={"95%"}>
            {/* left logo section */}
            <Flex>
              <Link to={"/"}>  <Image cursor={"pointer"} src='./img/logo.png' alt='logo' /></Link>
            </Flex>

            {/* right navbar section */}
            {isSmallScreen ? (
        <IconButton
        marginLeft={"auto"}
          aria-label="Open menu"
          icon={<HamburgerIcon />}
          onClick={toggleDrawer}
          variant="ghost"
        />
      ) : (
        <Box>
        </Box>
      )}

      <Drawer placement="right" isOpen={isDrawerOpen} onClose={toggleDrawer}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader> Hello {user ? user.name : "guest"} </DrawerHeader>
          <DrawerBody>

              <Flex justifyContent={"center"} alignItems={"flex-end"} >
              <List  width={"60%"} fontSize={{base : "15px" , lg : "17px"}} fontWeight={500}>
                   <Flex    width={"100%"} flexDirection={"column"}  alignItems={"flex-start"} gap={"20px"}>

                   <Link to={"/"}> <ListItem  border={"1px solid"} borderColor={"gray.500"} onClick={toggleDrawer}   fontSize={"15px"}  _hover={{bg : colors.primary  , color: "white" }} transition={"0.25s ease-in-out"}  borderRadius={"6px"} padding={"7px"}  > Home </ListItem> </Link>

                   <Link to={"/menu"}> <ListItem  onClick={toggleDrawer}  fontSize={"15px"} _hover={{bg : colors.primary  , color: "white" }} transition={"0.25s ease-in-out"}  borderRadius={"6px"} padding={"7px"} > Menu </ListItem> </Link>

                   {!user && <>
                    <Link to={"/login"}> <ListItem onClick={toggleDrawer}  fontSize={"15px"} _hover={{bg : colors.primary  , color: "white" }} transition={"0.25s ease-in-out"}  borderRadius={"6px"} padding={"7px"} > Login </ListItem> </Link>

                   <Link to={"/register"}> <ListItem onClick={toggleDrawer} fontSize={"15px"}   _hover={{bg : colors.primary  , color: "white" }} transition={"0.25s ease-in-out"}  borderRadius={"6px"} padding={"7px"} > Register </ListItem> </Link>
                   </>}

                   {user && user?.role == "admin" && <>
                   <Link to={"/"}> <ListItem fontSize={{base : "10px" , lg : "15px"}}  transition={"0.25s ease-in-out"}  borderRadius={"6px"} padding={"7px"}  > <AddMenu/> </ListItem> </Link>
                   <Link to={"/admin/all/orders"}> <ListItem onClick={toggleDrawer}  _hover={{bg : colors.primary , color : "white"}} transition={"0.25s ease-in-out"}  borderRadius={"6px"} padding={"7px"} > All Orders </ListItem> </Link>
                   </>}

                   {user && <>
                    <Link  to={"/past/orders"}> <ListItem width={"auto"} onClick={toggleDrawer}  fontSize={"15px"}  _hover={{bg : colors.primary , color : "white" }} transition={"0.25s ease-in-out"}  borderRadius={"6px"} padding={"7px"} > past Orders </ListItem> </Link>
                   </>}

                   {user && <>
                    <Link onClick={logoutHandler} > <ListItem onClick={toggleDrawer}  fontSize={"15px"} _hover={{bg : colors.primary  , color: "white" }} transition={"0.25s ease-in-out"}  borderRadius={"6px"} padding={"7px"} > Logout </ListItem> </Link>
                   </>}

                   <Link to={"/cart"}>  <ListItem  onClick={toggleDrawer} _hover={{bg : colors.primary  , color: "white" }} transition={"0.25s ease-in-out"}  borderRadius={"6px"} padding={"7px"} > <CiShoppingCart size={"30px"} /> </ListItem> </Link>
                   </Flex>
                </List>
              </Flex>
            
          </DrawerBody>
        </DrawerContent>
      </Drawer>

           {!isSmallScreen && <>
            <Flex alignItems={"center"} justifyContent={"flex-end"} flex={1}>

                <List  fontSize={{base : "15px" , lg : "17px"}} fontWeight={500}>
                   <Flex   alignItems={"center"} gap={{base : "2px" , md : "15px"}}>

                    {user && <>
                      <Link to={"/"}> <ListItem   fontSize={{base : "10px" , md : "15px"}}  _hover={{bg : "gray.500" }} color={"white"} bg={"green.400"}  borderRadius={"6px"} padding={"7px"} > {user.name} </ListItem> </Link>
                    </>}
                   
                   <Link  to={"/"}> <ListItem  bg={pathname === allRoutes.home ? colors.primary : ''} color={pathname == allRoutes.home ? 'white' : 'black'} fontSize={{base : "10px" , md : "15px"}} _hover={{bg : colors.primary  , color: "white" }}   borderRadius={"6px"} padding={"7px"} > Home </ListItem> </Link>

                   <Link to={"/menu"}> <ListItem  bg={pathname === allRoutes.menu ? colors.primary : ''} color={pathname == allRoutes.menu ? 'white' : 'black'} fontSize={{base : "10px" , md : "15px"}}  _hover={{bg : colors.primary  , color: "white" }}   borderRadius={"6px"} padding={"7px"} > Menu </ListItem> </Link>

                   {!user && <>
                    <Link to={"/login"}> <ListItem bg={pathname === allRoutes.login ? colors.primary : ''} color={pathname == allRoutes.login ? 'white' : 'black'} fontSize={{base : "10px" , md : "15px"}} _hover={{bg : colors.primary  , color: "white" }}  borderRadius={"6px"} padding={"7px"} > Login </ListItem> </Link>

                   <Link to={"/register"}> <ListItem bg={pathname === allRoutes.register ? colors.primary : ''} color={pathname == allRoutes.register ? 'white' : 'black'} fontSize={{base : "10px" , md : "15px"}}  _hover={{bg : colors.primary  , color: "white" }}  borderRadius={"6px"} padding={"7px"} > Register </ListItem> </Link>
                   </>}

                   {user && user?.role == "admin" && <>
                   <Link to={"/"}> <ListItem fontSize={{base : "10px" , lg : "15px"}}   borderRadius={"6px"} padding={"7px"} > <AddMenu/> </ListItem> </Link>

                   <Link to={"/admin/all/orders"}> <ListItem bg={pathname === allRoutes.allOrders ? colors.primary : ''} color={pathname == allRoutes.allOrders ? 'white' : 'black'} fontSize={{base : "10px" , md : "15px"}} _hover={{bg : colors.primary , color : "white"}}   borderRadius={"6px"} padding={"7px"} > All Orders </ListItem> </Link>
                   </>}

                   {user && <>
                    <Link to={"/past/orders"}> <ListItem bg={pathname === allRoutes.pastOrders ? colors.primary : ''} color={pathname == allRoutes.pastOrders ? 'white' : 'black'}  fontSize={{base : "10px" , md : "15px"}} _hover={{bg : colors.primary , color : "white" }}   borderRadius={"6px"} padding={"7px"} > past Orders </ListItem> </Link>
                   </>}

                   {user && <>
                    <Link onClick={logoutHandler} > <ListItem  fontSize={{base : "10px" , md : "15px"}} _hover={{bg : colors.primary  , color: "white" }}   borderRadius={"6px"} padding={"7px"} > Logout </ListItem> </Link>
                   </>}

                   <Link to={"/cart"}>  <ListItem  _hover={{bg : colors.primary  , color: "white" }} transition={"0.25s ease-in-out"}  borderRadius={"6px"} padding={"7px"} > <CiShoppingCart size={"30px"} /> </ListItem> </Link>
                   </Flex>
                </List>
               
            </Flex>
           </>}

        </Flex>

    </Flex>
  )
}

export default Header

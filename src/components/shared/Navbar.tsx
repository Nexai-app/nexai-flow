import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image"
import { Box, Button, Container, Flex, Heading, List, ListItem, Spacer, Text, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, ButtonGroup } from "@chakra-ui/react";
import "../../app/page.module.css"

//SET UP FLOW
import * as fcl from "@onflow/fcl"
// import * as t from "@onflow/types"


// fcl.config({
// 	"accessNode.api": "http://localhost:8080",
// 	"discovery.wallet": "http://localhost:8781/fcl/authn" //dev wallet
// })

function Navbar() {

	//FLOW
	// const navigate = useNavigate();
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [add, setAdd] = useState({val:""})

	useEffect(() => {
		fcl.currentUser.subscribe(setAdd)
	},[])

	const Auth = () => {
		fcl.authenticate()
	}


	const handleDrawerToggle = () => {
		setIsDrawerOpen(!isDrawerOpen);
	};
console.log("add",add)
	return (
		<Box className='App-header' mb={`80px`}>
			<Flex as="nav" py='50px' px='80px' alignItems='center' gap='30px' bg='transparent'>
				<Link href={`/`}>
					<Image width={75} height={75} src={`/assets/nexai-logo.jpg`} alt="nexai"/>
				</Link>
				<Spacer bg={`transparent`} />
				<Box display={{ base: "block", md: "none" }} onClick={handleDrawerToggle} color="white">
				<svg viewBox="0 0 100 80" width="30" height="30">
					<rect width="100" height="10" fill="white"></rect>
					<rect y="30" width="100" height="10" fill="white"></rect>
					<rect y="60" width="100" height="10" fill="white"></rect>
				</svg>
				</Box>
				<List display={{ base: "none", md: "flex" }}>
					<ButtonGroup gap='2'>
					<ListItem>
							<Button onClick={Auth} colorScheme={`#341A41`}>
								Sign In
							</Button>
					</ListItem>
					<ListItem>
							<Button onClick={Auth} border='1px' colorScheme={`transparent`}>
								Try our Assistant
							</Button>
					</ListItem>
					</ButtonGroup>
				</List>
			</Flex>

			<Drawer isOpen={isDrawerOpen} placement="right" onClose={handleDrawerToggle}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerHeader color={`white`} fontFamily="Poppins">Nexai</DrawerHeader>
					<DrawerBody>
						<List>
							<ListItem>
									<Button onClick={Auth} colorScheme="tranarent">
										Try our Assistant
									</Button>
							</ListItem>
						</List>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
			<Container centerContent my='300px' bg={`transparent`}>
				<Heading as='h1' size='4xl' fontFamily='Poppins' bg={`transparent`}>Nexai</Heading>
				<Text fontFamily='Public Sans' textAlign='center' bg={`transparent`}>The first fully decentralized, autonomous, integrateable chatbot and assistant that runs on blockchain and artificial intelligence.</Text>
				<Flex align="center" justify="center" gap={4} pt={`18px`}>
					<Text mt={4} >Powered on</Text>
					<Image width={40} height={40} alt="flow" src={`/assets/flow-logo.png`} />
					</Flex>
			</Container>
		</Box>
	);
}

export default Navbar;

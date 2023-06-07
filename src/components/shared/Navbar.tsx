import "../../flow/config";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image"
import { Box, Button, Container, Flex, Heading, List, ListItem, Spacer, Text, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, ButtonGroup } from "@chakra-ui/react";
import "../../app/page.module.css"
import {useAuth} from "@/contexts/AuthContext"


function Navbar() {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const { logIn } = useAuth()


	const handleDrawerToggle = () => {
		setIsDrawerOpen(!isDrawerOpen);
	};
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
							<Button onClick={logIn} colorScheme={`#341A41`}>
								Sign In
							</Button>
					</ListItem>
					<ListItem>
							<Button onClick={logIn} border='1px' colorScheme={`transparent`}>
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
									<Button onClick={logIn} colorScheme="tranarent">
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

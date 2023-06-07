import React from "react";
import Link  from "next/link";
import { Box,  Flex, Heading, Spacer } from "@chakra-ui/react";

function Navbar() {
	
	return (
		<Box  >
			<Flex as="nav" py='50px' px='80px' alignItems='center' gap='30px' bg='transparent'>
				<Link href={`/dashboard`}>
					<Heading bg={`transparent`}>Nexai</Heading>
				</Link>
			<Spacer/>
			</Flex>
		</Box>
	);
}

export default Navbar;

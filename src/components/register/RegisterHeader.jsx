import {Flex, Heading, Image, Text} from "@chakra-ui/react";
import {reactIcon} from "../../assets/icons/index.js";

function Header() {
    return (
        <Flex flexDirection={'column'} mx={'auto'} textAlign={'center'} gap={2} mt={20} >
            <Flex gap={2} justifyContent={'center'}>
                <Image src={reactIcon} w={'50px'}/>
                <Heading>TRELLUX</Heading>
            </Flex>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <Text>We're excited to have you!</Text>

            <Heading as='h6' size={'lg'}>Register your account</Heading>
        </Flex>
    );
}

export default Header;
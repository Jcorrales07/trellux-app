import {Flex, Heading, Image, Link, Text} from "@chakra-ui/react";
import {reactIcon} from "../assets/icons/index.js";

function RegisterHeader() {
    return (
        <Flex flexDirection={'column'} mx={'auto'} textAlign={'center'} gap={2} mt={20}>
            <Link href={'/'}>
                <Flex gap={2} justifyContent={'center'}>
                    <Image src={reactIcon} w={'50px'}/>
                    <Heading>TRELLUX</Heading>
                </Flex>
            </Link>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <Text>We're excited to have you!</Text>

            <Heading as='h6' size={'lg'}>Register your account</Heading>
        </Flex>
    );
}

function LoginHeader() {
    return (<Flex flexDirection={'column'} mx={'auto'} textAlign={'center'} gap={5} mt={20}>
        <Link href={'/'}>
            <Flex gap={2} justifyContent={'center'}>
                <Image src={reactIcon} w={'50px'}/>
                <Heading>TRELLUX</Heading>
            </Flex>
        </Link>
        <Heading as='h6' size={'lg'}>Login into your account</Heading>
    </Flex>)
}

export {RegisterHeader, LoginHeader};

import {Box, Flex, Image, Avatar, Heading} from "@chakra-ui/react";
import {tailwindcssIcon} from "../../assets/icons/";


function Navbar() {
    return (
        <Flex id={'navbar'} alignItems={'center'} justifyContent={'space-between'} gap={5} w={'100%'} px={5} maxW={'100vw'}>
            <Flex alignItems={'center'} gap={2} onClick={() => location.href = '/'} cursor={'pointer'}>
                <Image src={tailwindcssIcon} width={50} />
                <Heading display={{base: 'none', sm: 'block'}}>Trellux</Heading>
            </Flex>
            <Box>
                <Avatar size={'md'} src={'http://www.imagen.com/joe'} cursor={'pointer'} bg={'gray'}></Avatar>
            </Box>
        </Flex>
    );
}

export default Navbar;
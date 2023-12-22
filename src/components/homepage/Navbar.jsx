import React from 'react'
import { tailwindcssIcon } from '../../assets/icons'
import { Box, Flex, Link, Image } from '@chakra-ui/react'

const navlinks = [
    { name: 'Login', href: '#' },
    { name: 'Register', href: '#' },
    { name: 'Proyect Info', href: '#' },
]

function Navbar() {
    return (
        <Box bg="colors.gray500" p={2} color="white" minW={'100vw'}>
            <Flex justify="space-between" align="center">
                <Link href="#" fontSize="xl">
                    <Box>
                        <Image src={tailwindcssIcon} width={50}></Image>
                    </Box>
                </Link>
                <Flex gap={3}>
                    {navlinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            borderRadius={5}
                            px={2}
                            py={1}
                            _hover={{ textDecoration: 'none', bg: 'gray.700' }}
                        >
                            {link.name}
                        </Link>
                    ))}
                </Flex>
            </Flex>
        </Box>
    )
}

export default Navbar

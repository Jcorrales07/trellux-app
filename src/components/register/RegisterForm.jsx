import {
    Box, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Flex, Button,
} from '@chakra-ui/react'
import {useState} from "react";

function RegisterForm() {
    const [input, setInput] = useState('');

    const handleInputChange = (e) => setInput(e.target.value);

    const isError = input === '';

    return (
        <Flex justifyContent={'center'} alignItems={'center'} mx="auto" border={'1px red solid'}>

            <FormControl display={'flex'} flexDirection={'column'} justifyContent={'center'}
                         alignItems={'center'} isRequired gap={5}>

                <Flex flexDirection={'column'} gap={5}>
                    <Flex flexDirection={'row'} gap={5}>

                        <Box>
                            <FormLabel>Name:</FormLabel>
                            <Input type={"text"}/>
                        </Box>

                        <Box>
                            <FormLabel>Last name:</FormLabel>
                            <Input type={"text"}/>
                        </Box>

                    </Flex>

                    <Flex flexDirection={'column'} gap={5}>

                        <Box>
                            <FormLabel>Email:</FormLabel>
                            <Input type={"email"} placeholder={'example@mail.com'} value={input}
                                   onChange={handleInputChange}/>
                        </Box>

                        <Box>
                            <FormLabel>Username:</FormLabel>
                            <Input type={"text"}/>
                        </Box>

                        <Box>
                            <FormLabel>Password:</FormLabel>
                            <Input type={"password"}/>
                        </Box>

                        <Box>
                            <FormLabel>Confirm password:</FormLabel>
                            <Input type={"password"}/>
                        </Box>

                    </Flex>
                </Flex>

                <Button type={'submit'}>Register my account</Button>

            </FormControl>
        </Flex>
    );
}

export default RegisterForm;

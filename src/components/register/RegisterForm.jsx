import {Box, Button, Flex, FormControl, FormLabel, Input, InputGroup, InputRightElement,} from '@chakra-ui/react'
import {useState} from "react";
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";

function RegisterForm() {
    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [conPassword, setConPassword] = useState('')

    const [showPassword, setShowPassword] = useState(false)
    const handleClickSP = () => setShowPassword(prev => !prev)

    const handleName = e => setName(e.target.value)
    const handleLastname = e => setLastname(e.target.value)
    const handleEmail = e => setEmail(e.target.value)
    const handleUsername = e => setUsername(e.target.value)
    const handlePassword = e => setPassword(e.target.value)
    const handleConPassword = e => setConPassword(e.target.value)

    const getData = () => {

        return {
            name,
            lastname,
            email,
            username,
            password
        }
    }

    const confirmPassword = () => conPassword.includes(password)

    const registerAccount = (e) => {
        e.preventDefault()

        if (confirmPassword())
            console.log(getData())
        // Ponerle la salt y mandar a la db
    }

    return (
        <Flex justifyContent={'center'} alignItems={'center'} mx="auto">
            <form action="" onSubmit={registerAccount}>

                <Flex flexDirection={'column'} gap={5}>
                    <Flex flexDirection={'row'} gap={5}>

                        <Box>
                            <FormControl isRequired>
                                <FormLabel>Name:</FormLabel>
                                <Input type={"text"} value={name} onChange={handleName}/>
                            </FormControl>
                        </Box>

                        <Box>
                            <FormControl isRequired>
                                <FormLabel>Last name:</FormLabel>
                                <Input type={"text"} value={lastname} onChange={handleLastname}/>
                            </FormControl>
                        </Box>

                    </Flex>

                    <Flex flexDirection={'column'} gap={5}>

                        <Box>
                            <FormControl isRequired>
                                <FormLabel>Email:</FormLabel>
                                <Input type={"email"} placeholder={'example@mail.com'} value={email}
                                       onChange={handleEmail} autoComplete={'email'}/>
                            </FormControl>
                        </Box>

                        <Box>
                            <FormControl isRequired>
                                <FormLabel>Username:</FormLabel>
                                <Input type={"text"} value={username} onChange={handleUsername}
                                       autoComplete={'username'}/>
                            </FormControl>
                        </Box>

                        <Box>
                            <FormControl isRequired>
                                <FormLabel>Password:</FormLabel>
                                <InputGroup>
                                    <Input type={showPassword ? 'text' : 'password'} value={password}
                                           onChange={handlePassword}
                                           autoComplete={'password'}/>
                                    <InputRightElement>
                                        <Button onClick={handleClickSP} backgroundColor={'transparent'}>
                                            {showPassword ? <ViewOffIcon/> : <ViewIcon/>}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                        </Box>

                        <Box>
                            <FormControl isRequired>
                                <FormLabel>Confirm password:</FormLabel>

                                <InputGroup>
                                    <Input type={showPassword ? "text" : "password"} value={conPassword}
                                           onChange={handleConPassword}
                                           autoComplete={'confirmPassword'}/>
                                    <InputRightElement>
                                        <Button onClick={handleClickSP} backgroundColor={'transparent'}>
                                            {showPassword ? <ViewOffIcon/> : <ViewIcon/>}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                        </Box>

                    </Flex>
                    <Button type={'submit'}>Register my account</Button>
                </Flex>
            </form>
        </Flex>
    );
}

export default RegisterForm;

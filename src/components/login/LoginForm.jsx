// Ya esta todo bien
// Lo que haria falta es que lo rojo de los inputs salga hasta que se le da submit y esten vacios
// hay que quitarle el boton al ojo, osea los estilos
// quitarle el subrayado al logo
// Y darle mejor diseño

import {
    Box,
    Button,
    Flex,
    FormLabel,
    FormControl,
    FormErrorMessage,
    Input,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react'
import {useState} from "react";
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";

function LoginForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleUsername = e => setUsername(e.target.value)
    const handlePassword = e => setPassword(e.target.value)
    const handleClickSP = () => setShowPassword(prev => !prev)

    const getData = () => {

        if (username === '' && password === '') return

        return {
            username,
            password
        }
    }

    //Pero ahora con la info de la db
    const confirmPassword = () => true

    const redirectDashboard = (e) => {
        e.preventDefault()

        if (confirmPassword())
            console.log(getData())
        // Ponerle la salt y mandar a la db
    }

    let validInput = input => input === ''

    return (
        <Box mx="auto" w={'400px'}>

            <Flex flexDirection={'column'} gap={5} w={'100%'}>

                <form onSubmit={redirectDashboard}>
                    <Flex flexDirection={'column'} gap={5}>

                        <Box>
                            <FormControl isRequired isInvalid={validInput(username)}>
                                <FormLabel>Username or email:</FormLabel>
                                <Input type={"text"} value={username} onChange={handleUsername} autoComplete={'username'}/>
                                {validInput(username) ? (
                                    <FormErrorMessage>Username or email is required</FormErrorMessage>) : ''}
                            </FormControl>
                        </Box>

                        <Box>
                            <FormControl isRequired isInvalid={validInput(password)}>
                                <FormLabel>Password:</FormLabel>
                                <InputGroup size={'md'}>
                                    <Input type={showPassword ? 'text' : 'password'} value={password} onChange={handlePassword} autoComplete={'password'}/>
                                    <InputRightElement>
                                        <Button onClick={handleClickSP} backgroundColor={'transparent'}>
                                            {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                    {validInput(password) ? (
                                        <FormErrorMessage>Password is required</FormErrorMessage>) : ''}
                            </FormControl>
                        </Box>

                        <Button type={'submit'} w={'100%'}>Login</Button>
                    </Flex>
                </form>
            </Flex>

        </Box>
    )
        ;
}

export default LoginForm;

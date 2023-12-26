// Ya esta todo bien
// Lo que haria falta es que lo rojo de los inputs salga hasta que se le da submit y esten vacios
// hay que quitarle el boton al ojo, osea los estilos
// quitarle el subrayado al logo
// Y darle mejor diseño

import {
    Box,
    Flex,
    Input,
    Button,
    useToast,
    FormLabel,
    InputGroup,
    FormControl,
    FormErrorMessage,
    InputRightElement,
} from '@chakra-ui/react'
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";

import {useContext, useEffect, useState} from "react";
import {GlobalState} from "../../Store.jsx";
import {useLocalStorage} from "../../hooks/useLocalStorage.jsx";

function LoginForm() {
    //Acceso al estado global con useContext, revisar el Store.jsx para entender esta parte
    const [globalState, setGlobalState] = useContext(GlobalState)
    // No me queda muy claro si me sirve de algo el estado global si lo puedo guardar en localStorage
    const [state, setState] = useLocalStorage('globalState', globalState)

    useEffect(() => {
        console.log("globalState despues", globalState) // verificando el estado global
        setState(globalState)
    }, [globalState, setState])

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const toast = useToast()
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

    const redirectDashboard = async (e) => {
        e.preventDefault()

        let url = 'http://localhost:7777/v1/users/login'
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(getData())
        }

        let res = await fetch(url, options).then(res => res.json()).then(response => response).catch(e => console.log(e))

        if (!res.success) {
            //notificar que algo esta mal
            toast({
                title: 'Check your credentials',
                description: res.message,
                status: 'error',
                isClosable: true
            })
            return
        }

        const user = {
            ...res.user
        }

        // console.log('user', user)
        // console.log('globalState antes', globalState)

        const newGlobalState = {
            ...globalState,
            userLogged: {
                name: user.name,
                lastname: user.lastname,
                username: user.username,
                email: user.email,
                accessToken: user.accessToken,
                boardsOrder: user.boardsOrder,
            },
            userBoards: {
                boardsOrder: [...user.boardsOrder],
                boardSelected: {},
            }
        }

        // Ponemos al usuario en el estado global
        setGlobalState(newGlobalState)
        setState(globalState)

        // console.log('setState(globalState)', globalState)

        toast({
            title: 'Login successfully!',
            description: res.message,
            status: 'success',
            isClosable: true
        })

        //redirigir al dashboard y decirle que todo bien
        setTimeout(() => {
            window.location.href = '/dashboard'
        }, 5000)
    }

    let validInput = input => input === ''

    return (
        <Box mx="auto" w={'400px'}>

            <Flex flexDirection='column' gap={5} w={'100%'}>

                <form onSubmit={redirectDashboard}>
                    <Flex flexDirection="column" gap={5}>

                        <Box>
                            <FormControl isRequired isInvalid={validInput(username)}>
                                <FormLabel>Username or email:</FormLabel>
                                <Input type={"text"} value={username} onChange={handleUsername}
                                       autoComplete={'username'}/>
                                {validInput(username) ? (
                                    <FormErrorMessage>Username or email is required</FormErrorMessage>) : ''}
                            </FormControl>
                        </Box>

                        <Box>
                            <FormControl isRequired isInvalid={validInput(password)}>
                                <FormLabel>Password:</FormLabel>
                                <InputGroup size={'md'}>
                                    <Input type={showPassword ? 'text' : 'password'} value={password}
                                           onChange={handlePassword} autoComplete={'password'}/>
                                    <InputRightElement>
                                        <Button onClick={handleClickSP} backgroundColor={'transparent'}>
                                            {showPassword ? <ViewOffIcon/> : <ViewIcon/>}
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

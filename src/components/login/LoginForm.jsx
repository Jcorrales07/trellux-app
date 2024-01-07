// Ya esta todo bien
// Lo que haria falta es que lo rojo de los inputs salga hasta que se le da submit y esten vacios
// hay que quitarle el boton al ojo, osea los estilos
// quitarle el subrayado al logo
// Y darle mejor diseño

import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    useToast,
} from '@chakra-ui/react'
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";

import {useContext, useEffect, useState} from "react";
import {GlobalState} from "../../Store.jsx";
import {useLocalStorage} from "../../hooks/useLocalStorage.jsx";

function LoginForm() {
    //Acceso al estado global con useContext, revisar el Store.jsx para entender esta parte
    const [globalState, setGlobalState] = useContext(GlobalState)
    // eslint-disable-next-line no-unused-vars
    const [state, setState] = useLocalStorage('globalState', globalState)

    // Si hay algun cambio en el globalState, estado Local, entonces que persista
    useEffect(() => {
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
        // console.log('res', res)

        // Si el backend no esta encendido
        if (res === undefined) {
            toast({
                title: 'Server error 😵',
                description: 'Backend isn`t connected',
                status: 'error',
                isClosable: true
            })
            return
        }

        // Si tiene mal sus credenciales
        if (!res.success) {
            toast({
                title: 'Check your credentials',
                description: res.message,
                status: 'error',
                isClosable: true
            })
            return
        }

        // Si no hay nada mal, seguimos con el procedimiento
        const user = {
            ...res.user
        }

        let urlBoards = `http://localhost:7777/v1/boards/${user.username}`
        let optionsBoards = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }

        let boardsDB = (await fetch(urlBoards, optionsBoards).then(res => res.json()).then(response => response).catch(e => console.log(e))).boards
        //console.log(boardsDB)

        // ese array lo tengo que destructurar y guardarlo aca
        let boardsObj = {}
        let boardsArr = []

        if (boardsDB) {
            for (let i = 0; i < boardsDB.length; i++) {
                let item = boardsDB[i];
                boardsObj[item.id] = {
                    "id": item.id,
                    "title": item.title,
                    "username": item.username,
                    "date": item.createdAt
                };
            }

            // y poner solo los ids aca
            boardsArr = boardsDB.map(board => board.id)
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
                boardsOrder: [...boardsArr],
            },
            userBoards: {
                ...globalState.userBoards,
                boards: {
                    ...globalState.userBoards.boards,
                    ...boardsObj,
                },
                boardsOrder: [...boardsArr],
            }
        }

        // Ponemos al usuario en el estado global
        setGlobalState(newGlobalState)
        setState(globalState) // en el useEffect puse esto tambien

        // console.log('setState(globalState)', globalState)

        toast({
            title: 'Login successfully!',
            description: res.message,
            status: 'success',
            isClosable: true
        })

        //redirigir al dashboard y decirle que todo bien
        setTimeout(() => {
            location.href = '/dashboard'
        }, 1000)
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

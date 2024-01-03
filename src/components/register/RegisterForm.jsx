import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    useToast,
} from '@chakra-ui/react'
import {useContext, useState} from "react";
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";
import {GlobalState} from "../../Store.jsx";
import {useLocalStorage} from "../../hooks/useLocalStorage.jsx";

function RegisterForm() {
    const [globalState, setGlobalState] = useContext(GlobalState)
    // eslint-disable-next-line no-unused-vars
    const [state, setState] = useLocalStorage('globalState', globalState)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [lastname, setLastname] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [conPassword, setConPassword] = useState('')

    const [showPassword, setShowPassword] = useState(false)
    const toast = useToast()

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

    const registerAccount = async (e) => {
        e.preventDefault()

        let url = 'http://localhost:7777/v1/users/register'
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(getData())
        }

        if (confirmPassword()) {
            let res = await fetch(url, options).then(res => res.json()).then(response => response)

            console.log('res', res)

            if (!res.success) {
                //notificar que algo esta mal
                toast({
                    title: 'Your email or username is taken',
                    description: res.message,
                    status: 'error',
                    isClosable: true
                })
                return
            }

            let urlLogin = 'http://localhost:7777/v1/users/login'
            let optionsLogin = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            }

            let resLogin = await fetch(urlLogin, optionsLogin).then(res => res.json()).then(response => response).catch(e => console.log(e))
            console.log('res', resLogin)

            const user = {
                ...resLogin.user
            }

            console.log(user)

            // poner la informacion del usuario recien ingresado en el estado global
            const newGlobalState = {
                ...globalState,
                userLogged: {
                    name: user.name,
                    lastname: user.lastname,
                    username: user.username,
                    email: user.email,
                    accessToken: user.accessToken,
                    boardsOrder: [],
                },
            }

            console.log(newGlobalState)
            // Ponemos al usuario en el estado global
            setGlobalState(newGlobalState)
            setState(globalState)

            // notificar que se registro, mandarlo al dashboard
            toast({
                title: 'Your account has been registered!',
                description: res.message,
                status: 'success',
                isClosable: true
            })

            location.href = '/dashboard'
        }
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
                    <Button type={'submit'}> Register my account</Button>
                </Flex>
            </form>
        </Flex>
    );
}

export default RegisterForm;

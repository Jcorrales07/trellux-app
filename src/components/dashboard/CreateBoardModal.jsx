import {Button, Flex, Heading, Input} from "@chakra-ui/react";
import PropTypes from "prop-types";
import {useContext, useEffect, useState} from "react";
import {useToast} from "@chakra-ui/react";
import {GlobalState} from "../../Store.jsx";
import {useLocalStorage} from "../../hooks/useLocalStorage.jsx";

function CreateBoardModal() {
    const [showModal, setShowModal] = useState(false)

    return (
        <Flex>
            {showModal ? <CreateBoardModalForm stateFunc={setShowModal}/> :
                <DefaultModal stateFunc={setShowModal}/>}
        </Flex>
    );
}

function CreateBoardModalForm({stateFunc}) {
    const [globalState, setGlobalState] = useContext(GlobalState)
    const [state, setState] = useLocalStorage('globalState', globalState)
    const [inputValue, setInputValue] = useState('')
    const toast = useToast()

    const persistedState = JSON.parse(localStorage.getItem('globalState'))
    const userCreator = persistedState.userLogged
    console.log(persistedState)

    useEffect(() => {
        console.log(globalState)
    }, [globalState, persistedState, setGlobalState]);
    
    return (
        <Flex flexDirection={'column'} textAlign={'center'} gap={2} p={5}>
            <Heading as={'h4'} size={'md'}>Board Title</Heading>
            <Input type={'text'}
                   value={inputValue}
                   onChange={(e) => setInputValue(e.target.value)}
            />
            <Flex justifyContent={'space-around'}>

                <Button onClick={() => {

                    // Intento de crear un board y que se renderice ================================
                    setGlobalState(persistedState)

                    console.log('globalState', globalState)
                    // Crear el board y mandarlo a la db
                    let id = userCreator.username.slice(0, 3) + "-" + Math.round(Math.random() * 100000000)
                    const newBoard = {
                        id: id,
                        title: inputValue,
                        username: userCreator.username,
                        bgImg: '',
                    }

                    // añadirlo al final del array
                    userCreator.boardsOrder.push(newBoard)

                    let newGlobalState = {
                        ...globalState,
                        userLogged: {
                            ...userCreator,
                            boardsOrder: [...userCreator.boardsOrder]
                        }
                    }
                    // ...
                    console.log(newGlobalState)
                    setState(newGlobalState)
                    console.log(userCreator)
                    console.log(newBoard)
                    // ======================================================


                    // Notificar si all good
                    toast({
                        title: 'Board Created!',
                        status: 'success',
                        position: 'top',
                        isClosable: true,
                    })

                    // Si el titulo esta vacio
                    toast({
                        title: 'Title empty',
                        status: 'error',
                        position: 'top',
                        isClosable: true,
                    })

                    // temporal, simulando que tarda un poco
                    setTimeout(() => {
                        stateFunc(prev => !prev)
                    }, 2000)

                }}>
                    Create
                </Button>

                <Button onClick={() => {
                    stateFunc(prev => !prev)
                }}>Cancel</Button>
            </Flex>
        </Flex>
    )
}

function DefaultModal({stateFunc}) {
    return (
        <Flex py={5} onClick={() => stateFunc(prev => !prev)}>
            <Heading as={'h4'} size={'md'}>Create New Board...</Heading>
        </Flex>
    )
}

// Tipado de props, si no no funciona
CreateBoardModalForm.propTypes = {
    inputValue: PropTypes.string,
    stateFunc: PropTypes.func
}

DefaultModal.propTypes = {
    stateFunc: PropTypes.func
}

export default CreateBoardModal;
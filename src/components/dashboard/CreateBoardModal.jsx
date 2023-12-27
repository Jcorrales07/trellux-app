import {Button, Flex, Heading, Input} from "@chakra-ui/react";
import PropTypes from "prop-types";
import {useContext, useState} from "react";
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

const sendToDb = async (board) => {
    let url = 'http://localhost:7777/v1/boards/'
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(board)
    }

    return await fetch(url, options).then(res => res.json()).then(response => response).catch(e => console.log(e))
}

function CreateBoardModalForm({stateFunc}) {
    // por ahora esta vacio
    const [globalState, setGlobalState] = useContext(GlobalState)
    // me traigo el estado desde localStorage
    const [state, setState] = useLocalStorage('globalState', globalState)

    //console.log('estado desde CBM antes', 'localStorage', state, 'globalState', globalState)

    const [inputValue, setInputValue] = useState('')
    const toast = useToast()

    const userCreator = JSON.parse(localStorage.getItem('globalState')).userLogged

    return (
        <Flex flexDirection={'column'} textAlign={'center'} gap={2} p={5}>
            <Heading as={'h4'} size={'md'}>Board Title</Heading>
            <Input type={'text'}
                   value={inputValue}
                   onChange={(e) => setInputValue(e.target.value)}
                   maxLength={25}
            />
            <Flex justifyContent={'space-around'}>

                <Button onClick={() => {
                    // Creacion de un board ================================

                    // Si el titulo esta vacio
                    if (inputValue === '') {
                        toast({
                            title: 'Empty Title',
                            description: 'Can not create a new board with an empty title!',
                            status: 'error',
                            position: 'top',
                            isClosable: true,
                        })
                        return
                    }

                    // Crear el board y mandarlo a la db
                    let id = userCreator.username.slice(0, 3) + "-" + Math.round(Math.random() * 100000000)
                    const newBoard = {
                        id: id,
                        title: inputValue,
                        username: userCreator.username,
                        bgImg: '',
                        date: new Date().toISOString()
                    }

                    // Aca actualizo el globalState, ya con el board creado, sin perder la otra informacion
                    const newGlobalState = {
                        ...state,
                        userLogged: {
                            ...state.userLogged,
                            boardsOrder: [...state.userLogged.boardsOrder, newBoard.id]
                        },
                        userBoards: {
                            ...state.userBoards,
                            boards: {
                                ...state.userBoards.boards,
                                [newBoard.id]: {
                                    ...newBoard
                                }
                            },
                            boardsOrder: [...state.userBoards.boardsOrder, newBoard.id]
                        }
                    }

                    // actualizo el estado global y lo persisto
                    setGlobalState(newGlobalState)
                    setState(newGlobalState)

                    // lo mando a la db
                    sendToDb(newBoard).then(r => r)


                    // ======================================================

                    // Notificar si all good
                    toast({
                        title: 'Board Created!',
                        status: 'success',
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
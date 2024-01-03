import {Button, Flex, Heading, Input} from "@chakra-ui/react";
import PropTypes from "prop-types";
import {useContext, useState} from "react";
import {useToast} from "@chakra-ui/react";
import {GlobalState} from "../../Store.jsx";
import {useLocalStorage} from "../../hooks/useLocalStorage.jsx";
import {v4 as uuidv4} from 'uuid';

function CreateBoardModal() {
    const [showModal, setShowModal] = useState(false)

    return (
        <Flex>
            {showModal ? <CreateBoardModalForm stateFunc={setShowModal}/> :
                <DefaultModal stateFunc={setShowModal}/>}
        </Flex>
    );
}

// Mejorar esta funcion
const sendToDb = async (item, type, url) => {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item)
    }

    if (type === 'kanban') {
        return await fetch(url, options).then(res => res.json()).then(response => console.log(response)).catch(e => console.log(e))
    } else if (type === 'board') {
        return await fetch(url, options).then(res => res.json()).then(response => console.log(response)).catch(e => console.log(e))
    } else if (type === 'column') {
        return await fetch(url, options).then(res => res.json()).then(response => console.log(response)).catch(e => console.log(e))
    } else if (type === 'task') {
        return await fetch(url, options).then(res => res.json()).then(response => console.log(response)).catch(e => console.log(e))
    }
}

function CreateBoardModalForm({stateFunc}) {
    // por ahora esta vacio
    const [globalState, setGlobalState] = useContext(GlobalState)
    // me traigo el estado desde localStorage
    const [state, setState] = useLocalStorage('globalState', globalState)

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

                    // Si el título esta vacio
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
                        bgUrl: 'www.photo.com',
                        title: inputValue,
                        date: new Date().toISOString(),
                        username: userCreator.username,
                    }

                    // de prueba
                    const newTasks = [
                        {
                            kanbanId: id,
                            taskId: `task-${userCreator.username.slice(0, 3)}-${uuidv4()}`,
                            content: 'Take out the garbage',
                            username: userCreator.username,
                        },
                        {
                            kanbanId: id,
                            taskId: `task-${userCreator.username.slice(0, 3)}-${uuidv4()}`,
                            content: 'Watch my favorite show',
                            username: userCreator.username,
                        },
                        {
                            kanbanId: id,
                            taskId: `task-${userCreator.username.slice(0, 3)}-${uuidv4()}`,
                            content: 'Charge my phone',
                            username: userCreator.username,
                        },
                        {
                            kanbanId: id,
                            taskId: `task-${userCreator.username.slice(0, 3)}-${uuidv4()}`,
                            content: 'Cook dinner',
                            username: userCreator.username,
                        }
                    ]

                    // de prueba
                    const newColumns = [
                        {
                            kanbanId: id,
                            columnId: `column-${userCreator.username.slice(0, 3)}-${uuidv4()}`,
                            title: 'To do',
                            // El orden de los task ids es importante
                            tasksIds: [
                                newTasks[0].taskId,
                                newTasks[1].taskId,
                                newTasks[2].taskId,
                                newTasks[3].taskId,
                            ],
                            username: userCreator.username,
                        },
                        {
                            kanbanId: id,
                            columnId: `column-${userCreator.username.slice(0, 3)}-${uuidv4()}`,
                            title: 'Doing',
                            taskIds: [],
                            username: userCreator.username,
                        },
                        {
                            kanbanId: id,
                            columnId: `column-${userCreator.username.slice(0, 3)}-${uuidv4()}`,
                            title: 'Done',
                            taskIds: [],
                            username: userCreator.username,
                        }
                    ]

                    // default kanban. has 3 columns
                    const newKanban = {
                        kanbanId: id,
                        username: userCreator.username,
                        columnOrder: [newColumns[0].columnId, newColumns[1].columnId, newColumns[2].columnId],
                    }
                    // ----------------

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
                        },
                    }

                    // actualizo el estado global y lo persisto
                    setGlobalState(newGlobalState)
                    setState(newGlobalState)

                    // lo mando a la db
                    sendToDb(newBoard, 'board', 'http://localhost:7777/v1/boards/').then(r => r)
                    sendToDb(newKanban, 'kanban', 'http://localhost:7777/v1/kanbans/').then(r => r)
                    sendToDb(newColumns, 'column', 'http://localhost:7777/v1/columns/multiple').then(r => r)
                    sendToDb(newTasks, 'task', 'http://localhost:7777/v1/tasks/multiple').then(r => r)
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
            <Heading as='h4' size={'md'}>Create New Board...</Heading>
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
import {useContext, useEffect, useState} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import {GlobalState} from "./Store.jsx";
import {DragDropContext} from "react-beautiful-dnd";
import {ProtectedRoute} from "./ProtectedRoute.jsx";
import {useLocalStorage} from "./hooks/useLocalStorage.jsx";
import {Homepage, LoginPage, RegisterPage, ErrorPage, DashboardPage, KanbanPage} from './pages'

function App() {
    // eslint-disable-next-line no-unused-vars
    const [globalState, setGlobalState] = useContext(GlobalState)
    // eslint-disable-next-line no-unused-vars
    const [state, setState] = useLocalStorage('globalState')

    useEffect(() => {
        console.group()
        console.log('HUBIERON CAMBIOS EN STATE: ', state)
        console.log('HUBIERON CAMBIOS EN GLOBALSTATE: ', globalState)
        console.groupEnd()

        setGlobalState(state)
    }, [globalState, state, setGlobalState])

    // Kanban State para manejar el estado
    const [kanbanState, setKanbanState] = useState(state.kanbanData)

    console.log('state persistido desde App', state)
    console.log('globalState desde App', globalState)

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Router>
                <Routes>
                    <Route path={"/"} element={<Homepage/>}/>
                    <Route path={"/login"} element={<LoginPage/>}/>
                    <Route path={"/register"} element={<RegisterPage/>}/>
                    {/*// Ruta protegida*/}
                    <Route element={<ProtectedRoute authUser={state.userLogged.accessToken || ''} path={"/login"}/>}>
                        <Route path={'/dashboard'} element={<DashboardPage/>}/>
                        <Route path={"/kanban/:kanbanId"} element={<KanbanPage/>}/>
                    </Route>
                    <Route path={"*"} element={<ErrorPage/>}/>
                </Routes>
            </Router>
        </DragDropContext>
    )

    function handleDragEnd(result) {
        const {destination, source, draggableId, type} = result
        //console.log(result)

        //console.log('kanban antes', kanbanState)

        // Si no hay destino, entonces no hacemos nada
        if (!destination) {
            return
        }

        // Si la modificacion paso en la misma lista pero tambien esta en el mismo indice, no hacemos nada
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return
        }

        // Si cambiamos el orden de las columnas de tareas
        if (type === 'column') {

            const newColumnOrder = Array.from(kanbanState.columnOrder)
            // console.log('antes', newColumnOrder)

            newColumnOrder.splice(source.index, 1)

            newColumnOrder.splice(destination.index, 0, draggableId)
            // console.log('despues', newColumnOrder)

            const newKanbanState = {
                ...kanbanState,
                columnOrder: newColumnOrder,
            }

            setKanbanState(newKanbanState)

            const newGlobalState = {
                ...state,
                kanbanData: {
                    ...state.kanbanData,
                    ...newKanbanState,
                }
            }

            setState(newGlobalState)
            setGlobalState(newGlobalState)

            //console.log('kanban despues', newKanbanState)
            //console.log('ESTADO GLOBAL', newGlobalState, 'vacio', globalState)

            // window.location.reload()
            return
        }

        // Si la lista cambia de orden
        if (destination.droppableId === source.droppableId) {
            modifySameColumn({
                destination,
                source,
                draggableId,
            })
            // window.location.reload()
            return
        }

        console.log('')
    }

    // si cambiamos el orden de las listas
    // NO SE QUE ESTA PASANDO, NO SE ACTUALIZA EL ARREGLO
    function modifySameColumn({destination, source, draggableId}) {
        //console.log('evento:', {destination, source, draggableId}, 'kb state', kanbanState)

        const columnModified = kanbanState.columns[source.droppableId]
        //console.log('columna modificada', columnModified)

        const newTaskIdsArr = Array.from(columnModified.tasksIds)
        //console.log('task arr', newTaskIdsArr)

        console.log('array antes:', newTaskIdsArr, source.index, destination.index)
        newTaskIdsArr.splice(source.index, 1)
        console.log(newTaskIdsArr.splice(source.index, 1))


        console.log(newTaskIdsArr.splice(destination.index, 0, draggableId))

        console.log(newTaskIdsArr.filter(task => task === draggableId))

        newTaskIdsArr.splice(destination.index, 0, draggableId)
        console.log('array despues:', newTaskIdsArr, 'draggableId: ', draggableId)

        const newColumn = {
            ...columnModified,
            taskIds: newTaskIdsArr,
        }

        const newKanbanState = {
            ...kanbanState,
            columns: {
                ...kanbanState.columns,
                [newColumn.id]: newColumn,
            },
        }

        const newGlobalState = {
            ...state,
            kanbanData: {
                ...state.kanbanData,
                ...newKanbanState,
            }
        }

        setKanbanState(newKanbanState)
        setState(newGlobalState)
    }
}

export default App
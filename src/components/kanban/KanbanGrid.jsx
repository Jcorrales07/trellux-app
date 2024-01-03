import {Flex, Text, useToast} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import KanbanColumn from "./KanbanColumn.jsx";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import {useLocalStorage} from "../../hooks/useLocalStorage.jsx";
import {useContext} from "react";
import {GlobalState} from "../../Store.jsx";

function KanbanGrid() {
    const [globalState, setGlobalState] = useContext(GlobalState)
    const [state, setState] = useLocalStorage('globalState')
    // El estado de cada elemento se maneja desde su componente, asi no se comparte

    const columnOrder = state.kanbanData.columnOrder
    const tasks = state.kanbanData.tasks
    const columns = state.kanbanData.columns

    console.log(columnOrder, tasks, columns)

    console.log('estado global desde kanban grid', state)

    // Drag & Drop Context
    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Flex overflowX="auto" maxW="100vw" p={5} bg={'brand.900'} minH={'87vh'} gap={5}>

                {/* Contenedor de las columnas */}
                {/* Droppable zone */}
                <Droppable droppableId='all-columns'
                           direction='horizontal'
                           type='column'
                >
                    {(provided) => (
                        <Flex gap={5}
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                        >
                            {columnOrder.map((columnId, i) => {
                                    let column = columns[columnId]
                                    return <KanbanColumn key={i} cards={column.tasksIds} column={column} index={i}/>
                                }
                            )}

                            {provided.placeholder}
                        </Flex>
                    )}
                </Droppable>

                <Flex bg='brand.800'
                      height={'fit-content'}
                      minWidth={'fit-content'}
                      maxWidth={'350px'}
                      borderRadius={12}
                      p={[5, 3]}
                      color={'white'}
                      cursor={'pointer'}
                      justifyContent={'center'}
                      alignItems={'center'}
                      gap={2}
                >
                    <AddIcon boxSize={3} mt={0.5}/>
                    <Text>Create new column</Text>
                </Flex>
            </Flex>
        </DragDropContext>
    );
}

// Esta funcion es la que maneja toda la logica que pasa cuando un evento pasa en el DragDropContext
function handleDragEnd(result) {
    const { destination, source, draggableId, type } = result
    console.log(result)
    // console.log('destino', destination, 'origen', source, 'elemento a insertar', draggableId)

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
}

export default KanbanGrid;

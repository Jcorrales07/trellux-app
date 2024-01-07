import {Flex, Text} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import KanbanColumn from "./KanbanColumn.jsx";
import {Droppable} from "react-beautiful-dnd";
import {useLocalStorage} from "../../hooks/useLocalStorage.jsx";
import {useContext, useEffect, useState} from "react";
import {GlobalState} from "../../Store.jsx";

function KanbanGrid() {
    // eslint-disable-next-line no-unused-vars
    const [globalState, setGlobalState] = useContext(GlobalState)
    // eslint-disable-next-line no-unused-vars
    const [state, setState] = useLocalStorage('globalState', globalState)
    const [kanbanState, setKanbanState] = useState(state.kanbanData)

    // Como puedo escuchar los cambios de state para que me los renderice aca???


    // QUE ESTOY HACIENDO MALLLL??????????????????????????????? AAAAGGGGGHHHHHHHHHHHHH
    // Pero no me voy a rendir, si no te termino en esta semana. Voy a aprender mas y te voy a terminar Trellux.
    // Si ocupo hacerlo por 4ta vez, lo voy a hacer


    useEffect(() => {
        console.log('kanban grid state', state)
        // Ya tengo los cambios aca, en globalState, El useEffect me ayuda a que lo pueda tener en el Context
        // Pero ahora como le hago para usarlo??? Si cambio la variable, se piede todo porque globalState es volatil
        console.log('kanban grid global state', globalState) // si me trae la info actualizada
        setKanbanState(globalState.kanbanData)
    }, [state, globalState, setGlobalState, setState])

    // para manejar el kanban mas facil

    const columnOrder = kanbanState.columnOrder
    const columns = kanbanState.columns

    // Drag & Drop Context
    return (
        <Flex overflowX="auto" maxW="100vw" p={5} bg={'brand.900'} minH={'87vh'} gap={5}>
            {/* Contenedor de las columnas */}
            {/* Droppable zone */}
            <Droppable droppableId='all-columns'
                       direction='horizontal'
                       type='column'
            >
                {(provided) => (
                    <Flex {...provided.droppableProps}
                          ref={provided.innerRef}
                          gap={5}
                    >
                        {columnOrder.map((columnId, index) => {
                                columnId = columnId.toString()
                                let column = columns[columnId]
                                let tasks = column.tasksIds.map(taskId => kanbanState.tasks[taskId])
                                // console.log(column, tasks)

                                return <KanbanColumn
                                    key={index}
                                    column={column}
                                    tasks={tasks}
                                    index={index}
                                />
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
    );
}

export default KanbanGrid;

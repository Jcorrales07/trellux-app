import {Box, Button, Flex, Input} from "@chakra-ui/react";
import {DragHandleIcon} from "@chakra-ui/icons";
import PropTypes from "prop-types";
import {useContext, useState} from "react";
import KanbanCard from "./KanbanCard.jsx";
import {Draggable, Droppable} from "react-beautiful-dnd";
import {GlobalState} from "../../Store.jsx";
import {useLocalStorage} from "../../hooks/useLocalStorage.jsx";

function KanbanColumn({tasks, column, index}) {
    // console.log('titulo de columna: ', column, tasks, index)
    const [title, setTitle] = useState(column.title)

    // const [globalState, setGlobalState] = useContext(GlobalState)
    // const [state, setState] = useLocalStorage('globalState')

    // const tasks = state.kanbanData.tasks
    // console.log('kbc'index)

    // HTML: Columna
    // Draggable item
    return (
        <Draggable draggableId={column.columnId} index={index}>
            {(provided) => (
                <Flex ref={provided.innerRef}
                      {...provided.draggableProps}
                      bg='brand.800'
                      flexDirection='column'
                      height={'fit-content'}
                      width={'300px'}
                      maxWidth={'350px'}
                      borderRadius={12}
                      p={3}
                      color={'white'}
                      boxShadow='dark-lg'
                      rounded='md'
                    // id={column.columnId}
                >
                    <Flex justifyContent={'center'} alignItems={'center'} gap={3} mb={3}>
                        <Input type={'text'}
                               maxLength={28}
                               value={title}
                               border={'2px solid white'}
                               onChange={e => setTitle(e.target.value)}/>
                        <Box {...provided.dragHandleProps}>
                            <DragHandleIcon boxSize={6} color={'white'} cursor={'grab'}/>
                        </Box>
                    </Flex>

                    {/* Droppable zone */}
                    <Droppable droppableId={column.columnId} type={'task'}>
                        {(provided) => (
                            <Flex ref={provided.innerRef}
                                  {...provided.droppableProps}
                                  flexDirection='column'
                                  minHeight={'55px'}
                            >
                                {tasks.map((task, i) => {
                                    // HTML: Tarjeta
                                    return <KanbanCard
                                        key={task.taskId}
                                        task={task}
                                        index={i}
                                        length={tasks.length}
                                    />
                                })}
                                {provided.placeholder}
                                <Button borderRadius={6}
                                        border={'2px solid white'}
                                        h={'fit-content'}
                                        w={'100%'}
                                        mt={3}
                                        py={2}
                                        px={4}
                                        _hover={{
                                            border: '2px solid inherit',
                                            textColor: 'white',
                                            bg: 'brand.600'
                                        }}
                                        cursor={'pointer'}
                                >Add new card</Button>
                            </Flex>
                        )}
                    </Droppable>
                </Flex>
            )}
        </Draggable>
    );
}

KanbanColumn.propTypes = {
    tasks: PropTypes.array.isRequired,
    column: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
}

export default KanbanColumn;

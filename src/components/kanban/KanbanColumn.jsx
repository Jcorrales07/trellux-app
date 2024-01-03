import {Box, Button, Flex, Input} from "@chakra-ui/react";
import {DragHandleIcon} from "@chakra-ui/icons";
import PropTypes from "prop-types";
import {useContext, useState} from "react";
import KanbanCard from "./KanbanCard.jsx";
import {Draggable, Droppable} from "react-beautiful-dnd";
import {GlobalState} from "../../Store.jsx";
import {useLocalStorage} from "../../hooks/useLocalStorage.jsx";

function KanbanColumn({cards, column, index}) {
    const [title, setTitle] = useState(column.title)
    const [globalState, setGlobalState] = useContext(GlobalState)
    const [state, setState] = useLocalStorage('globalState')

    const tasks = state.kanbanData.tasks

    // HTML: Columna
    // Draggable item
    return (
        <Draggable draggableId={column.columnId} index={index}>
            {(provided) => (
                <Flex bg='brand.800'
                      flexDirection={'column'}
                      height={'fit-content'}
                      width={'300px'}
                      maxWidth={'350px'}
                      borderRadius={12}
                      p={3}
                      color={'white'}
                      boxShadow='dark-lg'
                      rounded='md'
                      {...provided.draggableProps}
                      ref={provided.innerRef}
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
                            <Flex flexDirection='column'
                                  minHeight={'55px'}
                                  ref={provided.innerRef}
                                  {...provided.droppableProps}
                            >
                                {cards.map((taskId, i) => {
                                    const task = tasks[taskId]
                                    // HTML: Tarjeta
                                    return <KanbanCard key={i} card={task} i={i} length={cards.length}/>
                                })}
                                {provided.placeholder}
                            </Flex>
                        )}
                    </Droppable>

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
        </Draggable>
    );
}

KanbanColumn.propTypes = {
    cards: PropTypes.array.isRequired,
    column: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
}

export default KanbanColumn;

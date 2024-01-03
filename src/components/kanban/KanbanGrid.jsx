import {Flex, Text} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import KanbanColumn from "./KanbanColumn.jsx";
import {DragDropContext, Droppable} from "react-beautiful-dnd";


let cards = [
    {
        id: 1,
        content: `Card #`
    },
    {
        id: 2,
        content: `Card #`
    },
    {
        id: 3,
        content: `Card #`
    },
    {
        id: 4,
        content: `Card #`
    },
    {
        id: 5,
        content: `Card #`
    },
]

let columns = [
    {
        id: 1,
        title: 'KanbanColumn #'
    },
    {
        id: 2,
        title: 'KanbanColumn #'
    },
    {
        id: 3,
        title: 'KanbanColumn #'
    }
]

function KanbanGrid() {
    // El estado de cada elemento se maneja desde su componente, asi no se comparte

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
                            {columns.map((column, i) => (
                                <KanbanColumn key={i} cards={cards} column={column} index={i}/>
                            ))}

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

function handleDragEnd() {

}

export default KanbanGrid;

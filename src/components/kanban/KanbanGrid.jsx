import {Box, Flex, Input, Text} from "@chakra-ui/react";
import {AddIcon, DragHandleIcon} from "@chakra-ui/icons";
import {useState} from "react";
import KanbanColumn from "./KanbanColumn.jsx";


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
    'Column 1',
    'Column 2',
    'Column 3',
    'Column 4',
    'Column 5',
]

function KanbanGrid() {
    // El estado de cada elemento se maneja desde su componente, asi no se comparte

    // Drag & Drop Context
    return (
        <Flex overflowX="auto" maxW="100vw" p={5} bg={'brand.900'} minH={'87vh'} gap={5}>

            {/* Contenedor de las columnas */}
            {/* Droppable zone */}
            <Flex gap={5}>
                {columns.map((columnTitle, i) => (
                    <KanbanColumn key={i} cards={cards} columnTitle={columnTitle}/>
                ))}
            </Flex>

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
                <Text>Create new board</Text>
            </Flex>
        </Flex>
    );
}

export default KanbanGrid;

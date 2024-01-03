import {Box, Flex, Input} from "@chakra-ui/react";
import {DragHandleIcon} from "@chakra-ui/icons";
import PropTypes from "prop-types";
import {useState} from "react";
import KanbanCard from "./KanbanCard.jsx";

function KanbanColumn({cards, columnTitle}) {
    const [title, setTitle] = useState(columnTitle)
    const [showInput, setShowInput] = useState(false)

    // HTML: Columna
    // Draggable item
    return (
        <Flex bg='brand.800'
              flexDirection={'column'}
              height={'fit-content'}
              width={'300px'}
              maxWidth={'350px'}
              borderRadius={12}
              p={3}
              color={'white'}
        >
            <Flex justifyContent={'center'} alignItems={'center'} gap={3} mb={3}>
                <Input type={'text'}
                       maxLength={28}
                       value={title}
                       onChange={e => setTitle(e.target.value)}/>
                <Box>
                    <DragHandleIcon boxSize={6} color={'white'} cursor={'grab'}/>
                </Box>
            </Flex>

            {/* Droppable zone */}
            <Flex flexDirection='column'>
                {cards.map((card, i) => (
                    // HTML: Tarjeta
                    <KanbanCard key={i} card={card} i={i} length={cards.length}/>
                ))}
            </Flex>

            <Box borderRadius={6}
                 border={'2px solid white'}
                 h={'fit-content'}
                 w={'100%'}
                 mt={3}
                 py={2}
                 px={4}
                 cursor={'pointer'}
            >Add new card</Box>
        </Flex>
    );
}

KanbanColumn.propTypes = {
    cards: PropTypes.array.isRequired,
    columnTitle: PropTypes.string.isRequired,
}

export default KanbanColumn;
import {Box, Input} from "@chakra-ui/react";
import PropTypes from "prop-types";
import {useState} from "react";

function KanbanCard({card, i, length}) {
    const [title, setTitle] = useState(card.content + card.id)
    const [showInput, setShowInput] = useState(false)

    // Draggable item
    return (
        <Box border={'2px solid gray'}
             borderRadius={6}
             h={'fit-content'}
             w={'100%'}
             mb={(i === length - 1) ? 0 : 2} // Si es el último elemento, que no le ponga margen
             key={card.id}
             cursor={'grab'}
        >
            <Input onMouseLeave={() =>
                setShowInput(prev => !prev)
            }
                   onChange={e => setTitle(e.target.value)}
                   type={'text'} value={title} display={showInput ? 'block' : 'none'}/>
            <Box py={2} px={4} display={showInput ? 'none' : 'block'} onClick={() => {
                setShowInput(prev => !prev)
            }}>{card.content + card.id}</Box>
        </Box>
    );
}

KanbanCard.propTypes = {
    card: PropTypes.object.isRequired,
    i: PropTypes.number.isRequired,
    length: PropTypes.number.isRequired,
}

export default KanbanCard;
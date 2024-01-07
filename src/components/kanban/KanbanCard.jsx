import {Box, Input} from "@chakra-ui/react";
import PropTypes from "prop-types";
import {useState} from "react";
import {Draggable} from "react-beautiful-dnd";

function KanbanCard({task, index, length}) {
    const [title, setTitle] = useState(task.content)
    const [showInput, setShowInput] = useState(false)

    // Draggable item
    return (
        <Draggable draggableId={task.taskId} index={index}>
            {(provided) => (
                <Box ref={provided.innerRef}
                     {...provided.draggableProps}
                     {...provided.dragHandleProps}
                     border={'2px solid gray'}
                     borderRadius={6}
                     h={'fit-content'}
                     w={'100%'}
                     mb={(index === length - 1) ? 0 : 2} // Si es el último elemento, que no le ponga margen
                     key={task.taskId}
                     cursor={'grab'}
                >
                    <Input onMouseLeave={() => setShowInput(prev => !prev)}
                           onChange={e => setTitle(e.target.value)}
                           type={'text'} value={title} display={showInput ? 'block' : 'none'}/>
                    <Box py={2} px={4} display={showInput ? 'none' : 'block'} onClick={() => {
                        setShowInput(prev => !prev)
                    }}>{task.content}</Box>
                </Box>
            )}
        </Draggable>
    );
}

KanbanCard.propTypes = {
    task: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    length: PropTypes.number.isRequired,
}

export default KanbanCard;
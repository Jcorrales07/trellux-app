import {format} from 'date-fns'
import {useContext} from "react";
import BoardCard from "./BoardCard.jsx";
import {SimpleGrid} from '@chakra-ui/react'
import {GlobalState} from "../../Store.jsx";
import {DragDropContext, Droppable} from "react-beautiful-dnd";

function BoardGrid() {
    // el estado se actualiza en CreateBoardModalForm y como es global, los cambios se hacen aca tambien
    // eslint-disable-next-line no-unused-vars
    const [globalState, setGlobalState] = useContext(GlobalState)
    const boardsOdr = globalState.userLogged.boardsOrder
    const boards = globalState.userBoards.boards

    console.log(boardsOdr, boards)

    return (
        //Drag and Drop context
        <DragDropContext onDragEnd={handleDragEnd}>
            {/* Droppable zone -> Simple Grid: Aca van todos los boards */}
            <Droppable droppableId='all-boards' direction='horizontal' type='boards'>
                {(provided) => (
                    <SimpleGrid columns={{base: 1, md: 2, lg: 3}}
                                spacing={5}
                                p={4}
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                overflow={'hidden'}
                    >
                        {boardsOdr.map((board, index) => {
                            let boardObj = globalState.userBoards.boards[board]
                            let date = new Date(boardObj.date)
                            let formatDate = format(date, 'MMM dd yyyy')
                            return <BoardCard key={boardObj.id} keyValue={boardObj.id} index={index} title={boardObj.title}
                                              date={formatDate}/>
                        })}
                        {provided.placeholder}
                    </SimpleGrid>
                )}
            </Droppable>
        </DragDropContext>
    );

    function handleDragEnd() {

    }
}

export default BoardGrid;

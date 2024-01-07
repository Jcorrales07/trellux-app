import {format} from 'date-fns'
import {useContext} from "react";
import BoardCard from "./BoardCard.jsx";
import {SimpleGrid} from '@chakra-ui/react'
import {GlobalState} from "../../Store.jsx";

// import {DragDropContext, Droppable} from "react-beautiful-dnd";

function BoardGrid() {
    // el estado se actualiza en CreateBoardModalForm y como es global, los cambios se hacen aca tambien
    // eslint-disable-next-line no-unused-vars
    const [globalState, setGlobalState] = useContext(GlobalState)
    const boardsOdr = globalState.userLogged.boardsOrder
    // const boards = globalState.userBoards.boards

    // console.log(boardsOdr, boards)

    return (
        // QUEDA PENDIENTE EL DRAG N DROP
        <SimpleGrid columns={{base: 1, md: 2, lg: 3}}
                    spacing={5}
                    p={4}
                    overflow={'hidden'}
        >
            {boardsOdr.map((board, index) => {
                let boardObj = globalState.userBoards.boards[board]
                let date = new Date(boardObj.date)
                let formatDate = format(date, 'MMM dd yyyy')
                return <BoardCard key={boardObj.id} id={boardObj.id} index={index} title={boardObj.title}
                                  date={formatDate}/>
            })}
        </SimpleGrid>
    )
}

export default BoardGrid;

import {SimpleGrid} from '@chakra-ui/react'
import BoardCard from "./BoardCard.jsx";
import {useContext} from "react";

import {GlobalState} from "../../Store.jsx";
import {format} from 'date-fns'

function BoardGrid() {
    // el estado se actualiza en CreateBoardModalForm y como es global, los cambios se hacen aca tambien
    // eslint-disable-next-line no-unused-vars
    const [globalState, setGlobalState] = useContext(GlobalState)
    const boardsOdr = globalState.userLogged.boardsOrder
    const boards = globalState.userBoards.boards

    console.log(boardsOdr, boards)

    return (
        //Drag and Drop context

        //Droppable zone
        <SimpleGrid columns={{base: 1, md: 2, lg: 3}} spacing={5} p={4}>
            {/*Draggable */}
            {/* me chilla react, dice que no tiene key */}
            {boardsOdr.map((board) => {
                let boardObj = globalState.userBoards.boards[board]
                let date = new Date(boardObj.date)
                let formatDate = format(date, 'MMM dd yyyy')
                return <BoardCard key={boardObj.id} keyValue={boardObj.id} title={boardObj.title} date={formatDate}/>
            })}
        </SimpleGrid>
    );
}

export default BoardGrid;
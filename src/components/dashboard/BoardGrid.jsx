import {SimpleGrid} from '@chakra-ui/react'
import BoardCard from "./BoardCard.jsx";

let boards = [{
    title: 'Board 1',
    date: '20/2/2024'
}, {
    title: 'Board 2',
    date: '20/2/2024'
}, {
    title: 'Board 3',
    date: '20/2/2024'
}, {
    title: 'Board 4',
    date: '20/2/2024'
}, {
    title: 'Board 5',
    date: '20/2/2024'
}
]

function BoardGrid() {
    return (
        //Drag and Drop context

        //Droppable zone
        <SimpleGrid columns={{base: 1, md: 2, lg: 3}} spacing={5} p={4}>
            {/*Draggable */}
            {boards.map((board, i) => (
                <BoardCard key={i} title={board.title} date={board.date}/>
            ))}
        </SimpleGrid>
    );
}

export default BoardGrid;
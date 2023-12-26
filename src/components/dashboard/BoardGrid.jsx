import BoardCard from "./BoardCard.jsx";

// import {useContext} from "react";
// import {GlobalState} from "../../Store.jsx";

import {SimpleGrid} from '@chakra-ui/react'
// import {useLocalStorage} from "../../hooks/useLocalStorage.jsx";

let boards = [{
    id: 1,
    title: 'Board 1',
    date: '20/2/2024'
}, {
    id: 2,
    title: 'Board 2',
    date: '20/2/2024'
}, {
    id: 3,
    title: 'Board 3',
    date: '20/2/2024'
}, {
    id: 4,
    title: 'Board 4',
    date: '20/2/2024'
}, {
    id: 5,
    title: 'Board 5',
    date: '20/2/2024'
}
]

function BoardGrid() {
    //...va aqui
    return (
        //Drag and Drop context

        //Droppable zone
        <SimpleGrid columns={{base: 1, md: 2, lg: 3}} spacing={5} p={4}>
            {/*Draggable */}
            {/* me chilla react, dice que no tiene key */}
            {boards.map((board) => (
                <BoardCard key={board.id} keyValue={board.id} title={board.title} date={board.date}/>
            ))}
        </SimpleGrid>
    );
}

export default BoardGrid;

// Problema con el key, esto es una alternativa
{/*Asi lo arreglé por ahora, solo que no sé si me va a funcionar para el dnd*/
}
{/*{*/
}
{/*    boards.map((board, i) => (*/
}
{/*        <Box key={i} height='180px' borderRadius={'10px'} p={3}*/
}
{/*             boxShadow={'lg'} bgGradient={[*/
}
{/*            'linear(to-tr, teal.300, yellow.400)',*/
}
{/*            'linear(to-t, blue.200, teal.500)',*/
}
{/*            'linear(to-b, orange.300, purple.500)',*/
}
{/*        ]}*/
}
{/*             cursor={'pointer'}*/
}
{/*            // bgImg={"url('https://loremflickr.com/640/480/abstract')"} investigar esta*/
}
{/*        >*/
}
{/*            <Heading as={'h3'} size={'lg'} textShadow={'2px 3px 8px #000'}*/
}
{/*                     color={'brand.300'}>{board.title}</Heading>*/
}
{/*            <Heading as={'h4'} size={'md'} textShadow={'2px 3px 8px #000'}*/
}
{/*                     color={'brand.300'}>{board.date}</Heading>*/
}
{/*        </Box>*/
}
{/*    ))*/
}
{/*}*/
}

// esto...
// const [globalState, setGlobalState] = useContext(GlobalState)
// const [state, setState] = useLocalStorage('globalState', globalState)
//
// console.log('state', state)
// let user = state.userLogged
// boards = [...boards, ...state.userBoards.boardsOrder]
//
// let id = Math.round(Math.random() * 100)
// console.log(id)
// boards.push({
//     id: user.username + id,
//     title: 'New Board' + id,
//     date: Date.now().toString()
// })
// const newGlobalState = {
//     ...globalState,
//     userLogged: {
//         ...user,
//         boardsOrder: boards
//     }
// }
//
// setGlobalState(newGlobalState)
// console.log(boards)
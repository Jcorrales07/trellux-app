import {Grid, GridItem} from "@chakra-ui/react";
import {Navbar} from "../components/dashboard/";
import Toolbar from "../components/kanban/Toolbar.jsx";
import KanbanGrid from "../components/kanban/KanbanGrid.jsx";
import {useLocalStorage} from "../hooks/useLocalStorage.jsx";

function KanbanPage() {
    // eslint-disable-next-line no-unused-vars
    const [state, setState] = useLocalStorage('globalState')

    // saco la información del board seleccionado
    const boardClicked = state.userBoards.boardSelected

    return (
        <Grid
            // layout
            templateAreas={`"navbar navbar"
                         "subNavbar subNavbar"
                         "kanbanGrid kanbanGrid"`}
            h={'100vh'}
            gridTemplateRows={{base: `65px 55px`, sm: '65px 55px'}}
        >

            <GridItem bg={'brand.500'} area={'navbar'} display={'flex'} alignItems={'center'}>
                <Navbar/>
            </GridItem>

            <GridItem bg={'brand.600'} area={'subNavbar'}>
                <Toolbar kanbanTitle={boardClicked.title}/>
            </GridItem>

            <GridItem area={'kanbanGrid'}>
                <KanbanGrid/>
            </GridItem>

        </Grid>
    );
}

export default KanbanPage;

// <Heading>Kanban Page</Heading>
// <Text>Kan ban with id: {id}</Text>
// <Text>Title: {boardClicked.title}</Text>
// <Text>Username: {boardClicked.username}</Text>
// <Text>date: {boardClicked.date}</Text>
import {Grid, GridItem, Heading, Text} from "@chakra-ui/react";
import {useParams} from "react-router-dom";
import {useLocalStorage} from "../hooks/useLocalStorage.jsx";
import {useContext} from "react";
import {GlobalState} from "../Store.jsx";
import {Navbar} from "../components/dashboard/";

function KanbanPage() {
    // eslint-disable-next-line no-unused-vars
    const [globalState, setGlobalState] = useContext(GlobalState)
    // eslint-disable-next-line no-unused-vars
    const [state, setState] = useLocalStorage('globalState')

    // voy a traer el id desde el parametro
    const id = useParams().kanbanId
    // saco la información del board seleccionado
    const boardClicked = state.userBoards.boardSelected

    return (
        <Grid templateAreas={`"navbar navbar"
                         "subNavbar subNavbar"
                         "kanbanGrid kanbanGrid"`}
              h={'100vh'}
              gridTemplateRows={{base: `65px 65px`, sm: '65px 65px'}}
              // gridTemplateColumns={{md: '300px auto', sm: '250px auto'}}
        >
            <GridItem bg={'brand.500'} area={'navbar'} display={'flex'} alignItems={'center'}>
                <Navbar />
            </GridItem>
            <GridItem area={'subNavbar'} border={'3px solid red'}>e</GridItem>
            <GridItem area={'kanbanGrid'} border={'3px solid green'}>i</GridItem>
        </Grid>
    );
}

export default KanbanPage;

// <Heading>Kanban Page</Heading>
// <Text>Kan ban with id: {id}</Text>
// <Text>Title: {boardClicked.title}</Text>
// <Text>Username: {boardClicked.username}</Text>
// <Text>date: {boardClicked.date}</Text>
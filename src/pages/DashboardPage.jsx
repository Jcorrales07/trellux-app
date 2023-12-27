import {Grid, GridItem} from "@chakra-ui/react";
import {Navbar, Sidebar, BoardGrid} from "../components/dashboard/";
import {useContext} from "react";
import {GlobalState} from "../Store.jsx";
import {useLocalStorage} from "../hooks/useLocalStorage.jsx";


function DashboardPage() {
    // eslint-disable-next-line no-unused-vars
    const [globalState, setGlobalState] = useContext(GlobalState)
    // eslint-disable-next-line no-unused-vars
    const [state, setState] = useLocalStorage('globalState')

    return (
        <Grid
            templateAreas={{
                base: `"navbar navbar"
                  "sidebar sidebar"
                  "main main"`,
                sm: `"navbar navbar"
                  "sidebar main"
                  "sidebar main"`
            }}

            h={'100vh'}
            gridTemplateRows={{base: `65px min-content 82.9vh`, sm: '65px'}}
            gridTemplateColumns={{md: '300px auto', sm: '250px auto'}}

            // Cuando este componente se renderice, ocupo que el estado se establezca
            // con la info del usuario que aca de entrar
            onLoad={() => {
                setGlobalState(state)
            }}
        >
            <GridItem bg={'brand.500'} area={'navbar'} display={'flex'} alignItems={'center'}>
                <Navbar/>
            </GridItem>
            <GridItem bg={'brand.400'} area={'sidebar'}>
                <Sidebar/>
            </GridItem>
            <GridItem bg={'brand.600'} area={'main'} overflowY='auto'>
                <BoardGrid/>
            </GridItem>
        </Grid>
    );
}

export default DashboardPage;
import {Grid, GridItem} from "@chakra-ui/react";
import {Navbar, Sidebar} from "../components/dashboard/";


function DashboardPage() {
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

            minHeight={{base: '100vh', sm: '100vh'}}
            gridTemplateRows={{base: '65px min-content', sm: '65px'}}
            gridTemplateColumns={'350px'}
        >
            <GridItem bg={'brand.500'} area={'navbar'} display={'flex'} alignItems={'center'}>
                <Navbar/>
            </GridItem>
            <GridItem bg={'brand.400'} area={'sidebar'}>
                <Sidebar/>
            </GridItem>
            <GridItem bg={'brand.600'} area={'main'}>Main</GridItem>
        </Grid>
    );
}

export default DashboardPage;
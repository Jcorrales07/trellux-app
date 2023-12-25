import {Navbar, TechSection} from '../components/homepage'
import { Grid, GridItem } from '@chakra-ui/react'

function Homepage() {
    return (
        <Grid
            templateAreas={`"header header"
                            "main main"
                            "footer footer"`}
            templateRows={'60px 1fr'} // Use 1fr for the main section to fill the remaining space
            // gap={1}
            minHeight="100vh" // Set minHeight for the whole grid to fill the entire viewport height
        >
            <GridItem bg="brand.700" gridArea="header" display={'flex'} >
                <Navbar />
            </GridItem>
            <GridItem bg="brand.900" gridArea="main" minHeight="0">
                <TechSection />
            </GridItem>
        </Grid>
    )
}

export default Homepage

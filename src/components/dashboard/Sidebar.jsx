import {Grid, GridItem, Heading} from "@chakra-ui/react";
import CreateBoardModal from "./CreateBoardModal.jsx";

function Sidebar() {
    return (
        <Grid
            id={'sidebar'}
            templateAreas={{
                base: `"search favorites"
                       "create create"`,
                sm: `"search search"
                     "favorites favorites"
                     "create create"`
            }}

            gridTemplateRows={{base: 'min-content min-content', sm: 'repeat(3, min-content)'}}
            gridTemplateColumns={{base: '1fr 1fr', sm: ''}}
            w={'100%'}
            gap={5}
            p={4}
        >
            <GridItem bg={'brand.700'} borderRadius={'8px'} color={'brand.500'} px={3} py={2} border={'1px'}
                      area={'search'} cursor={'pointer'}>
                <Heading size={'md'}>Search</Heading>
            </GridItem>

            <GridItem bg={'brand.700'} borderRadius={'8px'} color={'brand.500'} px={3} py={2} border={'1px'}
                      area={'favorites'} cursor={'pointer'}>
                <Heading size={'md'}>Favorites</Heading>
            </GridItem>

            <GridItem bg={'brand.700'} borderRadius={'8px'} color={'white'} border={'1px'}
                      area={'create'}
                      cursor={'pointer'}
                      display={'flex'}
                      alignItems={'center'}
                      justifyContent={'center'}>
                <CreateBoardModal/>
            </GridItem>
        </Grid>
    );
}

export default Sidebar;
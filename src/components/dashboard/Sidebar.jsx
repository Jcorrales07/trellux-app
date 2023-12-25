import {Grid, GridItem} from "@chakra-ui/react";

function Sidebar() {
    return (
        <Grid
            templateAreas={{
                base: `"search favorites"
                       "create create"`,
                sm: `"search search"
                  "favorites favorites"
                  "create create"`
            }}

            gridTemplateRows={{base: '50px 60px', sm: 'repeat(3, 55px)'}}
            gridTemplateColumns={{base: '1fr 1fr', sm: ''}}
            w={'100%'}
            gap={5}
            p={4}
        >
            <GridItem bg={'brand.700'} borderRadius={'8px'} color={'white'} px={3} py={2} border={'1px'}
                      area={'search'} cursor={'pointer'}>search</GridItem>
            <GridItem bg={'brand.700'} borderRadius={'8px'} color={'white'} px={3} py={2} border={'1px'}
                      area={'favorites'} cursor={'pointer'}>favorites</GridItem>
            <GridItem bg={'brand.700'} borderRadius={'8px'} color={'white'} px={3} py={2} border={'1px'}
                      area={'create'} cursor={'pointer'}>create</GridItem>
        </Grid>
    );
}

export default Sidebar;
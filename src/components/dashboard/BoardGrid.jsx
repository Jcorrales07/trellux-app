import {Box, SimpleGrid} from '@chakra-ui/react'

function BoardGrid() {
    return (
        <SimpleGrid columns={{base: 1, md: 2, lg: 3}} spacing={5} p={4} style={{
            overflow: 'auto',
        }}>
            <Box bg='tomato' height='180px' borderRadius={'10px'}></Box>
            <Box bg='tomato' height='180px' borderRadius={'10px'}></Box>
            <Box bg='tomato' height='180px' borderRadius={'10px'}></Box>
            <Box bg='tomato' height='180px' borderRadius={'10px'}></Box>
            <Box bg='tomato' height='180px' borderRadius={'10px'}></Box>
            <Box bg='tomato' height='180px' borderRadius={'10px'}></Box>
            <Box bg='tomato' height='180px' borderRadius={'10px'}></Box>
            <Box bg='tomato' height='180px' borderRadius={'10px'}></Box>
            <Box bg='tomato' height='180px' borderRadius={'10px'}></Box>
            <Box bg='tomato' height='180px' borderRadius={'10px'}></Box>
            <Box bg='tomato' height='180px' borderRadius={'10px'}></Box>
            <Box bg='tomato' height='180px' borderRadius={'10px'}></Box>
            <Box bg='tomato' height='180px' borderRadius={'10px'}></Box>
            <Box bg='tomato' height='180px' borderRadius={'10px'}></Box>
            <Box bg='tomato' height='180px' borderRadius={'10px'}></Box>
            <Box bg='tomato' height='180px' borderRadius={'10px'}></Box>
            <Box bg='tomato' height='180px' borderRadius={'10px'}></Box>
            <Box bg='tomato' height='180px' borderRadius={'10px'}></Box>
        </SimpleGrid>
    );
}

export default BoardGrid;
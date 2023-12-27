import {Box, Flex, Heading} from "@chakra-ui/react";
import PropTypes from "prop-types";
import {DragHandleIcon} from "@chakra-ui/icons";

function BoardCard({keyValue, title, date}) {

    // Draggable items

    return (
        <Box key={keyValue} height={{base: '180px', xl: '250px', md: '180px'}} borderRadius={'10px'} p={3}
             boxShadow={'lg'} bgGradient={[
            'linear(to-tr, teal.300, yellow.400)',
            'linear(to-t, blue.200, teal.500)',
            'linear(to-b, orange.300, purple.500)',
        ]}
             cursor={'pointer'}
            // bgImg={"url('https://loremflickr.com/640/480/abstract')"} investigar esta
        >
            <Heading as='h3' size={'lg'} textShadow={'2px 3px 8px #000'} color={'brand.300'}>{title || ''}</Heading>
            <Heading as='h4' size={'md'} textShadow={'2px 3px 8px #000'} color={'brand.300'}>{date || ''}</Heading>
            <DragHandleIcon />
        </Box>
    );
}

BoardCard.propTypes = {
    keyValue: PropTypes.any.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
}


export default BoardCard;
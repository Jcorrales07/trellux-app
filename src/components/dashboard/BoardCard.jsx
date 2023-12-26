import {Box, Heading} from "@chakra-ui/react";
import PropTypes from "prop-types";

function BoardCard({key, title, date}) {

    // Dragable items

    return (
        <Box key={key} height='180px' borderRadius={'10px'} p={3}
             boxShadow={'lg'} bgGradient={[
            'linear(to-tr, teal.300, yellow.400)',
            'linear(to-t, blue.200, teal.500)',
            'linear(to-b, orange.300, purple.500)',
        ]}
             cursor={'pointer'}
            // bgImg={"url('https://loremflickr.com/640/480/abstract')"} investigar esta
        >
            <Heading as={'h3'} size={'lg'} textShadow={'2px 3px 8px #000'} color={'brand.300'}>{title}</Heading>
            <Heading as={'h4'} size={'md'} textShadow={'2px 3px 8px #000'} color={'brand.300'}>{date}</Heading>
        </Box>
    );
}

BoardCard.propTypes = {
    key: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
}


export default BoardCard;
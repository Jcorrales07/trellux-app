import {Box, Flex, Heading} from "@chakra-ui/react";
import PropTypes from "prop-types";
import {DragHandleIcon} from "@chakra-ui/icons";
import {Draggable} from "react-beautiful-dnd";
import {draggableDots} from "../../assets/icons/index.js";

function BoardCard({keyValue, index, title, date}) {

    // Draggable items
    return (
        <Draggable draggableId={keyValue} index={index}>
            {(provided) => (
                <Flex key={keyValue}
                      index={index}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      height={{base: '180px', xl: '250px', md: '180px'}}
                      borderRadius={'10px'}
                      p={3}
                      boxShadow={'lg'} bgGradient={[
                    'linear(to-tr, teal.300, yellow.400)',
                    'linear(to-t, blue.200, teal.500)',
                    'linear(to-b, orange.300, purple.500)',
                ]} cursor={'pointer'}
                    // bgImg={"url('https://loremflickr.com/640/480/abstract')"} investigar esta
                >
                    <Flex justifyContent={'space-between'} w={'100%'} m={0}>
                        <Flex flexDirection='column'>
                            <Heading as='h3' size={'lg'} textShadow={'2px 3px 8px #000'}
                                     color={'brand.300'}>{title || ''}</Heading>
                            <Heading as='h4' size={'md'} textShadow={'2px 3px 8px #000'}
                                     color={'brand.300'}>{date || ''}</Heading>
                        </Flex>
                        {/*<DragHandleIcon color={'white'} w={6} h={6} mt={2}*/}
                        {/*                cursor={'grab'} {...provided.dragHandleProps}/>*/}
                        <Box {...provided.dragHandleProps} h='min-content'>
                            <DragHandleIcon color='white' w={6} h={7}/>
                        </Box>
                    </Flex>
                </Flex>
            )}
        </Draggable>
    );
}

BoardCard.propTypes = {
    keyValue: PropTypes.any.isRequired,
    index: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
}


export default BoardCard;
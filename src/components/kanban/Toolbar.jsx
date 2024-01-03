import {Button, Flex, Input} from "@chakra-ui/react";
import PropTypes from "prop-types";
import {useState} from "react";

function Toolbar({kanbanTitle}) {
    const [title, setTitle] = useState(kanbanTitle)
    const [showInput, setShowInput] = useState(false)

    return (
        <Flex maxW={'100vw'} justifyContent={'space-between'} alignItems={'center'} justifyItems={'center'} h={'100%'}
              px={5}>
            <Input display={showInput ? 'block' : 'none'} type={'text'} value={title} maxLength={25}
                   onChange={(e) => {
                       setTitle(e.target.value)
                   }}
                   w={'230px'}
                   color={'white'}
                   onMouseLeave={() => {
                       setShowInput(prev => !prev)
                   }}
            />
            <Flex cursor={'pointer'}
                  w={'auto'}
                  px={4}
                  py={2}
                  border={'1px solid white'}
                  borderRadius={5}
                  display={showInput ? 'none' : 'flex'}
                  onClick={() => {
                      setShowInput(prev => !prev)
                  }}
                  color={'white'}
            >
                {title}
            </Flex>
            <Button>Save changes</Button>
        </Flex>
    );
}

Toolbar.propTypes = {
    kanbanTitle: PropTypes.string.isRequired
}

export default Toolbar;
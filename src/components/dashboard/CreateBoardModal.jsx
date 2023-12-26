import {Button, Flex, Heading, Input} from "@chakra-ui/react";
import PropTypes from "prop-types";
import {useState} from "react";
import {useToast} from "@chakra-ui/react";

function CreateBoardModal() {
    const [showModal, setShowModal] = useState(false)

    return (
        <Flex>
            {showModal ? <CreateBoardModalForm stateFunc={setShowModal}/> :
                <DefaultModal stateFunc={setShowModal}/>}
        </Flex>
    );
}

function CreateBoardModalForm({stateFunc}) {
    const [inputValue, setInputValue] = useState('')
    const toast = useToast()

    return (
        <Flex flexDirection={'column'} textAlign={'center'} gap={2} p={5}>
            <Heading as={'h4'} size={'md'}>Board Title</Heading>
            <Input type={'text'}
                   value={inputValue}
                   onChange={(e) => setInputValue(e.target.value)}
            />
            <Flex justifyContent={'space-around'}>

                <Button onClick={() => {

                    // Crear el board y mandarlo a la db
                    // añadirlo al final del array
                    // ...

                    // Notificar si all good
                    toast({
                        title: 'Board Created!',
                        status: 'success',
                        position: 'top',
                        isClosable: true,
                    })

                    // Si el titulo esta vacio
                    toast({
                        title: 'Title empty',
                        status: 'error',
                        position: 'top',
                        isClosable: true,
                    })

                    // temporal, simulando que tarda un poco
                    setTimeout(() => {
                        stateFunc(prev => !prev)
                    }, 2000)

                }}>
                    Create
                </Button>

                <Button onClick={() => {
                    stateFunc(prev => !prev)
                }}>Cancel</Button>
            </Flex>
        </Flex>
    )
}

function DefaultModal({stateFunc}) {
    return (
        <Flex py={5} onClick={() => stateFunc(prev => !prev)}>
            <Heading as={'h4'} size={'md'}>Create New Board...</Heading>
        </Flex>
    )
}

// Tipado de props, si no no funciona
CreateBoardModalForm.propTypes = {
    inputValue: PropTypes.string,
    stateFunc: PropTypes.func
}

DefaultModal.propTypes = {
    stateFunc: PropTypes.func
}

export default CreateBoardModal;
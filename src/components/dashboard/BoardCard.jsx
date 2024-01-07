import {Box, Flex, Heading} from "@chakra-ui/react";
import PropTypes from "prop-types";
import {DragHandleIcon} from "@chakra-ui/icons";
import {useLocalStorage} from "../../hooks/useLocalStorage.jsx";
import {useContext} from "react";
import {GlobalState} from "../../Store.jsx";

function BoardCard({id, index, title, date}) {
    const [globalState, setGlobalState] = useContext(GlobalState)
    const [state, setState] = useLocalStorage('globalState')

    async function getKanbanData(id) {
        const urlK = `http://localhost:7777/v1/kanbans/${id}`
        const urlC = `http://localhost:7777/v1/columns/${id}`
        const urlT = `http://localhost:7777/v1/tasks/${id}`

        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }

        let kanban = await fetch(urlK, options).then(res => res.json()).then(response => response.columnOrder).catch(e => console.log(e))
        let columns = await fetch(urlC, options).then(res => res.json()).then(response => response.column).catch(e => console.log(e))
        let tasks = await fetch(urlT, options).then(res => res.json()).then(response => response).catch(e => console.log(e))

        // console.log('kaban db', kanban)
        // console.log('columns db', columns)
        // console.log('tasks db', tasks)

        let fetchedColumns = {}
        let fetchedTasks = {}

        for (let i = 0; i < columns.length; i++) {
            let item = columns[i];
            fetchedColumns[item.columnId] = {
                "columnId": item.columnId,
                "title": item.title,
                "tasksIds": item.tasksIds,
                "username": item.username,
                "kanbanId": item.kanbanId,
            };
        }

        for (let i = 0; i < tasks.length; i++) {
            let item = tasks[i];
            fetchedTasks[item.taskId] = {
                "taskId": item.taskId,
                "content": item.content,
                "kanbanId": item.kanbanId,
                "username": item.username,
            };
        }

        // console.log(fetchedTasks, fetchedColumns)

        let newGlobalState = {
            ...globalState,
            kanbanData: {
                ...globalState.kanbanData,
                columnOrder: kanban,
                columns: {
                    ...fetchedColumns,
                },
                tasks: {
                    ...fetchedTasks,
                }
            },
            userBoards: {
                ...globalState.userBoards,
                boardSelected: globalState.userBoards.boards[id]
            }
        }

        console.log('newGlobalState', newGlobalState)

        // Hay un problema. El estado no se actualiza hasta el segundo click
        // Eso esta mal porque la informacion no aparece y hace sentir que no sirve la app.
        setState(newGlobalState)
        setGlobalState(newGlobalState)

        // console.log('state', state, 'globalState', globalState)
    }

    // Draggable items
    return (
        <Flex key={id}
              index={index}
              height={{base: '180px', xl: '250px', md: '180px'}}
              borderRadius={'10px'}
              p={3}
              onLoad={() => {
                  setGlobalState(state)
              }}
              onClick={() => {
                  // consigo la info desde la db
                  getKanbanData(id).then(r => r)

                  // tengo que redirigirme con React router, por ahora me quedo asi
                  // el timeout me ayuda a darle tiempo a que se hagan bien los cambios
                  setTimeout(() => {
                      location.href = `kanban/${id}`
                  }, 500)
              }}
              boxShadow={'lg'}
              bgGradient={[
                  'linear(to-tr, teal.300, yellow.400)',
                  'linear(to-t, blue.200, teal.500)',
                  'linear(to-b, orange.300, purple.500)',
              ]}
              cursor={'pointer'}
            // bgImg={"url('https://loremflickr.com/640/480/abstract')"} investigar esta
        >
            <Flex justifyContent={'space-between'} w={'100%'} m={0}>
                <Flex flexDirection='column'>
                    <Heading as='h3' size={'lg'} textShadow={'2px 3px 8px #000'}
                             color={'brand.300'}>{title || ''}</Heading>
                    <Heading as='h4' size={'md'} textShadow={'2px 3px 8px #000'}
                             color={'brand.300'}>{date || ''}</Heading>
                </Flex>
                <Box h='min-content'>
                    <DragHandleIcon color='white' w={6} h={7}/>
                </Box>
            </Flex>
        </Flex>
    )
}

BoardCard.propTypes = {
    id: PropTypes.any.isRequired,
    index: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
}


export default BoardCard;
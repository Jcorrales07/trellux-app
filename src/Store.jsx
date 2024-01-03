import {createContext, useState} from "react";
import PropTypes from "prop-types";

const defaultState = {
    userLogged: {
        name: '',
        lastname: '',
        username: '',
        email: '',
        accessToken: '',
        boardsOrder: [],
    },
    userBoards: {
        boards: {},
        boardsOrder: [],
        boardSelected: {},
    },
    kanbanData: {
        tasks: {},
        columns: {},
        columnOrder: []
    }
}

export const GlobalState = createContext();

const Store = ({children}) => {
    const [globalState, setGlobalState] = useState(defaultState)

    return (
        <GlobalState.Provider value={[globalState, setGlobalState]}>
            {children}
        </GlobalState.Provider>
    )

}

Store.propTypes = {
    children: PropTypes.any
}

export default Store;

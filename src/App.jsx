// importar el react router
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import {Homepage, LoginPage, RegisterPage, ErrorPage, DashboardPage, KanbanPage} from './pages'
import {ProtectedRoute} from "./ProtectedRoute.jsx";
import {useContext} from "react";
import {GlobalState} from "./Store.jsx";
import {useLocalStorage} from "./hooks/useLocalStorage.jsx";

function App() {
    //accedo al estado global persistente, para saber si hay un usuario autenticado
    //intente usar el context y el useLocalStorage pero no me funciona.
    // const persistedState = JSON.parse(localStorage.getItem('globalState'))

    // eslint-disable-next-line no-unused-vars
    const [globalState, setGlobalState] = useContext(GlobalState)
    // eslint-disable-next-line no-unused-vars
    const [state, setState] = useLocalStorage('globalState')

    console.log('state persistido desde App', state)

    return (
        <Router>
            <Routes>
                <Route path={"/"} element={<Homepage/>}/>
                <Route path={"/login"} element={<LoginPage/>}/>
                <Route path={"/register"} element={<RegisterPage/>}/>
                {/*// Ruta protegida*/}
                <Route element={<ProtectedRoute authUser={state.userLogged.accessToken} path={"/login"}/>}>
                    <Route path={'/dashboard'} element={<DashboardPage/>}/>
                    <Route path={"/kanban/:kanbanId"} element={<KanbanPage/>}/>
                </Route>
                <Route path={"*"} element={<ErrorPage/>}/>
            </Routes>
        </Router>
    )
}

export default App
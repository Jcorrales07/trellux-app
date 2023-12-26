// importar el react router
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import {Homepage, LoginPage, RegisterPage, ErrorPage, DashboardPage} from './pages'
import {ProtectedRoute} from "./ProtectedRoute.jsx";
// import {useLocalStorage} from "./hooks/useLocalStorage.jsx";
// import {useContext} from "react";
// import {GlobalState} from "./Store.jsx";

function App() {
    //accedo al estado global persistente, para saber si hay un usuario autenticado
    //intente usar el context y el useLocalStorage pero no me funciona.
    const persistedState = JSON.parse(localStorage.getItem('globalState'))

    return (
        <Router>
            <Routes>
                <Route path={"/"} element={<Homepage/>}/>
                <Route path={"/login"} element={<LoginPage/>}/>
                <Route path={"/register"} element={<RegisterPage/>}/>
                {/*// Ruta protegida*/}
                <Route element={<ProtectedRoute authUser={persistedState.userLogged.accessToken} path={"/login"}/>}>
                    <Route path={'/dashboard'} element={<DashboardPage/>}/>
                    {/*<Route path={"/board/:boardId"} element={<KanbanBoard />} />*/}
                </Route>
                <Route path={"*"} element={<ErrorPage/>}/>
            </Routes>
        </Router>
    )
}

export default App
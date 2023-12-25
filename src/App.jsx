// importar el react router
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import {Homepage, LoginPage, RegisterPage, ErrorPage, DashboardPage} from './pages'

function App() {
    return (
        <Router>
            <Routes>
                <Route path={"/"} element={<Homepage/>}/>
                <Route path={"/login"} element={<LoginPage/>}/>
                <Route path={"/register"} element={<RegisterPage/>}/>
                <Route path={"/dashboard"} element={<DashboardPage />} />
                {/*// Ruta protegida*/}
                {/*<Route element={<ProtectedRouter />} authUser={user} path={"/login"} >*/}
                {/*  <Route path={'/dashboard'} element={<Dashboard />} />*/}
                {/*  <Route path={"/board/:boardId"} element={<KanbanBoard />} />*/}
                {/*</Route>*/}
                <Route path={"*"} element={<ErrorPage/>}/>
            </Routes>
        </Router>
    )
}

export default App
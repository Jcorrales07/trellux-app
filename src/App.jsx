// importar el react router
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {Homepage, LoginPage, RegisterPage} from './pages'

function App() {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<Homepage />} />
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/register"} element={<RegisterPage />} />
        {/*// Ruta protegida*/}
        {/*<Route element={<ProtectedRouter />} authUser={user} path={"/login"} >*/}
        {/*  <Route path={'/dashboard'} element={<Dashboard />} />*/}
        {/*  <Route path={"/board/:boardId"} element={<KanbanBoard />} />*/}
        {/*</Route>*/}
      </Routes>
    </Router>
  )
}

export default App
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm'
import Main from "./components/Main"
import Welcome from './components/Welcome'
// import authenticateUser from "./api"

export default function App() {
  // function handleLogin(loginInfo) {
  //   return authenticateUser(loginInfo)
  // }

  return (
    // <div>
    //   <Welcome />
    // </div>
    <Router>
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/main' element={<Main />} />
      </Routes>
    </Router>
  );
}
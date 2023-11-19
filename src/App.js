import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm'
import Main from "./Main"
// import authenticateUser from "./api"

export default function App() {
  // function handleLogin(loginInfo) {
  //   return authenticateUser(loginInfo)
  // }

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='/main' element={<Main />} />
      </Routes>
    </Router>
  );
}
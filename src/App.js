import './App.css';
import LoginForm from './LoginForm';
import Main from "./Main"
import authenticateUser from "./api"

export default function App() {
  function handleLogin(loginInfo) {
    return authenticateUser(loginInfo)
  }
  return (
    <div>
      <LoginForm onLogin={handleLogin} />
      <Main />
    </div>
  );
}
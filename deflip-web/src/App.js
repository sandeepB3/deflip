import logo from "./logo.svg";

import Menu from "./Components/Menu";
import Container from "./Components/Container";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Screen from "./Components/Screen";
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";
import AuthState from "./contexts/AuthState";
import AddItemForm from "./Components/AddItemForm";
function App() {
  return (
    <AuthState>
    <BrowserRouter>
    
    <Routes>
    
    <Route path="/" element={<Screen/>} />
    <Route path="/login" element={<Signin/>}/> 
    <Route path="/register" element={<Signup/>}/>
    <Route path="/addItem" element={<AddItemForm/>}/>
    </Routes>
    
    </BrowserRouter>
    </AuthState>
  );
}

export default App;

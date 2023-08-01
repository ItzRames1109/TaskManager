

import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import AddTask from './components/AddTask';
import List from './components/List';
import Update from './components/Update';
import Edit from './components/Edit';

function App() {
  return (
    <div className="App">
      <BrowserRouter> 
      <Navbar/>
        <Routes>
            <Route exact path = "/" element = {<AddTask/>} />
            <Route  path = "/list" element = {<List/>} />
            <Route  path = "/update" element = {<Update/>} />
            <Route  path = "/:id" element = {<Edit/>} />

            </Routes>
      </BrowserRouter>
    
    </div>
  );
}

export default App;

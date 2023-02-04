import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HeaderComponent from './components/HeaderComponent';
import ListEmployeeComponent from './components/ListEmployeeComponent';

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className="container">
          <Routes>
            <Route exact path='/' element = {<ListEmployeeComponent/>}></Route>
            <Route exact path='/employees' element = {<ListEmployeeComponent/>}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;

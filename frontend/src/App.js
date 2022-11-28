import './index.css';
import Firstpage from './pages/Firstpage';
import React from 'react';
import  {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import MainPage from './pages/MainPage';
import RentPage from './pages/RentPage';
import Donate from './pages/Donate'




function App() {
  
  return(
    <BrowserRouter>
    <Routes>

    <Route path='/' element={<Firstpage/>}/>
    <Route path='/Home' element={<Home/>}/>
    <Route path='/LogIn' element={<LogIn/>}/>
    <Route path='/SignUp' element={<SignUp/>}/>
    <Route path='/MainPage' element={<MainPage/>}/>
    <Route path='/Rent' element={<RentPage/>}/>
    <Route path='/Donate' element={<Donate/>}/>
    


    </Routes>
    
    
    </BrowserRouter>
    




  )
}

export default App;

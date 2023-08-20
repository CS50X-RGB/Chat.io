import { Route, Routes } from 'react-router-dom';
import JoinRoom from './pages/joinRoom';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';
import Home from './pages/Home';
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <>
    <Routes>
      <Route path='/join' element={<JoinRoom/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/*' element={<NotFound/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
    <Toaster/>
    </>
  )
}
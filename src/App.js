import { Route, Routes } from 'react-router-dom';
import JoinRoom from './joinRoom';

export default function App() {
  return (
    <>
    <Routes>
      <Route path='/join' element={<JoinRoom/>}/>
    </Routes>
    </>
  )
}
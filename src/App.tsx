import { Route, Routes } from 'react-router-dom';
import ChatRoom from './pages/ChatRoom';
import Home from './pages/Home';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/room/:room_id' element={<ChatRoom />} />
        </Routes>
    );
}

export default App;

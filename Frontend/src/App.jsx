import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/login';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import AddMovie from './pages/AddMovie';
import EditMovie from './pages/EditMovie';
import "./index.css";
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/admin"element={<AdminRoute><AdminDashboard /></AdminRoute> }/>
        <Route path="/admin/add" element={<AdminRoute><AddMovie /></AdminRoute>} />
        <Route path="/admin/edit/:id" element={<AdminRoute><EditMovie /></AdminRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

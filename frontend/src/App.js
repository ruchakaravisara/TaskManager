import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import TaskList from './components/TaskList';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token to log out
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <div className="container mt-5">
                {isAuthenticated ? (
                    <>
                        <Button variant="secondary" onClick={handleLogout} className="mb-3">Logout</Button>
                        <Routes>
                            <Route path="/tasks" element={<TaskList />} />
                            <Route path="*" element={<Navigate to="/tasks" />} />
                        </Routes>
                    </>
                ) : (
                    <Routes>
                        <Route path="/login" element={<Login onLogin={handleLogin} />} />
                        <Route path="/signup" element={<Signup onSignup={handleLogin} />} />
                        <Route path="*" element={<Navigate to="/login" />} />
                    </Routes>
                )}
                {!isAuthenticated && (
                    <div className="text-center mt-3">
                        <Link to={isAuthenticated ? "/tasks" : "/login"} className="me-2">
                            <Button variant="link">Login</Button>
                        </Link>
                        <Link to="/signup">
                            <Button variant="link">Signup</Button>
                        </Link>
                    </div>
                )}
            </div>
        </Router>
    );
}

export default App;

import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Form from './components/Form';

function App() {
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={token ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Form />} />
        </Routes>
      </Router>
    </div>
  )
}
export default App
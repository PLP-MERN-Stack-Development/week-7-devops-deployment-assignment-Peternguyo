import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const Notes = lazy(() => import('./pages/Notes'));

function App() {
  return (
    <Router>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/">Home</Link> | <Link to="/notes">Notes</Link>
      </nav>
      <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<Notes />} />
          {/* Public health check route */}
          <Route path="/ping" element={<div>pong</div>} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App; 
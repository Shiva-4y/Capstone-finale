import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/AuthContext';
import Layout from './Layout/Layout';
import HomePage from './Home/HomePage';
import AuthenticatedHomePage from './Home/AuthenticatedHomePage';
import Login from './Login';
import Register from './Register';
import WardrobePage from './Wardrobe/WardrobePage';
import AddWardrobeItem from './Wardrobe/AddWardrobeItem';
import EditWardrobeItem from './Wardrobe/EditWardrobeItem';

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px',
        color: '#666'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={
        <Layout>
          {user ? <AuthenticatedHomePage /> : <HomePage />}
        </Layout>
      } />
                   <Route path="/login" element={<Login />} />
             <Route path="/register" element={<Register />} />
                           <Route path="/wardrobe" element={<WardrobePage />} />
              <Route path="/wardrobe/add" element={<AddWardrobeItem />} />
              <Route path="/wardrobe/edit/:id" element={<EditWardrobeItem />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
} 
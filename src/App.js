import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import Homepage from './views/Homepage';
import Registerpage from './views/Registerpage';
import Loginpage from './views/Loginpage';
import Navbar from './views/Navbar';
import Todo from './views/Todo';
import Message from './views/Message';
import SearchUsers from './views/SearchUsers';
import MessageDetail from './views/MessageDetail';
import EditProfile from './views/EditProfile';
import User from './views/AllUsers';  // নাম বড় হাতের করা হয়েছে

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Registerpage />} />
          <Route path="/update/" element={<EditProfile />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/inbox" element={<Message />} />
          {/* এখানে /inbox এর জন্য আরেকটা রাউট রাখা ঠিক হবে না, তাই আলাদা path দাও */}
          <Route path="/users" element={<User />} /> 

          <Route path="/search/:username" element={<SearchUsers />} />
          
          {/* Private Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <EditProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/inbox/:id"
            element={
              <PrivateRoute>
                <MessageDetail />
              </PrivateRoute>
            }
          />
          
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

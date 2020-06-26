import React from 'react';
import Footer from './Components/FooterComponent';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div>
        <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;

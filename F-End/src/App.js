import React from 'react';
import Footer from './Components/FooterComponent';
import ContactUs from './Components/ContactUsComponent';
import AboutUs from './Components/AboutUsComponent';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div>
        <Route exact path="/contactus" component={ContactUs} />
        <Route exact path="/aboutus" component={AboutUs} />
        <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;

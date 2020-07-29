import React, { Component } from 'react';
import Footer from './Components/FooterComponent';
import ContactUs from './Components/ContactUsComponent';
import AboutUs from './Components/AboutUsComponent';
import Post from './QnPostnPoll/AddComponent';
import Community from './Components/CommunityComponent';
import Reply from './Components/ReplyComponent';
import './css/styles.css';
import ReplyDesign from './Components/ReplyDesign';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      login : false
    }
  }
  
  render() {
  return (
    <BrowserRouter>
    
    {/*
    <div>
      <Profile />
    </div>
    
    
    <div>
      <Answer login={this.state.login} />
    </div>
    <div>
      <Post />
    </div>

        <div>
      <Reply login={this.state.login} />
    </div>
    */}

    <div>
      <ReplyDesign />
    </div>

    <div>
        <Route exact path="/contactus" component={ContactUs} />
        <Route exact path="/aboutus" component={AboutUs} />
        <Footer />
    </div>
    </BrowserRouter>
  );
}
}

export default App;

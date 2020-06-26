import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { List, ListItem, Link } from '@material-ui/core';
import './Footer-css.css';


function Footer() {
    
    return(
        <div>
            <Grid className="footer-top" container>
                <Grid className="footer-item" item xs={12} md={4}>
                    <div className="footer-logo">
                    <img width="150" height="150" alt="Recruiting Monk" src="assets/images/logo-recruitingmonk-vertical-color-transbg.png" />
                    </div>
                    <div className="footer-logo-text">
                    <h4>Recruiting Monk</h4>
                    <p>Recruiting Monk is a community for Recruiters across the globe. You can ask questions, create polls & get answers to your recruiting challenges from the Recruiting Monks.</p>
                    </div>
                </Grid>
                <Grid className="footer-item-other" xs={4} item md={2}>
                    <h4 className="footer-headings">About</h4>
                    <List>
                        <ListItem className="list-item">
                            <Link className="footer-links" href="#" >About Us</Link>
                        </ListItem>
                        <ListItem className="list-item">
                            <Link className="footer-links" href="#">Contact Us</Link>
                        </ListItem>
                    </List>
                </Grid>
                <Grid className="footer-item-other" display={{ xs: 'none', sm: 'none', md: 'block' }} item md={2}></Grid>
                <Grid className="footer-item-other" item xs={5} md={2}>
                    <h4 className="footer-headings">Follow Us</h4>
                    <List className="social-list">
                    <ListItem className="social-list-item">
                        <Link className="footer-social-links" target="_blank" href="https://www.facebook.com/recruitingmonk">
                            <span className="footer-social-icon"><i class="fa fa-facebook"></i></span>
                        </Link>
                    </ListItem>
                    <ListItem className="social-list-item">
                        <Link className="footer-social-links" target="_blank" href="https://www.linkedin.com/company/recruitingmonk">
                            <span className="footer-social-icon"><i class="fa fa-linkedin"></i></span>
                        </Link>
                    </ListItem>
                    <ListItem className="social-list-item">
                        <Link className="footer-social-links" target="_blank" href="https://twitter.com/recruitingmonk">
                            <span className="footer-social-icon"><i class="fa fa-twitter"></i></span>
                        </Link>
                    </ListItem>
                    </List>
                </Grid>
            </Grid>
            <hr />
            <Grid className="footer-bottom" container>
            <Grid item> © 2019 Recruiting Monk. All Rights Reserved.</Grid>
            </Grid>
        </div>
    );
}

export default Footer;
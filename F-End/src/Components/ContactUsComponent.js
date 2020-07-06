import React, { Component } from 'react';
import { Grid, FormHelperText, TextField, Button } from '@material-ui/core';

class ContactUs extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            mobile: '',
            subject: '',
            message: '',
            dis: true
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

        const reg = /^\d+$/;
        if( !(!reg.test(this.state.mobile) && this.state.mobile.length < 10) && !(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.email)) && !(this.state.message.length < 10) ) {
            this.setState({
                dis: false
            });
        }
    }

    handleSubmit(event) {
        console.log("Curent State is : " + JSON.stringify(this.state));
        alert("Curent State is : " + JSON.stringify(this.state));
        event.preventDefault();
    }

    render() {

    return(
        <div style={{ background: 'white', padding: '25px' }}>
            <form>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth type="text" name="name" label="Name" placeholder="Your Name"
                            variant="outlined" className="contact-form-field"
                            value={this.state.name}
                            onChange={this.handleInput} />
                            <FormHelperText></FormHelperText>
                     </Grid>
                     <Grid item xs={12} md={6}>
                        <TextField fullWidth type="email" name="email" label="Email" placeholder="Your Email"
                            variant="outlined" className="contact-form-field"
                            value={this.state.email}
                            onChange={this.handleInput} />
                            <FormHelperText></FormHelperText>
                     </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth name="mobile" label="Mobile Number" placeholder="Your Mobile Number"
                            variant="outlined" className="contact-form-field"
                            value={this.state.mobile}
                            onChange={this.handleInput} />
                            <FormHelperText></FormHelperText>
                     </Grid>
                     <Grid item xs={12} md={6}>
                        <TextField fullWidth type="text" name="subject" label="Subject" placeholder="Your Subject"
                            variant="outlined" className="contact-form-field"
                            value={this.state.subject}
                            onChange={this.handleInput} />
                            <FormHelperText></FormHelperText>
                     </Grid>
                </Grid>
                <TextField multiline rows={10} maxRows={20} name="message"
                     fullWidth label="Message" placeholder="Your Message"
                     variant="outlined" className="contact-form-field"
                     value={this.state.message}
                     onChange={this.handleInput} />
                     <FormHelperText></FormHelperText>
                <Button className="contact-form-submit" variant="contained" fullWidth
                    disabled={this.state.dis} onClick={this.handleSubmit}
                >Send</Button>
            </form>
        </div>
    );
    }
}

export default ContactUs;
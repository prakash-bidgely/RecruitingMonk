import React from 'react';
import { Dialog, DialogContent, DialogContentText, DialogActions, Button, DialogTitle,
            TextField, MenuItem, Grid } from '@material-ui/core';


function InformationGathering() {
    const [open, setOpen] = React.useState(false);
    const [state, setState] = React.useState({
        designation: '',
        company: '',
        industry: '',
        experience: '',
        location: ''
    });

    const handleChange = (event) => {
        setState({...state,
            [event.target.name]: event.target.value
        })
    };

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSubmit = () => {
        handleClose();
        alert("Curent State is : " + JSON.stringify(state));
    }

    return(
        <div>
            <Button variant="outlined" onClick={handleOpen} >Information Gathering Form</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="information-gathering-popup" fullWidth>
                <DialogTitle>Complete Profile
                    <Button style={{float: 'right', marginRight: '-24px'}} onClick={handleClose}><span class="fa fa-times"></span></Button>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Tell Us A Bit About Yourself
                    </DialogContentText>
                    <form onSubmit={handleSubmit}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <TextField id="designation" name="designation" label="Designation" required={true}
                                value={state.designation} onChange={handleChange} select fullWidth>
                                <MenuItem value="Consultant">Consultant</MenuItem>
                                <MenuItem value="Senior Recruiter/TA/HR">Senior Recruiter/TA/HR</MenuItem>
                                <MenuItem value="Lead Recruiter/TA/HR">Lead Recruiter/TA/HR</MenuItem>
                                <MenuItem value="Manager Recruiter/TA/HR">Manager Recruiter/TA/HR</MenuItem>
                                <MenuItem value="VP Recruiter/TA/HR">VP Recruiter/TA/HR</MenuItem>
                                <MenuItem value="Director">Director</MenuItem>
                                <MenuItem value="CEO">CEO</MenuItem>
                                <MenuItem value="Others">Others</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="company-name" onChange={handleChange} label="Company Name" name="company"
                                value={state.company} fullWidth required={true}></TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="industry" label="Industry" name="industry" required={true}
                                value={state.industry} onChange={handleChange} select fullWidth>
                                <MenuItem value="Staffing">Staffing</MenuItem>
                                <MenuItem value="IT Services">IT Services</MenuItem>
                                <MenuItem value="Internet">Internet</MenuItem>
                                <MenuItem value="BPO/KPO">BPO/KPO</MenuItem>
                                <MenuItem value="BFSI/Investment Bank">BFSI/Investment Bank</MenuItem>
                                <MenuItem value="Embedded">Embedded</MenuItem>
                                <MenuItem value="Others">Others</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField type="number" id="experience" name="experience" required={true}
                                value={state.experience} onChange={handleChange}
                                InputProps={{ inputProps: { min: 0, max: 50 } }}
                                label="Experience (in years)" fullWidth>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="location" label="Location" name="location" required={true}
                                value={state.location} onChange={handleChange} fullWidth>
                            </TextField>
                        </Grid>
                    </Grid>
                    <br /><br />
                    <DialogActions>
                        <Button style={{background: 'white'}} variant="outlined" onClick={handleClose}>Cancel</Button>
                        <Button style={{background: '#b0343c', color: 'white'}} type="submit" variant="outlined">Submit</Button>
                    </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default InformationGathering;
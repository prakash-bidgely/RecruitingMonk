import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import AttachmentIcon from '@material-ui/icons/Attachment';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import '../css/ReplyComponent.css';


class Answer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            reply: "",
            dis: true,
            display: "block"
          };
    }

    handleReply = e => {

        if ( e.target.value === "" ) {
            this.setState({
                dis: true,
                reply: ""
              });
        }
        else {
        this.setState({
          reply: e.target.value,
          dis: false
        });
        }
    };
    
      submitReply = e => {

        //database storing code will come here
    
        this.setState({
          reply: "",
          dis: true
        });
      };

      cancelReply = e => {
        
        //hide the container

        this.setState({
            display: "none"
          });
      }

    render() {
            
        if( this.props.login === true) {   
            return(
            <div className="reply-container" style={{display: this.state.display}}>
            <form noValidate autoComplete="off">
                <TextField fullWidth multiline value={this.state.reply}
                onChange={this.handleReply}
                rowsMax={100} className="reply-field" rows={4}
                label="Your Reply" placeholder="Type Your Reply Here" 
                variant="outlined" />

                <div align="right">
                <input accept="file/*" id="attachment-file" type="file" />
                    <label htmlFor="attachment-file">
                        <IconButton className="file-attach" aria-label="attachment" component="span">
                        <AttachmentIcon />        
                        </IconButton>
                    </label>
                </div>
                    <div align="right" style={{ paddingTop: '80px' }} className="reply-container-buttons">
                        <Button size="small" variant="contained" className="Cancel-reply"
                        onClick={this.cancelReply}
                        >Cancel</Button>
                        
                        <Button size="small" variant="contained" className="Submit-reply"
                        disabled={this.state.dis}
                        onClick={this.submitReply}
                        >Reply</Button>
                    </div>            
            </form>
            </div>
            );
        }
        else {
            return(
                <div align="center">You must be logged in to reply to an answer.</div>
            );
        }
    }
}

export default Answer;
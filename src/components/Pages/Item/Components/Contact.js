import React from 'react';
import axios from 'axios';
import "../../../../css/bootstrap.min.css"
import "../../../../css/item.css"


class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemid: '',
            owner: '',
            subject: '',
            text: ''
        }

        this.onChange = this.onChange.bind(this);
        this.sendMassage = this.sendMassage.bind(this)
    }


    componentWillReceiveProps(prop){
        console.log(prop)
        this.setState({
            itemid:prop.item_id,
            owner:prop.owner
        })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    sendMassage(e) {
        e.preventDefault();
        axios.post('https://lost-and-share.herokuapp.com/events/sendEmail', {
            emailto: this.state.owner,
            subject: this.state.subject,
            text: this.state.text,
            itemid: this.state.itemid
        })
            .then((data) => {
                console.log(data)
                this.props.hideSendForm()


            })
            .catch((error) => (console.log(error)));

    }

    render() {
        return (
            <div className="send_email">
                <div className="row mt-5 row-report">
                    <div className="col-md-6 m-auto">
                        <div className="card card-body report-card">
                            <h3>Contact Member</h3>
                            <h5>Item Num. {this.state.itemid}</h5>
                            <button onClick={this.props.hideSendForm} className="btn btn-primary exit">
                                X
                </button>
                            <form onSubmit={this.sendMassage} encType="multipart/form-data">
                                <div className="form-group">
                                    <label htmlFor="title">To:</label>
                                    <input
                                        value={this.state.owner}
                                        onChange={this.onChange}
                                        type="send_to"
                                        id="send_to"
                                        name="send_to"
                                        required
                                        className="form-control form-control-report"
                                        placeholder="Enter Item Email"

                                    ></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="title">Subject</label>
                                    <input
                                        onChange={this.onChange}
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        required
                                        className="form-control form-control-report"
                                        placeholder={"I wanted to ask about..."}
                                    ></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Text</label>
                                    <textarea
                                        onChange={this.onChange}
                                        type="text"
                                        id="text"
                                        name="text"
                                        required
                                        className="form-control sender_text"
                                        placeholder={"What you wanted to ask..."}

                                    ></textarea >
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">
                                    Send
                  </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}




export default Contact;

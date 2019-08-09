import React, {Component} from 'react';
import './bootstrap.min.css';
import './App.css';
import axios from 'axios'
import {setData} from './js/actions/index'
import { connect } from "react-redux"

function mapDispatchToProps(dispatch){
    return {
        setData: data => dispatch(setData(data))
    }
}

class Entry extends Component {
   constructor(props){
    super(props)
    this.state = {
        showFunc : props.showFunc,
        showing : props.showing,
        path: props.path,
        input: ''
    }

    this.submitClick = this.submitClick.bind(this)
    this.handleTextareaInput = this.handleTextareaInput.bind(this)
    this.inputRef = React.createRef()
   }

   handleTextareaInput (e) {
       this.setState({
           input: e.target.value
       })
   }

   submitClick(e) {
        e.preventDefault();
        axios.post('/input', {input: this.state.input})
        .then((res) => {
            this.props.setData(res.data)
        })
        .catch((err) => {
            console.log(err)
        })

        this.state.showFunc()


   }

   render() {
    let styleT = {};
    if(!this.props.showing)
      styleT = {display: "none"};
    return (
        <div style={styleT} className="form-group EntryClass">
            <label htmlFor="FormControlTextarea">Enter data:</label>
            <textarea className="form-control" id="FormControlTextarea" rows="5" ref={this.inputRef} onChange={this.handleTextareaInput}></textarea>
            <button type="submit" className="btn btn-primary" onClick={this.submitClick}>Submit</button>
        </div>
    )
   }
}

export default connect(null, mapDispatchToProps)(Entry);

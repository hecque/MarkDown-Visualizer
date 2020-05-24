import React, { Component } from 'react';
import './App.css';
import { sampleText } from './sampleText';
import marked from 'marked';


class App extends Component{
  state = {
    text: sampleText
  }


  handleChange = event => {
    const text = event.target.value
    this.setState({ text })
  }

  renderMarkdown = text => {
    const __html = marked(text, { sanitize: true })
    return { __html }
  }

  componentDidMount() {
    const text = localStorage.getItem('text')
    if(text){
      this.setState({text})
    }
    else {
      this.setState({text: sampleText})
    }
  }

  componentDidUpdate() {
    const text = this.state.text
    localStorage.setItem('text', text)
  }


  render(){
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <textarea
              onChange={ this.handleChange }
              rows="35" 
              className='form-control' 
              value={ this.state.text }>
            </textarea>
          </div>
          <div className="col-sm-6">
            <div dangerouslySetInnerHTML = {this.renderMarkdown(this.state.text)}></div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
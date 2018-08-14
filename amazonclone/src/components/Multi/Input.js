import React, { Component } from 'react';

class Input extends Component {
  constructor(){
    super()

    this.state = {

    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e){
    var name = e.target.name
    var value = e.target.value

    this.setState({
      [name] : value
    })
  }

  handleSubmit(e){
    e.preventDefault()
    var data = {}
    for (var i = 0; i < this.props.inputs.length; i++) {
      data[this.props.inputs[i].name] = this.state[this.props.inputs[i].name]
      this.setState({
        [this.props.inputs[i].name] : ''
      })
    }
    this.props.execute(data,this.props.options)
  }

  render() {
    let input = this.props.inputs.map((i,k)=> 
      <input name={i.name} key={k} value={this.state[i.name]||""} placeholder={i.name} type={i.type} onChange={this.handleChange} />)
    return (
      <form onSubmit={this.handleSubmit}>
        {input}
        <input type="submit" />
      </form>
    );
  }
}

Input.defaultProps ={
  options:{}
}
export default Input;
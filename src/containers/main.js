import React from 'react';
import { fractions } from './fractions';
import InputText from '../components/inputText';

export default class Main extends React.Component {
	constructor(props, context) {
			super(props, context);
			this.state = {
        input: "",
        number: 0,
        error: "",
        arr: [],
        converting: false
      };
  }
  onChange = (event) => {
    //validation
    const input = event.target.value;
    const validate =  /^(rp|rp\s)?\d{1,3}(?:\.\d{3})+(\,0{0,2})?$|^(rp|rp\s)?\d+$/gi;
    let error = validate.test(input) ? '' : 'Format Invalid';
    error = input.toUpperCase().trim() == 'RP' ? 'Missing Value' : ''; 
    let number = null;
    //parsing
    if(error ==''){
      const parse = parseInt(input.replace(/,.*|[^0-9]/g, ''), 10)
      number = parse? parse: 0;
      error = number == 0  ? 'Please input number more than 0' : '';
    }
    
    this.setState({input, error, number});
  }
  convert = (event) =>{
    event.preventDefault();
    const {number} = this.state;
    this.setState({converting: true})
    const smallest = fractions[fractions.length-1];
    let sum = number;
    let i = 0;
    let arr = [];
    let x = 0;
    while(sum >= smallest){     
      if(sum >= fractions[i]){
        sum = sum - fractions[i];
        x++
      } else {
        if(x !== 0){
          arr.push(`${x} x Rp${fractions[i]}`);
        } 
        i++
        x = 0;
      }
      if(sum == 0 || sum < smallest){
        arr.push(`${x} x Rp${fractions[i]}`);
      }
    }
    if(sum !== 0){
      arr.push(`Rp${sum} left`)
    }
    this.setState({converting: false, arr})
  }
  render() {
    const {input, error, arr, converting} = this.state;
    return (
      <form className="main-form" onSubmit={(e) => this.convert(e)}>
        <p>test</p>
        <InputText
            onChange={this.onChange}
            value={input}
            placeHolder="Input Here"
          />
          <p style={{color:'red'}}>{error}</p>
          <input
            type="submit"
            disabled={converting}
            value="Convert"
            className="btn btn-primary center-block"/>
            {arr.map((list,i) => {
              return <p key={i}>{list}</p>
            })}
      </form>
    );
  }
}
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
      };
  }
  onChange = (event) => {
    const {arr} = this.state;

    //validation
    const input = event.target.value;
    const empty = input == ''? true: false;
    const validate = /(?=.*\d)^(rp|rp\s)?(([0]*[1-9]\d{0,2}(\.\d{3})*)|\d+)?(,0{2})?$/i;
    let error = validate.test(input) || empty ? '' : 'Format Invalid';
    let number = null;
    
    //parsing
    if(error === ''){
      const parse = parseInt(input.replace(/,.*|[^0-9]/g, ''), 10);
      number = parse? parse: 0;
      error = number == 0  && !empty ? 'Please input value more than 0' : '';
    } 

    error = input.toUpperCase().trim() == 'RP' ? 'Missing Value' : error;
    this.setState({input, error, number, arr: empty?[]:arr});
  }

  convert = (event) => {
    event.preventDefault();
    const {number} = this.state;
    if (number !== null && number.toString().length > 15) {
      this.setState({error: 'Max number exceeded'})
      return false;
    }
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
    if(sum !== 0 && sum !== null){
      arr.push(`Rp${sum} left (no available fraction)`)
    }
    this.setState({arr});
  }
  
  render() {
    const {input, error, arr} = this.state;
    return (
      <div>
        <div className="side-view">
          <h1 className="side-title">RUPIAH CONVERTER</h1>
        </div>
        <form className="main-form" onSubmit={(e) => {this.convert(e)}}>
          <h1 className="main-title">RUPIAH CONVERTER</h1>
          <InputText
              onChange={this.onChange}
              value={input}
              placeHolder="Input Value Here"
              maxLen="26"
            />
            <p style={{color: 'white'}}>{error}</p>
            <input
              type="submit"
              value="Convert"
              className="btn btn-primary main-button"/>
              {arr.map((list,i) => {
                return <p key={i} className="fractions">{list}</p>
              })}
        </form>
      </div>
    );
  }
}
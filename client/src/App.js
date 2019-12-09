import React from 'react';
import Axios from 'axios';
import DayPicker from 'react-day-picker';
import LineChart from 'line-charts-react';
import 'react-day-picker/lib/style.css';
import './App.css';

class App extends React.Component{
  
  constructor(props) {
    super(props)
    this.state = { url: 'http://localhost:5000/', value:0.0, date:'', entries:[], fruit:'', calories:0, height:0, weight:0}
    this.onChange = this.onChange.bind(this)
    this.addEntry = this.addEntry.bind(this)
    this.getCalories = this.getCalories.bind(this)
    this.getEntries()
  }
  
  getEntries() {
    Axios.get(this.state.url).then(res=>this.setState({entries:res.data})).catch(err=>console.log(err))
  }

  onChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  async addEntry() {
    await Axios.post(this.state.url, {value:this.state.value, date:this.state.date}).then(res=>console.log(res)).catch(err=>console.log(err))
    this.getEntries()
  }

  getCalories() {
    Axios.post(this.state.url+'calories',{fruit:this.state.fruit}).then(res=>this.setState({calories:res.data.calories})).catch(err=>console.log(err))
  }

  render() {
    return (
      <div className="App">
        <div className="card">
          <div className="card-body">
            <LineChart
              sets={[this.state.entries.map( entry => entry.value)]}
              times={[this.state.entries.map( entry => new Date(entry.date))]}
              />
          </div>
        </div>
        Weight <input type="number" value={this.state.value} name="value" onChange={this.onChange}/> KG
        Date <DayPicker onDayClick={day=>this.setState({date: day})}/>
        <button onClick={this.addEntry}>Add</button>
        <br/>
        Fruit <input type="text" value={this.state.fruit} name="fruit" onChange={this.onChange}/>
        <button onClick={this.getCalories}>Get Calories</button>
        <br/>
        {this.state.calories}
        <br/>
        Height <input type="text" value={this.state.height} name="height" onChange={this.onChange}/>
        <button onClick={()=>this.setState({weight:this.state.height-100})}>Get Calories</button>
        <br/>
        Best Weight {this.state.weight}
      </div>
    );
  }
}

export default App;

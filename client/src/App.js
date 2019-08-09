import React, {Component} from 'react';
import './bootstrap.min.css';
import './App.css';

import Entry from './Entry';
import Table from './table_src/Table'

import { Provider } from 'react-redux'
import store from './js/store/index'

class App extends Component {
  constructor(){
    super()
    this.state = {
      entryShow: true,
      tableShow: false,
      csvPath : '/home/david/Rista/linuxProgramParser/people.csv'
    }

    this.showChangeProp = this.showChangeProp.bind(this)
  }
  
  showChangeProp() {
    this.setState({
      entryShow: !this.state.entryShow,
      tableShow: !this.state.tableShow
    })
  }

  render() {
    return (
      <Provider store={store}>
        <div>
          <Entry showing={this.state.entryShow} showFunc={this.showChangeProp} path={this.state.csvPath}/>
          <Table showing={this.state.tableShow} showFunc={this.showChangeProp} path={this.state.csvPath}/>
        </div>
      </Provider>
    )
  }
}

export default App;

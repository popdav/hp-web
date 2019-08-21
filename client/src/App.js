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
      tableShow: false
    }

    this.showChangeProp = this.showChangeProp.bind(this)
  }
  
  showChangeProp() {
    this.setState({
      tableShow: true
    })
  }

  render() {
    return (
      <Provider store={store}>
        <div>
          <Entry showing={this.state.entryShow} showFunc={this.showChangeProp} />
          <Table showing={this.state.tableShow} showFunc={this.showChangeProp} />
        </div>
      </Provider>
    )
  }
}

export default App;

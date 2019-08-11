import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import '../App.css';
import { connect } from 'react-redux'
import _ from 'lodash'

// import axios from 'axios'

class Table extends Component {
  constructor(props){
    super(props)
    this.state = {
      showFunc : props.showFunc,
      showing : props.showing,
      path: props.path,
      data: [],
      dataOriginal: [],
      keys: [],
      tabCol : [],
      sorted : "",
      activePage : 1,
      perPage : 5,
      num1 : 1,
      num2 : 2,
      num3 : 3,
      num4 : 4,
      num5 : 5,
      classNum1 : "page-item active",
      classNum2 : "page-item",
      classNum3 : "page-item",
      classNum4 : "page-item",
      classNum5 : "page-item",
      findQuery: ""
    }
    this.handleHomeClick = this.handleHomeClick.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handlePagingButtonClick = this.handlePagingButtonClick.bind(this)
    this.handlePagingArrowClick = this.handlePagingArrowClick.bind(this)
    this.handlePerPageChange = this.handlePerPageChange.bind(this)
    this.handleOnClickSort = this.handleOnClickSort.bind(this)
    this.handleFindChange = this.handleFindChange.bind(this)
    this.handleFindQuery = this.handleFindQuery.bind(this)
    this.resetClick = this.resetClick.bind(this)

    this.findRef = React.createRef()
  }
  componentWillReceiveProps(nextProps){
    console.log(nextProps)  
    if(nextProps.showing && nextProps.data.length !== 0){
      this.setState({
        data : [...nextProps.data],
        dataOriginal: [...nextProps.data],
        keys : Object.keys(nextProps.data[0]),
        tabCol : Object.keys(nextProps.data[0])
      })
    }
  }
  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber});
  }
  handleHomeClick(e) {
    e.preventDefault()
    this.setState({
      data: [],
      dataOriginal: [],
      keys: [],
      tabCol: [],
      activePage : 1,
      perPage : 5
    })
    
    this.state.showFunc();
  }
  handlePagingButtonClick(e){
    e.preventDefault()
    let target = e.target
    console.log(target.id)
    this.setState({
      classNum1 : "page-item",
      classNum2 : "page-item",
      classNum3 : "page-item",
      classNum4 : "page-item",
      classNum5 : "page-item",
    })
    switch(target.id){
      case 'b1':
        this.setState({classNum1 : "page-item active"})
        break;
      case 'b2':
        this.setState({classNum2 : "page-item active"})
        break;
      case 'b3':
        this.setState({classNum3 : "page-item active"})
        break;
      case 'b4':
        this.setState({classNum4 : "page-item active"})
        break;
      case 'b5':
        this.setState({classNum5 : "page-item active"})
        break;
      default:
        break;
    }
    console.log(target)
    this.handlePageChange(parseInt(target.value))
  }

  handlePagingArrowClick(e){
    e.preventDefault()
    let target = e.target
    let currPage = this.state.activePage
    console.log(this.state)
    console.log(target.id)
    this.setState({
      classNum1 : "page-item",
      classNum2 : "page-item",
      classNum3 : "page-item",
      classNum4 : "page-item",
      classNum5 : "page-item",
    })

    switch(target.id){
      case "next" :
        currPage += 1;
        if(currPage >= Math.ceil(this.state.data.length / this.state.perPage)){
          this.setState({classNum5 : "page-item active"})
          break;
        }
        switch(currPage){
          case this.state.num1:
            this.setState({classNum1 : "page-item active"})
            break;
          case this.state.num2:
            this.setState({classNum2 : "page-item active"})
            break;
          case this.state.num3:
            this.setState({classNum3 : "page-item active"})
            break;
          case this.state.num4:
            this.setState({classNum4 : "page-item active"})
            break;
          case this.state.num5:
            this.setState({classNum5 : "page-item active"})
            break;
          default:
            this.setState({
              num1 : this.state.num1 + 1,
              num2 : this.state.num2 + 1,
              num3 : this.state.num3 + 1,
              num4 : this.state.num4 + 1,
              num5 : this.state.num5 + 1,
            })
            this.setState({classNum5 : "page-item active"})
        }
        this.handlePageChange(currPage)
        break;
      case "previous":
          currPage -= 1;
          if(currPage <= 0){
            this.setState({classNum1 : "page-item active"})
            break;
          }
          switch(currPage){
            case this.state.num1:
              this.setState({classNum1 : "page-item active"})
              break;
            case this.state.num2:
              this.setState({classNum2 : "page-item active"})
              break;
            case this.state.num3:
              this.setState({classNum3 : "page-item active"})
              break;
            case this.state.num4:
              this.setState({classNum4 : "page-item active"})
              break;
            case this.state.num5:
              this.setState({classNum5 : "page-item active"})
              break;
            default:
              this.setState({
                num1 : this.state.num1 - 1,
                num2 : this.state.num2 - 1,
                num3 : this.state.num3 - 1,
                num4 : this.state.num4 - 1,
                num5 : this.state.num5 - 1,
              })
              this.setState({classNum1 : "page-item active"})
          }
          this.handlePageChange(currPage)


        break;
      
      case "first" :
        this.setState({
          classNum1 : "page-item active",
          num1 : 1,
          num2 : 2,
          num3 : 3,
          num4 : 4,
          num5 : 5,
          activePage: 1
        })
        break;
      
      case "last" :
      this.setState({
        classNum5 : "page-item active",
        num1 : Math.ceil(this.state.data.length / this.state.perPage) - 4,
        num2 : Math.ceil(this.state.data.length / this.state.perPage) - 3,
        num3 : Math.ceil(this.state.data.length / this.state.perPage)- 2,
        num4 : Math.ceil(this.state.data.length / this.state.perPage) - 1,
        num5 : Math.ceil(this.state.data.length / this.state.perPage),
        activePage: Math.ceil(this.state.data.length / this.state.perPage)
      })
      break;
      
      
      default:
        break;
    }

  }
  handlePerPageChange (e) {
    e.persist()
    this.setState({perPage: e.target.value})
  }

  handleOnClickSort(e, i) {
    e.preventDefault()
    if(this.state.sorted === "" || this.state.sorted === "desc"){
      let data1 = this.state.data.sort((a,b) => {
        if(a[this.state.keys[i]] < b[this.state.keys[i]])
          return -1
        else if(a[this.state.keys[i]] > b[this.state.keys[i]])
          return 1
        else
          return 0
      })
      let tabCol1 = [...this.state.keys]
      tabCol1[i] = tabCol1[i] + " ↑"
      this.setState({
        data: data1,
        tabCol : tabCol1,
        activePage : 1,
        num1 : 1,
        num2 : 2,
        num3 : 3,
        num4 : 4,
        num5 : 5,
        classNum1 : "page-item active",
        classNum2 : "page-item",
        classNum3 : "page-item",
        classNum4 : "page-item",
        classNum5 : "page-item",
        sorted : "asc"
      })
    } else {
      let data1 = this.state.data.sort((a,b) => {
        if(a[this.state.keys[i]] > b[this.state.keys[i]])
          return -1
        else if(a[this.state.keys[i]] < b[this.state.keys[i]])
          return 1
        else
          return 0
      })
      let tabCol1 = [...this.state.keys]
      tabCol1[i] = tabCol1[i] + " ↓"
      this.setState({
        data: data1,
        tabCol : tabCol1,
        activePage : 1,
        num1 : 1,
        num2 : 2,
        num3 : 3,
        num4 : 4,
        num5 : 5,
        classNum1 : "page-item active",
        classNum2 : "page-item",
        classNum3 : "page-item",
        classNum4 : "page-item",
        classNum5 : "page-item",
        sorted : "desc"
      })
    }
  }
  handleFindChange (e) {
    console.log(e.target.value)
    this.setState({findQuery: e.target.value})
  }

  handleFindQuery () {
    let findData = []
    let query = JSON.parse(this.state.findQuery)
    console.log(this.state.data)
    console.log(this.state.dataOriginal)
    for(let i = 0; i<this.state.dataOriginal.length; i++)
      if(_.isMatch(this.state.dataOriginal[i], query))
        findData.push(this.state.dataOriginal[i])

    this.setState({
      data : findData,
      activePage : 1,
      num1 : 1,
      num2 : 2,
      num3 : 3,
      num4 : 4,
      num5 : 5,
      classNum1 : "page-item active",
      classNum2 : "page-item",
      classNum3 : "page-item",
      classNum4 : "page-item",
      classNum5 : "page-item",
    })
  }

  resetClick(e){
    e.preventDefault()
    this.setState({
      data: [...this.state.dataOriginal],
      tabCol : [...this.state.keys],
      sorted : "",
      activePage : 1,
      num1 : 1,
      num2 : 2,
      num3 : 3,
      num4 : 4,
      num5 : 5,
      classNum1 : "page-item active",
      classNum2 : "page-item",
      classNum3 : "page-item",
      classNum4 : "page-item",
      classNum5 : "page-item",
      findQuery: ""
    })
    this.findRef.current.value = ''
  }

  componentDidMount = () => {
    window.addEventListener('wheel', this.handleScroll);
  }

  componentWillUnmount = () => {
    window.removeEventListener('wheel', this.handleScroll);
  }

  handleScroll = (event) => {
    event.preventDefault()
    let currPage = this.state.activePage
    this.setState({
      classNum1 : "page-item",
      classNum2 : "page-item",
      classNum3 : "page-item",
      classNum4 : "page-item",
      classNum5 : "page-item",
    })
    if (event.wheelDelta > 0) {
      
      currPage += 1;
        if(currPage >= Math.ceil(this.state.data.length / this.state.perPage)){
          this.setState({classNum5 : "page-item active"})
          return;
        }
        switch(currPage){
          case this.state.num1:
            this.setState({classNum1 : "page-item active"})
            break;
          case this.state.num2:
            this.setState({classNum2 : "page-item active"})
            break;
          case this.state.num3:
            this.setState({classNum3 : "page-item active"})
            break;
          case this.state.num4:
            this.setState({classNum4 : "page-item active"})
            break;
          case this.state.num5:
            this.setState({classNum5 : "page-item active"})
            break;
          default:
            this.setState({
              num1 : this.state.num1 + 1,
              num2 : this.state.num2 + 1,
              num3 : this.state.num3 + 1,
              num4 : this.state.num4 + 1,
              num5 : this.state.num5 + 1,
            })
            this.setState({classNum5 : "page-item active"})
        }
        this.handlePageChange(currPage)

    } else if (event.wheelDelta < 0) {
      currPage -= 1;
      if(currPage <= 0){
        this.setState({classNum1 : "page-item active"})
        return;
      }
      switch(currPage){
        case this.state.num1:
          this.setState({classNum1 : "page-item active"})
          break;
        case this.state.num2:
          this.setState({classNum2 : "page-item active"})
          break;
        case this.state.num3:
          this.setState({classNum3 : "page-item active"})
          break;
        case this.state.num4:
          this.setState({classNum4 : "page-item active"})
          break;
        case this.state.num5:
          this.setState({classNum5 : "page-item active"})
          break;
        default:
          this.setState({
            num1 : this.state.num1 - 1,
            num2 : this.state.num2 - 1,
            num3 : this.state.num3 - 1,
            num4 : this.state.num4 - 1,
            num5 : this.state.num5 - 1,
          })
          this.setState({classNum1 : "page-item active"})
      }
      this.handlePageChange(currPage)
    }
  }

  render() {
    let styleT = {};
    if(!this.props.showing)
      styleT = {display: "none"};


    const arr = [...this.state.data];
    const currPage = this.state.activePage;
    const perPage = this.state.perPage;

    let indeOfLast = currPage * perPage;
    let indexOfFirst = indeOfLast - perPage;
    const subArr = arr.slice(indexOfFirst, indeOfLast);
    return (
      <div style={styleT} className="">
          <button className="btn btn-primary back-btn" onClick={this.handleHomeClick}>Home</button>

          <br />
          <label>
            Select number of rows:
            <select value={this.state.perPage} onChange={this.handlePerPageChange}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={25}>25</option>
            </select>
          </label>
          
          <br/>
          <div className="input-group mb-3">
            <input ref={this.findRef} onChange={this.handleFindChange} onKeyDown={this.enterPress} className="form-control input-font-size" id="inputFind"/>
            <button onClick={this.handleFindQuery} className="find-btn btn">Find</button>
            <button onClick={this.resetClick} className="btn btn-primary reset-btn">Reset</button>
          </div>
            
          <br/>


          <table className="table table-bordered table-style table-hover">
            <tbody><tr>{this.state.tabCol.map((e, i) => {
              return (
                <th key={i} onClick={(e) => this.handleOnClickSort(e, i)}>{e}</th>
              )
            })}</tr>
              
                {subArr.map((e1, i) => {
                  return(<tr key={Math.random().toString(36).substr(2, 9)}>
                    {this.state.keys.map((e2) => {
                      return (<td key={Math.random().toString(36).substr(2, 9)}>{e1[e2]}</td>)
                    })}
                  </tr>)
                })}
              

            </tbody>
          </table>

          <nav className="Pagination">
            <ul className="pagination">
              <li className="page-item"><button onClick={this.handlePagingArrowClick} id="first" className="page-link" href="#">{'<<'}</button></li>
              <li className="page-item"><button onClick={this.handlePagingArrowClick} id="previous" className="page-link" href="#">{'<'}</button></li>
              <li className={this.state.classNum1}><button value={this.state.num1} id='b1' onClick={this.handlePagingButtonClick} className="page-link" href="#">{this.state.num1}</button></li>
              <li className={this.state.classNum2}><button value={this.state.num2} id='b2' onClick={this.handlePagingButtonClick} className="page-link" href="#">{this.state.num2}</button></li>
              <li className={this.state.classNum3}><button value={this.state.num3} id='b3' onClick={this.handlePagingButtonClick} className="page-link" href="#">{this.state.num3}</button></li>
              <li className={this.state.classNum4}><button value={this.state.num4} id='b4' onClick={this.handlePagingButtonClick} className="page-link" href="#">{this.state.num4}</button></li>
              <li className={this.state.classNum5}><button value={this.state.num5} id='b5' onClick={this.handlePagingButtonClick} className="page-link" href="#">{this.state.num5}</button></li>
              <li className="page-item"><button onClick={this.handlePagingArrowClick} id="next" className="page-link" href="#">{'>'}</button></li>
              <li className="page-item"><button onClick={this.handlePagingArrowClick} id="last" className="page-link" href="#">{'>>'}</button></li>
            </ul>
          </nav>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { data: state.data }
}

export default connect(mapStateToProps, {})(Table);

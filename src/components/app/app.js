import {Component} from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployersList from '../employers-list/employers-list';
import EmployersAddForm from '../employers-add-form/employers-add-form';
import './app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {name: 'John C.', salary: 800, increase: true, like: false, id: 1},
        {name: 'Lila A.', salary: 1300, increase: false, like: false, id: 2},
        {name: 'Kira D.', salary: 1700, increase: true, like: false, id: 3},
      ],
      term: ''
    }
    this.maxId = 4;
  }

  deleteItem = (id) => {
    this.setState(({data}) => {
      return {
        data: data.filter(elem => elem.id !== id)
      }
    });
  }

  addItem = (name, salary) => {
    const newItem = {
      name,
      salary,
      increase: false,
      id: this.maxId++
    }
    this.setState(({data}) => {
      const newArr = [...data, newItem];
      return {
        data: newArr
      }
    });
  }

  onToggleProp = (id, prop) => {
    this.setState(({data}) => ({
      data: data.map(item => {
        if (item.id === id) {
          return {...item, [prop]: !item[prop]}
        }
        return item
      })
    }))
  }

  searchEmp = (items, term) => {
    if (term.length === 0) {
      return items
    }

    return items.filter(item=> {
      return item.name.indexOf(term) > -1
    })
  }

  onUpdateSearch = (term) => {
    this.setState({term});
  }

  render() {
    const employers = this.state.data.length;
    const increase = this.state.data.filter(elem => elem.increase).length;
    const {data, term} = this.state;
    const visibleData = this.searchEmp(data, term);
    return (
      <div className="app">
        <AppInfo employers={employers} increase={increase}/>
        <div className="search-panel">
          <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
          <AppFilter/>
        </div>

        <EmployersList
          data={visibleData}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp}/>
        <EmployersAddForm onAdd={this.addItem}/>
      </div>
    );
  }
}

export default App;
import React from 'react';
import Dashboard from './Dashboard';

let months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const getLimit = (month) => {
  switch (month) {
    case 'April':
    case 'June':
    case 'September':
    case 'November':
      return 30;
    case 'February':
      return 28;
    default:
      return 31;
  }
};

let getMonth = months[new Date().getMonth()];

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      monthData: [],
    };
  }
  addItem = (e) => {
    e.preventDefault();

    const title = this.state.title;
    const monthLimit = getLimit(getMonth);
    const obj = {
      title: title,
      monthLimit: monthLimit,
      getMonth: getMonth,
      selectDate: [],
    };

    // this.state.monthData.push(obj);
    this.setState((prevState) => ({
      ...prevState,
      monthData: [...prevState.monthData, obj],
    }));
    // console.log(obj);
  };

  handleDashboard = () => {
    this.setState({
      display: true,
    });
  };
  handleInput = (event) => {
    let getValue = event.target.value;
    this.setState({
      title: getValue,
    });
  };
  componentDidMount() {
    const monthData = JSON.parse(localStorage.getItem('activity')) || [];
    this.setState({
      ...this.state,
      monthData,
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.monthData !== this.state.monthData) {
      localStorage.setItem('activity', JSON.stringify(this.state.monthData));
    }
  }
  delete = (index) => {
    const d = [...this.state.monthData];
    d.splice(index, 1);
    this.setState({
      ...this.state,
      monthData: d,
    });
  };
  addSelectedDate = (day, index) => {
    let selectDate = this.state.monthData[index].selectDate;
    if (selectDate.includes(day)) {
      const clonedData = { ...this.state.monthData[index] };
      clonedData.selectDate = clonedData.selectDate.filter((d) => d !== day);
      const clonedMonthData = [...this.state.monthData];
      clonedMonthData[index] = clonedData;
      this.setState({
        ...this.state,
        monthData: clonedMonthData,
      });
    } else {
      const data = this.state.monthData[index];
      data.selectDate.push(day);
      this.setState((prevState) => ({
        ...this.state,
        monthData: [...this.state.monthData],
      }));
    }
  };

  render() {
    const { monthData } = this.state;
    return (
      <>
        <form onSubmit={this.addItem}>
          <input
            onChange={this.handleInput}
            type='text'
            placeholder='e.g. coding'
          />
          <button onClick={this.handleDashboard}>Add Activity</button>
        </form>
        <Dashboard
          addSelectedDate={this.addSelectedDate}
          delete={this.delete}
          monthData={monthData}
        />
      </>
    );
  }
}

export default Main;
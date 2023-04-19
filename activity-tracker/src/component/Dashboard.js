import React from 'react';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: [],
    };
  }
  // addSelectedDate = (index, date) => {
  //   const data = this.state.monthData[index];
  //   let selectDate = data.selectDate ? [...data.selectDate, date] : [date];
  //   const obj = {
  //     ...data,
  //     selectDate,
  //   };
  //   const clonedMonthData = [...this.state.monthData];
  //   clonedMonthData[index] = obj;
  //   this.setState({
  //     ...this.state,
  //     monthData: clonedMonthData,
  //   });
  // };
  // addSelectedDate = (day, index) => {
  //   this.setState((prevState) => {
  //     console.log(prevState);
  //     if (prevState[index].selectDate.includes(day))
  //       return {
  //         ...prevState,
  //         selectDate: prevState[index].selectDate.filter((d) => d !== day),
  //       };
  //     else {
  //       return {
  //         ...prevState,
  //         selectDate: [...prevState[index].selectDate, day],
  //       };
  //     }
  //   });
  // };
  render() {
    return (
      <div className='dashboard'>
        {this.props.monthData.map((I, i) => (
          <>
            <div key={i} className='flex singleMonth'>
              <div className='info-box'>
                <h2>{I.title}</h2>
                <h2 className='month'>{I.getMonth}</h2>
              </div>
              <div className='calender'>
                {dateUI(I.monthLimit).map((day, key) => (
                  <span
                    key={key}
                    onClick={() => this.props.addSelectedDate(day, i)}
                    className={
                      I.selectDate.includes(day) ? 'day active' : 'day'
                    }
                  >
                    {day}
                  </span>
                ))}
              </div>
              <span className='delete' onClick={() => this.props.delete(i)}>
                ❌
              </span>
            </div>
          </>
        ))}
      </div>
    );
  }
}

const dateUI = (limit) => {
  let month = [];
  for (let i = 1; i <= limit; i++) {
    month.push(i);
  }
  return month;
};

export default Dashboard;
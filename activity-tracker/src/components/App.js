import React from "react";
import Activity from "./Activity";
import { days } from "../data";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      inputValue: "",
    };
    //binding methods
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentDidMount() {
    let activities = localStorage.getItem("activites")
      ? JSON.parse(localStorage.getItem("activites"))
      : [];
    this.setState({ activities });
  }

  componentDidUpdate() {
    localStorage.setItem(
      "activites",
      JSON.stringify(this.state.activities)
    );
  }

  handleToggle(id, name) {
    const activities = JSON.parse(JSON.stringify(this.state.activities));
    activities.forEach((activity) => {
      if (activity.name === name) {
        activity.days.forEach((day) => {
          if (day.id === id) {
            day.isDone = !day.isDone;
          }
        });
      }
    });
    this.setState({
      activities: activities,
    });
  }

  handleChange(e) {
    this.setState({
      inputValue: e.target.value,
    });
  }

  handleClick(e, index) {
    let activityArray = [...this.state.activities];

    if (e.target.name === "delete") {
      activityArray.splice(index, 1);
      this.setState({
        activities: [...activityArray],
      });
      return;
    }

    if (this.state.inputValue) {
      this.setState(
        (prevState) => {
          return {
            activities: prevState.activities.concat([
              {
                name: this.state.inputValue,
                days: [...days],
              },
            ]),
          };
        },
        () => {
          this.setState({ inputValue: "" });
        }
      );
    }
  }

  render() {
    const date = new Date();
    const month = date.toLocaleString("default", { month: "long" });

    return (
      <>
        
        <div>
          <h1>Monthly Activity Tracker!</h1>
          <div>
            <form onSubmit={this.handleClick}>
              <input
                type="text"
                name="activity"
                onChange={this.handleChange}
                value={this.state.inputValue}
                placeholder="Add Activity"
              />

              <button onClick={this.handleClick} type="submit">
                Add Activity
              </button>
            </form>
          </div>
          {this.state.activities.map((activity, index) => {
            return (
              <Activity
                details={activity}
                handleToggle={this.handleToggle}
                handleDelete={this.handleClick}
                month={month}
              />
            );
          })}
        </div>
      </>
    );
  }
}

export default App;
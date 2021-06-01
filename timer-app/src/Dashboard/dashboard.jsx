import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { withRouter } from "react-router";
import axios from "axios";

/**
 *
 * DashBoard component displays the welcome message for the
 * user at the top and also has provision to add new tasks
 * the table displayed in this component has all the tasks
 * that are added along with their lapsed time
 */

const DashBoard = (props) => {
  const { user } = props.location.state;

  const [taskName, setTaskName] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);

  // we call this useEffect each second to re-render
  // changes in minutes of each task
  useEffect(() => {
    const hr1 = new Date();
    let hr2;
    setInterval(() => {
      hr2 = new Date();
      setCurrentTime(Math.floor(hr2.getTime() - hr1.getTime()));
    }, 1000);
  }, [currentTime]);

  // this useEffect gets the existing tasks if the
  // current tasks array is empty and on reload
  useEffect(() => {
    if (!tasks.length) {
      getTasks();
      return () => {
        window.removeEventListener("beforeunload", getTasks);
      };
    }
  }, [tasks]);

  // api to get all the tasks
  const getTasks = () => {
    axios.get("http://localhost:4001/timer/allTasks").then((res) => {
      const { result } = res.data;
      let _tasks = [];
      result.forEach((r) => {
        const { taskName, time, user } = r;
        const task = { taskName, time, user };
        _tasks = _tasks.concat(task);
      });
      // we set tasks after getting all the tasks
      setTasks(_tasks);
    });
  };

  // api to add / create task
  const addTask = (user) => {
    const taskCreatedAt = new Date();
    axios
      .post("http://localhost:4001/timer/createTask", {
        user,
        name: taskName,
        id: tasks.length + 1,
        time: taskCreatedAt.getTime(),
      })
      .then((res) => {
        const { taskName, time, id } = res.data;
        const task = { taskName, time, id };
        const _tasks = [...tasks, task];
        setTasks(_tasks);
      });
  };

  /**
   *
   * @param {*} task
   * @returns lapsed time in minutes : seconds format.
   * Minutes and seconds: are the difference of current time and the time at which
   * task is created
   */
  const getLapsedTime = (task) => {
    let _time;
    let _seconds;
    const timeAtWhichTaskCreated = task.time;
    const currTime = new Date();

    // get minutes passed
    _time = Math.floor(
      Math.floor(
        Math.floor(currTime.getTime() - timeAtWhichTaskCreated) / 1000
      ) / 60
    );

    // get seconds passed
    _seconds = Math.floor(
      Math.floor(
        Math.floor(currTime.getTime() - timeAtWhichTaskCreated) / 1000
      ) /
        60 /
        60
    );
    // we render 0:0 for tasks which have lapsed
    // time > 25 minutes else we return minutes:seconds
    if (25 - _time < 0) return "0 : 0";
    return 25 - _time + ":" + (60 - _seconds);
  };

  return (
    <div className="parent">
      <h3>{`Hello ${user}, Welcome to Dash Board...Below are your tasks`}</h3>
      <div>
        <input
          placeholder="task name"
          onChange={(e) => {
            // we add tasks which have non empty name
            if (e.target.value) setTaskName(e.target.value);
          }}
          required
        />
        <button onClick={() => taskName && addTask(user)}>Add</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Tasks Table : </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ color: "green" }}>Task Name</td>
            <td style={{ color: "green" }}>Timer Status</td>
          </tr>
          {tasks.map((task, index) => {
            return (
              <tr key={index}>
                <td>{task.taskName}</td>
                <td>{getLapsedTime(task)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p style={{ visibility: "hidden" }}>
        {
          // we use this currentTime as a dummy one to re-render the
          // time lapsed for each task
          currentTime
        }
      </p>
    </div>
  );
};

export default withRouter(DashBoard);

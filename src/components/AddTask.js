import React, { useState, useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import {
  addDoc,
  collectionRef,
  orderBy,
  onSnapshot,
  query,
  serverTimestamp,
} from "../firebase";
import Pannel from "./Pannel";
import classes from "./AddTask.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
import AddTaskModalOverlay from "../UI/AddTaskModalOverlay";

function AddTask(props) {
  const [projectName, setProjectName] = useState("");
  const [taskName, setTaskName] = useState("");
  const [billable, setBillable] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    setFormIsValid(
      projectName.trim().length >= 3 && taskName.trim().length >= 3
    );
  }, [projectName, taskName]);

  useEffect(() => {
    const q = query(collectionRef, orderBy("timestamp", "desc"));
    onSnapshot(q, (snapShot) => {
      setTaskList(
        snapShot.docs.map((doc) => ({
          id: doc.id,
          projectname: doc.data().projectname,
          taskname: doc.data().taskname,
          billable: doc.data().billable,
        }))
      );
    });
  }, []);

  const addActivityHandler = (event) => {
    event.preventDefault();

    const payload = {
      billable: billable,
      projectname: projectName,
      taskname: taskName,
      timestamp: serverTimestamp(),
    };

    addDoc(collectionRef, payload);
    setProjectName("");
    setTaskName("");
    setBillable(false);
    setFormIsValid(false);
  };

  return (
    <AddTaskModalOverlay onClose={props.onClose}>
      <Card className={classes.tasks}>
        <div className={classes.taskHeader}>
          <h2>Activites</h2>
          <button className={classes.taskClose} onClick={props.onClose}>
            <AiFillCloseCircle />
          </button>
        </div>
        <form onSubmit={addActivityHandler} className={classes.form}>
          <div className={classes.control}>
            <label htmlFor="taskname">Task Name</label>
            <input
              type="text"
              placeholder="Task Name"
              value={taskName}
              onChange={(event) => {
                setTaskName(event.target.value);
              }}
              required
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="taskname">Project Name</label>
            <input
              type="text"
              placeholder="Project Name"
              value={projectName}
              onChange={(event) => {
                setProjectName(event.target.value);
              }}
              required
            />
          </div>
          <div className={classes.billable}>
            <div>
              <input
                type="checkbox"
                onChange={(event) => {
                  setBillable(event.target.checked);
                }}
                checked={billable}
              />
              <label>Billable</label>
            </div>
            <Button
              type="submit"
              className={classes.btn}
              disabled={!formIsValid}
            >
              Add Activity
            </Button>
          </div>
        </form>
        <h4 className={classes.title}>Team Tasks</h4>
        <div className={classes.pannel}>
          {taskList.map((task) => (
            <Pannel
              key={task.id}
              id={task.id}
              projectname={task.projectname}
              taskname={task.taskname}
              billable={task.billable}
            />
          ))}
        </div>
      </Card>
    </AddTaskModalOverlay>
  );
}

export default AddTask;

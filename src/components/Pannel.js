import React from "react";
import { collectionRef, doc, deleteDoc } from "../firebase";
import Card from "../UI/Card";
import classes from "./Pannel.module.css";
import { AiOutlineDollarCircle, AiOutlineDelete } from "react-icons/ai";

function Pannel({ projectname, taskname, id, billable }) {
  const deleteHandler = () => {
    const docRef = doc(collectionRef, id);
    deleteDoc(docRef);
  };

  return (
    <Card className={classes.taskCard}>
      <div className={classes.taskRow}>
        <h4>{projectname}</h4>
        {billable ? (
          <p>
            <AiOutlineDollarCircle className={classes.dollar} /> {taskname}
          </p>
        ) : (
          <p>{taskname}</p>
        )}
      </div>
      <button className={classes.btn} onClick={deleteHandler}>
        <AiOutlineDelete className={classes.button} />
      </button>
    </Card>
  );
}

export default Pannel;

import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";

export default function ups(){
  const saySomething = (something) => {
    console.log(something);
  };
  useEffect(() => {
    saySomething("from useEffect");
  });
  const handleClick = (e) => {
    e.target.textContent="Здесь могла быть ваша реклама";
  };
  return (
    <Button variant="contained" color="primary" onClick={handleClick}>
      Узнать
    </Button>
  );
};

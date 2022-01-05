import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../Input";
import Home from "../../pages/Home";
import "./form.css";
const Form = ({ type, text, handleSubmit, link, error }) => {
  const [form, setForm] = useState({});
  let navigate = useNavigate();
  const onChange = (name, value) => {
    const formattedName = name.toLowerCase();
    const formCopy = { ...form };
    formCopy[formattedName] = value;
    setForm(formCopy);
  };
  const onSubmit = () => {
    handleSubmit(form);
    // return navigate("/freestyle");
  };
  return (
    <div className="form">
      <h2>{text}</h2>
      <Input type="text" name={"Username"} onChange={onChange} />
      <Input type="password" name={"Password"} onChange={onChange} />
      <button className="btn" type="submit" onClick={onSubmit}>
        {text}
      </button>
      {link && link}
      {error && <h4 className="error-message">{error}</h4>}
    </div>
  );
};

export default Form;

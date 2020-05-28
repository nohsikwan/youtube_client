import React, { useState } from "react";
import styled from "styled-components";
import Input from "../Components/Input";
import Button from "../Components/Button";
import useInput from "../Hooks/useInput";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";

/////////////////css///////////////////////////
const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Box = styled.div`
  width: 350px;
  width: 100%;
  max-width: 350px;
`;

const StateChanger = styled(Box)`
  text-align: center;
  padding: 20px 0px;
`;

const LinkBar = styled.span`
  cursor: pointer;
`;

const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
  form {
    width: 100%;
    input {
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 7px;
      }
    }
    button {
      margin-top: 10px;
    }
  }
`;
///////////////////////////////////////////
const Auth = ({ history }) => {
  const [action, setAction] = useState("logIn");
  const name = useInput("");
  const password = useInput("");
  const bio = useInput("");
  const email = useInput("");

  /////////////onSubmit////////////////
  const onLogIn = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      if (email.value !== "" && password.value !== "") {
        const { data } = await axios.post(
          `http://localhost:4000/user/signIn`,
          {
            email: email.value,
            password: password.value,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        email.setValue("");
        password.setValue("");
        localStorage.setItem("token", data);
        window.location.reload();
      } else {
        alert("유저 정보가 일치하지 않습니다.");
      }
    } catch (error) {
      console.log(error);
      alert("유저 정보가 일치하지 않습니다.");
    }
  };

  const onSignUp = async (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    if (email.value !== "" && password.value !== "" && name.value !== "") {
      try {
        await axios.post(
          `http://localhost:4000/user/signUp`,
          {
            email: email.value,
            name: name.value,
            password: password.value,
            bio: bio.value,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        email.setValue("");
        password.setValue("");
        name.setValue("");
        bio.setValue("");
        setAction("logIn");
        alert("회원가입에 성공하였습니다.");
      } catch (error) {
        alert("유저정보가 이미 존재합니다.");
        console.log(error);
      }
    }
  };
  //////////////////////////////////////////
  return (
    <Wrapper>
      <Form>
        {action === "logIn" ? (
          <form onSubmit={onLogIn}>
            <Input placeholder={"Email"} {...email} type="email" />
            <Input placeholder={"Password"} {...password} type="password" />
            <Button text={"Log in"} />
          </form>
        ) : (
          <form onSubmit={onSignUp}>
            <Input placeholder={"name"} {...name} />
            <Input placeholder={"Email"} {...email} type="email" />
            <Input placeholder={"bio"} {...bio} />
            <Input placeholder={"Password"} {...password} type="password" />
            <Button text={"Sign up"} />
          </form>
        )}
      </Form>
      <StateChanger>
        {action === "logIn" ? (
          <>
            Don't have an account?{" "}
            <LinkBar onClick={() => setAction("signUp")}>Sign up</LinkBar>
          </>
        ) : (
          <>
            Have an account?{" "}
            <LinkBar onClick={() => setAction("logIn")}>Log in</LinkBar>
          </>
        )}
      </StateChanger>
    </Wrapper>
  );
};

export default withRouter(Auth);

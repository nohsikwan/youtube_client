import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Input from "../Components/Input";
import Button from "../Components/Button";
import useInput from "../Hooks/useInput";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import { YoutubeIcon, LogOut, CreateVideo } from "../Components/Icon";

///////////////////////css/////////////////////
const Header = styled.header`
  width: 100%;
  height: 130px;
  background-color: #d63031;
  border-bottom: 1px solid #e6e6e6;
  border-radius: 0px;
  display: flex;
  align-items: center;
`;

const HeaderLink = styled(Link)`
  margin-right: 34px;
`;

const YoutubeContainer = styled.div`
  position: absolute;
  left: 5%;
`;
const NoficationContainer = styled.div`
  position: absolute;
  display: flex;
  right: 1%;
`;

//////////////////////////////////////////

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
const Profile = ({ history }) => {
  const name = useInput("");
  const password = useInput("");
  const bio = useInput("");
  const email = useInput("");

  const onEdit = async (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();

    try {
      await axios.post(
        `http://localhost:4000/user/edit`,
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
    } catch (error) {
      console.log(error);
    }
  };
  const logOut = () => {
    localStorage.removeItem("token");

    history.push("/");
    window.location.reload();
  };
  const getMydata = async () => {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(
      `http://localhost:4000/user/me`,

      { headers: { Authorization: `Bearer ${token}` } }
    );

    email.setValue(data[0].email);
    name.setValue(data[0].name);
    bio.setValue(data[0].bio);
  };
  useEffect(() => {
    getMydata();
  }, []);
  //////////////////////////////////////////
  return (
    <>
      <Header>
        <YoutubeContainer>
          <Link to="/">
            <YoutubeIcon />
          </Link>
        </YoutubeContainer>

        <NoficationContainer>
          <HeaderLink to="/upload">
            <CreateVideo />
          </HeaderLink>

          <HeaderLink onClick={logOut} to="/">
            <LogOut />
          </HeaderLink>
        </NoficationContainer>
      </Header>

      <Wrapper>
        <Form>
          {
            <form onSubmit={onEdit}>
              <Input placeholder={"Email"} {...email} type="email" />
              <Input placeholder={"name"} {...name} />
              <Input placeholder={"bio"} {...bio} />
              <Input
                placeholder={"변경하실 패스워드를 입력해주세요"}
                {...password}
                type="password"
              />
              <Button text={"EDIT"} />
            </form>
          }
        </Form>
      </Wrapper>
    </>
  );
};

export default withRouter(Profile);

import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import useInput from "../Hooks/useInput";
import { YoutubeIcon } from "./Icon";
import axios from "axios";
///////////////////////css/////////////////////
const Header = styled.header`
  width: 100%;
  margin: 0;
  height: 130px;
  background-color: #0984e3;
  border-bottom: 1px solid #e6e6e6;
  border-radius: 0px;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  position: absolute;
  left: 35%;
  top: 4.7%;
  width: 30%;
  background-color: #f1f2f6;
  border: 1px solid black;
  border-radius: 3px;
  height: 35px;
`;

const YoutubeContainer = styled.div`
  position: absolute;
  left: 5%;
`;

//////////////////////////////////////////

const StudioHeaderComponent = ({ history, setMyVideoItem }) => {
  const search = useInput("");

  const onSearchSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const headerOption = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    try {
      const { data } = await axios.post(
        `http://localhost:4000/video/search`,
        { searchItem: search.value },
        headerOption
      );
      setMyVideoItem(data);
      search.setValue("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Header>
      <YoutubeContainer>
        <Link to="/">
          <YoutubeIcon />
        </Link>
      </YoutubeContainer>
      <form onSubmit={onSearchSubmit}>
        <SearchInput {...search} placeholder="Search" />
      </form>
    </Header>
  );
};

export default withRouter(StudioHeaderComponent);

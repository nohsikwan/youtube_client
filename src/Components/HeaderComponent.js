import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import useInput from "../Hooks/useInput";
import { Cards, Plus, User, YoutubeIcon } from "./Icon";

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
  margin-right: 20px;
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
const NoficationContainer = styled.div`
  position: absolute;
  display: flex;
  right: 1%;
`;

//////////////////////////////////////////

const HeaderComponent = ({ history, setSearchItem }) => {
  const search = useInput("");
  const onSearchSubmit = () => {
    setSearchItem(search.value);
    search.setValue("");
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

      <NoficationContainer>
        <HeaderLink to="/">
          <Cards />
        </HeaderLink>
        <HeaderLink to="/upload">
          <Plus />
        </HeaderLink>
        <HeaderLink to={`/profile`}>
          <User />
        </HeaderLink>
      </NoficationContainer>
    </Header>
  );
};

export default withRouter(HeaderComponent);

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.input`
  border: 0;
  border: 1px solid black;
  border-radius: 10px;
  background-color: white;
  height: 35px;
  font-size: 12px;
  padding: 0px 15px;
`;

const Input = ({ placeholder, required, value, onChange, type = "text" }) => (
  <Container
    placeholder={placeholder}
    required={required}
    value={value}
    onChange={onChange}
    type={type}
  />
);

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
};

export default Input;

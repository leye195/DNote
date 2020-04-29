import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const SideContainer = styled.aside`
  width: 50px;
  top: 80px;
  position: fixed;
  background: #2b2b2b;
  height: 100vh;
  left: 0;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
  svg {
    font-size: 1rem;
    padding: 5px;
    margin-top: 10px;
    color: white;
    width: auto;
    cursor: pointer;
    margin: 5px;
  }
  .add {
    background: #1daf02;
    border-radius: 50%;
  }
`;
const SideBar = () => {
  return (
    <SideContainer>
      <ButtonContainer>
        <Link to={"/add"}>
          <FontAwesomeIcon icon={faPlus} className={"add"} />
        </Link>
        <FontAwesomeIcon icon={faStar} className={"fav"} />
      </ButtonContainer>
    </SideContainer>
  );
};
export default SideBar;

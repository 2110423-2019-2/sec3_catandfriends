import styled from "styled-components";
const NavButton = styled.button`
  /* color: ${props => (props.isOn ? "white" : "grey")}; */
  transition: 0.3s;
  /* background-color: black; */
  background-color: none;
  color: black;
  font-size: 1.2em;
  outline: none;
  font-weight: 500;
  padding: 0.25em 1em;
  border-radius: 30px;
  border: 0px;
  /* border: ${props => (props.isOn ? "2px solid grey" : "none")}; */
  /* box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2); */
  &:hover {
    text-decoration: none;
    color: gray; 
    /* color: white; */
    /* border: ${props => (props.isOn ? "2px solid white" : "none")}; */
  }
  &:focus {
    outline: none;
  }
`;
export default NavButton;

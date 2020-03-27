import styled from "styled-components";
const GradientButton = styled.button`
  color: black;
  transition: 0.3s;
  background-color: ${props => props.color};
  font-size: 1.1em;
  outline: none;
  font-weight: 500;
  padding: 0.25em 0.5em;
  border-radius: 10px;
  border: none;
  &:hover {
    text-decoration: none;
    color: white;
    background: ${props => props.gradient};
  }
  &:focus {
    outline: none;
  }
`;
export default GradientButton;

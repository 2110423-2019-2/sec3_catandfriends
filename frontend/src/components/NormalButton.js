import styled from "styled-components";
const NormalButton = styled.button`
  color: white;
  transition: 0.3s;
  background-color: ${props => props.color};
  font-size: 1.1em;
  outline: none;
  font-weight: 500;
  padding: 0.25em 1em;
  border-radius: 60px;
  border: 2px solid ${props => props.color};
  &:hover {
    box-shadow: 0 2px 8px ${props => props.color};
  }
  &:focus {
    outline: none;
  }
`;
export default NormalButton;

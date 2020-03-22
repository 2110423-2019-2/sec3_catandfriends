import styled from "styled-components";
const CourseButton = styled.button`
  color: black;
  transition: 0.3s;
  background-color: ${props =>
    props.full ? "rgb(214,111,110)" : "rgb(19, 204, 169)"};
  font-size: 1.1em;
  outline: none;
  font-weight: 500;
  padding: 0.25em 0.5em;
  border-radius: 10px;
  border: none;
  &:hover {
    text-decoration: none;
    color: white;
    background: ${props =>
      props.full
        ? `linear-gradient(90deg, rgba(134,31,31,1) 0%, rgba(214,111,110,1) 100%);`
        : `linear-gradient(
      90deg,
      rgba(25, 108, 70, 1) 0%,
      rgba(19, 204, 169, 1) 100%
    )`};
  }
  &:focus {
    outline: none;
  }
`;
export default CourseButton;

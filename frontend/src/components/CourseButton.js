import styled from "styled-components";
const CourseButton = styled.button`
  color: black;
  transition: 0.3s;
  background-color: ${props =>
    props.full ? "rgb(244,50,50)" : "rgba(255, 255, 255, 0)"};
  font-size: 1.1em;
  outline: none;
  font-weight: 500;
  padding: 0.25em 0.5em;
  color: var(--black-color) !important;
  border: ${props =>
    props.full ? "1px solid rgb(244,50,50) !important" : "1px solid var(--black-color) !important"};
  border-radius: 5px;
  border: none;
  &:hover {
    text-decoration: none;
    /* color: white;
    background: ${props =>
      props.full
        ? `linear-gradient(90deg, rgba(134,31,31,1) 0%, rgba(214,111,110,1) 100%);`
        : `linear-gradient(
      90deg,
      rgba(25, 108, 70, 1) 0%,
      rgba(19, 204, 169, 1) 100%
    )`}; */
  }
  &:focus {
    outline: none;
  }
`;
export default CourseButton;

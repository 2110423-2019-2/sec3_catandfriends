import styled from "styled-components";
const AccountButton = styled.button`
  color: black;
  transition: 0.3s;
  /* background-color: rgb(99, 223, 255); */
  background-color: rgb(250, 250, 250);
  font-size: 1.2em;
  outline: none;
  font-weight: 500;
  padding: 0.2em 0.5em;
  border-radius: 30px;
  border: none;
  /* box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2); */
  &:hover {
    text-decoration: none;
    transform: scale(1.05);
    /* color: white; */
    /* background: linear-gradient(
      90deg,
      rgba(180, 55, 250, 1) 0%,
      rgba(0, 212, 255, 1) 100%
    ); */
    background-color: rgb(234, 234, 234);
    /* box-shadow: 0 4px 4px 0 rgba(255, 255, 255, 0.5); */
  }
  &:focus {
    outline: none;
  }
`;
export default AccountButton;

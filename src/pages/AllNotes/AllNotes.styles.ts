import styled from "styled-components";

export const TopBox = styled.div`
  margin-right: 25px;
  
  .notes__filter-btn {
    display: flex;
    justify-content: flex-end;
  }
  
  @media screen and (max-width: 650px) {
    margin-right: 0px;  
  }
`;

export const InputBox = styled.div`
  flex: 1;
  height: 33px;
  display: flex;
  align-items: center;
  box-shadow: 0px 1px 2px 1px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  transition: 300ms box-shadow ease-in;
  margin-bottom: 16px;

  &:hover {
    box-shadow: 0px 2px 3px 1px rgba(0, 0, 0, 0.4);
  }

  input {
    width: 100%;
    height: 100%;
    padding: 0px 10px;
    border: none;
    outline: none;
    border-radius: 5px;

    &::placeholder {
      color: rgba(0, 0, 0, 0.3);
    }
  }
`;

export const Box = styled.div`
  .allNotes__notes-type {
    margin-bottom: 15px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.5);
    font-size: 1.2rem;
    span {
      color: rgba(0, 0, 0, 0.5);
      font-weight: 500;
      font-size: 15px;
    }
  }
`;

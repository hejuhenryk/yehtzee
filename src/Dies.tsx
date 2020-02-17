import React from "react";
import { DieType } from "./App";
import { Die } from "./Die";
import styled from "styled-components";

type DicePropsType = {
  dice: DieType[];
  clickHandler: (id: string) => void;
};

export const Dies: React.FC<DicePropsType> = p => {
  return (
    <DivStyled>
      {p.dice.map(d => (
        <Die dieInfo={d} clickHandler={p.clickHandler} />
      ))}
    </DivStyled>
  );
};

const DivStyled = styled.div`
  background-color: silver;
  display: flex;
  padding: 4rem;
  width: 60%;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0.5rem auto;
  margin: 0.8rem auto;
  border: 1px solid black;
  box-shadow: #444 0.3rem 0.3rem 1rem;
`;

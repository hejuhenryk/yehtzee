import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiceOne,
  faDiceTwo,
  faDiceThree,
  faDiceFour,
  faDiceFive,
  faDiceSix
} from "@fortawesome/free-solid-svg-icons";

import {DieType} from './App'

type DieProsType = {
    dieInfo: DieType ;
    clickHandler: ()=>void
}

export const Die: React.FC<DieProsType> = ({dieInfo, clickHandler}) => {
    const { value, isFrozen} = dieInfo
  const diceView = {
    1: faDiceOne,
    2: faDiceTwo,
    3: faDiceThree,
    4: faDiceFour,
    5: faDiceFive,
    6: faDiceSix
  };
  return (
    <StyledDieButton isFrozen={isFrozen} onClick={clickHandler}>
      <FontAwesomeIcon icon={diceView[value]} />
    </StyledDieButton>
  );
};

const StyledDieButton = styled.button<{isFrozen: boolean}>`
    margin: 0 1rem;
    border: none;
    overflow: hidden;
    padding: 0;
    height: 4rem;
    font-size: 4rem;
    background-color: transparent;
    color: ${p => p.isFrozen ? '#5D0A8Bde' : '#5D0A8B'};
    filter: ${p => p.isFrozen ? 'none' : 'drop-shadow(.3rem .3rem .3rem black)'};
    transform: ${p => p.isFrozen ? 'translate(2px, 2px)' : 'none'};
    &:focus {
        outline: none;
    }
    /* filter: drop-shadow(.3rem .3rem .3rem black) */
`;

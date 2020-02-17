import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
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

type DiePropsType = {
    dieInfo: DieType ;
    clickHandler: (id: string)=>void
}

export const Die: React.FC<DiePropsType> = ({dieInfo, clickHandler}) => {
    const {id, value, isFrozen, isSpinning} = dieInfo
    // const [isSpinning, setIsSpinning] = useState(false);
  const diceView = {
    1: faDiceOne,
    2: faDiceTwo,
    3: faDiceThree,
    4: faDiceFour,
    5: faDiceFive,
    6: faDiceSix
  };


  return (
    <StyledDieButton isSpinning={isSpinning} isFrozen={isFrozen} onClick={()=>clickHandler(id)}>
      <FontAwesomeIcon icon={diceView[value]} />
    </StyledDieButton>
  );
};

const RollingAnimation = keyframes`
  0% {
    transform: rotate(0deg)
  }
  100% {
    transform: rotate(360deg)
  }
`


const StyledDieButton = styled.button<{isSpinning: boolean, isFrozen: boolean}>`
    margin: 1rem;
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
    animation: ${ p => (p.isSpinning && !p.isFrozen) && RollingAnimation } .5s infinite;

`;

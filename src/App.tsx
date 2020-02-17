import React, { useReducer, useEffect , useCallback} from "react";
import "./App.css";
import { createAction } from "./actions";
import { Dies } from "./Dies";
import styled from "styled-components";

type DieValue = 1 | 2 | 3 | 4 | 5 | 6;
type RollsLeft = 0 | 1 | 2 | 3;
type Rule =
  | "Ones"
  | "Twos"
  | "Threes"
  | "LowStraight"
  | "HighStraight"
  | "Fours"
  | "Fives"
  | "Sixes"
  | "ThreeOfKind"
  | "FourOfKind"
  | "Chance"
  | "FullHouse"
  | "Yahtzee";

export type DieType = {
  id: string;
  value: DieValue;
  isFrozen: boolean;
  isSpinning: boolean;
};

type Scores = {
  [key in Rule]: number | undefined;
};

type GameState = {
  dice: DieType[];
  rollsLeft: RollsLeft;
  totalScores: number;
  scores: Scores;
};

const actions = {
  rollAll: () => createAction("rollAll"),
  freezeToggle: (id: DieType["id"]) => createAction("freezeToggle", id),
  spinnToogle: (id: DieType["id"]) => createAction("spinnToogle", id),
  unfreezeAll: () => createAction("unfreezeAll"),
  calcPoints: (p: { score: number; rule: Rule }) =>
    createAction("calcPoints", p),
  resetRolls: () => createAction("resetRolls"),
  calcTotal: () => createAction("calcTotal")
};
type Actions = ReturnType<typeof actions[keyof typeof actions]>;

const getRandomDie = (): DieType => {
  return {
    id: `die-${Math.random()}`,
    value: getDieValue(),
    isFrozen: false,
    isSpinning: false
  };
};

const getDieValue = () => (Math.floor(Math.random() * 6) + 1) as DieValue;


const getRule = (rule: Rule) => {
  const freqance = (dice: DieType[]) => {
    const dict: { [key: number]: number } = {};
    dice.forEach(die =>
      dict[die.value] !== undefined ? dict[die.value]++ : (dict[die.value] = 1)
    );
    return Object.values(dict);
  };
  enum SameType {
    Ones = 1,
    Twos,
    Threes,
    Fours,
    Fives,
    Sixes
  }
  switch (rule) {
    case "Ones":
    case "Twos":
    case "Threes":
    case "Fours":
    case "Fives":
    case "Sixes":
      // console.log(rule);
      return (dice: DieType[]) =>
        dice.reduce(
          (score, die) =>
            die.value === SameType[rule] ? score + SameType[rule] : score,
          0
        );
    case "ThreeOfKind": {
      return (dice: DieType[]) => {
        const sum = dice.reduce((score, die) => score + die.value, 0);
        const freq = freqance(dice);
        return (
          sum *
          (freq.length < 3 ? 1 : freq.length === 3 && freq.includes(3) ? 1 : 0)
        );
      };
    }
    case "FourOfKind": {
      return (dice: DieType[]) => {
        const sum = dice.reduce((score, die) => score + die.value, 0);
        const freq = freqance(dice);
        return sum * (freq.includes(5) || freq.includes(4) ? 1 : 0);
      };
    }
    case "Chance":
      return (dice: DieType[]) =>
        dice.reduce((score, die) => score + die.value, 0);
    case "FullHouse":
      return (dice: DieType[]) =>
        freqance(dice).includes(3) && freqance(dice).includes(2) ? 25 : 0;
    case "Yahtzee":
      return (dice: DieType[]) => (freqance(dice).includes(5) ? 50 : 0);
    case "LowStraight":
      return (dice: DieType[]) => {
        const valuse = dice.map(d => d.value);
        if (valuse.includes(3) && valuse.includes(3)) {
          if (valuse.includes(2) && (valuse.includes(1) || valuse.includes(5)))
            return 30;
          else if (valuse.includes(6) && valuse.includes(5)) return 30;
          else return 0;
        } else return 0;
      };
    case "HighStraight":
      return (dice: DieType[]) =>
        freqance(dice).length === 5 &&
        (!dice.map(d => d.value).includes(6) ||
          !dice.map(d => d.value).includes(1))
          ? 40
          : 0;
    default:
      return (dice: DieType[]) => 0;
  }
};

const initialState: GameState = {
  dice: [
    getRandomDie(),
    getRandomDie(),
    getRandomDie(),
    getRandomDie(),
    getRandomDie()
  ],
  rollsLeft: 3,
  totalScores: 0,
  scores: {
    Ones: undefined,
    Twos: undefined,
    Threes: undefined,
    Fours: undefined,
    Fives: undefined,
    Sixes: undefined,
    ThreeOfKind: undefined,
    FourOfKind: undefined,
    Chance: undefined,
    FullHouse: undefined,
    Yahtzee: undefined,
    LowStraight: undefined,
    HighStraight: undefined
  }
};

const extendObject = <T extends any>(baseObject: T) => (
  delta: Partial<T>
): T => ({ ...baseObject, ...delta });

const reducer = (state: GameState, action: Actions) => {
  const extState = extendObject(state);
  switch (action.type) {
    case "rollAll": {
      const rollsLeft = (state.rollsLeft
        ? state.rollsLeft - 1
        : 0) as RollsLeft;
      const dice = state.dice.map(d =>
        d.isFrozen ? { ...d } : { ...d, value: getDieValue() }
      );
      return extState({ dice, rollsLeft });
    }
    case "freezeToggle": {
      // const dice
      return extState({
        dice: state.dice.map(d =>
          d.id === action.payload ? { ...d, isFrozen: !d.isFrozen } : d
        )
      });
    }
    case "spinnToogle":
      return extState({dice: state.dice.map( d=> d.id === action.payload ? { ...d, isSpinning: !d.isSpinning} : d )})
    case "unfreezeAll":
      return extState({
        dice: state.dice.map(d => ({ ...d, isFrozen: false }))
      });
    case "calcPoints":
      const { rule, score } = action.payload;
      const scores = extendObject(state.scores)({ [rule]: score });
      return extState({ scores });
    case "resetRolls":
      return extState({ rollsLeft: 3 });
    case "calcTotal":
      let total = 0;
      for (const key in state.scores) {
        if (state.scores[key as Rule] !== undefined)
          total += state.scores[key as Rule]!;
      }

      return extState({ totalScores: total });
    default:
      return state;
  }
};

export const App: React.FC = () => {
  const [game, gameDispatch] = useReducer(reducer, initialState);

  useEffect( () => {
    spinn()
  }, [])

  const handleRoll = () => {
    if (game.rollsLeft) {
      spinn()
      gameDispatch(actions.rollAll());

    }
  };
  const handleCalc = (dice: DieType[], rule: Rule) => {
    //calculate
    const score = getRule(rule)(dice);
    //update scores
    // gameDispatch({type: 'CALC_POINTS', score, rule})
    gameDispatch(actions.calcPoints({ score, rule }));
    //unfreez
    gameDispatch(actions.unfreezeAll());
    //rollAll
    gameDispatch(actions.rollAll());
    //restart rolls
    gameDispatch(actions.resetRolls());
    gameDispatch(actions.calcTotal());
    //animate
    spinn()
  };

  const spinn = useCallback(
      () => {
        game.dice.forEach( d => gameDispatch(actions.spinnToogle(d.id)))
        setTimeout( ()=>game.dice.forEach( d => gameDispatch(actions.spinnToogle(d.id))), 500 )
    },[game.dice]
  )

  const calcRoundsLeft = () => {
    let left = 0
    for (const key in game.scores) {
        game.scores[key as Rule] === undefined && left++  
    }
    return left
  }

  const keys = <T extends any>(obj: T): Array<keyof T> => Object.keys(obj);
  return (
    <div className="App">
      <Dies
        dice={game.dice}
        clickHandler={(id: string) => gameDispatch(actions.freezeToggle(id))}
      />
      <PanelStyled>
        <button onClick={handleRoll} disabled={game.rollsLeft === 0}>
          You have {game.rollsLeft} rols left{" "}
        </button>
        <button onClick={() => gameDispatch(actions.unfreezeAll())}>
          unfreez all
        </button>
        <p>Rounds left: {calcRoundsLeft()}</p>
      </PanelStyled>

      <PanelStyled style={{ flexDirection: "column", alignItems: "center" }}>
        {/* ["Ones", "Twos", "Threes"] => [["Ones", undefined],...] */}
        {keys(game.scores).map(rule => (
          <ScoreItemStyled key={rule}>
            <p>{rule}</p>
            {typeof game.scores[rule] === "undefined" ? (
              <button onClick={() => handleCalc(game.dice, rule)}>use</button>
            ) : (
              <p>{game.scores[rule]}</p>
            )}
          </ScoreItemStyled>
        ))}
        <TotalScoreParagraf>Total Score: {game.totalScores}</TotalScoreParagraf>
      </PanelStyled>
    </div>
  );
};

const PanelStyled = styled.div`
  background-color: silver;
  display: flex;
  padding: 1rem 4rem;
  width: 60%;
  overflow: hidden;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0.8rem auto;
  border: 1px solid black;
  box-shadow: #444 0.3rem 0.3rem 1rem;
  button {
    padding: 0.5rem 1rem;
    margin: 0.3rem;
    background-color: white;
    border: 1px solid black;
    border-radius: 5px;
    text-transform: uppercase;
    cursor: pointer;
    :focus {
      outline: none;
    }
  }
  p {
    margin-left: 2rem;
  }
`;

const ScoreItemStyled = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 0.2rem;
  border-bottom: 1px black dotted;
  button {
    padding: 0.2rem 0.3rem;
    margin: 0.3rem;
  }
  p {
    margin: 0.2rem;
  }
`;
const TotalScoreParagraf = styled.p`
  ::before {
    content: "";
    display: inline-block;
    width: 200%;
    height: 100%;
    margin: 0 auto;
    transform: translate(-25%);
    border-bottom: 1px solid #000;
  }
`;



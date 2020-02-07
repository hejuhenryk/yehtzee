import React, {
  useReducer
} from "react";
import "./App.css";
import { createAction } from "./actions";
import {Die} from './Die'

type DieValue = 1 | 2 | 3 | 4 | 5 | 6;
type RollsLeft = 0 | 1 | 2 | 3;
type Rule = "Ones" | "Twos" | "Threes" | 'LowStraight' | 'HighStraight' | "Fours" | "Fives" | "Sixes" | "ThreeOfKind" | "FourOfKind" | "Chance" | "FullHouse" | 'Yahtzee';

export type DieType = {
  id: string;
  value: DieValue;
  isFrozen: boolean;
};

type Scores = {
  [key in Rule]: number | undefined;
};

type GameState = {
  dice: DieType[];
  rollsLeft: RollsLeft;
  scores: Scores;
};

const actions = {
  rollAll: () => createAction("rollAll"),
  freezeToggle: (id: DieType["id"]) => createAction("freezeToggle", id),
  unfreezeAll: () => createAction("unfreezeAll"),
  calcPoints: (p: { score: number; rule: Rule }) =>
    createAction("calcPoints", p),
  resetRolls: () => createAction("resetRolls")
};
type Actions = ReturnType<typeof actions[keyof typeof actions]>;

const getRandomDie = (): DieType => {
  return {
    id: `die-${Math.random()}`,
    value: getDieValue(),
    isFrozen: false
  };
};

const getDieValue = () => (Math.floor(Math.random() * 6) + 1) as DieValue;

const initialState: GameState = {
  dice: [
    getRandomDie(),
    getRandomDie(),
    getRandomDie(),
    getRandomDie(),
    getRandomDie()
  ],
  rollsLeft: 3,
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
    default:
      return state;
  }
};

export const App: React.FC = () => {
  const [game, gameDispatch] = useReducer(reducer, initialState);

  const handleRoll = () => {
    if (game.rollsLeft) {
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
  };

  const keys = <T extends any>(obj: T): Array<keyof T> => Object.keys(obj);
  return (
    <div className="App">
      <ol>
        {game.dice.map(d => (
          <Die key={d.id} dieInfo={d} clickHandler={()=>gameDispatch(actions.freezeToggle(d.id))} />
          // <button
          //   style={{ color: d.isFrozen ? "red" : "black" }}
          //   onClick={() => }
          //   key={d.id}
          // >
          //   {d.value}
          // </button>
        ))}
      </ol>

      <button onClick={handleRoll} disabled={game.rollsLeft === 0}>
        You have {game.rollsLeft} rols left{" "}
      </button>
      <button onClick={() => gameDispatch(actions.unfreezeAll())}>
        unfreez all
      </button>
      <div>
        <p>scores</p>
        {/* ["Ones", "Twos", "Threes"] => [["Ones", undefined],...] */}
        {keys(game.scores).map(key => {
          return (
            <div key={key} style={{ display: "flex" }}>
              <p>{key}</p>
              <button
                onClick={() => handleCalc(game.dice, key)}
                disabled={typeof game.scores[key] !== 'undefined'}
              >
                use
              </button>
              <p>{game.scores[key]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};



const getRule = (rule: Rule) => {
  const freqance = (dice: DieType[]) => {
    const dict: {[key: number]: number} = {}
    dice.forEach( die => ( dict[die.value] !== undefined)  ? dict[die.value]++ : dict[die.value] = 1)
    return Object.values(dict)
  }
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
        const sum = dice.reduce( (score, die)=>score+die.value, 0)
        const freq = freqance(dice)
        return sum *  (freq.length < 3 ? 1 : freq.length === 3 && freq.includes(3) ? 1 : 0)
      }
    }
    case "FourOfKind": {
      return (dice: DieType[]) => {
        const sum = dice.reduce( (score, die)=>score+die.value, 0)
        const freq = freqance(dice)
        return sum * ( freq.includes(5) || freq.includes(4) ? 1 : 0)
      }
    }
    case "Chance": 
          return (dice: DieType[]) => dice.reduce( (score, die)=>score+die.value, 0)
    case "FullHouse": 
      return (dice: DieType[]) => freqance(dice).includes(3) && freqance(dice).includes(2) ? 25 : 0
    case 'Yahtzee': 
      return (dice: DieType[]) => freqance(dice).includes(5) ? 50 : 0
    case 'LowStraight': 
      return (dice: DieType[]) => {
        const valuse =  dice.map(d=>d.value)
        if( valuse.includes(3) && valuse.includes(3) ){
          if (valuse.includes(2) && (valuse.includes(1) || valuse.includes(5)) ) 
            return 30
          else if (valuse.includes(6) && valuse.includes(5))
            return 30
          else return 0
        } 
        else return 0
      }
    case 'HighStraight': 
      return (dice: DieType[]) => freqance(dice).length === 5 && ( !dice.map(d=>d.value).includes(6) || !dice.map(d=>d.value).includes(1) ) ? 40 : 0
    default:
      return (dice: DieType[]) => 0;
  }
};


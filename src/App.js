import './App.css';
import { FaHandPaper, FaHandRock, FaHandScissors } from 'react-icons/fa';
import { useState } from 'react';

const actions = {
  rock:["scissors","paper","rock"],
  paper:["rock","scissors","paper"],
  scissors:["paper","rock","scissors"],
};

function RandomAction() {
  
  const keys = Object.keys(actions);
  const index = Math.floor(Math.random() * keys.length);
  return keys[index];

}

function CalculateWinner(action1, action2) {
  if(action1 === action2) {
    return 0;
  } else if(actions[action1]===action2) {
    return -1;
  }
  return null;
}

function ActionIcon({action, ...props}) {
  const icons = {
    rock:FaHandRock,
    paper:FaHandPaper,
    scissors:FaHandScissors,
  };
  const Icon = icons[action]
  return (<Icon {...props} />);
}
  

function Player({name="Player", score=0, action="rock"}) {
  return (
    <div className='player'>
      <div className='score'>
        {`${name}: ${score}`}
      </div>
      <div className='action'>{action && <ActionIcon action={action} size={60} />}</div>
    </div>
  )
}

function ActionButton({action='rock', onActionSelected}) {
  return (
    <button className='round-btn' onClick={()=>onActionSelected(action)}><ActionIcon size={20} action={action} /></button>
  )
}

function ShowWinner({winner=0}) {
  const text = {
    "-1":"You won",
    "0":"Draw",
    "1":"Computer won",
  }
  return (
    <h2>{text[winner]}</h2>
  )
}

function App() {
  const [playerAction, setPlayerAction] = useState('');
  const [computerAction, setComputerAction] = useState('');
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [winner,setWinner] = useState(0);
  const onActionSelected = (selectedAction)=>{
    setPlayerAction(selectedAction);
    const newComputerAction = RandomAction();
    setComputerAction(newComputerAction);
    const newWinner = CalculateWinner(selectedAction, newComputerAction);
    setWinner(newWinner);
    if(newWinner === -1){
      setPlayerScore(playerScore+1);

    } else if(newWinner === 1){
      setComputerScore(computerScore+1);
    }
  }
  return (
    <div className='center'>
      <h1>Rock Paper Scissors</h1>
      <div>
        <div className='container'>
          <Player name='Player' score={playerScore} action={playerAction} />
          <Player name='Computer' score={computerScore} action={computerAction} />
          
          
        </div>
      </div>
      <div>
        <ActionButton action='rock' onActionSelected={onActionSelected} />
        <ActionButton action='paper' onActionSelected={onActionSelected} />
        <ActionButton action='scissors' onActionSelected={onActionSelected} />
      </div>
      <ShowWinner winner={winner} />
    </div>
  );
}

export default App;

import { useState } from 'react';
import './App.css'
import Board from './components/Board/Board';
import Editable from './components/Editable/Editable';

function App() {
  const [boards,setboards]=useState([
    {
      id:Date.now() + Math.random()*2,
      title:"To Do",
      cards:[
        {
          id:Date.now()+Math.random(),
          title:"Card 1",
          tasks:[],
          labels:[
            {
            text:"frontend",
            color:"blue",
          },
        ],
          desc:"dfhdh ghj",
          date:"",
        },
        {
          id:Date.now()+Math.random(),
          title:"Card 2",
          tasks:[],
          labels:[{
            text:"backend",
            color:"brown"
          }],
          desc:"dfhdh ghj",
          date:"",
        },
      ],
    },
  ]);


  

  const [target, setTarget] = useState({
    cid:"",
    bid:""
  })


  const addCard=(title, bid)=>{
    const card={
      id:Date.now()+Math.random(),
      title,
      labels:[],
      tasks:[],
      date:"",
      desc:"",
    };

    

    const index=boards.findIndex((item)=>item.id===bid)
    if(index<0) return 

    const tempBoards=[...boards]
    tempBoards[index].cards.push(card)
    setboards(tempBoards)

  }
  
  const removeCard = (bid, cid) => {
    const bIndex = boards.findIndex((item) => item.id === bid);
    if (bIndex < 0) return;

    const cIndex=boards[bIndex].cards.findIndex((item)=>item.id===cid)
    if(cIndex<0) return 

    const tempBoards=[...boards]
    tempBoards[bIndex].cards.splice(cIndex, 1)
    setboards(tempBoards)
  };
  
  const addBoard=(title)=>{
    setboards([...boards,{
      id:Date.now()+Math.random(),
      title,
      cards:[],
    },
  ]);
  };

  const removeBoard=(bid)=>{
    const tempBoards=boards.filter((item)=>item.id !==bid)
    setboards(tempBoards)

  }

  const handleDragEnter=(cid, bid)=>{
    setTarget({
      cid,
      bid
    })
  }
    
  const handleDragEnd=(cid, bid)=>{
    let s_bIndex, s_cIndex, t_cIndex, t_bIndex

    s_bIndex=boards.findIndex((item)=>item.id === bid)
    if(s_bIndex<0) return 

    s_cIndex=boards[s_bIndex].cards?.findIndex((item)=>item.id === cid)
    if(s_cIndex < 0) return 

    t_bIndex=boards.findIndex((item)=>item.id === target.bid)
    if(t_bIndex<0) return 

    t_cIndex=boards[t_bIndex].cards?.findIndex((item)=>item.id === target.cid)
    if(t_cIndex<0) return 

    const tempboards=[...boards]
    const tempCard = tempboards[s_bIndex].cards[s_cIndex]

    tempboards[s_bIndex].cards.splice(s_cIndex, 1)
    tempboards[t_bIndex].cards.splice(t_cIndex,0,tempCard)

    setboards(tempboards)

  }
  
  const updateCard=(cid, bid, card)=>{
    const bIndex = boards.findIndex((item) => item.id === bid);
    if (bIndex < 0) return;

    const cIndex=boards[bIndex].cards.findIndex((item)=>item.id===cid)
    if(cIndex<0) return 

    const tempBoards=[...boards]
    tempBoards[bid].cards[cid]=card
    setboards(tempBoards)

  }
  
  return (
    <>
      <div className="app">
        <div className="app_navbar">
          <h2>Kanban</h2>
        </div>
        <div className="app_outer">
          <div className="app_boards">
            {
              boards.map((item)=>(
              <Board key={item.id} board={item}
              removeBoard={removeBoard}
              addCard={addCard}
              removeCard={removeCard}
              handleDragEnd={handleDragEnd}
              handleDragEnter={handleDragEnter}
              updateCard={updateCard}
               /> 
              ))}
            
            <div className="app_boards_board">
            <Editable 
            displayClass="app_boards_board_add"
            text="Add Board"
            placeholder="Enter board title"
            onSubmit={(value)=>addBoard(value)}
            />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;



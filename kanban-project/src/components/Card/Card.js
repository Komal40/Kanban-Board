import React,{useState} from 'react';
import './Card.css';
import { CheckSquare, Clock, MoreHorizontal } from 'react-feather';
import Chip from '../Chip/Chip';
import Dropdown from '../Dropdown/Dropdown';
import Cardinfo from './Cardinfo/Cardinfo';
export default function Card(props) {
    const [showDropdown,setShowDropdown]=useState(false)
    const [showmodal,setShowModal]=useState(false)
    const {id}=props.card
  return (
    <>
    {
  showmodal && <Cardinfo onClose={()=>setShowModal(false)}/>
}
    <div className='card' draggable
    onDragEnd={()=>props.handleDragEnd(props.card?.id,props.boardId)}
    onDragEnter={()=>props.handleDragEnter(props.card?.id,props.boardId)}
    onClick={()=>setShowModal(true)}
    >


        <div className='card_top'>
            <div className='card_top_labels'>
              
                {props.card?.labels?.map((item,index) => (<Chip key={index} text={item.text} color={item.color}  />))}
              
            </div>
            
            <div className="card_top_more" onClick={()=>
              setShowDropdown(true)}>
            <MoreHorizontal/>
            
              {showDropdown && (
            <Dropdown 
            onClose={()=>setShowDropdown(false)} >
              <div className="card_dropdown">
              <p onClick={() => props.removeCard(props.boardId, id)}>
                  Delete Card
                </p>
              </div>
            </Dropdown>
              )}
        </div> 
        </div>
        <div className='card_title'>
            {props.card?.title}
        </div>
        <div className='card_footer'>
          {props.card?.date && (
            <p>
              <Clock/>
              {props.card?.date}
            </p>
            )}
            <p><CheckSquare/>
            1/4
            </p>
        </div>
    </div>
    </>
  );
}



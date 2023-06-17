import React, { useState } from "react";
import { MoreHorizontal } from "react-feather";

import Card from "../Card/Card";
import Dropdown from "../Dropdown/Dropdown";
import Editable from "../Editable/Editable";

import "./Board.css";

function Board(props) {
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  return (
    <div className="board">
      <div className="board_header">
        <p className="board_header_title">
          {props.board?.title}
          <span>
          { props.board?.cards?.length>0 &&(
            props.board?.cards?.length || 0
          )}</span>
        </p>
        <div
          className="board_header_title_more"
          onClick={() => setShowDeletePopup(!showDeletePopup)}
        >
          <MoreHorizontal />
        </div>
      </div>
      {showDeletePopup && (
        <div className="delete-popup">
          <p onClick={() => props.removeBoard()}>Delete Board</p>
        </div>
      )}
      <div className="board_cards custom-scroll">
        {props.board?.cards?.map((item) => (
          <Card
            key={item.id}
            card={item}
            boardId={props.board.id}
            removeCard={props.removeCard}
            dragEntered={props.dragEntered}
            dragEnded={props.dragEnded}
            updateCard={props.updateCard}
          />
        ))}
        <Editable
          text="+ Add Card"
          placeholder="Enter Card Title"
          displayClass="board_add-card"
          editClass="board_add-card_edit"
          onSubmit={(value) => props.addCard(props.board?.id, value)}
        />
      </div>
    </div>
  );
}

export default Board;

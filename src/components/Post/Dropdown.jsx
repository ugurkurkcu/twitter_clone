import React, { useRef } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";

const Dropdown = ({ handleDelete, handleEdit }) => {
  const inputRef = useRef();
  return (
    <div>
      <label className="popup">
        <input ref={inputRef} type="checkbox" />
        <div className="burger" tabIndex="0">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <nav className="popup-window">
          <legend>Actions</legend>
          <hr />
          <ul>
            <li>
              <button
                onClick={() => {
                  inputRef.current.checked = false;
                  handleEdit();
                }}
              >
                <MdOutlineModeEdit />
                <span>Edit</span>
              </button>
            </li>
            <hr />
            <li>
              <button onClick={handleDelete}>
                <FaTrashAlt />
                <span>Delete</span>
              </button>
            </li>
          </ul>
        </nav>
      </label>
    </div>
  );
};

export default Dropdown;

import { useState } from "react";

import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  //fetch all notes

    //Add note
    const getNotes=async()=>{
        //api call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": localStorage.getItem('token')
            },
          });
          const json = await response.json()
          console.log(json);
          setNotes(json)
      }
    

  //Add note
  const addNote = async (title, description, tag) => {
    //api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token'),
      },
      body: JSON.stringify({title, description, tag})
    });
    console.log("Add new note");
    const note = await response.json();
    setNotes(notes.concat(note));
    
  };

  //Delete node
  const deleteNote = async(id) => {
        //api call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "auth-token":
              localStorage.getItem('token'),
            },
            
          });
          const json = response.json();
          console.log(json)
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //Edit note

  const editNote = async (id, title, description, tag) => {
    //api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
         "auth-token":
         localStorage.getItem('token'),
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = response.json();
    console.log(json)
    let newNotes=JSON.parse(JSON.stringify(notes))
    //logic in client side
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote,getNotes}}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;


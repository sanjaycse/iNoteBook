import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext";
import AddNote from './AddNote';
import NoteItem from './NoteItem';

export default function Notes() {
    const context = useContext(noteContext);
    const {notes, addNote} = context;
  return (
    <>
        <AddNote />
        <div className="row my-3">
            <h1>Your Notes</h1>
            {notes.map((notes)=>{
            return <NoteItem key={notes._id} notes={notes}/>
            })}
        </div>
    </>
  )
}

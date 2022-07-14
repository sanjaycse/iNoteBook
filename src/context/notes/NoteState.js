import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
    const notesInitial = [
        {
          "_id": "62cdba2213d76bea6171fe417",
          "user": "62c9e3e1448f2b7c57b4b06a",
          "title": "My title2",
          "description": "This is my description2",
          "tag": "computers",
          "date": "2022-07-12T18:14:58.535Z",
          "__v": 0
        },
        {
          "_id": "62ce5b4cdedd45b128667eaa3",
          "user": "62c9e3e1448f2b7c57b4b06a",
          "title": "sanjay notes",
          "description": "This3 is my description212345",
          "tag": "computers",
          "date": "2022-07-13T05:42:36.983Z",
          "__v": 0
        },
        {
          "_id": "62ce5b4cdedd45b128667eaa2",
          "user": "62c9e3e1448f2b7c57b4b06a",
          "title": "sanjay notes",
          "description": "This3 is my description212345",
          "tag": "computers",
          "date": "2022-07-13T05:42:36.983Z",
          "__v": 0
        },
        {
          "_id": "62ce5b4cdedd45b128667eaa1",
          "user": "62c9e3e1448f2b7c57b4b06a",
          "title": "sanjay notes",
          "description": "This3 is my description212345",
          "tag": "computers",
          "date": "2022-07-13T05:42:36.983Z",
          "__v": 0
        }
      ]
    
      const [notes, setNotes] = useState(notesInitial);



      //Add a note
      const addNote =(title, description, tag)=>{
        const note = {
          "_id": "62ce5b4cdedd45b128667eaa1",
          "user": "62c9e3e1448f2b7c57b4b06a",
          "title": "sanjay notes",
          "description": "This is my note updated",
          "tag": "computer",
          "date": "2022-07-13T05:42:36.983Z",
          "__v": 0
        };
        setNotes(notes.push(note))
      }

      //Delete a note
      const deleteNote =(id)=>{
        
      }

      //Edit a note
      const editNote =(id)=>{
        
      }
    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
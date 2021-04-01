import React, {useState, useEffect} from 'react'
import { FaPencilAlt, FaSearch , FaEdit} from "react-icons/fa";
import {MdNoteAdd, MdDelete}  from "react-icons/md";
import {GrNotes,GrUpdate}  from "react-icons/gr";
import {FiSave}  from "react-icons/fi";
import {RiCloseFill}  from "react-icons/ri";
import note_image from "./note.png"


import Modal from "./Modal"
import "../node_modules/bootstrap-css-only/css/bootstrap.min.css";
import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

const Note = ({note , editNote, deleteNote}) => {
  return (
    <>
      <tr>
        <td> <button className = "edit-button" onClick = {editNote} ><FaEdit/> </button> </td>
        <td> <button className = "delete-button" onClick = {deleteNote} ><MdDelete/> </button> </td>
        <td> {note.title} </td> 
        <td> {note.content} </td> 
        <td> {note.Date} </td> 
      </tr>
    </>
  )
}

const Search = ({props}) => {

  const [state, setState] = useState(false);
  const [edit_state, set_Edit_State] = useState(false);
  const [notes, setNotes] = useState([])
  const [newTitle, setTitle] = useState('')
  const [newContent, setContent] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [edit_id, set_Id] = useState()

  useEffect(() => {
    let delay = false;
    axios.get('http://localhost:3001/notes')
      .then(response => {
        !delay && setNotes(response.data)
        return () => (delay = true) 
      })
      .catch(error => {
        console.log('fail2')
        return
      })
  } ,[])

  const modalOpen = (event) => {
    event.preventDefault();
    setTitle('')
    setContent('')
    setState(true);

  }

  const modalClose = (event) => {
    event.preventDefault();
    setState(false);
  }

  const edit_modalOpen = (event) => {
    event.preventDefault();
    set_Edit_State(true);
  }

  const edit_modalClose = (event) => {
    event.preventDefault();
    set_Edit_State(false);
  }

  const handleTitle = (event) => {
    setTitle(event.target.value);
  }

  const handleContent = (event) => {
    setContent(event.target.value);
  }

  const addNote = () => {

    if(newTitle === '') {

    }

    if(newContent === '') {

    }
    var date = new Date();
    console.log(date);
    const newNote = {
      title: newTitle, 
      content : newContent, 
      Date : date
    } 

    axios.post(baseUrl, newNote)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote.data))
      })
      .catch(error => {
        console.log('fail')
      })

    setState(false);
  }

  const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(searchTerm.toLowerCase()))

  const focusInput = () => {
      document.getElementById("note").focus();
  }
  const search = (event) => {
    setSearchTerm(event.target.value);
  }

  const editNote = (id) => {
    const note = notes.filter(note => note.id === id)
    set_Edit_State(true);
    set_Id(id);
    setTitle('');
    setContent('');

  }
  const UpdateNote = (id) => {

    
    const newNote = {
      title : newTitle, 
      content : newContent,
      Date : new Date()
    }


    axios.put('http://localhost:3001/notes/' + id.toString(), newNote)
    .then(returnedNote => {
      setNotes(notes.map(note => note.id === id ? returnedNote.data : note));
      set_Edit_State(false);
    })
    .catch(error => {
      console.log('Update fail')
      return 
    })
  }

  const deleteNote = (id) => {

    var title = '';
    for(var i = 0;i < notes.length;i++) {
      if(notes[i].id === id) {
        title = notes[i].title;
      }
    }

    if(window.confirm('Delete note with title ' + title + ' ?')) {
      axios.delete('http://localhost:3001/notes/' + id.toString())
      .then(response => console.log(response.data))
      .catch(error => {
        console.log('fail')
      })
      setNotes(notes.filter(n => n.id !== id))
    }
  }


  return (
    <>  
      <div className = "flex-container">
        <button className = "add-button"onClick = {modalOpen} > <MdNoteAdd /> </button>
        <input className="form-control mr-sm-2" id = "note" type="text" placeholder="Search for note by title ..." aria-label="Search" onChange = {search}/>
        <button className = "search-button" onClick = {focusInput} > 
            <FaSearch />
        </button>
      </div>
      <Modal  show = {state} handleClose = {modalClose}>
        <p> <GrNotes/> New Note </p>
        <div className = "form-group">   
          <label> Title </label>
          <br/>
          <input
            className="form-control"
            type = "text"
            onChange = {handleTitle}
            value = {newTitle}
          required/>
        </div>
        <div className = "form-group">   
          <label> Content </label> 
          <br/>
          <textarea
            className="form-control"
            type = "text"
            onChange = {handleContent}
            value = {newContent}
          required/>

        </div>
        <div className = "form-group">
          <button  type = "button" className = "btn btn-success modal_open" onClick = {addNote} >
            <FiSave/> Save
          </button>
          <button className="modal-close btn btn-danger modal_close" onClick = {modalClose} > 
            <RiCloseFill/> Close
          </button> 
        </div>
       </Modal>
       <table className="table table-striped table">
        <thead className = "thead-light">
          <tr>
            <th scope = "col"> </th>
            <th scope = "col"> </th>
            <th scope = "col"> Title</th>
            <th scope = "col" className = "content" > Content</th>
            <th scope = "col"> Date </th>
          </tr>
        </thead>
        <tbody>
          {filteredNotes.map(note => 
            <Note key = {note.id} note = {note}  editNote = {() => editNote(note.id)} deleteNote = {() => deleteNote(note.id)} />
          )}
        </tbody>
      </table>
        <Modal  show = {edit_state} handleClose = {edit_modalClose}>
        <p> <GrNotes/> New Note </p>
        <div className = "form-group">   
          <label> Title </label>
          <br/>
          <input
            className="form-control"
            type = "text"
            onChange = {handleTitle}
            value = {newTitle}
          required/>
        </div>
        <div className = "form-group">   
          <label> Content </label> 
          <br/>
          <textarea
            className="form-control"
            type = "text"
            onChange = {handleContent}
            value = {newContent}
          required/>

        </div>
        <div className = "form-group">
          <button type = "button" className = "btn btn-success modal_open" onClick = {() => UpdateNote(edit_id)}>
            <GrUpdate/> Update
          </button>
          <button className="modal-close btn btn-danger modal_close" onClick = {edit_modalClose} > 
            <RiCloseFill/>Close
          </button> 
        </div>
       </Modal>
    </>
  )

} 

const App = () => {
  const Heading = "NoteWorx";



  return (
    <div >
      <div className = "heading">
        <span className = "img-span"><img src = {note_image} alt = "Note diary" width = "70" height = "70"/>  </span>
        <span className = "span1">{Heading} </span>
      </div>
      <Search />
    </div>
  )
}
export default App;

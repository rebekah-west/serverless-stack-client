import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./Home.css";
import { API } from "aws-amplify";
import { BsPencilSquare } from "react-icons/bs";
import { LinkContainer } from "react-router-bootstrap";

import Form from "react-bootstrap/Form";
import LoaderButton from "../components/LoaderButton";
import "./Notes.css";
import Nav from "react-bootstrap/esm/Nav";
import { useHistory } from "react-router-dom";



export default function Home() {
  const [notes, setNotes] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }
  
      try {
        const notes = await loadNotes();
        setNotes(notes);
      } catch (e) {
        onError(e);
      }
  
      setIsLoading(false);
    }
  
    onLoad();
  }, [isAuthenticated]);
  
  async function loadNotes() {
    const item = await API.get("notes", "/notes");
    return item;
  }

  async function saveNote(note) {
    return await API.put("notes", `/notes/${note.noteId}`, {
      body: note
    });
  }

  async function handleSubmit(event, note){
    event.preventDefault();
    setIsLoading(true);
    try {  
      await saveNote({
        ...note,
        lastWorn: Date.now(),
      }); 
      history.push("/");
      window.location.reload();
    } catch (e) {
      onError(e); 
      setIsLoading(false);
    }
  }

  function renderNotesList(notes) {
    return (
      <>
        <LinkContainer to="/notes/new">
          <ListGroup.Item action className="py-3 text-nowrap text-truncate">
            <BsPencilSquare size={17} />
            <span className="ml-2 font-weight-bold">Create a new note</span>
          </ListGroup.Item>
        </LinkContainer>
        {notes.map((note) => (
          <ListGroup.Item as="div" key={note.noteId} action>
            <LinkContainer to={`/notes/${note.noteId}`}>
              <Nav.Link>
                <span className="font-weight-bold">
                  {note.content?.trim().split("\n")[0]}
                </span>
                <br />
                <span className="text-muted">
                  Last Updated: {new Date(note.lastModified).toLocaleString()}
                </span>
                <br />
                <span className="text-muted">
                  Last Worn: {new Date(note.lastWorn).toLocaleString()}
                </span>
                <br />
              </Nav.Link>
              </LinkContainer>
              <Form onSubmit={(e) => handleSubmit(e, note)}>
                <LoaderButton
                  block
                  size="lg"
                  type="submit"
                  isLoading={isLoading}
                >
                  Wear
                </LoaderButton>
              </Form>
              <br />
          </ListGroup.Item>
        ))}
      </>
    );
  }


  function renderLander() {
    return (
      <div className="lander">
        <h1>Scratch</h1>
        <p className="text-muted">A simple note taking app</p>
      </div>
    );
  }

  function renderNotes() {
    return (
      <div className="notes">
        <h2 className="pb-3 mt-4 mb-3 border-bottom">Your Notes</h2>
        <ListGroup>{!isLoading && renderNotesList(notes)}</ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {isAuthenticated ? renderNotes() : renderLander()}
    </div>
  );
}
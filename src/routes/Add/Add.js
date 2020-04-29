import React, { useCallback, useState, useRef } from "react";
import gql from "graphql-tag";
import Editor from "../../components/Editor";
import { Mutation } from "react-apollo";
const ADD_NOTE = gql`
  mutation addNote($title: String!, $content: String!) {
    createNote(title: $title, content: $content) @client {
      id
    }
  }
`;
const Add = (props) => {
  const createNoteRef = useRef(null);
  const onSave = useCallback(
    (title, content, id = null) => (e) => {
      if (title !== "" && content !== "") {
        createNoteRef.current({ variables: { title, content } });
        props.history.push("/");
      }
    },
    [props.history]
  );

  return (
    <>
      <Mutation mutation={ADD_NOTE}>
        {(createNote) => {
          createNoteRef.current = createNote;
          return <Editor onSave={onSave} title="" content="" />;
        }}
      </Mutation>
    </>
  );
};
export default Add;

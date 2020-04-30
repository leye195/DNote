import React, { useCallback, useRef } from "react";
import gql from "graphql-tag";
import Editor from "../../components/Editor";
import { Mutation } from "react-apollo";
import moment from "moment";
const ADD_NOTE = gql`
  mutation createNote($title: String!, $content: String!, $updatedAt: String!) {
    createNote(title: $title, content: $content, updatedAt: $updatedAt)
      @client {
      id
    }
  }
`;
const Add = (props) => {
  const createNoteRef = useRef(null);
  const onSave = useCallback(
    (title, contentTag, id = null) => (e) => {
      const contentText = contentTag.innerHTML;
      if (title !== "" && contentText !== "") {
        createNoteRef.current({
          variables: {
            title,
            content: contentText,
            updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          },
        });
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

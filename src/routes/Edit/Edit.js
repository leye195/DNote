import React, { useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import { NoteContainer } from "../Note/Note";
import Editor from "../../components/Editor";
import { Query, Mutation } from "react-apollo";
import { GET_NOTE } from "../../Queries";
import gql from "graphql-tag";
const EDIT_NOTE = gql`
  mutation editNote($id: Int!, $title: String!, $content: String!) {
    editNote(id: $id, title: $title, content: $content) @client {
      id
    }
  }
`;
const Edit = (props) => {
  const { id } = useParams();
  const editNoteRef = useRef(null);
  const onSave = useCallback(
    (title, contentTarget, id = null) => (e) => {
      if (contentTarget) {
        const contentText = contentTarget.innerHTML;
        console.log(contentText);
        editNoteRef.current({ variables: { title, content: contentText, id } });
      }
      props.history.push("/");
    },
    [props.history]
  );
  return (
    <>
      <NoteContainer>
        <Query query={GET_NOTE} variables={{ id }}>
          {({ data }) =>
            data && data.note ? (
              <Mutation mutation={EDIT_NOTE}>
                {(editNote) => {
                  editNoteRef.current = editNote;
                  return (
                    <Editor
                      id={id}
                      title={data.note.title}
                      content={data.note.content}
                      onSave={onSave}
                    />
                  );
                }}
              </Mutation>
            ) : null
          }
        </Query>
      </NoteContainer>
    </>
  );
};
export default Edit;

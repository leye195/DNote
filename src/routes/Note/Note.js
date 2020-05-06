import React, { useCallback, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Query, Mutation } from "react-apollo";
import { GET_NOTE } from "../../Queries";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faCaretSquareLeft,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
//import MarkDownRenderer from "react-markdown-renderer";
import gql from "graphql-tag";
export const NoteContainer = styled.div``;
export const NoteTitleContainer = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #e3e3e3;
  box-shadow: 2px 0px 5px 0px #383838;
  border-bottom: 3px solid #5477b770;
  & svg {
    margin-right: 10px;
    cursor: pointer;
  }
`;
const NoteTitle = styled.h1`
  display: flex;
  align-items: center;
  margin-bottom: 0;
  margin-top: 0;
  padding: 10px;
  a {
    font-size: 1.5rem;
  }
`;
export const NoteContentContainer = styled.div`
  margin: 10px;
  margin-top: 90px;
  background-color: white;
  padding: 10px;
  min-height: 80vh;
  white-space: pre;
  p,
  ul,
  li {
    margin: 0;
  }
`;
const NoteUpdated = styled.span`
  margin: 10px;
  font-size: 0.8rem;
  color: #616161c2;
  font-weight: 800;
  &:hover {
    color: black;
  }
`;
const FontContainer = styled.div`
  display: flex;
  align-items: center;
`;
const DELETE_NOTE = gql`
  mutation deleteNote($id: Int!) {
    deleteNote(id: $id) @client {
      id
    }
  }
`;
const Note = (props) => {
  const { id } = useParams();
  const deleteRef = useRef(null);
  const onDelete = useCallback(
    (id) => (e) => {
      console.log(id);
      deleteRef.current({ variables: { id: parseInt(id) } });
      props.history.push("/");
    },
    [props.history]
  );
  return (
    <>
      <Mutation mutation={DELETE_NOTE}>
        {(deleteNote) => {
          deleteRef.current = deleteNote;
          return (
            <Query query={GET_NOTE} variables={{ id }}>
              {({ data }) => {
                return (
                  <NoteContainer>
                    <NoteTitleContainer>
                      <NoteTitle>
                        <Link to={`/`}>
                          <FontAwesomeIcon icon={faCaretSquareLeft} />
                        </Link>
                        {data && data.note && data.note.title}
                      </NoteTitle>
                      <FontContainer>
                        <NoteUpdated>
                          수정시간: {data && data.note.updatedAt}
                        </NoteUpdated>
                        <Link to={`/edit/${id}`}>
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>
                        <FontAwesomeIcon
                          icon={faTrash}
                          onClick={onDelete(id)}
                        />
                      </FontContainer>
                    </NoteTitleContainer>
                    <NoteContentContainer
                      dangerouslySetInnerHTML={{
                        __html: data && data.note && data.note.content,
                      }}
                    />
                  </NoteContainer>
                );
              }}
            </Query>
          );
        }}
      </Mutation>
    </>
  );
};
export default Note;

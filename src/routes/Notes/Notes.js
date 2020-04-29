import React, { useCallback, useRef } from "react";
import styled from "styled-components";
import { Query, Mutation } from "react-apollo";
import { GET_NOTES } from "../../Queries";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faStar } from "@fortawesome/free-solid-svg-icons";
import gql from "graphql-tag";
import SideBar from "../../components/SideBar";

const Header = styled.header`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #e3e3e3;
  padding-left: 10px;
  box-shadow: 1px 1px 2px 0px #a7a7a7;
  z-index: 1;
  background: #e3e3e3;
`;
const Title = styled.h1`
  font-size: 2rem;
`;
const NotesMain = styled.main`
  margin-left: 50px;
`;
const NotesSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 300px));
  margin: 5px;
  margin-top: 90px;
  align-items: center;
  justify-content: center;
  & a {
    text-decoration: none;
    color: black;
  }
`;
const Note = styled.div`
  padding: 10px;
  height: 200px;
  margin: 5px;
`;
const NoteTitle = styled.p`
  font-weight: 800;
`;
const NoteContent = styled.p`
  margin-bottom: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  font-size: 0.9rem;
  font-weight: 400;
  height: 150px;
  line-height: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 10;
  -webkit-box-orient: vertical;
  white-space: pre;
`;
const NoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  margin: 10px;
  box-shadow: 0px 0px 9px 1px #8a8a8a;
`;
const NoteDeleteContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 6px;
  padding: 5px;
  border-bottom: 1px solid #e3e3e3;
  & svg {
    cursor: pointer;
  }
`;
const CreatedDate = styled.p`
  font-size: 0.8rem;
`;
const FontContainer = styled.div`
  display: flex;
  svg {
    margin: 5px;
  }
  .fav:hover {
    color: #ffeb3b;
  }
`;
const FilterContainer = styled.div``;
const DELETE_NOTE = gql`
  mutation deleteNote($id: Int!) {
    deleteNote(id: $id) @client {
      id
    }
  }
`;
const Notes = () => {
  const deleteRef = useRef(null);
  const onDelete = useCallback(
    (id) => (e) => {
      deleteRef.current({ variables: { id } });
    },
    []
  );
  return (
    <>
      <Header>
        <Title>DNotes</Title>
        <FilterContainer></FilterContainer>
      </Header>
      <NotesMain>
        <SideBar />
        <NotesSection>
          <Mutation mutation={DELETE_NOTE}>
            {(deleteNote) => {
              deleteRef.current = deleteNote;
              return (
                <Query query={GET_NOTES}>
                  {({ data }) =>
                    data && data.notes
                      ? data.notes.map((note) => {
                          return (
                            <NoteContainer key={note.id}>
                              <NoteDeleteContainer>
                                <CreatedDate>{note.createdAt}</CreatedDate>
                                <FontContainer>
                                  <FontAwesomeIcon
                                    icon={faStar}
                                    className="fav"
                                  />
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                    onClick={onDelete(note.id)}
                                  />
                                </FontContainer>
                              </NoteDeleteContainer>
                              <Link to={`/note/${note.id}`}>
                                <Note>
                                  <NoteTitle>{note.title}</NoteTitle>
                                  <NoteContent>{note.content}</NoteContent>
                                </Note>
                              </Link>
                            </NoteContainer>
                          );
                        })
                      : null
                  }
                </Query>
              );
            }}
          </Mutation>
        </NotesSection>
      </NotesMain>
    </>
  );
};
export default Notes;

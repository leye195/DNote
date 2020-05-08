import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { Query, Mutation } from "react-apollo";
import { GET_NOTES } from "../../Queries";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faStar,
  faSortAmountDown,
} from "@fortawesome/free-solid-svg-icons";
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
  justify-content: space-between;
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
  @keyframes noteAni {
    from {
      opacity: 0.3;
    }
    to {
      opacity: 1;
    }
  }
  display: flex;
  flex-direction: column;
  background: white;
  margin: 10px;
  box-shadow: 0px 0px 9px 1px #8a8a8a;
  animation: noteAni 1s ease-out;
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
const NoteDate = styled.p`
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
  svg.liked {
    color: #ffeb3b;
  }
`;
const FilterContainer = styled.div`
  position: relative;
  padding-right: 50px;
  svg {
    font-size: 1.2rem;
    cursor: pointer;
    border-style: solid;
    padding: 3px;
    border-radius: 10px;
  }
`;
const Selection = styled.select`
  position: absolute;
  width: 30px;
  height: 30px;
  left: 0;
  opacity: 0;
`;
const DELETE_NOTE = gql`
  mutation deleteNote($id: Int!) {
    deleteNote(id: $id) @client {
      id
    }
  }
`;
const FAV_NOTE = gql`
  mutation favNote($id: Int!) {
    favNote(id: $id) @client {
      id
    }
  }
`;
const Notes = () => {
  const deleteRef = useRef(null);
  const favRef = useRef(null);
  const [selected, setSelected] = useState(0);
  const [type, setType] = useState(0);
  const onChangeSort = useCallback((e) => {
    setSelected(parseInt(e.target.value));
  }, []);
  const sortNotes = (notes) => {
    let sortedNotes = notes;
    if (selected === 0)
      sortedNotes.sort((x, y) => (x.createdAt > y.createdAt ? -1 : 1));
    else if (selected === 1)
      sortedNotes.sort((x, y) => (x.updatedAt > y.updatedAt ? -1 : 1));
    return sortedNotes;
  };
  const onDelete = useCallback(
    (id) => (e) => {
      deleteRef.current({ variables: { id } });
    },
    []
  );
  const onFav = useCallback(
    (id) => (e) => {
      favRef.current({ variables: { id } });
    },
    []
  );
  const handleType = useCallback(
    (type) => (e) => {
      setType(type);
    },
    []
  );
  return (
    <>
      <Header>
        <Title>DNotes</Title>
        <FilterContainer>
          <FontAwesomeIcon icon={faSortAmountDown} />
          <Selection onChange={onChangeSort}>
            <option selected={selected === 0} value={0}>
              생성 날짜
            </option>
            <option selected={selected === 1} value={1}>
              업데이트 날짜
            </option>
          </Selection>
        </FilterContainer>
      </Header>
      <NotesMain>
        <SideBar handleType={handleType} type={type} />
        <NotesSection>
          <Mutation mutation={FAV_NOTE}>
            {(favNote) => {
              favRef.current = favNote;
              return (
                <Mutation mutation={DELETE_NOTE}>
                  {(deleteNote) => {
                    deleteRef.current = deleteNote;
                    return (
                      <Query query={GET_NOTES}>
                        {({ data }) => {
                          const dates = data.notes.map((note) =>
                            moment(note.createdAt).format("YYYY/MM")
                          );
                          console.log(dates);
                          const notes =
                            type === 0
                              ? sortNotes(data && data.notes) || []
                              : (sortNotes(data && data.notes) || []).filter(
                                  (note) => note.fav === true
                                );

                          return notes
                            ? notes.map((note) => {
                                return (
                                  <NoteContainer key={note.id}>
                                    <NoteDeleteContainer>
                                      <NoteDate>
                                        생성 날짜: {note.createdAt}
                                      </NoteDate>
                                      <FontContainer>
                                        <FontAwesomeIcon
                                          icon={faStar}
                                          className={`fav ${
                                            note.fav ? "liked" : ""
                                          }`}
                                          onClick={onFav(note.id)}
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
                                        <NoteContent
                                          dangerouslySetInnerHTML={{
                                            __html: note.content,
                                          }}
                                        ></NoteContent>
                                      </Note>
                                    </Link>
                                  </NoteContainer>
                                );
                              })
                            : null;
                        }}
                      </Query>
                    );
                  }}
                </Mutation>
              );
            }}
          </Mutation>
        </NotesSection>
      </NotesMain>
    </>
  );
};
export default Notes;

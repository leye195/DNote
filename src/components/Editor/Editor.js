import React, { useCallback, useRef, useState, useEffect } from "react";
import styled from "styled-components";
import {
  NoteTitleContainer,
  NoteContentContainer,
} from "../../routes/Note/Note";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignCenter,
  faAlignRight,
  faAlignLeft,
  faBold,
  faUnderline,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
const TitleInput = styled(TextareaAutosize)`
  background-color: transparent;
  height: 50px;
  padding: 5px;
  font-size: 1.5rem;
  color: black;
  flex: 1;
  &::placeholder {
    color: #0000007a;
  }
`;
const EditToolContainer = styled.div`
  display: flex;
  padding: 5px;
  border-bottom: 1px solid #e3e3e3;
  svg {
    padding: 5px;
    margin: 2px;
    cursor: pointer;
    border: 1px solid black;
    border-radius: 10px;
    font-size: 0.7rem;
  }
`;
const ContentInput = styled.div`
  width: 100%;
  min-height: 80vh;
  font-size: 1rem;
  padding-top: 10px;
  text-align: left;
  &[contenteditable="true"]:empty:before {
    content: attr(placeholder);
    display: block; /* For Firefox */
  }
  &::placeholder {
    color: #0000007a;
  }
`;
const FontContainer = styled.div`
  display: flex;
  align-items: center;
  svg {
    font-size: 1.2rem;
  }
`;

const Editor = ({ id, onSave, title, content }) => {
  const contentRef = useRef(null);
  const [titleInput, setTitleInput] = useState(title);
  const [contentInput, setContentInput] = useState(content);
  const [selected, setSelected] = useState(null);

  const onInputChange = useCallback((e) => {
    const { target } = e;
    //console.log(target);
    if (target.name === "content") {
      //setContentInput(value);
    } else if (target.name === "title") {
      setTitleInput(target.value);
    }
  }, []);
  const onSelectRange = useCallback((e) => {
    const selObj = document.getSelection();
    setSelected(selObj);
  }, []);
  const onAlignLeft = useCallback(() => {
    document.querySelector(".content").style.textAlign = "left";
    //contentRef.current.style.textAlign = "left";
  }, []);
  const onAlignRight = useCallback(() => {
    document.querySelector(".content").style.textAlign = "right";
    //contentRef.current.style.textAlign = "right";
  }, []);
  const onAlignCenter = useCallback(() => {
    document.querySelector(".content").style.textAlign = "center";
    //contentRef.current.style.textAlign = "center";
  }, []);
  const onBold = useCallback(() => {
    /*const b = document.createElement("b");
    b.innerText = selected;
    selected.deleteContents();
    selected.insertNode(b);*/
    console.log(selected);
    document.execCommand("bold", false, true);
  }, [selected]);
  const onUnderline = useCallback(() => {
    const target = document.querySelector(".content");
    if (target.style.textDecoration === "underline")
      target.style.textDecoration = "none";
    else target.style.textDecoration = "underline";
  }, []);

  return (
    <>
      <NoteTitleContainer>
        <TitleInput
          type="text"
          name="title"
          placeholder="Untitled"
          onChange={onInputChange}
          value={titleInput}
        />
        <FontContainer>
          <FontAwesomeIcon
            icon={faCheckCircle}
            onClick={onSave(titleInput, contentRef.current, id)}
          />
          {id ? (
            <Link to={`/note/${id}`}>
              <FontAwesomeIcon icon={faTimesCircle} />
            </Link>
          ) : (
            <Link to={`/`}>
              <FontAwesomeIcon icon={faTimesCircle} />
            </Link>
          )}
        </FontContainer>
      </NoteTitleContainer>
      <NoteContentContainer>
        <EditToolContainer>
          <FontAwesomeIcon icon={faAlignLeft} onClick={onAlignLeft} />
          <FontAwesomeIcon icon={faAlignCenter} onClick={onAlignCenter} />
          <FontAwesomeIcon icon={faAlignRight} onClick={onAlignRight} />
          <FontAwesomeIcon icon={faBold} onClick={onBold} />
          <FontAwesomeIcon icon={faUnderline} onClick={onUnderline} />
        </EditToolContainer>
        <ContentInput
          className="content"
          name="content"
          onMouseUp={onSelectRange}
          placeholder={"Write Content..."}
          contentEditable={true}
          ref={contentRef}
          suppressContentEditableWarning={true}
        >
          {content}
        </ContentInput>
      </NoteContentContainer>
    </>
  );
};
export default Editor;

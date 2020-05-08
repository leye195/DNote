import React, { useCallback, useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { v4 } from "uuid";
import {
  NoteTitleContainer,
  NoteContentContainer,
} from "../../routes/Note/Note";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignJustify,
  faAlignCenter,
  faAlignRight,
  faAlignLeft,
  faBold,
  faUnderline,
  faItalic,
  faCheckCircle,
  faTimesCircle,
  faPaintBrush,
  faStrikethrough,
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
const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  display: flex;
  flex-direction: column;
`;
const TitleContainer = styled(NoteTitleContainer)`
  position: relative;
`;

const EditToolContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  margin: 5px;
  background-color: #e3e3e3;
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
const ColorContainer = styled.div`
  position: fixed;
  display: flex;
  top: 43px;
  right: 10px;
  background: #e3e3e3;
  padding: 5px;
  box-shadow: 1px 1px 4px 1px black;
  border-radius: 5px;
`;
const Color = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  margin: 2px;
  background-color: ${(props) => {
    return props.color;
  }};
`;
const FontNameSelection = styled.select`
  font-size: 0.7rem;
  margin: 5px;
  background: transparent;
  border: none;
  width: 100px;
`;
const colorList = [
  "#ffffff",
  "#f5f17b",
  "#3498db",
  "#2ecc71",
  "#e74c3c",
  "#f39c12",
  "#2c3e50",
  "#8e44ad",
];
const fontName = [
  "Helvetica Neue",
  "Courier New",
  "Driod Sans",
  "Noto Sans KR",
];
const Editor = ({ id, onSave, title, content }) => {
  const contentRef = useRef(null);
  const [titleInput, setTitleInput] = useState(title);
  const [selected, setSelected] = useState(null);
  const [font, setFont] = useState("Helvetica Neue");
  const [openColor, setOpenColor] = useState(false);
  useEffect(() => {
    contentRef.current.innerHTML = content;
  }, [content]);
  const onInputChange = useCallback((e) => {
    const { target } = e;
    if (target.name === "title") setTitleInput(target.value);
  }, []);
  const onSelectRange = useCallback((e) => {
    const selObj = document.getSelection();
    setSelected(selObj);
  }, []);
  const onMouseDown = useCallback((e) => {
    e.preventDefault();
  }, []);
  const onAlignJustify = useCallback(() => {
    document.execCommand("justifyFull");
  }, []);
  const onAlignLeft = useCallback(() => {
    document.execCommand("justifyLeft");
  }, []);
  const onAlignRight = useCallback(() => {
    document.execCommand("justifyRight");
  }, []);
  const onAlignCenter = useCallback(() => {
    document.execCommand("justifyCenter");
  }, []);
  const onBold = useCallback(() => {
    document.execCommand("bold");
  }, []);
  const onUnderline = useCallback(() => {
    document.execCommand("underline");
  }, []);
  const onItalic = useCallback(() => {
    document.execCommand("italic");
  }, []);
  const onStrike = useCallback((e) => {
    document.execCommand("strikeThrough");
  }, []);
  const onEmpasis = useCallback(
    (e) => {
      setOpenColor(!openColor);
    },
    [openColor]
  );
  const onColor = useCallback(
    (color) => (e) => {
      document.execCommand("hiliteColor", false, `${color}`);
    },
    []
  );
  const onFontNameChange = useCallback((e) => {
    const {
      target: { value },
    } = e;
    setFont(value);
    document.execCommand("fontName", false, value);
  }, []);
  const onDragStart = useCallback((e) => {
    console.log("dragStart");
    e.dataTransfer.setData("text/html", e.target);
    e.dropEffect = "move";
    //console.log(e.movementX, e.movementY);
  }, []);
  const onDropTextArea = useCallback((e) => {
    e.preventDefault();
  }, []);
  return (
    <>
      <Wrapper>
        <TitleContainer>
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
        </TitleContainer>
        <EditToolContainer>
          <FontNameSelection onChange={onFontNameChange}>
            {fontName.map((font) => (
              <option key={v4()} value={font}>
                {font}
              </option>
            ))}
          </FontNameSelection>
          <FontAwesomeIcon
            icon={faAlignLeft}
            onClick={onAlignLeft}
            onMouseDown={onMouseDown}
          />
          <FontAwesomeIcon
            icon={faAlignCenter}
            onClick={onAlignCenter}
            onMouseDown={onMouseDown}
          />
          <FontAwesomeIcon
            icon={faAlignJustify}
            onClick={onAlignJustify}
            onMouseDown={onMouseDown}
          />
          <FontAwesomeIcon
            icon={faAlignRight}
            onClick={onAlignRight}
            onMouseDown={onMouseDown}
          />
          <FontAwesomeIcon
            icon={faBold}
            onClick={onBold}
            onMouseDown={onMouseDown}
          />
          <FontAwesomeIcon
            icon={faItalic}
            onClick={onItalic}
            onMouseDown={onMouseDown}
          />
          <FontAwesomeIcon
            icon={faUnderline}
            onClick={onUnderline}
            onMouseDown={onMouseDown}
          />
          <FontAwesomeIcon
            icon={faStrikethrough}
            onClick={onStrike}
            onMouseDown={onMouseDown}
          />
          <FontAwesomeIcon
            icon={faPaintBrush}
            onClick={onEmpasis}
            onMouseDown={onMouseDown}
          />
        </EditToolContainer>
      </Wrapper>
      <NoteContentContainer>
        <ContentInput
          className="content"
          name="content"
          onMouseUp={onSelectRange}
          placeholder={"Write Content..."}
          contentEditable={true}
          ref={contentRef}
          suppressContentEditableWarning={true}
          onDrop={onDropTextArea}
        ></ContentInput>
      </NoteContentContainer>
      {openColor ? (
        <ColorContainer draggable="true" onDragStart={onDragStart}>
          {colorList.map((color) => (
            <Color
              color={color}
              onClick={onColor(color)}
              onMouseDown={onMouseDown}
            />
          ))}
        </ColorContainer>
      ) : null}
    </>
  );
};
export default Editor;

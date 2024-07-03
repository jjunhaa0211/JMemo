import dayjs from "dayjs";
import { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  toggleCreateNoteModal,
  toggleTagsModal,
} from "../../../store/modal/modalSlice";
import {
  setEditNote,
  setMainNotes,
} from "../../../store/notesList/notesListSlice";
import { ButtonFill, ButtonOutline } from "../../../styles/styles";
import { Note } from "../../../types/note";
import TextEditor from "../../TextEditor/TextEditor";
import { DeleteBox, FixedContainer } from "../Modal.styles";
import TagsModal from "../TagsModal/TagsModal";
import {
  AddedTagsBox,
  Box,
  OptionsBox,
  StyledInput,
  TopBox,
} from "./CreateNoteModal.style";

const CreateNoteModal = () => {
  const dispatch = useAppDispatch();

  const { editNote } = useAppSelector((state) => state.notesList);
  const { viewAddTagsModal } = useAppSelector((state) => state.modal);

  const [noteTitle, setNoteTitle] = useState(editNote?.title || "");
  const [value, setValue] = useState(editNote?.content || "");
  const [addedTags, setAddedTags] = useState(editNote?.tags || []);
  const [noteColor, setNoteColor] = useState(editNote?.color || "");
  const [priority, setPriority] = useState(editNote?.priority || "low");

  const closeCreateNoteModal = () => {
    dispatch(toggleCreateNoteModal(false));
    dispatch(setEditNote(null));
  };

  const tagsHandler = (tag: string, type: string) => {
    const newTag = tag.toLocaleLowerCase();

    if (type === "add") {
      setAddedTags((prev) => [...prev, { tag: newTag, id: v4() }]);
    } else {
      setAddedTags(addedTags.filter(({ tag }) => tag !== newTag));
    }
  };

  const createNoteHandler = () => {
    if (!noteTitle) {
      toast.error("타이틀을 적어주세요.");
      return;
    } else if (value === "<p><br></p>") {
      toast.error("글을 작성해주세요.");
      return;
    }

    const date = dayjs().format("DD/MM/YY h:mm A");

    let note: Partial<Note> = {
      title: noteTitle,
      content: value,
      tags: addedTags,
      color: noteColor,
      priority,
      editedTime: new Date().getTime(),
    };

    if (editNote) {
      note = { ...editNote, ...note };
    } else {
      note = {
        ...note,
        date,
        createdTime: new Date().getTime(),
        editedTime: null,
        isPinned: false,
        isRead: false,
        id: v4(),
      };
    }

    dispatch(setMainNotes(note));
    dispatch(toggleCreateNoteModal(false));
    dispatch(setEditNote(null));
  };

  return (
    <FixedContainer onClick={closeCreateNoteModal}>
      {viewAddTagsModal && (
        <TagsModal type="add" addedTags={addedTags} handleTags={tagsHandler} />
      )}
      <Box onClick={(e) => e.stopPropagation()}>
        <TopBox>
          <div className="createNote_title">노트 생성하기</div>
          <DeleteBox
            className="createNote__close-btn"
            onClick={closeCreateNoteModal}
          ></DeleteBox>
        </TopBox>

        <StyledInput
          type="text"
          value={noteTitle}
          name="title"
          placeholder="제목..."
          onChange={(e) => setNoteTitle(e.target.value)}
        />

        <div>
          <TextEditor color={noteColor} value={value} setValue={setValue} />
        </div>

        <AddedTagsBox>
          {addedTags.map(({ tag, id }) => (
            <div key={id}>
              <span className="createNote__tag">{tag}</span>
              <span
                className="createNote__tag-remove"
                onClick={() => tagsHandler(tag, "remove")}
              >
                <FaTimes />
              </span>
            </div>
          ))}
        </AddedTagsBox>

        <OptionsBox>
          <ButtonOutline
            onClick={() =>
              dispatch(toggleTagsModal({ type: "add", view: true }))
            }
          >
            Add Tag
          </ButtonOutline>
          <div>
            <label htmlFor="color">배경색 : </label>
            <select
              value={noteColor}
              id="color"
              onChange={(e) => setNoteColor(e.target.value)}
            >
              <option value="">White</option>
              <option value="#ffcccc">Red</option>
              <option value="#ccffcc">Green</option>
              <option value="#cce0ff">Blue</option>
              <option value="#ffffcc">Yellow</option>
              {/* // 여기에 추가를 해주면 색을 바꿀 수 있다 */}
            </select>
          </div>

          <div>
            <label htmlFor="priority">우선순위 : </label>
            <select
              value={priority}
              id="priority"
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="high">High</option>
            </select>
          </div>
        </OptionsBox>

        <div className="createNote__create-btn">
          <ButtonFill onClick={createNoteHandler}>
            {editNote ? (
              <span>저장하기</span>
            ) : (
              <>
                <FaPlus /> <span>생성하기</span>
              </>
            )}
          </ButtonFill>
        </div>
      </Box>
    </FixedContainer>
  );
};

export default CreateNoteModal;

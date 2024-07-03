import { NotesIconBox } from '../../styles/styles';
import { Card, ContentBox, FooterBox, TagsBox, TopBox } from './NoteCard.styles';
import { BsFillPinFill } from 'react-icons/bs';
import { Note } from '../../types/note';
import { useAppDispatch } from '../../hooks/redux';
import getRelevantBtns from '../../utils/getRelevantBtns';
import { readNote, setPinnedNotes } from '../../store/notesList/notesListSlice';
import parse from 'html-react-parser';
import ReadNoteModal from '../Modal/ReadNoteModal/ReadnoteModal';

interface NoteCardProps {
  note: Note,
  type: string
}

const NoteCard = ({ note, type }: NoteCardProps) => {
  const dispatch = useAppDispatch();
  const { title, content, tags, color, priority, date, isPinned, isRead, id } = note;

  const func = () => {
    const imgContent = content.includes("img");
    if (imgContent) {
      return content;
    } else {
      return content.length > 75 ? content.slice(0, 75) + "..." : content;
    }
  }

  const handlePinClick = () => {
    const newPinnedStatus = !isPinned;
    dispatch(setPinnedNotes({ id }));

    if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.pinHandler) {
      window.webkit.messageHandlers.pinHandler.postMessage({ id, title, isPinned: newPinnedStatus });
    }
  }

  return (
    <>
      {isRead && <ReadNoteModal type={type} note={note} />}
      <Card style={{ background: color }}>
        <TopBox>
          <div className='noteCard__title'>
            {title.length > 10 ? title.slice(0, 10) + '...' : title}
          </div>
          <div className='noteCard__top-options'>
            <span className='noteCard__priority'>
              {priority}
            </span>

            {type !== "archive" && type !== "trash" && (
              <NotesIconBox
                className='noteCard__pin'
                onClick={handlePinClick}
              >
                <BsFillPinFill
                  style={{ color: isPinned ? "red" : "" }}
                />
              </NotesIconBox>
            )}
          </div>
        </TopBox>
        <ContentBox onClick={() => dispatch(readNote({ type, id }))}>
          {parse(func())}
        </ContentBox>
        <TagsBox>
          {tags.map(({ tag, id }) => (
            <span key={id}>{tag}</span>
          ))}
        </TagsBox>
        <FooterBox>
          <div className='noteCard__date'>{date}</div>
          <div>{getRelevantBtns(type, note, dispatch)}</div>
        </FooterBox>
      </Card>
    </>
  );
}

export default NoteCard;

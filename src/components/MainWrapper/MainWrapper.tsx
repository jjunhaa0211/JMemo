import { NotesContainer } from '../../styles/styles';
import { Note } from '../../types/note'
import NoteCard from '../NoteCard/NoteCard';

interface MainWrapperProps {
  notes: Note[];
  type: string;
}

const MainWrapper = ({ notes, type }: MainWrapperProps) => {
  return (
    <NotesContainer>
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} type={type} />
      ))}
    </NotesContainer>
  )
}

export default MainWrapper
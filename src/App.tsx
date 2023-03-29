import { Button } from "./components/Button";
import { FaPlus } from "react-icons/fa";
import Note from "./components/Note";
import { useEffect, useState } from "react";
import { NoteType } from "./types/note";

function App() {
  const [notes, setNotes] = useState<NoteType[]>([]);

  useEffect(() => {
    const localNotes = localStorage.getItem("notes");

    if (localNotes) setNotes(JSON.parse(localNotes));
  }, []);

  const save = (notes: NoteType[]) => {
    localStorage.setItem("notes", JSON.stringify(notes));
  };

  const handleAddNote = () => {
    const newNote = {
      _id: crypto.randomUUID(),
      content: `Note #${notes.length + 1}`,
    };
    setNotes([...notes, newNote]);
    save([...notes, newNote]);
  };

  const handleDelete = (_id: string) => {
    const newNotes = notes.filter((note) => note._id !== _id);
    setNotes(newNotes);
    save(newNotes);
  };

  const handleUpdate = (_id: string, newContent: string) => {
    const updatedNotes = notes.map((note) => {
      if (note._id === _id) return { ...note, content: newContent };
      return note;
    });

    setNotes(updatedNotes);
    save(updatedNotes);
  };

  const rendereNotes = notes.map((note) => (
    <Note
      key={note._id}
      note={note}
      handleDelete={handleDelete}
      handleUpdate={handleUpdate}
    />
  ));

  return (
    <div className="app">
      <Button onClick={handleAddNote} className="add">
        <FaPlus /> Add note
      </Button>
      {rendereNotes}
    </div>
  );
}

export default App;

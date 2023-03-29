import { ChangeEvent, useRef, useState } from "react";
import { FaEdit, FaTrash, FaSave } from "react-icons/fa";
import { NoteType } from "../types/note";
import { marked } from "marked";
import DOMPurify from "dompurify";

interface Props {
  note: NoteType;
  handleDelete: (_id: string) => void;
  handleUpdate: (_id: string, newContent: string) => void;
}

export default function Note({ note, handleDelete, handleUpdate }: Props) {
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(note.content);

  const handleOnChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(evt.target.value);
  };

  const handleEditing = () => {
    setEditing(!editing);
  };

  const handleSave = () => {
    handleUpdate(note._id, content);
    handleEditing();
  };

  return (
    <div className="note">
      <div className={`tools ${editing ? "editing" : "notEditing"}`}>
        {editing ? (
          <button onClick={handleSave} className="save">
            <FaSave />
          </button>
        ) : (
          <button onClick={handleEditing} className="edit">
            <FaEdit />
          </button>
        )}

        <button onClick={() => handleDelete(note._id)} className="delete">
          <FaTrash />
        </button>
      </div>
      {editing ? (
        <textarea
          maxLength={150}
          onChange={(evt) => handleOnChange(evt)}
          value={content}
          autoFocus={true}
        />
      ) : (
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              marked
                .parse(content)
                .replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, "")
            ),
          }}
          className="content"
        ></div>
      )}
    </div>
  );
}

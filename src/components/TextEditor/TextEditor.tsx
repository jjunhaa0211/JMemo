import React from 'react'
import ReactQuill from 'react-quill'
import { Container } from './TextEditor.styles'
import 'react-quill/dist/quill.snow.css';
interface TextEditorProps {
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  color: string
}


const formats = [
  "bold",
  "italic",
  "underline",
  "strike",
  "list",

  "color",
  "background",

  "image",
  "blockquote",
  "code-block",
];

const modules = {
  toolbar: [
    [{ list: "ordered" }, { list: "bullet" }],
    [],
    ["italic", "underline", "strike"],
    [],
    [{ color: [] }, { background: [] }],
    [],
    ["image", "blockquote", "code-block"],
  ],
};

const TextEditor = ({ color, value, setValue }: TextEditorProps) => {

  console.log(value);

  return (
    <Container noteColor={color}>
      <ReactQuill
        formats={formats}
        modules={modules}
        theme="snow"
        value={value}
        onChange={setValue} />
    </Container>
  )
}

export default TextEditor


import React from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2';
require('codemirror/mode/markdown/markdown');

interface EditorProps {
  code: string,
  setCode: (string) => void
}

const Editor = ({code, setCode}: EditorProps) => {
  return (
    <CodeMirror
      value={code}
      options={{
        highlightFormatting: true,
        mode: 'markdown',       
        lineNumbers: true,
        lineWrapping: true
      }}
      onBeforeChange={(editor, data, value) => {
        setCode(value)
      }}
      onChange={(editor, data, value) => {
        // TODO: Mark as modified file
      }}
    />
  )
};

export default Editor;

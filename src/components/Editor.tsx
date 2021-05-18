

import React from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2';
require('codemirror/mode/markdown/markdown');

interface EditorProps {
  code: string,
  setCode: (string) => void,
  setUnsavedChanges: (bool) => void
}

const Editor = ({code, setCode, setUnsavedChanges}: EditorProps) => {
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
        setUnsavedChanges(true);
        setCode(value)
      }}
    />
  )
};

export default Editor;

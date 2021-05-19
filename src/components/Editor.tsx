

import React, { useContext } from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2';
import { EditorContext } from '../hooks/useEditor';
require('codemirror/mode/markdown/markdown');

const Editor = () => {
  const {code, setCode, setUnsavedChanges} = useContext(EditorContext);

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

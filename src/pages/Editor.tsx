

import React, { useState } from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2';
require('codemirror/mode/markdown/markdown');

const Editor = () => {
  const [code, setCode] = useState('**Hello**')
  return (
    <CodeMirror
      value={code}
      options={{
        highlightFormatting: true,
        mode: 'markdown',       
        lineNumbers: true
      }}
      onBeforeChange={(editor, data, value) => {
        setCode(value)
      }}
      onChange={(editor, data, value) => {
      }}
    />
  )
};

export default Editor;

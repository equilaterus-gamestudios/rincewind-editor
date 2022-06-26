

import React, { useContext } from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2';
import { EditorContext } from '../models/editor';
import 'codemirror/addon/search/search.js';
import 'codemirror/addon/search/searchcursor.js';
import 'codemirror/addon/search/jump-to-line.js';
require('codemirror/mode/markdown/markdown');

const Editor = () => {
  const {codeMirror, code, setCode, setUnsavedChanges} = useContext(EditorContext);
 
  return (
    <>
      <CodeMirror
        value={code}
        options={{
          highlightFormatting: true,
          mode: 'markdown',       
          lineNumbers: true,
          lineWrapping: true
        }}
        editorDidMount={(editor) => { 
          if (codeMirror) codeMirror.current = editor;
        }}
        onBeforeChange={(editor, data, value) => {
          setUnsavedChanges(true);
          setCode(value)
        }}
      />
    </>
  )
};

export default Editor;

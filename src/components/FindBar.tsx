

import React, { useContext } from 'react';
import { EditorContext } from '../models/editor';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

const FindBar = () => {
  const {codeMirror, showFind} = useContext(EditorContext);
  const [resultIndex, setResultIndex] = useState(0);
  const [findResults, setFindResults] = useState([]);
  const [findText, setFindText] = useState<string>(undefined);
  const prevMark = useRef(null);
  const inputFind = useRef(null);

  useEffect(() => {
    clearAllMarks();
    setResultIndex(0);
    setFindResults([]);
    setFindText(undefined);
    if (showFind) {
      inputFind.current?.focus();
    }
  // clearAllMarks is not an external dependency
  // eslint-disable-next-line
  }, [showFind])
    
  const onChange = (newText: string) => {
    setFindText(newText);
    setFindResults([]);
  }

  const scrollToResult = (index, results) => {
    const editor = codeMirror?.current;
    if (editor) {
      let mark = null;
      const result = results[index];
      if (result) {
        editor.scrollIntoView({line: result.from.line, char: 0}, 0);
        mark = editor.markText(result.from, result.to, {
            className: 'found-text-selected'
        });
      }

      if (prevMark?.current) {
        prevMark.current.clear();
      }
      prevMark.current = mark;
    }
  }

  const clearAllMarks = () => {
    const editor = codeMirror?.current;
    if (editor) {
      editor.doc.getAllMarks().forEach(marker => marker.clear());
    }
  }

  const onFind = () => {
    if (!findText || findText.length === 0) return;

    const editor = codeMirror?.current;
    if (editor) {
      const cursor = editor.getSearchCursor(findText, false);
      clearAllMarks();
      const results = [];
      while (cursor.findNext()) {
        editor.markText(cursor.from(), cursor.to(), {
            className: 'found-text'
        });
        results.push({
          from: cursor.from(), 
          to: cursor.to()
        }); 
      }

      setFindResults(results);
      if (results.length > 0) {
        setResultIndex(0);
        scrollToResult(0, results);
      } else {
        setResultIndex(-1);
      }
    }
  }

  const onNext = () => {
    const newResult = (resultIndex + 1) % findResults.length;
    scrollToResult(newResult, findResults);
    setResultIndex(newResult);    
  }

  const onPrev = () => {
    const newResult = (resultIndex - 1) % findResults.length;
    scrollToResult(newResult, findResults);
    setResultIndex(newResult);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (findResults.length === 0) {
      onFind();
    } else {
      onNext();
    }
  }

  if (!showFind) {
    return null;
  }

  return (
    <div className="find-container">
    <form className="find" onSubmit={onSubmit}>
      <input 
        className="find-input" 
        type="text" 
        value={findText} 
        ref={inputFind}
        onChange={(e) => { onChange(e.target.value) }} 
      />

      {findResults.length === 0 && resultIndex === -1 &&
        <span className="find-result">No results</span>          
      }
      {findResults.length !== 0 &&
        <span className="find-result">{resultIndex + 1}/{findResults.length}</span>
      }

      <input
        type="button"
        disabled={findResults.length === 0}
        className="btn"
        onClick={onPrev}
        value="&lt;" 
      />
      <input
        type="submit" 
        className="btn"            
        value="&gt;"
      />
    </form>
    </div>
  )
};

export default FindBar;

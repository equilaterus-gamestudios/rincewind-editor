import React, { useContext } from 'react';
import Editor from '../components/Editor';
import Menu from '../components/Menu';
import PreviewCol from '../components/PreviewCol';
import { EditorContext } from '../models/editor';
import FindBar from '../components/FindBar';

const EditorPage = () => {
  const { showPreview } = useContext(EditorContext);
  
  return  (
    <>
      <div className="app">
        <div className="menu">
          <Menu />
        </div>
        <div className="editor">
          <div className={`editor-col editor-col-preview-${showPreview} no-overflow`}>
            <FindBar />
            <Editor />
          </div>
          <PreviewCol enabled={showPreview} />
        </div>
      </div>
    </>
  );
  
}
export default EditorPage;

import React, { useContext, useEffect } from 'react';
import { dialog } from 'electron';
import { loadFile } from '../common/fileUtils';
import Editor from '../components/Editor';
import Menu from '../components/Menu';
import PreviewCol from '../components/PreviewCol';
import { EditorContext, StoredPreferences } from '../models/editor';
import FindBar from '../components/FindBar';

const EditorPage = () => {
  const { showPreview, setPreferences } = useContext(EditorContext);

  // On mount
  useEffect(() => {
    // Load preferences
    (async () => {
      const configStr = await loadFile('config.ini', false);
      if (configStr) {
        try {
          setPreferences(JSON.parse(configStr) as StoredPreferences);
        } catch (e) {
          dialog.showErrorBox('Bad config', JSON.stringify(e));
        }
      }
    })();
  }, [setPreferences])

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

import React from 'react';
import { dialog } from '@electron/remote';
import { loadFile, saveFile } from '../common/fileUtils';

interface MenuProps {
  unsavedChanges: boolean,
  setUnsavedChanges: (boolean) => void,  
  code: string,
  setCode: (string) => void,
  filePath: string,  
  setFilePath: (string) => void,
  togglePreview: () => void
}


const Menu = ({unsavedChanges, setUnsavedChanges, code, setCode, filePath, setFilePath, togglePreview}: MenuProps) => {
  // Handlers
  const onLoadDialog = async () => {
    // Pending changes?
    if (unsavedChanges) {
      const choice = await dialog.showMessageBox(
        {
          type: 'question',
          buttons: ['No, I want to save my changes before openning a new file.', 'Yes, continue and ignore changes.'],
          title: 'Confirmation',
          message: 'Unsaved changes will be lost.'
        }
      );
      if (choice.response === 0) return;
    }

    // Show load dialog
    const result = await dialog.showOpenDialog(
        {
          title:'Open Dialogue',
          properties: ['openFile']
        }
    );
    if (result.filePaths.length === 0) return;
    
    // Load file!
    const newFilePath = result.filePaths[0];
    const fileContents = await loadFile(result.filePaths[0]);
    if (fileContents) 
    {
      setUnsavedChanges(false);
      setCode(fileContents);
      setFilePath(newFilePath);
    }
  }

  const selectSavePath = async (): Promise<string | undefined> => {
    // Show save dialog
    const result = await dialog.showSaveDialog(
      {
        title:'Save Dialogue',
        filters: [{ name: 'Markdown', extensions: ['md'] }]
      }
    );
    if (!result.filePath) return undefined;
    
    // Saved file!
    const newFilePath = result.filePath;
    setFilePath(newFilePath);
    return newFilePath;
  }

  const onSaveDialog = async () => {
    // Get path
    const savePath = filePath ?? await selectSavePath();

    // Cancelled
    if (!savePath) return;

    // Save
    if (await saveFile(code, savePath)) setUnsavedChanges(false);
  }

  const onSaveAsDialog = async () => {
    // Get path
    const savePath = await selectSavePath();

    // Cancelled
    if (!savePath) return;

    // Save
    if (await saveFile(code, savePath)) setUnsavedChanges(false);    
  }

  return (
  <>
    <button
      type="button" className="nes-btn is-primary"
      onClick={onLoadDialog}>
        OPEN
    </button>
    <button 
      type="button" className={`nes-btn is-warning ${!unsavedChanges ? 'is-disabled' : ''}`} 
      onClick={onSaveDialog}>
        SAVE {unsavedChanges ? '[*]' : ''}
    </button>    
    <button 
      type="button" className="nes-btn is-warning" 
      onClick={onSaveAsDialog}>
        SAVE AS...
    </button>
    <button
      type="button" className="nes-btn is-default" 
      onClick={togglePreview}>
        PREVIEW
    </button>

    <span className="file-path">{filePath ?? 'Not saved'} {unsavedChanges ? '[*]' : ''}</span>
  </>)
}

export default Menu;

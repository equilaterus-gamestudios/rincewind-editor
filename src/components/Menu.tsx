import React, { useEffect } from 'react';
import { dialog, Menu as ElectronMenu, MenuItem } from '@electron/remote';
import { loadFile, saveFile } from '../common/fileUtils';
import { titlebar } from '../App'

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

  const onCompile = () => {
    if (!filePath) 
    {
      onSaveAsDialog();
      return;
    }

    const child = require('child_process').execFile;
    const executablePath = `Rincewind.exe`
    const parameters = [filePath.substring(0, filePath.lastIndexOf('\\')+1), filePath.substring(filePath.lastIndexOf('\\') + 1), filePath.substring(filePath.lastIndexOf('\\') + 1, filePath.lastIndexOf('.'))];

    console.log(executablePath)
    console.log(parameters)

    child(executablePath, parameters, function(err, data) {
        console.log(err)
        console.log(data.toString());
    });
  }

  useEffect(()=> {
    const menu = new ElectronMenu();
      menu.append(new MenuItem({
        label: 'File',
        submenu: [
          {
            label: 'Open',
            click: onLoadDialog
          },
          {
            label: 'Save',
            click: onSaveDialog,
            accelerator: 'Ctrl+S'
          },
          {
            label: 'Save as',
            click: onSaveAsDialog
          },
          {
            type: 'separator'
          },
          {
            label: 'Close',
            role: 'close'
          }
        ]
      })
    );
    titlebar.updateMenu(menu);
    ElectronMenu.setApplicationMenu(menu);
  });

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
      onClick={onCompile}>
        COMPILE
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

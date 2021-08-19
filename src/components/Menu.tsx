import React, { useContext, useEffect } from 'react';
import { shell } from 'electron';
import { dialog, Menu as ElectronMenu, MenuItem } from '@electron/remote';
import { loadFile, saveFile } from '../common/fileUtils';
import { isDev, titlebar } from '../App';
import { EditorContext } from '../models/editor';
import { LocationContext } from '../models/location';
import { LOCATIONS, MODE_MD, MODE_RINCEWIND, SAMPLE_CODE } from '../common/constants';

const Menu = () => {
  const { unsavedChanges, setUnsavedChanges, code, setCode, mode, setMode, filePath, setFilePath, showPreview, setShowPreview, showFind, setShowFind} = useContext(EditorContext)
  const { setLocation } = useContext(LocationContext);

  // Togglers
  const toggleFind = () => setShowFind(!showFind);
  const togglePreview = () => setShowPreview(!showPreview);
  const toggleMode = () => { 
    if (mode === MODE_RINCEWIND) {
      setMode(MODE_MD);
    } else {
      setMode(MODE_RINCEWIND);
     }
  }
  
  // Handlers
  const onNewFile = async () => {
    if (unsavedChanges) {
      const choice = await dialog.showMessageBox(
        {
          type: 'question',
          buttons: ['No, I want to save my changes before creating a new file.', 'Yes, continue and ignore changes.'],
          title: 'Confirmation',
          message: 'Unsaved changes will be lost.'
        }
      );
      if (choice.response === 0) return;
    }

    setCode(SAMPLE_CODE);
    setFilePath(undefined);
    setUnsavedChanges(false);
  }
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

  const onCompile = async () => {
    if (!filePath) 
    {
      onSaveAsDialog();
      return;
    }
    await onSaveDialog();

    const child = require('child_process').execFile;
    const executablePath = `Rincewind-x64.exe`;

    const paramPath = filePath.substring(0, filePath.lastIndexOf('\\') + 1);
    const paramInFile = filePath.substring(filePath.lastIndexOf('\\') + 1);
    const paramOutFile = paramInFile.substring(0, paramInFile.lastIndexOf('.'));
    const parameters = [paramPath, paramInFile, paramOutFile];
    
    child(executablePath, parameters, function(err, data) {
        if (err) { 
          console.log(err);
          dialog.showErrorBox('Error compiling', data?.toString());
        }
        else
        {
          const dataString = data.toString();
          console.log(dataString);
          const choice = dialog.showMessageBoxSync(
            {
              type: 'question',
              buttons: ['Continue.', 'See output folder.'],
              title: 'Rincewind',
              message: dataString
            }
          );
          if (choice > 0) 
          {
            shell.openPath(paramPath);
          }
        }
    });
  }

  const onPreferences = () => {
    setLocation(LOCATIONS.PREFERENCES);
  }

  useEffect(()=> {
    const menu = new ElectronMenu();
    menu.append(new MenuItem({
      label: 'File',
      submenu: [
        {
          label: 'New',
          click: onNewFile,
        },
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
    }));

    menu.append(new MenuItem({
      label: 'Edit',
      submenu: [
        {
          label: 'Find',
          click: toggleFind,
          accelerator: 'Ctrl+F'
        },
        {
          label: 'Preview',
          click: togglePreview
        },
        {
          label: 'Mode',
          click: toggleMode
        },
        {
          label: 'Compile',
          click: onCompile,
          accelerator: 'F5'
        },
        {
          label: 'Setup',
          click: onPreferences
        }
      ]
    }));

    if (isDev)
    {
      menu.append(new MenuItem({
        label: 'Dev',
        submenu: [
          {
            label: 'Inspector',
            role: 'toggleDevTools'
          },
          {
            label: 'Reload',
            role: 'reload'
          },
          {
            label: 'Force reload',
            role: 'forceReload'
          },
      ]
      }));
    }

    titlebar.updateMenu(menu);
    ElectronMenu.setApplicationMenu(menu);
  });

  return (
  <>
    <button
      type="button" className="btn"
      onClick={onNewFile}>
        <img src={process.env.PUBLIC_URL + '/new.png'} alt="" />
    </button>
    <button
      type="button" className="btn"
      onClick={onLoadDialog}>
        <img src={process.env.PUBLIC_URL + '/open.png'} alt="" />
    </button>
    <button 
      type="button" className={`btn`} 
      onClick={onSaveDialog}>
        <img src={process.env.PUBLIC_URL + '/save.png'} alt=""/> 
        {unsavedChanges ? '[*]' : ''}
    </button>
    <button
      type="button" className="btn" 
      onClick={toggleFind}>
       <img src={process.env.PUBLIC_URL + '/find.png'} alt="" />
    </button>
    <button
      type="button" className="btn" 
      onClick={togglePreview}>
       <img src={process.env.PUBLIC_URL + '/preview.png'} alt="" />
    </button>
    <button
      type="button" className="btn" 
      onClick={toggleMode} >
        <img 
          className={mode === MODE_RINCEWIND ? '' : 'img-gray'} 
          src={process.env.PUBLIC_URL + '/icon.png'} 
          alt=""        
        />
    </button>
    <button
      type="button" className={`btn ${!filePath ? 'is-disabled' : ''}`} 
      onClick={onCompile}>
         <img src={process.env.PUBLIC_URL + '/compile.png'} alt="" /> Compile
    </button>
    <button
      type="button" className="btn" 
      onClick={onPreferences}>
         <img src={process.env.PUBLIC_URL + '/preferences.png'} alt="" />
    </button>

    <span className="file-path">{filePath ?? 'Not saved'} {unsavedChanges ? '[*]' : ''}</span>
  </>)
}

export default Menu;

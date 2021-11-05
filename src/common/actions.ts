import { useContext } from 'react';
import { ipcRenderer, shell } from 'electron';
import { dialog } from '@electron/remote';
import { loadFile, saveFile } from './fileUtils';
import { EditorContext, StoredPreferences } from '../models/editor';
import { LocationContext } from '../models/location';
import { FILES, LOCATIONS, MODE_MD, MODE_RINCEWIND, SAMPLE_CODE } from './constants';

export function useRincewindActions() {
  const { unsavedChanges, setUnsavedChanges, code, setCode, mode, setMode, filePath, setFilePath, showPreview, setShowPreview, showFind, setShowFind, addToRecentFiles, getPreferencesToStore, setPreferences, setRecentFiles} = useContext(EditorContext);
  const { location, setLocation } = useContext(LocationContext);
 
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
  
  // Persistance
  const savePreferences = async () => {
    await saveFile(JSON.stringify(getPreferencesToStore()), FILES.CONFIG);
  }

  const loadPreferences = async () => {
    const configStr = await loadFile(FILES.CONFIG, false);
    if (configStr) {
      try {
        setPreferences(JSON.parse(configStr) as StoredPreferences);
      } catch (e) {
        dialog.showErrorBox('Bad config', JSON.stringify(e));
      }
    }
  }

  const saveRecentFiles = async (recentFiles: string[]) => {
    await saveFile(JSON.stringify(recentFiles), FILES.RECENT_FILES);
  }

  const loadRecentFiles = async () => {
    const filesStr = await loadFile(FILES.RECENT_FILES, false);
    if (filesStr) {
      try {
        setRecentFiles(JSON.parse(filesStr) as string[]);
      } catch (e) {
        console.error('No recent files', JSON.stringify(e));
      }
    }
  }

  // Handlers
  const onNewFile = async (useSampleCode=false) => {
    if (unsavedChanges) {
      const choice = await dialog.showMessageBox(
        {
          type: 'question',
          buttons: ['Wait! I want to save my changes before creating a new file.', 'Continue and ignore changes.'],
          title: 'Confirmation',
          message: 'Unsaved changes will be lost.'
        }
      );
      if (choice.response === 0) return;
    }
 
    setCode(useSampleCode ? SAMPLE_CODE : '');
    setFilePath(undefined);
    setUnsavedChanges(false);
    setLocation(LOCATIONS.EDITOR);
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
    await onLoadFile(newFilePath);
  }

  const onLoadFile = async (newFilePath :string) => {
    const fileContents = await loadFile(newFilePath);
    if (fileContents) {
      setUnsavedChanges(false);
      setCode(fileContents);
      setFilePath(newFilePath);
      setLocation(LOCATIONS.EDITOR);

      // Update recent files
      const recentFiles = addToRecentFiles(newFilePath);
      await saveRecentFiles(recentFiles);
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
    
    // Update path
    const newFilePath = result.filePath;
    setFilePath(newFilePath);

    // Update recent files
    const recentFiles = addToRecentFiles(newFilePath);
    await saveRecentFiles(recentFiles);

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
 
  const onFullscreen = async () => {
     await ipcRenderer.invoke('fullscreen');
  }

  const onStartPage = async() => {
    if (unsavedChanges) {
      const choice = await dialog.showMessageBox(
        {
          type: 'question',
          buttons: ['Wait! I want to save my changes before continuing.', 'Continue and ignore changes.'],
          title: 'Confirmation',
          message: 'Unsaved changes will be lost.'
        }
      );
      if (choice.response === 0) return;
    }

    if (location === LOCATIONS.START ) {
      setLocation(LOCATIONS.EDITOR);
    } else {
      setLocation(LOCATIONS.START);
    }    
  }

  return {
    toggleFind,
    togglePreview,
    toggleMode,
    savePreferences,
    loadPreferences,
    saveRecentFiles,
    loadRecentFiles,
    onNewFile,
    onLoadDialog,
    onLoadFile,
    onSaveDialog,
    onSaveAsDialog,
    onCompile,
    onPreferences,
    onFullscreen,
    onStartPage
  }
}
 
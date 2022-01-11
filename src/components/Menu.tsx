import React, { useContext, useEffect } from 'react';
import { Menu as ElectronMenu, MenuItem } from '@electron/remote';
import { titlebar } from '../App';
import { EditorContext } from '../models/editor';
import { MODE_RINCEWIND } from '../common/constants';
import { useRincewindActions } from '../common/actions';
import { useIsDev } from '../common/useIsDev';

const Menu = () => {
  const {
    toggleFind,
    togglePreview,
    toggleMode,
    onNewFile,
    onLoadDialog,
    onSaveDialog,
    onSaveAsDialog,
    onCompile,
    onPreferences,
    onFullscreen,
    onStartPage
  } = useRincewindActions();

  const { unsavedChanges, mode, filePath } = useContext(EditorContext);

  const isDev = useIsDev();

  useEffect(()=> {
    const menu = new ElectronMenu();
    menu.append(new MenuItem({
      label: 'File',
      submenu: [
        {
          label: 'Start',
          click: onStartPage,
        },
        {
          label: 'New empty',
          click: () => onNewFile(false),
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
        },
        {
          label: 'Fullscreen',
          click: onFullscreen,
          accelerator: 'F11'
        }
      ]
    }));

    if (isDev) {
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
      onClick={onStartPage}>
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

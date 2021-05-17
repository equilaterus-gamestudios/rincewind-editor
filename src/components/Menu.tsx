import React, { useState } from 'react';
import { dialog, webContents } from '@electron/remote';
import { loadFile } from '../common/fileUtils';

interface MenuProps {
  code?: string,
  currentFilename?: string,
  setCode: (string) => void,
  setCurrentFilename?: (string) => void
}

const Menu = ({code, currentFilename, setCode, setCurrentFilename}: MenuProps) => (
  <>
    <button type="button" className="nes-btn is-warning">Save dialog</button> 
    <button type="button" className="nes-btn is-warning">Save dialog as...</button> 
    <button
      type="button" className="nes-btn is-primary"
      onClick={async ()=>{
        const result = await dialog.showOpenDialog(
            {
              title:'Open Dialogue',
              message:'First Dialog',
              properties: ['openFile']
            }
        );
        if (result.filePaths.length === 0) return;
        
        const fileContents = await loadFile(result.filePaths[0]);
        if (fileContents) setCode(fileContents);
      }}>
        Open dialog
    </button>
  </>
)

export default Menu;

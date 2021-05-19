import { dialog } from '@electron/remote';
import { promises as fs } from 'fs';

export const saveFile = async (code: string, filepath: string): Promise<boolean> => {
  try {
    await fs.writeFile(filepath, code, 'utf8');
    return true;
  } catch(e) {
    dialog.showErrorBox('Error', `Error saving. ${JSON.stringify(e)}`); 
  }
  return false;
}

export const loadFile = async (filepath: string, showErrors = true): Promise<string> => {
  try {
    return await fs.readFile(filepath, 'utf8');    
  } catch(e) {
    if (showErrors)
      dialog.showErrorBox('Error', `Error opening file. ${JSON.stringify(e)}`); 
  }
  return '';
}

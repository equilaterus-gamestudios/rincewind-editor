import { dialog } from '@electron/remote';
import { promises as fs,  } from 'fs';

export const pathExists = async (path: string) => {
  try {
    await fs.stat(path);
    return true;
  } catch (e) {
    return false;
  }
}

export const createPath = async (path: string) => {
  try {
    if (!await pathExists(path)) {
      await fs.mkdir(path);
    }
    return true;
  } catch(e) {
    console.log(e);
    dialog.showErrorBox('Error', `Error creating path. ${JSON.stringify(e)}`); 
  }
  return false;
}

export const saveFile = async (contents: string, filepath: string): Promise<boolean> => {
  try {
    await fs.writeFile(filepath, contents, 'utf8');
    return true;
  } catch(e) {
    console.log(e);
    dialog.showErrorBox('Error', `Error saving. ${JSON.stringify(e)}`); 
  }
  return false;
}

export const loadFile = async (filepath: string, showErrors = true): Promise<string> => {
  try {
    return await fs.readFile(filepath, 'utf8');    
  } catch(e) {
    console.log(e);
    if (showErrors)
      dialog.showErrorBox('Error', `Error opening file. ${JSON.stringify(e)}`); 
  }
  return '';
}

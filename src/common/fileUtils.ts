import { promises as fs } from 'fs';

export const saveFile = async (code: string, filepath: string): Promise<boolean> => {
  try {
    await fs.writeFile(filepath, code, 'utf8');
    return true;
  } catch(e) {
     alert(`Error saving. ${JSON.stringify(e)}`); 
  }
  return false;
}

export const loadFile = async (filepath: string): Promise<string> => {
  try {
    return await fs.readFile(filepath, 'utf8');    
  } catch(e) {
     alert(`Error opening file. ${JSON.stringify(e)}`); 
  }
  return '';
}

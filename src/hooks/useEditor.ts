import { createContext, useState } from "react";
import { SAMPLE_CODE } from "../common/constants";

export interface EditorContextData {
  unsavedChanges: boolean,
  setUnsavedChanges:  (boolean) => void,
  code: string,
  setCode: (string) => void,
  filePath: string | undefined,
  setFilePath: (string) => void,
  showPreview: boolean,
  setShowPreview: (boolean) => void,
  backgroundColor: string | undefined,
  setBackgroundColor: (string) => void,
  backgroundUrl: string | undefined,
  setBackgroundUrl: (string) => void,
  setPreferencesDefaults: () => void
}

export const defaultEditorContextData: EditorContextData = {
  unsavedChanges: false,
  setUnsavedChanges:  () => { throw Error('Not implemented setUnsavedChanges'); },
  code: SAMPLE_CODE,
  setCode: () => { throw Error('Not implemented setCode'); },
  filePath: undefined,
  setFilePath: () => { throw Error('Not implemented setFilePath'); },
  showPreview: true,
  setShowPreview:  () => { throw Error('Not implemented setShowPreview'); },
  backgroundColor: 'rgba(47, 45, 45, 0.7)',
  setBackgroundColor: () => { throw Error('Not implemented setBackgroundColor'); },
  backgroundUrl: '',
  setBackgroundUrl: () => { throw Error('Not implemented setBackgroundUrl'); },
  setPreferencesDefaults: () => { throw Error('Not implemented setPreferencesDefaults'); }
}

export const EditorContext = createContext<EditorContextData>(defaultEditorContextData);

export function useEditorState(): EditorContextData {
  const [unsavedChanges, setUnsavedChanges] = useState(defaultEditorContextData.unsavedChanges);
  const [code, setCode] = useState(defaultEditorContextData.code);
  const [filePath, setFilePath] = useState(defaultEditorContextData.filePath);
  const [showPreview, setShowPreview] = useState(defaultEditorContextData.showPreview);
  const [backgroundColor, setBackgroundColor] = useState(defaultEditorContextData.backgroundColor);
  const [backgroundUrl, setBackgroundUrl] = useState(defaultEditorContextData.backgroundUrl);

  const setPreferencesDefaults = () => {
    setBackgroundColor(defaultEditorContextData.backgroundColor);
    setBackgroundUrl(defaultEditorContextData.backgroundUrl);
  }

  return {
    unsavedChanges,
    setUnsavedChanges,
    code,
    setCode,
    filePath,
    setFilePath,
    showPreview,
    setShowPreview,
    backgroundColor,
    setBackgroundColor,
    backgroundUrl,
    setBackgroundUrl,
    setPreferencesDefaults
  }
}
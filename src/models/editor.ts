import { createContext, MutableRefObject, useRef, useState } from "react";
import { SAMPLE_CODE, MODE_RINCEWIND } from "../common/constants";

// Custom interface to get stored data
export interface StoredPreferences {
  backgroundColor: string,
  backgroundUrl: string,
}

// Context shape
export interface EditorContextData {
  // Codemirror types aren't working, so we use any for them.
  codeMirror: MutableRefObject<any>, 
  unsavedChanges: boolean,
  setUnsavedChanges:  (boolean) => void,
  code: string,
  setCode: (string) => void,
  mode: string,
  setMode: (string) => void,
  filePath: string | undefined,
  setFilePath: (string) => void,
  showFind: boolean,
  setShowFind: (boolean) => void,
  showPreview: boolean,
  setShowPreview: (boolean) => void,
  backgroundColor: string | undefined,
  setBackgroundColor: (string) => void,
  backgroundUrl: string | undefined,
  setBackgroundUrl: (string) => void,
  setPreferencesDefaults: () => void,
  setPreferences: (preferences: StoredPreferences) => void,
  getPreferencesToStore: () => StoredPreferences
}

// Default context data
export const defaultEditorContextData: EditorContextData = {
  codeMirror: undefined,
  unsavedChanges: false,
  setUnsavedChanges:  () => { throw Error('Not implemented setUnsavedChanges'); },
  mode: MODE_RINCEWIND,
  setMode: () => { throw Error('Not implemented setMode'); },
  code: SAMPLE_CODE,
  setCode: () => { throw Error('Not implemented setCode'); },
  filePath: undefined,
  setFilePath: () => { throw Error('Not implemented setFilePath'); },
  showFind: false,
  setShowFind: () => { throw Error('Not implemented setShowFind'); },
  showPreview: true,
  setShowPreview:  () => { throw Error('Not implemented setShowPreview'); },
  backgroundColor: 'rgba(47, 45, 45, 0.7)',
  setBackgroundColor: () => { throw Error('Not implemented setBackgroundColor'); },
  backgroundUrl: '',
  setBackgroundUrl: () => { throw Error('Not implemented setBackgroundUrl'); },
  setPreferencesDefaults: () => { throw Error('Not implemented setPreferencesDefaults'); },
  // eslint-disable-next-line
  setPreferences: (preferences: StoredPreferences) => { throw Error('Not implemented setPreferences'); },
  getPreferencesToStore: () => { throw Error('Not implemented getPreferencesToStore'); },
}

// Context
export const EditorContext = createContext<EditorContextData>(defaultEditorContextData);

// Hook
export function useEditorState(): EditorContextData {
  const codeMirror = useRef<any>();
  const [unsavedChanges, setUnsavedChanges] = useState(defaultEditorContextData.unsavedChanges);
  const [code, setCode] = useState(defaultEditorContextData.code);
  const [mode, setMode] = useState(defaultEditorContextData.mode);
  const [filePath, setFilePath] = useState(defaultEditorContextData.filePath);
  const [showFind, setShowFind] = useState(defaultEditorContextData.showFind);
  const [showPreview, setShowPreview] = useState(defaultEditorContextData.showPreview);
  const [backgroundColor, setBackgroundColor] = useState(defaultEditorContextData.backgroundColor);
  const [backgroundUrl, setBackgroundUrl] = useState(defaultEditorContextData.backgroundUrl);

  const setPreferencesDefaults = () => {
    setBackgroundColor(defaultEditorContextData.backgroundColor);
    setBackgroundUrl(defaultEditorContextData.backgroundUrl);
  }

  const setPreferences = (preferences: StoredPreferences) => {
    if (!preferences) return;
    setBackgroundColor(preferences.backgroundColor)
    setBackgroundUrl(preferences.backgroundUrl)
  }

  const getPreferencesToStore = (): StoredPreferences => {
    return {
      backgroundColor, 
      backgroundUrl
    }
  }

  return {
    codeMirror,
    unsavedChanges,
    setUnsavedChanges,
    code,
    setCode,
    mode,
    setMode,
    filePath,
    setFilePath,
    showFind,
    setShowFind,
    showPreview,
    setShowPreview,
    backgroundColor,
    setBackgroundColor,
    backgroundUrl,
    setBackgroundUrl,
    setPreferencesDefaults,
    setPreferences,
    getPreferencesToStore
  }
}

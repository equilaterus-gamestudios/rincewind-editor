import React, { useContext } from 'react'
import { EditorContext } from '../hooks/useEditor';
import Preview from './Preview';

interface PreviewColProps {
  enabled: boolean
}

const PreviewCol = ({enabled}: PreviewColProps) => {
  const { backgroundColor, backgroundUrl } = useContext(EditorContext);
  return (
    <div className={`preview-col-${enabled}`} style={{backgroundImage: `url(${backgroundUrl})`}}>      
      <div className="preview-content" style={{backgroundColor: backgroundColor}}>
        <Preview enabled={enabled} />

        <p className="preview-end">Say something wise, the elders are waiting.</p>
      </div>
    </div>
  )
}

export default PreviewCol;

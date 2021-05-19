import React, { useContext } from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import { Element } from 'react-markdown/src/ast-to-react'
import { EditorContext } from '../models/editor'

interface MdComponentInternalProps {
 
  children: React.ReactNode[];
}

const getIdFromHeader = (node: Element): string => {
  let id: string = ''; 
  if (node && node.children?.length > 0)
  {
    id = node.children[0].value as string;
  }
  return id
}

const getTextAndCondition = (text: string): JSX.Element | string => {
  if (!text.includes('|'))
  { 
    return text;
  }

  const parts = text.split('|');
  return (
    <>
      <span>{parts[0]}</span>
      {parts.slice(1,parts.length).map(p => <span className="incode"><span className="incode">|</span>{p}</span>)}
    </>
  );
}

const injectRincewindSyntax = (props: MdComponentInternalProps): MdComponentInternalProps => {
  if (props?.children?.length > 0)
  {
    for (let i = 0; i < props?.children?.length; ++i)
    {
      if (typeof(props?.children[i]) === 'string')
      {
        props.children[i] = getTextAndCondition(props.children[i] as string);
      }
    }
  }
  return props;
}

export interface PreviewProps {
  enabled: boolean
}

const Preview = ({enabled}: PreviewProps) => {
  const { code } = useContext(EditorContext);
  // If disabled, do not render md preview
  if (!enabled) return (<></>);
  return (   
    <ReactMarkdown 
      remarkPlugins={[gfm]} 
      children={code} 
      components={{
        // eslint-disable-next-line
        h1: ({node, ...props}) => <h1 id={getIdFromHeader(node)} {...props} />,
        p: ({node, ...props}) => <p {...injectRincewindSyntax(props)} />,
        li: ({node, ...props}) => <li {...injectRincewindSyntax(props)} />
      }}
    />
  )
}

export default Preview;

import React, { useContext } from 'react'
import ReactMarkdown from 'react-markdown'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'
import gfm from 'remark-gfm'
import { Element } from 'react-markdown/src/ast-to-react'
import { EditorContext } from '../models/editor'
import { MODE_MD } from '../common/constants'

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
  const { code, mode } = useContext(EditorContext);
  // If disabled, do not render md preview
  if (!enabled) return (<></>);
  return (   
    <ReactMarkdown 
      remarkPlugins={[gfm]} 
      children={code} 
      components={mode === MODE_MD 
        ? {
          code({node, inline, className, children, ...props}) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                style={dark}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          }
        }
        : {
          // eslint-disable-next-line
          h1: ({node, ...props}) => <h1 id={getIdFromHeader(node)} className="rincewind-mode" {...props} />,
          // eslint-disable-next-line
          h2: ({node, ...props}) => <h2 className="rincewind-mode" {...props} />,
          // eslint-disable-next-line
          h3: ({node, ...props}) => <h3 className="rincewind-mode" {...props} />,
          // eslint-disable-next-line
          h4: ({node, ...props}) => <h4 className="rincewind-mode" {...props} />,
          // eslint-disable-next-line
          h5: ({node, ...props}) => <h5 className="rincewind-mode" {...props} />,
          p: ({node, ...props}) => <p {...injectRincewindSyntax(props)} />,
          li: ({node, ...props}) => <li {...injectRincewindSyntax(props)} />
        }}
    />
  )
}

export default Preview;

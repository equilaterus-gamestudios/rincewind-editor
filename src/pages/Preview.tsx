import React from 'react'
import ReactMarkdown from 'react-markdown'
import {render} from 'react-dom'
import gfm from 'remark-gfm'
import { Element } from 'react-markdown/src/ast-to-react'

interface PreviewProps {
  code: string
}

const getIdFromHeader = (node: Element | any): string => {
  let id: string = ''; 
  if (node && node.children?.length > 0)
  {
    id = node.children[0].value;
  }
  return id
}

const Preview = ({code}: PreviewProps) => (
  <ReactMarkdown 
    remarkPlugins={[gfm]} 
    children={code} 
    components={{
      h1: ({node, ...props}) => <h1 id={getIdFromHeader(node)} {...props} />
    }}
  />
)

export default Preview;

import React, { useState } from 'react';

import Editor from '../components/Editor';
import Menu from '../components/Menu';
import Preview from '../components/Preview';

const sampleCode = `# start

- \`Terry Pratchett $t\`:  
    heya.

- Tom Bombadil:
    * Hi Folk
    * Hey 
    * [Follow me!](#followMe) | $_bIsFollowingYou = 0
    
- Terry Pratchett:
    What can I do you for? | $_bIsFollowingYou = 1

- Tom Bombadil:
    * Just say hello
    * [Could you give me some money?](#money)
    * [Nothing.](#end)

- Terry Pratchett:
   [Hello good sir, bye](#end)

# followMe
\`\`\`
$call \`FollowMe\`
\`\`\`
-Terry Pratchett:
    [Ok, Ill follow you!](#end)


# money
- Terry Pratchett:
    Are you kidding me? Get out of here!

# end` 

const Home = (props) => {
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [code, setCode] = useState(sampleCode);
  const [filePath, setFilePath] = useState(undefined);
  const [showPreview, setShowPreview] = useState(true);
  
  return  (
    <>
      <div className="app">
        <div className="menu">
          <Menu 
            unsavedChanges={unsavedChanges} setUnsavedChanges={setUnsavedChanges} 
            code={code} setCode={setCode} filePath={filePath} setFilePath={setFilePath}
            togglePreview={() => { setShowPreview(!showPreview); } }/>
        </div>
        <div className="editor">
          <div className={`editor-col editor-col-preview-${showPreview} no-overflow `}>
            <Editor code={code} setCode={setCode} setUnsavedChanges={setUnsavedChanges}  />
          </div>
          <div className={`preview-col-${showPreview}`}>
            <div className="preview-col-alpha">
              <div className="preview-content">
                <Preview code={code} />
              </div>
              <p style={{textAlign: 'right'}}>Say something wise, the elders are waiting.</p>
            </div>
          </div>
        </div>
        </div>
         
         
    </>
  );
  
}
export default Home;

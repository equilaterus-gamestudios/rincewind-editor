import React, { useState } from 'react';

import { dialog, webContents } from '@electron/remote';
import Editor from './Editor';
import Preview from './Preview';

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
  const [code, setCode] = useState(sampleCode);

  console.log(props.location.hash, ' ', props.location.pathname);
  return  (
    <>
      <div className="app">
        <div className="menu">
        <button type="button" className="nes-btn is-warning">Save dialog</button> 
        <button
          type="button" className="nes-btn is-warning"
          onClick={()=>{
            dialog.showOpenDialog(
                {
                  title:'Open Dialogue',
                  message:'First Dialog',
                  //pass 'openDirectory' to strictly open directories
                  properties: ['openFile']
                }
            ).then(result=>{
              if (result.filePaths.length === 0) return;
              console.log(result.filePaths[0]);
            })
          }}>
            Open dialog
          </button>
          
        </div>
        <div className="editor">
          <div className="editor-col no-overflow">
            <Editor code={code} setCode={setCode}  />
          </div>
          <div className="editor-col preview-col" style={{backgroundImage: `url('${process.env.PUBLIC_URL}/bg.png`}}>
            <div className="preview-content">
              <Preview code={code} />
            </div>
            <p style={{textAlign: 'right'}}>Say something wise, the elders are waiting.</p>
          </div>
        </div>
        </div>
         
         
    </>
  );
  
}
export default Home;

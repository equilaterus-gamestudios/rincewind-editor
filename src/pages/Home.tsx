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
  const [code, setCode] = useState(sampleCode);
  const [showPreview, setShowPreview] = useState(false);

  console.log(props.location.hash, ' ', props.location.pathname);
  return  (
    <>
      <div className="app">
        <div className="menu">
          <Menu setCode={setCode} togglePreview={() => { setShowPreview(!showPreview); } }/>
        </div>
        <div className="editor">
          <div className={`editor-col editor-col-preview-${showPreview} no-overflow `}>
            <Editor code={code} setCode={setCode}  />
          </div>
          <div className={`preview-col-${showPreview}`} style={{backgroundImage: `url('${process.env.PUBLIC_URL}/bg.png`}}>
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

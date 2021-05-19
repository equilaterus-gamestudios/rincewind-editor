import React, { useContext, useState } from 'react';

import Editor from '../components/Editor';
import Menu from '../components/Menu';
import PreviewCol from '../components/PreviewCol';
import { EditorContext } from '../hooks/useEditor';

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

const Home = () => {
  const { showPreview } = useContext(EditorContext);
  return  (
    <>
      <div className="app">
        <div className="menu">
          <Menu />
        </div>
        <div className="editor">
          <div className={`editor-col editor-col-preview-${showPreview} no-overflow `}>
            <Editor />
          </div>
          <PreviewCol enabled={showPreview} />
        </div>
      </div>
    </>
  );
  
}
export default Home;
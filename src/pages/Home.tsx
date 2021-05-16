import React from 'react';

import { dialog } from '@electron/remote';
 
const Home = () => {
 
  return  (
    <>
      <p>Hi</p>
      <button onClick={()=>{
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
          Open Dialog to Select a file
         </button>
    </>
  );
  
}
export default Home;

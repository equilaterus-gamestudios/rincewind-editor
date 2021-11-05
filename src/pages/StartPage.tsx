import React, { useEffect } from 'react';
import Menu from '../components/Menu';
import StartActions from '../components/StartActions';
import { useRincewindActions } from '../common/actions';
import RecentFiles from '../components/RecentFiles';

const StartPage = () => {
  const { loadPreferences, loadRecentFiles } = useRincewindActions();
  
  // On mount
  useEffect(() => {
    // Load data
    (async () => {
      await loadPreferences();
      await loadRecentFiles();
    })();
  }, [loadPreferences, loadRecentFiles])

  return  (
    <>
      <div className="app">
        <div className="menu">
          <Menu />
        </div>
        <div className="editor">
          <div className="default-col container-fluid">
            <div className="row">
              <div className="col-4">
                <StartActions />
              </div>
            </div>
            <RecentFiles />
          </div>
        </div>
      </div>
    </>
  );
  
}
export default StartPage;

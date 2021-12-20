import { useState } from 'react';
// take in an initial mode
// set the mode state with the initial mode provided
// return an object with a mode property

export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition (newMode, replace = false) {
    if (replace) {
      setMode(prev => newMode)
      let replaceHistory = [...history];
      //mode replaces top of history
      replaceHistory[replaceHistory.length - 1] = mode;
      setHistory(prev => replaceHistory);
    } else {
      setMode(prev => newMode);
      let newHistory = [...history];
      //mode is added to new history
      newHistory.push(newMode);
      setHistory(prev => newHistory);
    }
  };

  const back = () => {
    let newHistory = [...history];
    //remove the most recent mode from the stack
    newHistory.pop(mode);
    setHistory(prev => newHistory);
    if (history.length > 1) {
      //Reduce the dtack size by 1
      setMode(prev => newHistory[(newHistory.length - 1)]);
    }
 };

  return { mode, transition, back }

}

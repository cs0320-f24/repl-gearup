import '../styles/main.css';
import { Dispatch, SetStateAction, useEffect, useState} from 'react';
import { ControlledInput } from './ControlledInput';

interface REPLInputProps{
  history : string[]
  setHistory : React.Dispatch<React.SetStateAction<string[]>>
}
// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props : REPLInputProps) {
    // Remember: let React manage state in your webapp. 
    // Manages the contents of the input box
    const [commandString, setCommandString] = useState<string>('');
    const [count, setCount] = useState<number>(0)

    // TODO: Make this return a student from the list based on the passed index.
    function handleSubmit() : void {
      setCount(count+1);
      props.setHistory(props.history.concat(commandString))
      setCommandString('')
    }
    /**
     * We suggest breaking down this component into smaller components, think about the individual pieces 
     * of the REPL and how they connect to each other...
     */
    return (
        <div className="repl-input">
            {/* This is a comment within the JSX. Notice that it's a TypeScript comment wrapped in
            braces, so that React knows it should be interpreted as TypeScript */}
            {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
            into a single unit, which makes it easier for screenreaders to navigate. */}
            <fieldset>
              <legend>Enter a command:</legend>
              <ControlledInput value={commandString} setValue={setCommandString} ariaLabel={"Command input"}/>
            </fieldset>
            <button onClick={handleSubmit}>Submitted {count} times</button>
        </div>
    );
  }
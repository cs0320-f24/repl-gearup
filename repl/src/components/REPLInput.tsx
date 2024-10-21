import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import '../styles/main.css';
import { ControlledInput } from './ControlledInput';

interface REPLInputProps {
  history: string[]
  setHistory: React.Dispatch<React.SetStateAction<string[]>>
}
// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)

export function REPLInput(props: REPLInputProps) {
  // Remember: let React manage state in your webapp. 
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>('');
  const [count, setCount] = useState<number>(0)

  // TODO: Make this return a student from the list based on the passed index.
  function handleSubmit(): void {
    setCount(count + 1);
    if (commandString !== '') {
      setCommandString('')
      fetch('http://localhost:3232')
        .then(response => response.json())
        .then(json => {
          const students: [string] = json.students
          let studentIndex: number = parseInt(commandString)
          // Checks for invalid inputs,
          if (Number.isNaN(studentIndex) || studentIndex < 0 || studentIndex >= students.length) {
            props.setHistory(props.history.concat("Error: Invalid input " + commandString))
          }
          else {
            const name: string = students[studentIndex]
            props.setHistory(props.history.concat(name))
          }
        })
        .catch((error) => {
          props.setHistory(props.history.concat("Error in fetch"))
        })
    }
    else {
      props.setHistory(props.history.concat("Error: Empty command"))
    }
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
        <ControlledInput value={commandString} setValue={setCommandString} ariaLabel={"Command input"} />
      </fieldset>
      <button onClick={handleSubmit}>Submitted {count} times</button>
    </div>
  );
}

/*

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import '../styles/main.css';
import { ControlledInput } from './ControlledInput';

interface REPLInputProps {
  history: string[];
  setHistory: React.Dispatch<React.SetStateAction<string[]>>;
}

export function REPLInput(props: REPLInputProps) {
  // State to manage the contents of the input box
  const [commandString, setCommandString] = useState<string>('');
  const [count, setCount] = useState<number>(0);

  // Asynchronous function using async/await to fetch data
  async function handleSubmit(): Promise<void> {
    setCount(count + 1);

    if (commandString !== '') {
      setCommandString('');

      try {
        const response = await fetch('http://localhost:3232');
        const json = await response.json();

        const students: [string] = json.students;
        const studentIndex: number = parseInt(commandString);

        // Checks for invalid inputs
        if (Number.isNaN(studentIndex) || studentIndex < 0 || studentIndex >= students.length) {
          props.setHistory(props.history.concat(`Error: Invalid input ${commandString}`));
        } else {
          const name: string = students[studentIndex];
          props.setHistory(props.history.concat(name));
        }
      } catch (error) {
        props.setHistory(props.history.concat("Error in fetch"));
      }
    } else {
      props.setHistory(props.history.concat("Error: Empty command"));
    }
  }

  return (
    <div className="repl-input">
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput value={commandString} setValue={setCommandString} ariaLabel={"Command input"} />
      </fieldset>
      <button onClick={handleSubmit}>Submitted {count} times</button>
    </div>
  );
}


* */
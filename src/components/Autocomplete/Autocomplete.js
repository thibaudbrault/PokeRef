import React, { useState } from 'react'

function Autocomplete({results}) {

    const [filteredResults, setFilteredResults] = useState([]);
    const [activeResultIndex, setActiveResultIndex] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [input, setInput] = useState("");

    const onChange = (e) => {
        const userInput = e.target.value;
    
        const notResults = results.filter(
          (result) =>
            result.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );
    
        setInput(e.target.value);
        setFilteredResults(notResults);
        setActiveResultIndex(0);
        setShowResults(true);
    };

    const onClick = (e) => {
        setFilteredResults([]);
        setInput(e.target.innerText);
        setActiveResultIndex(0);
        setShowResults(false);
    };

    const onKeyDown = (e) => {
        // User pressed the enter key
        if (e.keyCode === 13) {
          setInput(filteredResults[activeResultIndex]);
          setActiveResultIndex(0);
          setShowResults(false);
        }
        // User pressed the up arrow
        else if (e.keyCode === 38) {
          if (activeResultIndex === 0) {
            return;
          }
    
          setActiveResultIndex(activeResultIndex - 1);
        }
        // User pressed the down arrow
        else if (e.keyCode === 40) {
          if (activeResultIndex - 1 === filteredResults.length) {
            return;
          }
    
          setActiveResultIndex(activeResultIndex + 1);
        }
      };

    const ResultsListComponent = () => {
        return filteredResults.length ? (
          <ul class="results">
            {filteredResults.map((result, index) => {
              let className;
              // Flag the active result with a class
              if (index === activeResultIndex) {
                className = "result-active";
              }
              return (
                <li className={className} key={result} onClick={onClick}>
                  {result}
                </li>
              );
            })}
          </ul>
        ) : (
          <div class="no-results">
            <em>No results, you're on your own!</em>
          </div>
        );
      };

    return (
        <>
            <input
                type="text"
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={input}
            />
            {showResults && input && <ResultsListComponent />}
        </>
    )
}

export default Autocomplete
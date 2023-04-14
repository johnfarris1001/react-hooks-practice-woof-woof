import React, { useState, useEffect } from "react";

import DogBar from "./DogBar";
import PupInfo from "./PupInfo";

function App() {
  const url = 'http://localhost:3001/pups'
  const [pups, setPups] = useState([])
  const [pup, setPup] = useState({})
  const [filter, setFilter] = useState(false)

  useEffect(() => {
    fetch(url)
      .then(r => r.json())
      .then(data => setPups(data))
  }, [])

  function handlePupClick(dog) {
    setPup(dog)
  }

  function changeGoodness(updatePup) {
    const updatedPups = pups.map(dog => {
      return dog.id === updatePup.id ? { ...dog, isGoodDog: !updatePup.isGoodDog } : dog
    })
    setPups(updatedPups)
    setPup({ ...updatePup, isGoodDog: !updatePup.isGoodDog })
  }

  function filterDogs() {
    if (!filter) {
      const updatedPups = pups.filter(dog => {
        return dog.isGoodDog
      })
      setPups(updatedPups)
    } else {
      fetch(url)
        .then(r => r.json())
        .then(data => setPups(data))
    }
    setFilter(!filter)
  }

  return (
    <div className="App">
      <div id="filter-div">
        <button id="good-dog-filter" onClick={filterDogs}>Filter good dogs: {filter ? 'ON' : 'OFF'}</button>
      </div>
      <div id="dog-bar">
        <DogBar pups={pups} getPupInfo={handlePupClick} />
      </div>
      <div id="dog-summary-container">
        <h1>DOGGO:</h1>
        <div id="dog-info">
          {pup.id ? <PupInfo pup={pup} toggleGoodness={changeGoodness} url={url} /> : null}
        </div>
      </div>
    </div>
  );
}

export default App;

import React from 'react'

function PupInfo({ pup, toggleGoodness, url }) {
    function handleChange() {
        fetch(`${url}/${pup.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...pup,
                isGoodDog: !pup.isGoodDog
            })
        })
        toggleGoodness(pup)
    }

    return (
        <div>
            <img src={pup.image} />
            <h2>{pup.name}</h2>
            <button onClick={() => handleChange()} id='goodness'>{pup.isGoodDog ? 'Good Dog' : 'Bad Dog'}</button>
        </div>
    )
}

export default PupInfo
import React from 'react'

function DogBar({ pups, getPupInfo }) {
    const pupNames = pups.map(pup => {
        return <span key={pup.id} onClick={() => {
            getPupInfo(pup)
        }}>{pup.name}</span>
    })

    return pupNames
}

export default DogBar
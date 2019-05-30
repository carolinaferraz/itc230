// src/components/bears.js

import React from 'react'

const Bears = ({ bears }) => {
  return (
    <div>
      <center><h1>Bears</h1></center>
      {bears.map((bear) => (
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">name: {bear.name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">color: {bear.color}</h6>
            <p class="card-text">type: {bear.type}</p>
          </div>
        </div>
      ))}
    </div>
  )};

export default Bears;
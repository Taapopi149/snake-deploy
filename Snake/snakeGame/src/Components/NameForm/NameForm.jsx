import React, { useState } from 'react'
import './NameForm.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const NameForm = ({ onSubmitName }) => {
  const [name, setName] = useState('')
  const navigate = useNavigate() 

  const handleChange = (event) => {
    setName(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (name.trim() === '') return

    try {
      const res = await axios.post('http://localhost:5000/api/users', {
        name: name,
      })

      console.log('User Saved:', res.data)
      onSubmitName(name)
      navigate('/game' ,{state: {name}}) 
    } catch (error) {
      console.error('Error saving user:', error)
    }
  }

  return (
    <div className="Main-container">
      <div className="greetings">
        <h1>Hey, Welcome! Please enter your user name</h1>
      </div>
      <div className="Form-Container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">
            Name:
            <input
              id="username"
              type="text"
              value={name}
              onChange={handleChange}
              placeholder="e.g BreezyGod"
            />
          </label>
          <button type="submit" disabled={!name.trim()}>
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default NameForm

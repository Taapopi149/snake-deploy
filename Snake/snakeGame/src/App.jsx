import React from 'react'
import Snake from './Components/Snake/Snake'
import { RouterProvider } from 'react-router-dom'

import {router} from "./constants/router/router.jsx"

const App = () => {
  return (
   <div>
    <RouterProvider router={router} />
   </div>
  )
}

export default App
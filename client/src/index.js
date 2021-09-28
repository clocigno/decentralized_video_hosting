import React from 'react'
import { drizzleReactHooks } from '@drizzle/react-plugin'
import drizzle from './redux/drizzle'
import App from './App'
import ReactDOM from 'react-dom'

ReactDOM.render(
  <drizzleReactHooks.DrizzleProvider drizzle={drizzle}>
    <drizzleReactHooks.Initializer>
      <App />
    </drizzleReactHooks.Initializer>
  </drizzleReactHooks.DrizzleProvider>,
  document.getElementById('root')
);
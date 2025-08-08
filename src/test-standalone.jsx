// Completely standalone React test - no imports from our project
import React from 'react'
import ReactDOM from 'react-dom/client'

console.log('🔥 Script loading...')

function TestApp() {
  console.log('🔥 TestApp rendering...')
  return React.createElement('div', {
    style: { padding: '20px', fontSize: '24px', color: 'white', background: 'red' }
  }, [
    React.createElement('h1', { key: 'h1' }, '🔥 STANDALONE REACT TEST 🔥'),
    React.createElement('p', { key: 'p1' }, 'No project imports - pure React'),
    React.createElement('p', { key: 'p2' }, 'Time: ' + new Date().toLocaleTimeString())
  ])
}

console.log('🔥 Creating root...')
const root = ReactDOM.createRoot(document.getElementById('root'))
console.log('🔥 Rendering...')
root.render(React.createElement(TestApp))
console.log('🔥 Render complete!')
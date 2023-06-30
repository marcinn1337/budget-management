import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './components/Home'
import TransfersPage from './components/TransfersPage'
import './css/index.css'

const root = createRoot(document.getElementById('root'))

function App() {
	return (
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/transfers' element={<TransfersPage />} />
			</Routes>
	)
}

root.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
)

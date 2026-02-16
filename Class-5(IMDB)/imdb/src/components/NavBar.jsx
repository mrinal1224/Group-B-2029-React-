import React from 'react'
import {Link} from 'react-router-dom'

function NavBar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
      {/* Logo Section */}
      <div className="flex items-center space-x-2">
        <span className="text-2xl font-bold text-blue-600 tracking-tight cursor-pointer">
          CinePulse
        </span>
      </div>

      {/* Navigation Options */}
      <div className="flex items-center space-x-8 font-medium text-gray-700">
        <Link to="/" className="hover:text-blue-600 transition-colors duration-200">
          Movies
        </Link>
        <Link to="/watchlist" className="hover:text-blue-600 transition-colors duration-200">
          Watchlist
        </Link>
        <Link to='/mood' className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all shadow-sm">
          Mood Selector
        </Link>
      </div>
    </nav>
  )
}

export default NavBar
import React, { useState } from 'react'
import './Movers.css'

const MOCK = [
  { id: 1, name: 'QuickMove Ltd', rating: 4.7, pricePerKm: 1.2, reviews: 234, avatar: 'Q' },
  { id: 2, name: 'SafeHands Movers', rating: 4.5, pricePerKm: 1.4, reviews: 189, avatar: 'S' },
  { id: 3, name: 'BudgetMove', rating: 4.0, pricePerKm: 0.9, reviews: 156, avatar: 'B' },
  { id: 4, name: 'Elite Movers', rating: 4.8, pricePerKm: 1.8, reviews: 312, avatar: 'E' },
  { id: 5, name: 'City Express', rating: 4.3, pricePerKm: 1.1, reviews: 98, avatar: 'C' }
]

export default function Movers({ onBook }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('rating')

  const filteredMovers = MOCK
    .filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating
      if (sortBy === 'price') return a.pricePerKm - b.pricePerKm
      return 0
    })

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="card mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Available Movers</h2>
        <p className="text-gray-600 mt-1">Find and book reliable moving companies</p>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                type="text"
                placeholder="Search movers..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          <div className="sm:w-48">
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="select-field"
            >
              <option value="rating">Highest Rated</option>
              <option value="price">Lowest Price</option>
            </select>
          </div>
        </div>
      </div>

      {/* Movers List */}
      <div className="space-y-4">
        {filteredMovers.map(m => (
          <div 
            key={m.id} 
            className="card hover:shadow-card-hover transition-all duration-200 cursor-pointer group"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="h-16 w-16 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 text-xl font-bold">
                  {m.avatar}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {m.name}
                </h3>
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm font-semibold text-gray-900">{m.rating}</span>
                    <span className="text-sm text-gray-500">({m.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Starting at</p>
                  <p className="text-xl font-bold text-gray-900">${m.pricePerKm}<span className="text-sm font-normal text-gray-500">/km</span></p>
                </div>
                <button 
                  onClick={() => onBook(m)}
                  className="btn-primary whitespace-nowrap"
                >
                  Book Now
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex flex-wrap gap-2">
                {['Verified', 'Insured', '24/7 Support'].map((feature, i) => (
                  <span 
                    key={i}
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMovers.length === 0 && (
        <div className="card text-center py-12">
          <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="text-gray-500">No movers found matching your search.</p>
        </div>
      )}
    </div>
  )
}


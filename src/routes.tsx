import { Routes, Route } from 'react-router-dom'

import MainPage from './pages/Main'
import LoginPage from './pages/Login'
import ReservationPage from './pages/Reservation'
import AllHotelsPage from './pages/AllHotels'
import SearchResultPage from './pages/SearchResult'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/pre-reserva/:hotelId" element={<ReservationPage />} />
      <Route path="/hoteis/:category" element={<AllHotelsPage />} />
      <Route path="/resultado" element={<SearchResultPage />} />
    </Routes>
  )
}

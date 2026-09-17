import { Routes, Route } from 'react-router-dom'

import MainPage from './pages/Main'
import LoginPage from './pages/Login'
import ReservationPage from './pages/Reservation'
import AllHotelsPage from './pages/AllHotels'
import SearchResultPage from './pages/SearchResult'

import { ProfilePage } from './pages/Profile'
import { TermsPage } from './pages/Terms'
import { PrivacyPage } from './pages/Privacy'
import { HelpPage } from './pages/Help'
import { TermsOfUsePage } from './pages/TermsOfUse'
import { MyBookingsPage } from './pages/MyBookings'
import { FavoritesPage } from './pages/Favorites'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/pre-reserva/:hotelId" element={<ReservationPage />} />
      <Route path="/hoteis/:category" element={<AllHotelsPage />} />
      <Route path="/resultado" element={<SearchResultPage />} />

      {/* Rotas de Conta */}
      <Route path="/perfil" element={<ProfilePage />} />
      <Route path="/minhas-viagens" element={<MyBookingsPage />} />
      <Route path="/favoritos" element={<FavoritesPage />} />

      {/* Rotas institucionais do Rodapé */}
      <Route path="/termos" element={<TermsPage />} />
      <Route path="/privacidade" element={<PrivacyPage />} />
      <Route path="/ajuda" element={<HelpPage />} />
      <Route path="/termos-de-uso" element={<TermsOfUsePage />} />
    </Routes>
  )
}

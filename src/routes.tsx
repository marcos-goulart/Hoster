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

import { ProtectedRoute } from './components/ProtectedRoute'

export function AppRoutes() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/hoteis/:category" element={<AllHotelsPage />} />
      <Route path="/resultado" element={<SearchResultPage />} />

      {/* Rota de Pré-reserva (Mantém o usuário na tela e abre o Modal) */}
      <Route
        path="/pre-reserva/:hotelId"
        element={
          <ProtectedRoute
            keepOnPage={true}
            message="Faça login para continuar com a reserva da acomodação."
          >
            <ReservationPage />
          </ProtectedRoute>
        }
      />

      {/* Rotas institucionais do Rodapé */}
      <Route path="/termos" element={<TermsPage />} />
      <Route path="/privacidade" element={<PrivacyPage />} />
      <Route path="/ajuda" element={<HelpPage />} />
      <Route path="/termos-de-uso" element={<TermsOfUsePage />} />

      {/* Rotas de Conta Protegidas (Redirecionam para a Home e abrem o Modal) */}
      <Route
        path="/perfil"
        element={
          <ProtectedRoute message="Faça login para acessar o painel da sua conta.">
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/minhas-viagens"
        element={
          <ProtectedRoute message="Faça login para visualizar o histórico de suas viagens.">
            <MyBookingsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/favoritos"
        element={
          <ProtectedRoute message="Faça login para consultar suas acomodações favoritas.">
            <FavoritesPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

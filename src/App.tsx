import { BrowserRouter as Router } from 'react-router-dom'

import { AppRoutes } from './routes'

import { AppThemeProvider } from './styles/themeProvider'
import { GlobalStyle } from './styles/global'
import { Normalize } from 'styled-normalize'
import { AuthProvider } from './context/AuthContext'
import { PageLoadingProvider } from './context/PageLoadingContext'
import { PageLoadingOverlay } from './components/PageLoadingOverlay'

export default function App() {
  return (
    <Router>
      <PageLoadingProvider>
        <AuthProvider>
          <AppThemeProvider>
            <AppRoutes />
            <PageLoadingOverlay />
            <GlobalStyle />
            <Normalize />
          </AppThemeProvider>
        </AuthProvider>
      </PageLoadingProvider>
    </Router>
  )
}

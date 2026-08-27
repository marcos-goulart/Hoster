import { BrowserRouter as Router } from 'react-router-dom'

import { AppRoutes } from './routes'

import { AppThemeProvider } from './styles/themeProvider'
import { GlobalStyle } from './styles/global'
import { Normalize } from 'styled-normalize'
import { AuthProvider } from './context/AuthContext'
import { PageLoadingProvider } from './context/PageLoadingProvider'
import { PageLoadingOverlay } from './components/PageLoadingOverlay'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { CustomScrollbar } from './components/CustomScrollBar/CustomScrollbar'

export default function App() {
  useSmoothScroll()

  return (
    <Router>
      <PageLoadingProvider>
        <AuthProvider>
          <AppThemeProvider>
            <CustomScrollbar />
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

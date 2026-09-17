import type { ReactNode } from 'react'
import { BackNavigation } from '../../components/BackNavigation'
import { Container, ContentGrid, ContentWrapper, PageHeader, SidebarNav } from './styles'

export interface Section {
  id: string
  title: string
}

interface StaticPageProps {
  title: string
  subtitle?: string
  sections?: Section[]
  children: ReactNode
}

export function StaticPage({ title, subtitle, sections, children }: StaticPageProps) {
  const handleScrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <Container>
      <BackNavigation />

      <PageHeader>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </PageHeader>

      <ContentGrid $hasSidebar={Boolean(sections && sections.length > 0)}>
        {sections && sections.length > 0 && (
          <SidebarNav>
            <nav>
              <strong>Índice da Página</strong>
              <ul>
                {sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} onClick={handleScrollToSection(section.id)}>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </SidebarNav>
        )}

        <ContentWrapper>{children}</ContentWrapper>
      </ContentGrid>
    </Container>
  )
}

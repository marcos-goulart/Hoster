import type { Section } from '../StaticPage'
import { StaticPage } from '../StaticPage'

const sections: Section[] = [
  { id: 'aceitacao', title: '1. Aceitação dos Termos' },
  { id: 'servicos', title: '2. Serviços da Plataforma' },
  { id: 'reservas', title: '3. Regras de Reservas' },
  { id: 'cancelamentos', title: '4. Polítíca de Cancelamento' },
  { id: 'responsabilidade', title: '5. Limitação de Responsabilidade' },
]

export function TermsPage() {
  return (
    <StaticPage
      title="Termos e Condições de Uso"
      subtitle="Última atualização: Setembro de 2026"
      sections={sections}
    >
      <section id="aceitacao">
        <h2>1. Aceitação dos Termos</h2>
        <p>
          Ao acessar e utilizar a plataforma Hoster, você concorda em cumprir e se submeter aos
          presentes Termos e Condições de Uso e a todas as leis aplicáveis.
        </p>
      </section>

      <section id="servicos">
        <h2>2. Serviços da Plataforma</h2>
        <p>
          A Hoster atua como uma plataforma digital de intermediação para busca, comparação e
          reserva de hotéis, pousadas e acomodações parceiras.
        </p>
      </section>

      <section id="reservas">
        <h2>3. Regras de Reservas</h2>
        <p>
          Ao efetuar uma reserva, você concorda em fornecer informações cadastrais exatas. As
          confirmações dependem da aprovação de pagamento e da disponibilidade da acomodação.
        </p>
      </section>

      <section id="cancelamentos">
        <h2>4. Política de Cancelamento</h2>
        <p>
          As regras de cancelamento e reembolso variam conforme a tarifa selecionada e a política
          específica de cada hotel parceiro, conforme exibido no momento do checkout.
        </p>
      </section>

      <section id="responsabilidade">
        <h2>5. Limitação de Responsabilidade</h2>
        <p>
          A Hoster não se responsabiliza por indisponibilidades temporárias decorrentes de
          manutenção de servidores ou problemas de conexão por parte do usuário.
        </p>
      </section>
    </StaticPage>
  )
}

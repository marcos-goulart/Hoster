import type { Section } from '../StaticPage'
import { StaticPage } from '../StaticPage'

const sections: Section[] = [
  { id: 'coleta', title: '1. Coleta de Dados' },
  { id: 'uso', title: '2. Uso das Informações' },
  { id: 'compartilhamento', title: '3. Compartilhamento' },
  { id: 'seguranca', title: '4. Segurança e Armazenamento' },
  { id: 'direitos', title: '5. Seus Direitos (LGPD)' },
]

export function PrivacyPage() {
  return (
    <StaticPage
      title="Política de Privacidade"
      subtitle="Como tratamos e protegemos seus dados pessoais"
      sections={sections}
    >
      <section id="coleta">
        <h2>1. Coleta de Dados</h2>
        <p>
          Coletamos informações pessoais que você nos fornece diretamente ao criar uma conta ou
          efetuar uma reserva, incluindo nome, e-mail e dados de contato.
        </p>
      </section>

      <section id="uso">
        <h2>2. Uso das Informações</h2>
        <p>Os dados coletados são utilizados para:</p>
        <ul>
          <li>Processar e gerenciar suas reservas de acomodação.</li>
          <li>Enviar confirmações, alertas e atualizações do serviço.</li>
          <li>Garantir a segurança da sua conta através do Firebase Authentication.</li>
        </ul>
      </section>

      <section id="compartilhamento">
        <h2>3. Compartilhamento de Dados</h2>
        <p>
          Compartilhamos seus dados exclusivamente com os estabelecimentos hoteleiros parceiros
          necessários para a realização do seu check-in e estadia.
        </p>
      </section>

      <section id="seguranca">
        <h2>4. Segurança e Armazenamento</h2>
        <p>
          Adotamos padrões modernos de segurança, como criptografia SSL e integração com provedores
          de autenticação seguros, para proteger suas informações contra acessos não autorizados.
        </p>
      </section>

      <section id="direitos">
        <h2>5. Seus Direitos (LGPD)</h2>
        <p>
          Em conformidade com a Lei Geral de Proteção de Dados (LGPD), você tem o direito de
          solicitar a exclusão, correção ou exportação dos seus dados cadastrais a qualquer momento.
        </p>
      </section>
    </StaticPage>
  )
}

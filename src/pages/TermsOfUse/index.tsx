import type { Section } from '../StaticPage'
import { StaticPage } from '../StaticPage'

const sections: Section[] = [
  { id: 'uso-aceito', title: '1. Uso Aceitável' },
  { id: 'propriedade', title: '2. Propriedade Intelectual' },
  { id: 'conta', title: '3. Responsabilidade da Conta' },
  { id: 'penalidades', title: '4. Suspensão de Acesso' },
]

export function TermsOfUsePage() {
  return (
    <StaticPage
      title="Condições de Uso"
      subtitle="Regras de convivência e diretrizes de navegação na plataforma"
      sections={sections}
    >
      <section id="uso-aceito">
        <h2>1. Uso Aceitável</h2>
        <p>
          O usuário se compromete a utilizar a plataforma exclusivamente para fins legítimos de
          consulta e reservas de acomodações, abstendo-se de praticar qualquer ato ilícito ou
          fraudulento.
        </p>
      </section>

      <section id="propriedade">
        <h2>2. Propriedade Intelectual</h2>
        <p>
          Todo o conteúdo presente na plataforma Hoster (incluindo marcas, logotipos, textos, layout
          e código-fonte) é de propriedade exclusiva e protegido pelas leis de propriedade
          intelectual.
        </p>
      </section>

      <section id="conta">
        <h2>3. Responsabilidade da Conta</h2>
        <p>
          Você é responsável por manter a confidencialidade das suas credenciais de acesso e por
          todas as atividades realizadas em sua conta.
        </p>
      </section>

      <section id="penalidades">
        <h2>4. Suspensão de Acesso</h2>
        <p>
          A Hoster reserva-se o direito de suspender ou encerrar o acesso de usuários que violem
          estas diretrizes ou tentem comprometer a integridade da plataforma.
        </p>
      </section>
    </StaticPage>
  )
}

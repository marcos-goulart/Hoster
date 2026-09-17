import { useState } from 'react'
import { StaticPage } from '../StaticPage'
import { FaChevronDown, FaChevronUp, FaSearch } from 'react-icons/fa'
import { FAQContainer, FAQItem, SearchBox } from './styles'

interface FAQ {
  question: string
  answer: string
}

const faqData: FAQ[] = [
  {
    question: 'Como posso cancelar ou alterar uma reserva?',
    answer:
      'Para alterar ou cancelar uma reserva, acesse a seção "Minhas Viagens" no menu do seu perfil. Selecione a acomodação desejada e escolha a opção correspondente às regras de cancelamento da propriedade.',
  },
  {
    question: 'Quais são as formas de pagamento aceitas?',
    answer:
      'A plataforma aceita cartões de crédito (Visa, Mastercard, Elo), Pix e boleto bancário (dependendo da antecedência do check-in).',
  },
  {
    question: 'Como funciona a confirmação da reserva?',
    answer:
      'A confirmação é imediata após a aprovação do pagamento. Você receberá um e-mail com o comprovante e os detalhes de check-in.',
  },
  {
    question: 'O que acontece em caso de atraso no check-in?',
    answer:
      'Recomendamos entrar em contato com a propriedade através dos canais disponibilizados na sua confirmação para informar sobre o horário previsto de chegada.',
  },
]

export function HelpPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const filteredFaqs = faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <StaticPage
      title="Central de Ajuda"
      subtitle="Tire suas dúvidas ou encontre orientações sobre suas reservas"
    >
      <SearchBox>
        <FaSearch className="icon" />
        <input
          type="text"
          placeholder="Busque por dúvida, cancelamento, pagamentos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchBox>

      <FAQContainer>
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => (
            <FAQItem key={index} $isOpen={openIndex === index}>
              <button type="button" className="faq-question" onClick={() => toggleFAQ(index)}>
                <span>{faq.question}</span>
                {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {openIndex === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </FAQItem>
          ))
        ) : (
          <p className="no-results">Nenhum resultado encontrado para a sua busca.</p>
        )}
      </FAQContainer>
    </StaticPage>
  )
}

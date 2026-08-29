# HOSTER 🏨

Aplicação web moderna e responsiva para busca e reserva de hotéis, desenvolvida com **React + TypeScript + Vite**. 

O projeto conta com um sistema avançado de busca com calendário interativo duplo, busca por datas flexíveis, filtragem inteligente por localização/estado, modal de carregamento global, testes automatizados com **Vitest + React Testing Library**, estilização com `styled-components` e suporte a `json-server` para simulação de API REST.

---

## 🚀 Funcionalidades Principais

- **Formulário de Busca Avançado (`SearchForm`)**:
  - Sugestões inteligentes de destinos (cidades, bairros e aeroportos).
  - Botão limpo e discreto para limpar o campo de localização.
  - **Calendário Customizado Duplo (`CalendarPicker`)**:
    - Exibição de 2 meses lado a lado com navegação por setas.
    - Seleção de intervalo de datas (entrada e saída) com destaque visual.
    - Botões rápidos de ajuste (`Datas exatas`, `± 1 dia`, `± 2 dias`, `± 3 dias`, `± 7 dias`).
  - **Aba de Datas Flexíveis**:
    - Escolha de duração da hospedagem (`1 diária`, `2 a 3 diárias`, `4 a 5 diárias`, `6 a 7 diárias`).
    - Opção de incluir fim de semana.
    - Seleção múltipla de meses disponíveis para viagem (ex: Agosto 2026, Setembro 2026).
  - Seletor interativo de quantidade de viajantes (adultos, crianças) e quartos.

- **Motor de Busca e Ordenação por Localização**:
  - Priorização de hotéis na própria cidade/bairro pesquisado.
  - Exibição secundária de hotéis localizados no **mesmo Estado (UF)**.
  - Exclusão estrita de hotéis de outros Estados durante a pesquisa por localização.

- **Cards de Resultados e Cálculo de Preços**:
  - Cálculo dinâmico do número de diárias e preço total (compatível com datas exatas e datas flexíveis).
  - Badges de desconto (`discountTag`) ajustadas e contidas no tamanho do texto.
  - Exibição de amenidades/serviços (Wi-Fi, Piscinas, Café da Manhã, Estacionamento, etc.).

- **Experiência de Carregamento (`PageLoadingOverlay`)**:
  - Modal flutuante moderno com efeito de vidro (`backdrop-filter: blur`) e spinner animado.
  - Retenção intencional de 1 segundo na navegação para garantir feedback visual ao usuário.

---

## 🛠️ Tecnologias Utilizadas

- **Core**: React `^19.2.0`, TypeScript `~5.9.3`, Vite `^7.3.1`
- **Roteamento & Requisições**: React Router DOM `^7.13.0`, Axios `^1.13.5`, `json-server` `^1.0.0-beta.5`
- **Estilização & UI**: `styled-components` `^6.3.9`, `styled-normalize`, `react-icons`, `gsap`, `lenis`
- **Testes Automatizados**: Vitest `^4.1.11`, React Testing Library (`@testing-library/react`), `@testing-library/jest-dom`, `@testing-library/user-event`, `jsdom`

---

## 🧪 Testes Automatizados

O projeto possui uma suíte de testes unitários e de integração configurada com **Vitest** e **React Testing Library**:

- **Configuração de Testes**: `vite.config.ts` + `src/test/setup.ts` com ambiente `jsdom`.
- **Componentes Testados**:
  - `SearchForm`: Renders essenciais, interação e submissão.
  - `HotelCard`: Renderização de informações do hotel, cálculo de preços e listagem.
  - `NavBar`: Abertura e fechamento do menu responsivo mobile.
  - `SearchResultPage`: Aplicabilidade de filtros de serviços (ex: Piscinas) e exibição correta dos resultados.

Para executar os testes:

```bash
# Executa os testes no modo watch (interativo)
npm run test

# Executa todos os testes uma única vez (ideal para CI/CD)
npm run test:run
```

---

## 📜 Scripts Disponíveis

No diretório do projeto, você pode executar:

- `npm run dev`: Inicia o servidor de desenvolvimento do Vite em `http://localhost:5173`.
- `npm run build`: Executa verificação de tipos (`tsc -b`) e gera os arquivos otimizados em `dist/`.
- `npm run preview`: Sobe um servidor local para pré-visualizar a build de produção.
- `npm run test`: Executa a suíte de testes com Vitest em modo watch.
- `npm run test:run`: Executa a suíte de testes uma única vez.
- `npm run typecheck`: Executa apenas a checagem de tipos com TypeScript.
- `npm run lint`: Executa o ESLint em todo o código (falha com qualquer warning/error).
- `npm run format`: Formata todo o código usando Prettier.
- `npm run format:check`: Verifica se o código atende às regras do Prettier.
- `npm run json-server`: Inicia o servidor fake REST com `db.json` na porta `5000`.

---

## 🧭 Estrutura de Rotas

As rotas da aplicação estão definidas em `src/routes.tsx`:

| Rota | Componente | Descrição |
|---|---|---|
| `/` | `MainPage` | Página inicial com banner de busca, promoções e destaques |
| `/login` | `LoginPage` | Tela de login do usuário |
| `/resultado` | `SearchResultPage` | Resultados da busca com filtros avançados e paginação |
| `/pre-reserva/:hotelId` | `ReservationPage` | Tela de pré-reserva e detalhes do hotel |
| `/hoteis/:category` | `AllHotelsPage` | Listagem por categoria (destaques, promoções, etc.) |

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:

```env
VITE_API_BASE_URL=http://localhost:5000
```

> **Nota:** No Vite, todas as variáveis de ambiente expostas ao front-end devem iniciar obrigatoriamente com o prefixo `VITE_`.

---

## 📦 Instalação e Execução Local

1. **Clonar o repositório**:
   ```bash
   git clone https://github.com/marcos-goulart/hoster.git
   cd hoster
   ```

2. **Instalar as dependências**:
   ```bash
   npm install
   ```

3. **Iniciar o servidor Mock API** (em um terminal separado):
   ```bash
   npm run json-server
   ```

4. **Iniciar o aplicativo em desenvolvimento**:
   ```bash
   npm run dev
   ```

---

## 📐 Padrões de Código

- **EditorConfig & Prettier**: Indentação com 4 espaços, aspas simples, sem ponto e vírgula quando desnecessário.
- **ESLint**: Regras estritas para React 19, TypeScript e React Hooks.

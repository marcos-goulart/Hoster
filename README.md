# HOTEL-REACT-VITE

Aplicação web desenvolvida com **React + TypeScript + Vite** para um sistema de hotelaria. O projeto utiliza `styled-components` para estilização, `react-router-dom` para navegação entre páginas e `json-server` para simular uma API REST durante o desenvolvimento.

## Scripts disponíveis

No diretório do projeto, você pode executar:

- `npm run dev`
  Inicia o servidor de desenvolvimento do Vite.
  Acesse: [http://localhost:5173](http://localhost:5173)

- `npm run build`
  Executa type-check (`tsc -b`) e gera a build de produção em `dist/`.

- `npm run preview`
  Sobe um servidor local para pré-visualizar a build de produção.

- `npm run lint`
  Executa o ESLint no projeto inteiro com falha em qualquer warning/error.

- `npm run typecheck`
  Executa apenas a verificação de tipos com TypeScript.

- `npm run format`
  Formata o código com Prettier.

- `npm run format:check`
  Valida se os arquivos seguem o padrão de formatação.

- `npm run json-server`
  Inicia o servidor fake com `db.json` na porta `5000`.

## Padrões de desenvolvimento

O projeto está configurado para seguir padrões consistentes:

- **Indentação com 4 espaços** (`.editorconfig` + Prettier)
- ESLint com regras recomendadas para **TypeScript + React Hooks**
- Prettier como formatador padrão

## Variáveis de ambiente

Use o arquivo `.env.example` como base.

Exemplo:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Observação importante: no Vite, variáveis expostas no front-end devem começar com `VITE_`.

## Tecnologias principais

- React `^19.2.0`
- TypeScript `~5.9.3`
- Vite `^7.3.1`
- React Router DOM `^7.13.0`
- Styled Components `^6.3.9`
- Axios `^1.13.5`
- json-server `^1.0.0-beta.5`

## Estrutura e navegação

As rotas principais estão em `src/routes.tsx`:

- `/` -> `MainPage`
- `/login` -> `LoginPage`

A aplicação é inicializada em `src/main.tsx` e encapsulada por providers em `src/App.tsx`.

## Estilização

- `styled-components` para componentes estilizados
- `styled-normalize` para reset CSS
- Tema central em `src/styles/theme.ts`
- Estilo global em `src/styles/global.ts`

## Instalação

```bash
git clone https://github.com/seu-usuario/hotel-react-vite.git
cd hotel-react-vite
npm install
```

## Observações

- Se for usar `json-server`, crie um `db.json` na raiz do projeto.
- Após atualizar dependências, rode `npm install` para sincronizar o `package-lock.json`.

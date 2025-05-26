# 🌦️ OpenWeather App

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.0-06B6D4?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-4.5.0-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![Axios](https://img.shields.io/badge/Axios-1.x-5A29E4?style=flat)](https://axios-http.com/)
[![OpenWeather](https://img.shields.io/badge/API-OpenWeatherMap-orange?style=flat)](https://openweathermap.org/)
[![Unsplash](https://img.shields.io/badge/API-Unsplash-black?style=flat&logo=unsplash)](https://unsplash.com/developers)
[![Geolocation API](https://img.shields.io/badge/API-Geolocation-blue?style=flat&logo=location-dot&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/MatheusLopesLemos/OpenWeather-API/blob/main/LICENSE)

Uma aplicação para estudo de previsão do tempo que combina dados meteorológicos em tempo real com imagens dinâmicas baseadas nas condições climáticas.

---

## O que é e como funciona

O OpenWeather App é uma aplicação web que permite consultar a previsão do tempo de qualquer cidade do mundo. Ao realizar uma busca, o sistema:

1. Consulta a API do OpenWeatherMap para obter as condições climáticas atuais com base no nome da cidade.
2. Utiliza essas condições (como "clear", "rain", "snow", etc.) para realizar uma busca na API do Unsplash por imagens relacionadas ao clima e à cidade.
3. Ao iniciar, solicita permissão para acessar a localização do usuário via navegador, usando o serviço de geolocalização para converter coordenadas em nome da cidade automaticamente.
4. Exibe a previsão do tempo junto a uma imagem de fundo personalizada, que muda dinamicamente a cada nova pesquisa, garantindo uma experiência visual única e contextual.

Esse comportamento foi pensado para oferecer não apenas utilidade, mas também uma interface mais envolvente e visualmente agradável.

---

## Funcionalidades

- 🔍 Buscar clima atual por nome da cidade
- 📍 Utilização do nome da cidade na pesquisa de imagens
- ☀️ Exibir temperatura, umidade e descrição do clima
- 🖼️ Exibir imagens aleatórias relacionadas ao clima atual e à cidade
- 🔀 Geração aleatória de página e imagem a cada nova consulta
- 📡 Busca automática da localização do usuário ao iniciar a aplicação com conversão das coordenadas para nome da cidade via serviço de geolocalização

---

## Tecnologias Utilizadas

- React.js + Vite
- TailwindCSS para estilização
- Axios para requisições HTTP
- OpenWeatherMap API para dados meteorológicos
- Unsplash API para imagens contextuais
- Dotenv para variáveis de ambiente
- Serviço próprio para geolocalização reversa (`geolocationService.js`)

---

## Pré-requisitos

- Node.js 18+
- Git
- Conta e chave de API do:
  - OpenWeatherMap
  - Unsplash

---

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/MatheusLopesLemos/OpenWeather-API.git
cd OpenWeather-API
```

2. Instale as dependências:

```bash
npm install
```

3. Configure suas variáveis de ambiente:

Crie um arquivo `.env` com o seguinte conteúdo:

```env
VITE_OPENWEATHER_API_KEY=sua-chave-do-openweather
VITE_UNSPLASH_ACCESS_KEY=sua-chave-do-unsplash
```

4. Rode o projeto:

```bash
npm run dev
```

Acesse em: http://localhost:5173

---

## 📁 Estrutura do Projeto

```
src/
├── assets/
├── components/
├── pages/
│   └── Home/
│       └── Index.jsx
├── services/
│   ├── weatherService.js
│   ├── unsplashService.js
│   └── geolocationService.js
├── App.jsx
├── main.jsx
├── index.css
.gitignore
README.md
eslint.config.js
index.html
package-lock.json
package.json
postcss.config.js
.env
LICENSE
tailwind.config.js
vite.config.js
```

---

## Licença

Este projeto está licenciado sob a Licença MIT.  
Consulte o arquivo [LICENSE](https://github.com/MatheusLopesLemos/OpenWeather-API/blob/main/LICENSE) para mais informações.

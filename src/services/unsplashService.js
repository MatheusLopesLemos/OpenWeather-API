import axios from "axios";

const unsplashAccessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export const getImageByQuery = async (query) => {
  try {
    const perPage = 5; // máximo de imagens por página
    const maxPages = 10; // limite de páginas aleatórias

    // Escolhe uma página aleatória de 1 até maxPages
    const randomPage = Math.floor(Math.random() * maxPages) + 1;

    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        query,
        orientation: "landscape",
        per_page: perPage,
        page: randomPage,
      },
      headers: {
        Authorization: `Client-ID ${unsplashAccessKey}`,
      },
    });

    const results = response.data.results;

    if (results.length > 0) {
      // Seleciona aleatoriamente uma imagem entre as resultados da página
      const randomIndex = Math.floor(Math.random() * results.length);
      return results[randomIndex].urls.regular;
    }

    // fallback caso não encontre nenhuma imagem
    return null;
  } catch (error) {
    console.error("Erro ao buscar imagem no Unsplash:", error);
    return null;
  }
};

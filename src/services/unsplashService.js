import axios from "axios";

const unsplashAccessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export const getImageByQuery = async (query) => {
  try {
    const perPage = 5; // máximo de imagens por página
    const maxPages = 10; // limite de páginas aleatórias (ajuste conforme quiser)

    const randomPage = Math.floor(Math.random() * maxPages) + 1; // página aleatória entre 1 e 10

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

    if (response.data.results.length > 0) {
      const randomIndex = Math.floor(Math.random() * response.data.results.length);
      return response.data.results[randomIndex].urls.regular;
    }

    // fallback caso não ache imagem
    return null;
  } catch (error) {
    console.error("Erro ao buscar imagem no Unsplash:", error);
    return null;
  }
};

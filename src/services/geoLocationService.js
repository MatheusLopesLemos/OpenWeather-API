export const getCityFromCoords = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=pt`
    );
    const data = await response.json();
    console.log("Resposta da GeoAPI:", data);

    const isValid = (field) => typeof field === "string" && field.trim() !== "";

    return (
      (isValid(data.city) && data.city) ||
      (isValid(data.locality) && data.locality) ||
      (isValid(data.principalSubdivision) && data.principalSubdivision) ||
      (isValid(data.countryName) && data.countryName) ||
      "Rio de Janeiro"
    );
  } catch (error) {
    console.error("Erro ao obter cidade pela localização:", error);
    return "Rio de Janeiro";
  }
};

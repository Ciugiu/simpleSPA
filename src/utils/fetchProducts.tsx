import { apiUrl } from "./apiUrl";

export const fetchProducts = async () => {
  const uri = `${apiUrl}/api/products`;
  try {
    const response = await fetch(uri);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

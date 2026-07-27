import { useEffect, useState } from "react";
import { getAllProducts } from "../services/api";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllProducts()
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading };
};

export default useProducts;
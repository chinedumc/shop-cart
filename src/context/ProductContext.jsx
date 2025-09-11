import { useEffect, useState } from "react";
import { ProductContext } from "./ContextDefFile";

export function ProductProvider({ children }) {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const res = await fetch("/api/products");
				if (!res.ok) throw new Error("Failed to fetch data");
				const data = await res.json();
				// console.log(data);
				setProducts(data);
			} catch (err) {
				setError(err.message);
				// setLoading(false);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, []);

	return (
		<ProductContext.Provider value={{ products, loading, error }}>
			{children}
		</ProductContext.Provider>
	);
}

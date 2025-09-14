import { useState } from "react";
import { CartContext } from "./ContextDefFile";

export function CartProvider({ children }) {
	const [cart, setCart] = useState([]);

	const addToCart = (product) => {
		setCart((prev) => {
			const existing = prev.find((item) => item.id === product.id);

			if (existing) {
				return prev.map((item) =>
					item.id === product.id ? { ...item, qty: item.qty + 1 } : item
				);
			}

			return [...prev, { ...product, qty: 1 }];
		});
	};

	const removeFromCart = (id) => {
		setCart((prev) => prev.filter((item) => item.id !== id));
	};

	const reduceProductInCartByOne = (id) => {
		setCart((prev) => {
			const existing = prev.find((item) => item.id === id);

			if (existing) {
				// If quantity is 1, remove the item entirely
				if (existing.qty === 1) {
					return prev.filter((item) => item.id !== id);
				}

				// Otherwise, decrease quantity by 1
				return prev.map((item) =>
					item.id === id ? { ...item, qty: item.qty - 1 } : item
				);
			}

			// If item doesn't exist in cart, return cart unchanged
			return prev;
		});
	};

	const increaseProductInCartByOne = (id) => {
		setCart((prev) => {
			return prev.map((item) =>
				item.id === id ? { ...item, qty: item.qty + 1 } : item
			);
		});
	};

	const clearCart = () => {
		setCart([]);
	};

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
				removeFromCart,
				reduceProductInCartByOne,
				increaseProductInCartByOne,
				clearCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}

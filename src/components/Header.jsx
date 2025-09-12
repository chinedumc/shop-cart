import { FaShoppingCart } from "react-icons/fa";
import { useContext } from "react";
import { CartContext } from "../context/ContextDefFile";

const Header = () => {
	const { cart } = useContext(CartContext);
	const itemCount = cart.reduce((acc, item) => acc + item.qty, 0);
	return (
		<header className="bg-white shadow-md p-4 flex justify-between items-center">
			<h1 className="text-2xl font-bold text-blue-600">Shopper</h1>

			<div className="relative">
				<FaShoppingCart className="text-2xl text-gray-700" />
				{itemCount > 0 && (
					<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">{itemCount}</span>
				)}
			</div>
		</header>
	);
};

export default Header;

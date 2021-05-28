import React from "react";
import Product from "../../components/product/Product.js";
import { fetchAllProducts } from "../../api/index";
import "./HomePage.scss";

export default function HomePage() {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    const intializeProducts = async () => {
      const { data } = await fetchAllProducts();
      setProducts(data);
    };
    intializeProducts();
  }, []);

  return (
    <div className='container'>
      <div className='row row-cols-1 row-cols-md-3 row-cols-lg-4 justify-content-center'>
        {products.map((product, index) => (
          <Product key={product._id} {...product} />
        ))}
      </div>
    </div>
  );
}

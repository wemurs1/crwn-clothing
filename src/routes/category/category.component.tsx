import { useParams } from 'react-router-dom';
import { Fragment, useContext, useEffect, useState } from 'react';
import { CategoriesContext } from '../../contexts/categories.context';
import ProductCard from '../../components/product-card/product-card.component';
import { Product } from '../../models/product';
import { CategoryContainer, CategoryTitle } from './category.styles';

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState<Product[]>(
    categoriesMap[category as keyof typeof categoriesMap]
  );

  useEffect(() => {
    if (category)
      setProducts(categoriesMap[category as keyof typeof categoriesMap]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <CategoryTitle>{category?.toUpperCase()}</CategoryTitle>
      <CategoryContainer>
        {products &&
          products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
      </CategoryContainer>
    </Fragment>
  );
};

export default Category;

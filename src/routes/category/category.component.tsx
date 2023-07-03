import { useParams } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import ProductCard from '../../components/product-card/product-card.component';
import { Product } from '../../models/product';
import { CategoryContainer, CategoryTitle } from './category.styles';
import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from '../../store/categories/category.selector';
import { useSelector } from 'react-redux';
import Spinner from '../../components/spinner/spinner.component';

const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
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
      {isLoading ? (
        <Spinner />
      ) : (
        <CategoryContainer>
          {products &&
            products.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
        </CategoryContainer>
      )}
    </Fragment>
  );
};

export default Category;

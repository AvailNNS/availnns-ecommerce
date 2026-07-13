export const addDiscountPercentage = (product: any) => {
  const obj = product.toObject ? product.toObject() : product;

  const discountPercentage =
    obj.price > 0 && obj.discountPrice < obj.price
      ? Math.round(
          ((obj.price - obj.discountPrice) / obj.price) * 100
        )
      : 0;

  return {
    ...obj,
    discountPercentage,
  };
};

export const addDiscountPercentageToProducts = (
  products: any[]
) => {
  return products.map(addDiscountPercentage);
};
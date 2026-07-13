export const calculateDiscountPercentage = (
  price: number,
  discountPrice: number
): number => {
  if (!price || discountPrice >= price) return 0;

  return Math.round(
    ((price - discountPrice) / price) * 100
  );
};
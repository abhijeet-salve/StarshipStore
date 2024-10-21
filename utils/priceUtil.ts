const VAT = 0.05; // 5%

export const convertCreditsToAED = (credits: string) =>
  formatPrice(Number(credits) / 10000);

export const formatPrice = (price: number) => price.toFixed(2);

export const getVatAmount = (price: number) => price * VAT;

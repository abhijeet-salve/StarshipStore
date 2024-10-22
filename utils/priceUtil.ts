const VAT = 0.05; // 5%

export const convertCreditsToAED = (credits: string) => {
  const aedValue = Number(credits) / 10000;
  return Math.floor(aedValue * 100) / 100;
};

export const formatPrice = (price: number) => price.toFixed(2);

export const getVatAmount = (price: number) => price * VAT;

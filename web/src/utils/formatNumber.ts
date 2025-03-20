export function formatNumberToBRL(num: number) {
  return num.toLocaleString("pt-BR", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });
}

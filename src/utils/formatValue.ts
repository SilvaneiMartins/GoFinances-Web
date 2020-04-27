/*
* Desenvolvedor: Silvanei Martins;
* Email: silvaneimartins_rcc@hotmail.com;
* WhatsApp: (69) 9.8405-2620;
* Desafio 07: GoFinances Web;
*/
const formatValue = (value: number): string => {
  return `${Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    currencyDisplay: 'symbol',
  }).format(value)}`;
};

export default formatValue;


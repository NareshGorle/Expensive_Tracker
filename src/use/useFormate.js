export function useFormate(amount){
    // const posNegsymobols = amount < 0 ? '-' : '+';

    let posNegSymobols = ''
    if(amount > 0){posNegSymobols = '+'}
    else if(amount <0){ posNegSymobols = '-'}
    

    const positiveAmount = Math.abs(amount);

    const amountFormatted = positiveAmount.
           toLocaleString('en-IN', {
           minimumFractionDigits : 2,
           maximumFractionDigits:2
   })

   return `${posNegSymobols} ${amountFormatted}`
}
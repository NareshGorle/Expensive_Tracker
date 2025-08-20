export function usePosNegColors(amount){
    // const posNegsymobols = amount < 0 ? '-' : '+';

    if(amount>0) return 'text-positive'
    else if (amount<0) return 'text-negative'
    else return 'text-grey-6'
}
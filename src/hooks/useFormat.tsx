import React from 'react'

const useFormat = (amount: number) => {
   return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export default useFormat;

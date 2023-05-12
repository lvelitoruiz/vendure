import React from 'react';

interface TotalType {
  total: number;
  setTotal: (total: number) => void;
}

export const TotalContext = React.createContext<TotalType>({
  total: 0,
  setTotal: () => {},
});

export const useTotal = () => React.useContext(TotalContext);

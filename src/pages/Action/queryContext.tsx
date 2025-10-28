import React from 'react';
import { paramsAllData } from './types';

interface QueryContextProp {
  paramsAllData: paramsAllData;
  setParamsAllData: (paramsAllData: paramsAllData) => void;
}

export const QueryContext = React.createContext<QueryContextProp>(
  {} as QueryContextProp,
);

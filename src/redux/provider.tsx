"use client"
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

interface IReduxProvider {
  children: React.ReactNode;
}

const ReduxStoreProvider: React.FC<IReduxProvider> = ({ children }: IReduxProvider) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default ReduxStoreProvider;


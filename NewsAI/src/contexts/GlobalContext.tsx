import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React, {PropsWithChildren} from 'react';
import {TopicProvider} from './TopicProvider';

const queryClient = new QueryClient();

// GlobalContexts component
export const GlobalContext: React.FC<PropsWithChildren<{}>> = ({children}) => (
  <QueryClientProvider client={queryClient}>
    <TopicProvider>{children}</TopicProvider>
  </QueryClientProvider>
);

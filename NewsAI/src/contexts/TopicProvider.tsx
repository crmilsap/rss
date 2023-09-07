import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react';
interface TopicContextState {
  selectedId: number | null;
  setSelectedId: React.Dispatch<
    React.SetStateAction<TopicContextState['selectedId']>
  >;
}

const defaultTopicContext: TopicContextState = {
  selectedId: null,
  setSelectedId: () => {},
};

const TopicContext = createContext(defaultTopicContext);

export const useTopicsState = () => {
  const context = useContext(TopicContext);
  if (!context) {
    throw new Error('useTopics must be used within a TopicProvider');
  }
  return context;
};

export const TopicProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [selectedId, setSelectedId] = useState<TopicContextState['selectedId']>(
    defaultTopicContext.selectedId,
  ); // Replace with your initial state and setter
  return (
    <TopicContext.Provider value={{selectedId, setSelectedId}}>
      {children}
    </TopicContext.Provider>
  );
};

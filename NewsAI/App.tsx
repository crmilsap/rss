/**
 * NewsAI React-Native App
 * @format prettier
 */

import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ArticleContent} from './src/components/ArticleContentAnimated';
import ArticleList from './src/components/ArticleList';
import {GlobalContext} from './src/contexts/GlobalContext';
import {RootStackParamList} from './src/navigation';
import ErrorBoundary from './src/components/ErrorBoundary';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <GlobalContext>
      <GestureHandlerRootView style={[{flex: 1}, backgroundStyle]}>
        <NavigationContainer>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <Stack.Navigator initialRouteName="ArticleList">
            <Stack.Screen
              name="ArticleList"
              component={ArticleList}
              options={{headerShown: false}}
            />
            <Stack.Screen name="ArticleContent" component={ArticleContent} />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </GlobalContext>
  );
};

export default App;

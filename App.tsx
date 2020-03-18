import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

import { PostsScreen } from './src/PostsScreen';

type TabParamList = {
  New: undefined;
  Top: undefined;
  Hot: undefined;
  Controversial: undefined;
}

const Tab = createBottomTabNavigator<TabParamList>();

const NewScreen = () => <PostsScreen sort="new" />;
const TopScreen = () => <PostsScreen sort="top" />;
const HotScreen = () => <PostsScreen sort="hot" />;
const ControversialScreen = () => <PostsScreen sort="controversial" />;

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>{/* Rest of your app code */}
        <Tab.Navigator>
          <Tab.Screen 
            name="New" 
            component={NewScreen} 
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
            }}
          />

          <Tab.Screen 
            name="Top"
            component={TopScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="arrow-up" color={color} size={size} />
              ),
            }}
          />
          
          <Tab.Screen
            name="Hot"
            component={HotScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="fire" color={color} size={size} />
              ),
            }}
          />
          
          <Tab.Screen 
            name="Controversial" 
            component={ControversialScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="warning" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
        
      </NavigationContainer>
    </>
  )
}
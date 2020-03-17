import React from 'react';
import { StatusBar } from 'react-native';

import { PostsScreen } from './src/PostsScreen';


export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <PostsScreen />
    </>
  )
}
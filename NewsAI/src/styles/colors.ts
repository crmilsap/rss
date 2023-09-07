import {StyleSheet} from 'react-native';

export const colors = StyleSheet.create({
  // Color Variables
  black: {
    color: '#222627',
  },
  jet: {
    color: '#2D2E2E',
  },
  coolGray: {
    color: '#7D8CA3',
  },
  parchment: {
    color: '#F4E9CD',
  },
  white: {
    color: '#FBFBFB',
  },

  // Background Color Classes
  bgBlack: {
    backgroundColor: '#222627',
  },
  bgJet: {
    backgroundColor: '#2D2E2E',
  },
  bgCoolGray: {
    backgroundColor: '#7D8CA3',
  },
  bgParchment: {
    backgroundColor: '#F4E9CD',
  },
  bgWhite: {
    backgroundColor: '#FBFBFB',
  },

  // Additional Style Classes
  // For example, you might have a 'card' style that uses Cool Gray and Parchment
  card: {
    backgroundColor: '#F4E9CD',
    borderColor: '#7D8CA3',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },

  // Maybe you have a 'header' style that uses Jet and White
  header: {
    backgroundColor: '#2D2E2E',
    padding: 16,
  },
  headerText: {
    color: '#FBFBFB',
    fontSize: 18,
  },
});

export default colors;

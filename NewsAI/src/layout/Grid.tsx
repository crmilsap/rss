import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';

interface GridProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const Grid: React.FC<GridProps> = ({children, style}) => {
  return <View style={[styles.grid, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default Grid;

import React from 'react';
import {View, StyleSheet} from 'react-native';

interface RowProps {
  children: React.ReactNode;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
}

const Row: React.FC<RowProps> = ({
  children,
  justifyContent = 'flex-start',
  alignItems = 'stretch',
}) => {
  return (
    <View style={{...styles.row, justifyContent, alignItems}}>{children}</View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // paddingHorizontal: 8, // Optional, for outer gutters
    // marginBottom: 16, // Optional, for vertical spacing between rows
  },
});

export default Row;

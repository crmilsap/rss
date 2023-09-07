import React, {PropsWithChildren, useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, StyleProp, ViewStyle} from 'react-native';

type ColWidths = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

interface ColProps extends PropsWithChildren {
  xs?: ColWidths;
  sm?: ColWidths;
  md?: ColWidths;
  lg?: ColWidths;
  xl?: ColWidths;
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around';
  styles?: StyleProp<ViewStyle>;
  gutter?: boolean;
}

const Col: React.FC<ColProps> = props => {
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get('window').width,
  );
  const [width, setWidth] = useState<ColWidths | undefined>(props.xs);

  useEffect(() => {
    const updateWidth = () => {
      const newScreenWidth = Dimensions.get('window').width;
      setScreenWidth(newScreenWidth);
    };

    const subscription = Dimensions.addEventListener('change', updateWidth);

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (screenWidth < breakpoints.xs) {
      setWidth(props.xs);
    } else if (screenWidth < breakpoints.sm) {
      setWidth(props.sm ?? props.xs);
    } else if (screenWidth < breakpoints.md) {
      setWidth(props.md ?? props.sm ?? props.xs);
    } else if (screenWidth < breakpoints.lg) {
      setWidth(props.lg ?? props.md ?? props.sm ?? props.xs);
    } else {
      setWidth(props.xl ?? props.lg ?? props.md ?? props.sm ?? props.xs);
    }
  }, [props, screenWidth]);

  const colWidth = (width ? width / 12 : 1) * 100;

  return (
    <View
      style={[
        {
          width: `${colWidth}%`,
          alignItems: props.alignItems,
          justifyContent: props.justifyContent,
        },
        props.gutter ? styles.gutter : {},
        props.styles,
      ]}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  gutter: {
    paddingHorizontal: 8, // Optional, for gutters
  },
});

export default Col;

import {StyleSheet} from 'react-native';

type StyleSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type Direction = 't' | 'b' | 'l' | 'r';
type DirectionMap = Record<Direction, 'Top' | 'Bottom' | 'Left' | 'Right'>;
type Styles = Record<string, {[key: string]: number}>;

const styleSizes: Record<StyleSize, number> = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
};

const directionMap: DirectionMap = {
  t: 'Top',
  b: 'Bottom',
  l: 'Left',
  r: 'Right',
};

const generateStyles = (
  sizes: Record<StyleSize, number>,
  attribute: 'padding' | 'margin',
): Styles => {
  const styles: Styles = {};
  Object.keys(directionMap).forEach(direction => {
    Object.keys(sizes).forEach(size => {
      const key = `${attribute[0]}${direction}-${size}`; // e.g., 'pt-sm'
      const value = {
        [`${attribute}${directionMap[direction as Direction]}`]:
          sizes[size as StyleSize],
      };
      styles[key] = value;
    });
  });
  return styles;
};

export const marginStyles = StyleSheet.create(
  generateStyles(styleSizes, 'margin'),
);
export const paddingStyles = StyleSheet.create(
  generateStyles(styleSizes, 'padding'),
);

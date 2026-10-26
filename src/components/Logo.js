import React from 'react';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../theme';

// shape="square" => green rounded square (splash); "circle" => navy circle (welcome)
export default function Logo({ size = 64, shape = 'square' }) {
  const isCircle = shape === 'circle';
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: isCircle ? size / 2 : size * 0.28,
        backgroundColor: isCircle ? colors.navy : colors.mint,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Feather name="book-open" size={size * 0.5} color={isCircle ? colors.white : colors.navy} />
    </View>
  );
}

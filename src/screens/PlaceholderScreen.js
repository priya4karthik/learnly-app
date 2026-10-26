import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '../theme';

export default function PlaceholderScreen({ route }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg }}>
      <Text style={{ color: colors.muted }}>{route.name} — coming soon</Text>
    </View>
  );
}

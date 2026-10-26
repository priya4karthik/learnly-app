import React from 'react';
import { Pressable, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '../theme';

export default function PrimaryButton({ title, onPress, style, loading = false, disabled = false }) {
  const off = loading || disabled;
  return (
    <Pressable
      onPress={onPress}
      disabled={off}
      style={({ pressed }) => [styles.btn, (pressed || off) && { opacity: 0.6 }, style]}
    >
      {loading ? <ActivityIndicator color={colors.white} /> : <Text style={styles.text}>{title}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: { backgroundColor: colors.navy, borderRadius: 10, paddingVertical: 14, alignItems: 'center' },
  text: { color: colors.white, fontSize: 15, fontWeight: '600' },
});

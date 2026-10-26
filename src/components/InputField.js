import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../theme';

export default function InputField({ label, error, secure, style, ...props }) {
  const [hidden, setHidden] = useState(!!secure);
  const [focused, setFocused] = useState(false);

  return (
    <View style={style}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.box,
          focused && { borderColor: colors.navy },
          !!error && { borderColor: colors.error },
        ]}
      >
        <TextInput
          {...props}
          style={styles.input}
          secureTextEntry={hidden}
          placeholderTextColor={colors.muted}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            props.onBlur && props.onBlur(e);
          }}
          accessibilityLabel={label}
        />
        {secure && (
          <Pressable onPress={() => setHidden((h) => !h)} hitSlop={10}>
            <Feather name={hidden ? 'eye-off' : 'eye'} size={18} color={colors.muted} />
          </Pressable>
        )}
      </View>
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 12, fontWeight: '600', color: colors.text, marginBottom: 6 },
  box: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white,
    borderWidth: 1, borderColor: colors.border, borderRadius: 8, paddingHorizontal: 12,
  },
  input: { flex: 1, paddingVertical: 10, fontSize: 14, color: colors.text },
  error: { color: colors.error, fontSize: 11, marginTop: 4 },
});

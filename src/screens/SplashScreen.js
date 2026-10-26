import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Logo from '../components/Logo';
import { colors } from '../theme';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const t = setTimeout(() => navigation.replace('Welcome'), 2000);
    return () => clearTimeout(t);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.ring}>
        <Logo size={64} />
        <Text style={styles.title}>Learnly</Text>
        <Text style={styles.tag}>Learn something new, every day</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.navy, alignItems: 'center', justifyContent: 'center' },
  ring: {
    width: 280, height: 280, borderRadius: 140,
    borderWidth: 1, borderColor: colors.mint,
    alignItems: 'center', justifyContent: 'center',
  },
  title: { color: colors.white, fontSize: 24, marginTop: 14 },
  tag: { color: '#B8C0DA', fontSize: 11, marginTop: 6 },
});

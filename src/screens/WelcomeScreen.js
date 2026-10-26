import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../components/Logo';
import PrimaryButton from '../components/PrimaryButton';
import { colors } from '../theme';

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.brand}>Learnly</Text>
        <View style={{ marginVertical: 28 }}>
          <Logo size={72} shape="circle" />
        </View>
        <Text style={styles.headline}>Learn something new, every day</Text>
        <Text style={styles.sub}>Bite-sized lessons that fit your day.</Text>
      </View>

      <View style={styles.bottom}>
        <PrimaryButton title="Get started" onPress={() => navigation.navigate('Login')} />
        <Pressable onPress={() => navigation.navigate('Login')} style={{ marginTop: 22 }}>
          <Text style={styles.link}>I already have an account</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 20 },
  card: {
    backgroundColor: colors.mintLight, borderRadius: 16, paddingVertical: 48, paddingHorizontal: 20,
    alignItems: 'center',
  },
  brand: { fontSize: 20, fontWeight: '700', color: colors.navy },
  headline: { fontSize: 17, color: colors.text, textAlign: 'center' },
  sub: { fontSize: 12, color: colors.muted, marginTop: 10 },
  bottom: { marginTop: 'auto', alignItems: 'stretch', paddingBottom: 16 },
  link: { textAlign: 'center', color: colors.text, fontSize: 14 },
});

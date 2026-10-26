import React, { useState } from 'react';
import { Text, Pressable, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import { validateEmail, validateLoginPassword, hasErrors } from '../utils/validators';
import { colors } from '../theme';

const validators = {
  email: (v) => validateEmail(v),
  password: (v) => validateLoginPassword(v),
};

export default function LoginScreen({ navigation }) {
  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [loading, setLoading] = useState(false);

  const setField = (field, text) => {
    setValues((v) => ({ ...v, [field]: text }));
    // once a field has been touched, re-validate live as the user types
    if (touched[field]) setErrors((e) => ({ ...e, [field]: validators[field](text) }));
  };

  const blurField = (field) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors((e) => ({ ...e, [field]: validators[field](values[field]) }));
  };

  const onLogin = async () => {
    const next = {
      email: validators.email(values.email),
      password: validators.password(values.password),
    };
    setErrors(next);
    setTouched({ email: true, password: true });
    if (hasErrors(next)) return;

    try {
      setLoading(true);
      // TODO: replace with your Django/DRF login call, e.g.
      // const res = await fetch(`${API_URL}/api/auth/login/`, {...});
      await new Promise((r) => setTimeout(r, 800)); // simulated network
      navigation.replace('Main');
    } catch (err) {
      Alert.alert('Login failed', 'Please check your email and password and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.sub}>Log in to continue learning</Text>

          <InputField
            label="Email:" value={values.email} onChangeText={(t) => setField('email', t)}
            onBlur={() => blurField('email')} error={touched.email ? errors.email : ''}
            placeholder="name@company.com" autoCapitalize="none" autoCorrect={false}
            keyboardType="email-address" style={{ marginBottom: 14 }}
          />
          <InputField
            label="Password:" value={values.password} onChangeText={(t) => setField('password', t)}
            onBlur={() => blurField('password')} error={touched.password ? errors.password : ''}
            placeholder="••••••••" secure autoCapitalize="none"
            onSubmitEditing={onLogin} returnKeyType="done"
          />

          <Pressable onPress={() => Alert.alert('Forgot password', 'Hook this up to your reset flow.')}>
            <Text style={styles.forgot}>Forgot password?</Text>
          </Pressable>

          <PrimaryButton title="Login" onPress={onLogin} loading={loading} />

          <Pressable style={{ marginTop: 22 }} onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signup}>New Here? Sign up</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  scroll: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24 },
  title: { fontSize: 20, fontWeight: '700', color: colors.text },
  sub: { fontSize: 11, color: colors.muted, marginTop: 4, marginBottom: 28 },
  forgot: { textAlign: 'center', fontSize: 12, color: colors.text, marginVertical: 16 },
  signup: { textAlign: 'center', fontSize: 12, color: colors.text },
});

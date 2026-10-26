import React, { useState } from 'react';
import { Text, Pressable, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import {
  validateName, validateEmail, validateNewPassword, validateConfirm, hasErrors,
} from '../utils/validators';
import { colors } from '../theme';

const run = {
  name: (v) => validateName(v.name),
  email: (v) => validateEmail(v.email),
  password: (v) => validateNewPassword(v.password),
  confirm: (v) => validateConfirm(v.password, v.confirm),
};
const FIELDS = Object.keys(run);
const empty = () => Object.fromEntries(FIELDS.map((f) => [f, '']));
const noTouch = () => Object.fromEntries(FIELDS.map((f) => [f, false]));

export default function SignupScreen({ navigation }) {
  const [values, setValues] = useState(empty());
  const [errors, setErrors] = useState(empty());
  const [touched, setTouched] = useState(noTouch());
  const [loading, setLoading] = useState(false);

  const setField = (field, text) => {
    const nextValues = { ...values, [field]: text };
    setValues(nextValues);
    setErrors((e) => {
      const next = { ...e };
      if (touched[field]) next[field] = run[field](nextValues);
      // keep "confirm" in sync when the password changes
      if (field === 'password' && touched.confirm) next.confirm = run.confirm(nextValues);
      return next;
    });
  };

  const blurField = (field) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors((e) => ({ ...e, [field]: run[field](values) }));
  };

  const onSignup = async () => {
    const next = Object.fromEntries(FIELDS.map((f) => [f, run[f](values)]));
    setErrors(next);
    setTouched(Object.fromEntries(FIELDS.map((f) => [f, true])));
    if (hasErrors(next)) return;

    try {
      setLoading(true);
      // TODO: POST to your register endpoint
      await new Promise((r) => setTimeout(r, 800));
      Alert.alert('Account created', 'You can now log in.', [
        { text: 'OK', onPress: () => navigation.replace('Login') },
      ]);
    } catch (err) {
      Alert.alert('Sign up failed', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const show = (f) => (touched[f] ? errors[f] : '');

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Create account</Text>
          <Text style={styles.sub}>Start learning in minutes</Text>

          <InputField label="Name:" value={values.name} onChangeText={(t) => setField('name', t)}
            onBlur={() => blurField('name')} error={show('name')} placeholder="Your name"
            style={styles.field} />
          <InputField label="Email:" value={values.email} onChangeText={(t) => setField('email', t)}
            onBlur={() => blurField('email')} error={show('email')} placeholder="name@company.com"
            autoCapitalize="none" autoCorrect={false} keyboardType="email-address" style={styles.field} />
          <InputField label="Password:" value={values.password} onChangeText={(t) => setField('password', t)}
            onBlur={() => blurField('password')} error={show('password')} placeholder="8+ characters"
            secure autoCapitalize="none" style={styles.field} />
          <InputField label="Confirm password:" value={values.confirm} onChangeText={(t) => setField('confirm', t)}
            onBlur={() => blurField('confirm')} error={show('confirm')} placeholder="Re-enter password"
            secure autoCapitalize="none" style={{ marginBottom: 22 }} />

          <PrimaryButton title="Sign up" onPress={onSignup} loading={loading} />

          <Pressable style={{ marginTop: 22 }} onPress={() => navigation.goBack()}>
            <Text style={styles.link}>Already have an account? Log in</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  scroll: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 24 },
  title: { fontSize: 20, fontWeight: '700', color: colors.text },
  sub: { fontSize: 11, color: colors.muted, marginTop: 4, marginBottom: 24 },
  field: { marginBottom: 14 },
  link: { textAlign: 'center', fontSize: 12, color: colors.text },
});

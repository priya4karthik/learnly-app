import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme';

const CATEGORIES = ['Coding', 'Math', 'Design'];
const RECOMMENDED = [
  { id: '1', title: 'React Basics', lessons: 12 },
  { id: '2', title: 'Django', lessons: 12 },
];

export default function HomeScreen() {
  const [category, setCategory] = useState('Coding');
  const progress = 65;
  const minsDone = 20;
  const minsGoal = 30;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={{ padding: 18 }}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning</Text>
            <Text style={styles.sub}>Hi Banu, Ready to learn?</Text>
          </View>
          <View style={styles.avatar}><Text style={styles.avatarText}>B</Text></View>
        </View>

        {/* Continue learning */}
        <View style={styles.continueCard}>
          <Text style={styles.contLabel}>Continue Learning</Text>
          <Text style={styles.contTitle}>Python Basics</Text>
          <View style={styles.track}>
            <View style={[styles.fill, { width: `${progress}%` }]} />
          </View>
          <View style={styles.contFooter}>
            <Text style={styles.contDone}>{progress}% done</Text>
            <Pressable style={styles.resume}><Text style={styles.resumeText}>Resume</Text></Pressable>
          </View>
        </View>

        {/* Daily goal */}
        <View style={styles.goalCard}>
          <View style={styles.goalRing} />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.goalTitle}>Daily Goal</Text>
            <Text style={styles.goalSub}>{minsDone} of {minsGoal} mins</Text>
          </View>
        </View>

        {/* Category chips */}
        <View style={styles.chips}>
          {CATEGORIES.map((c) => (
            <Pressable key={c} onPress={() => setCategory(c)}
              style={[styles.chip, category === c && styles.chipActive]}>
              <Text style={[styles.chipText, category === c && { fontWeight: '600' }]}>{c}</Text>
            </Pressable>
          ))}
        </View>

        {/* Recommended */}
        <Text style={styles.sectionTitle}>Recommended</Text>
        <View style={styles.recRow}>
          {RECOMMENDED.map((r) => (
            <View key={r.id} style={styles.recCard}>
              <View style={styles.recInner}>
                <Text style={styles.recTitle}>{r.title}</Text>
                <Text style={styles.recSub}>{r.lessons} lessons</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  greeting: { fontSize: 15, fontWeight: '700', color: colors.text },
  sub: { fontSize: 12, color: colors.text, marginTop: 4 },
  avatar: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.navy, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: colors.white, fontSize: 11, fontWeight: '600' },

  continueCard: { backgroundColor: colors.navy, borderRadius: 12, padding: 14, marginTop: 18 },
  contLabel: { color: '#8D97B8', fontSize: 11 },
  contTitle: { color: colors.white, fontSize: 13, fontWeight: '600', marginTop: 6 },
  track: { height: 5, borderRadius: 3, backgroundColor: '#2A3760', marginTop: 10, overflow: 'hidden' },
  fill: { height: '100%', backgroundColor: colors.gold },
  contFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
  contDone: { color: '#8D97B8', fontSize: 10 },
  resume: { backgroundColor: colors.white, borderRadius: 14, paddingHorizontal: 16, paddingVertical: 6 },
  resumeText: { fontSize: 11, fontWeight: '600', color: colors.text },

  goalCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white,
    borderRadius: 12, padding: 12, marginTop: 18,
  },
  goalRing: { width: 28, height: 28, borderRadius: 14, borderWidth: 3, borderColor: colors.mint },
  goalTitle: { fontSize: 11, color: colors.text },
  goalSub: { fontSize: 12, fontWeight: '600', color: colors.text, marginTop: 2 },

  chips: { flexDirection: 'row', marginTop: 12 },
  chip: {
    backgroundColor: colors.white, borderRadius: 14, paddingHorizontal: 18, paddingVertical: 7,
    marginRight: 8, borderWidth: 1, borderColor: colors.border,
  },
  chipActive: { borderColor: colors.navy },
  chipText: { fontSize: 11, color: colors.text },

  sectionTitle: { fontSize: 12, fontWeight: '700', color: colors.text, marginTop: 22, marginBottom: 10 },
  recRow: { flexDirection: 'row', gap: 12 },
  recCard: { flex: 1, backgroundColor: colors.white, borderRadius: 12, padding: 8, height: 130 },
  recInner: { backgroundColor: colors.mintLight, borderRadius: 8, padding: 10, alignItems: 'center' },
  recTitle: { fontSize: 11, fontWeight: '600', color: colors.text },
  recSub: { fontSize: 10, color: colors.muted, marginTop: 6 },
});

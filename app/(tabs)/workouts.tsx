import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Dumbbell, Clock, Target } from 'lucide-react-native';

const workouts = [
  { id: '1', name: 'Full Body Strength', duration: '45 min', difficulty: 'Intermediate', calories: 350 },
  { id: '2', name: 'HIIT Cardio', duration: '30 min', difficulty: 'Advanced', calories: 400 },
  { id: '3', name: 'Upper Body Focus', duration: '40 min', difficulty: 'Beginner', calories: 280 },
  { id: '4', name: 'Core & Abs', duration: '25 min', difficulty: 'Intermediate', calories: 200 },
];

export default function WorkoutsScreen() {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return '#34C759';
      case 'Intermediate':
        return '#FFD700';
      case 'Advanced':
        return '#ff3b30';
      default:
        return '#999';
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a1a1a', '#0d0d0d']}
        style={styles.gradient}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Your Workouts</Text>
            <Text style={styles.subtitle}>Choose a workout to get started</Text>
          </View>

          <View style={styles.workoutsContainer}>
            {workouts.map((workout) => (
              <TouchableOpacity
                key={workout.id}
                style={styles.workoutCard}
                activeOpacity={0.8}
              >
                <View style={styles.workoutHeader}>
                  <View style={styles.workoutIconContainer}>
                    <Dumbbell size={24} color="#ff3b30" />
                  </View>
                  <View style={styles.workoutInfo}>
                    <Text style={styles.workoutName}>{workout.name}</Text>
                    <View
                      style={[
                        styles.difficultyBadge,
                        { backgroundColor: getDifficultyColor(workout.difficulty) + '20' },
                      ]}
                    >
                      <Text
                        style={[
                          styles.difficultyText,
                          { color: getDifficultyColor(workout.difficulty) },
                        ]}
                      >
                        {workout.difficulty}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.workoutStats}>
                  <View style={styles.statItem}>
                    <Clock size={16} color="#999" />
                    <Text style={styles.statText}>{workout.duration}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Target size={16} color="#999" />
                    <Text style={styles.statText}>{workout.calories} cal</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  header: {
    padding: 24,
    paddingTop: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700' as const,
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
  },
  workoutsContainer: {
    paddingHorizontal: 24,
  },
  workoutCard: {
    backgroundColor: '#1f1f1f',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  workoutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  workoutIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutName: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#fff',
    marginBottom: 8,
  },
  difficultyBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600' as const,
  },
  workoutStats: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 14,
    color: '#999',
  },
});

import React from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { useAuth } from "@/contexts/auth";
import { LinearGradient } from "expo-linear-gradient";
import { Flame, Zap, TrendingUp, Award } from "lucide-react-native";

export default function HomeScreen() {
  const { user } = useAuth();

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
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.name}>{user?.name}!</Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <Flame size={24} color="#ff3b30" />
              </View>
              <Text style={styles.statValue}>1,247</Text>
              <Text style={styles.statLabel}>Calories</Text>
            </View>

            <View style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <Zap size={24} color="#FFD700" />
              </View>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Workouts</Text>
            </View>

            <View style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <TrendingUp size={24} color="#34C759" />
              </View>
              <Text style={styles.statValue}>8.5</Text>
              <Text style={styles.statLabel}>Hours</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Today's Goal</Text>
            <View style={styles.goalCard}>
              <LinearGradient
                colors={['#ff3b30', '#d32f2f']}
                style={styles.goalGradient}
              >
                <Award size={32} color="#fff" />
                <View style={styles.goalContent}>
                  <Text style={styles.goalTitle}>Complete 30 min workout</Text>
                  <Text style={styles.goalSubtitle}>You're 60% there!</Text>
                </View>
              </LinearGradient>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <TouchableOpacity style={styles.actionCard} activeOpacity={0.8}>
              <Text style={styles.actionTitle}>Start Workout</Text>
              <Text style={styles.actionSubtitle}>Begin your training session</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard} activeOpacity={0.8}>
              <Text style={styles.actionTitle}>Book a Class</Text>
              <Text style={styles.actionSubtitle}>Reserve your spot</Text>
            </TouchableOpacity>
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
  greeting: {
    fontSize: 16,
    color: "#999",
    marginBottom: 4,
  },
  name: {
    fontSize: 32,
    fontWeight: "700" as const,
    color: "#fff",
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#1f1f1f",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: "#fff",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#999",
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: "#fff",
    marginBottom: 16,
  },
  goalCard: {
    borderRadius: 16,
    overflow: "hidden",
  },
  goalGradient: {
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
    gap: 16,
  },
  goalContent: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: "600" as const,
    color: "#fff",
    marginBottom: 4,
  },
  goalSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
  },
  actionCard: {
    backgroundColor: "#1f1f1f",
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#333",
  },
  actionTitle: {
    fontSize: 17,
    fontWeight: "600" as const,
    color: "#fff",
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 14,
    color: "#999",
  },
});

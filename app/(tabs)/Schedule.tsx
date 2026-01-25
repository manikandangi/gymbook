import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, Clock, Users } from 'lucide-react-native';

const classes = [
  { id: '1', name: 'Yoga Flow', time: '9:00 AM', instructor: 'Sarah Smith', spots: 5 },
  { id: '2', name: 'Spin Class', time: '10:30 AM', instructor: 'Mike Johnson', spots: 3 },
  { id: '3', name: 'Boxing', time: '2:00 PM', instructor: 'David Lee', spots: 8 },
  { id: '4', name: 'Pilates', time: '4:30 PM', instructor: 'Emma Wilson', spots: 2 },
];

export default function ScheduleScreen() {
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
            <Text style={styles.title}>Class Schedule</Text>
            <Text style={styles.subtitle}>Book your spot today</Text>
          </View>

          <View style={styles.dateSelector}>
            <TouchableOpacity style={[styles.dateCard, styles.dateCardActive]} activeOpacity={0.8}>
              <Text style={styles.dateDayActive}>MON</Text>
              <Text style={styles.dateNumberActive}>15</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dateCard} activeOpacity={0.8}>
              <Text style={styles.dateDay}>TUE</Text>
              <Text style={styles.dateNumber}>16</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dateCard} activeOpacity={0.8}>
              <Text style={styles.dateDay}>WED</Text>
              <Text style={styles.dateNumber}>17</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dateCard} activeOpacity={0.8}>
              <Text style={styles.dateDay}>THU</Text>
              <Text style={styles.dateNumber}>18</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.classesContainer}>
            {classes.map((classItem) => (
              <TouchableOpacity
                key={classItem.id}
                style={styles.classCard}
                activeOpacity={0.8}
              >
                <View style={styles.classHeader}>
                  <View style={styles.classIconContainer}>
                    <Calendar size={24} color="#ff3b30" />
                  </View>
                  <View style={styles.classInfo}>
                    <Text style={styles.className}>{classItem.name}</Text>
                    <Text style={styles.instructorName}>{classItem.instructor}</Text>
                  </View>
                </View>

                <View style={styles.classDetails}>
                  <View style={styles.detailItem}>
                    <Clock size={16} color="#999" />
                    <Text style={styles.detailText}>{classItem.time}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Users size={16} color="#999" />
                    <Text style={styles.detailText}>{classItem.spots} spots left</Text>
                  </View>
                </View>

                <TouchableOpacity style={styles.bookButton} activeOpacity={0.8}>
                  <Text style={styles.bookButtonText}>Book Now</Text>
                </TouchableOpacity>
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
  dateSelector: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 24,
  },
  dateCard: {
    flex: 1,
    backgroundColor: '#1f1f1f',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  dateCardActive: {
    backgroundColor: '#ff3b30',
    borderColor: '#ff3b30',
  },
  dateDay: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
    fontWeight: '600' as const,
  },
  dateDayActive: {
    fontSize: 12,
    color: '#fff',
    marginBottom: 4,
    fontWeight: '600' as const,
  },
  dateNumber: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: '#fff',
  },
  dateNumberActive: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: '#fff',
  },
  classesContainer: {
    paddingHorizontal: 24,
  },
  classCard: {
    backgroundColor: '#1f1f1f',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  classHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  classIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  classInfo: {
    flex: 1,
  },
  className: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#fff',
    marginBottom: 4,
  },
  instructorName: {
    fontSize: 14,
    color: '#999',
  },
  classDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 14,
    color: '#999',
  },
  bookButton: {
    backgroundColor: '#ff3b30',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600' as const,
  },
});

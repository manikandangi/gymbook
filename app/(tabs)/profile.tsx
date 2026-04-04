import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import {
  Calendar,
  ChevronRight,
  Crown,
  LogOut,
  Mail,
  Phone,
  User,
} from 'lucide-react-native';
import React, { useState, useEffect } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getUserId = async () => {
      const id = await AsyncStorage.getItem('userid');
      setUserId(id);
    };
    getUserId();
  }, []);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('userid');
            router.replace('/login');
          },
        },
      ]
    );
  };

  if (!userId) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const getMembershipColor = () => {
    switch (user.membershipType) {
      case 'vip':
        return '#FFD700';
      case 'premium':
        return '#ff3b30';
      case 'basic':
        return '#999';
      default:
        return '#999';
    }
  };

  const getMembershipLabel = () => {
    return user.membershipType.charAt(0).toUpperCase() + user.membershipType.slice(1);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <User size={48} color="#fff" strokeWidth={2} />
          </View>
          <Text style={styles.name}>Gym Admin</Text>
          <View style={styles.membershipBadge}>
            <Crown size={16} color="#FFD700" />
            <Text style={[styles.membershipText, { color: "#FFD700" }]}>
              Administrator
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Information</Text>
          
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoIconContainer}>
                <User size={20} color="#ff3b30" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>User ID</Text>
                <Text style={styles.infoValue}>{userId}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={20} color="#fff" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
            
            <View style={styles.membershipCard}>
              <LinearGradient
                colors={[getMembershipColor() + '20', getMembershipColor() + '10']}
                style={styles.membershipCardGradient}
              >
                <View style={styles.membershipCardHeader}>
                  <Crown size={32} color={getMembershipColor()} />
                  <Text style={styles.membershipCardTitle}>
                    {getMembershipLabel()} Membership
                  </Text>
                </View>
                <Text style={styles.membershipCardDescription}>
                  {user.membershipType === 'vip' && 'All premium features + personal trainer access'}
                  {user.membershipType === 'premium' && 'Access to all gym facilities and classes'}
                  {user.membershipType === 'basic' && 'Basic gym access during regular hours'}
                </Text>
                <TouchableOpacity style={styles.upgradeButton} activeOpacity={0.8}>
                  <Text style={styles.upgradeButtonText}>
                    {user.membershipType === 'vip' ? 'Manage Plan' : 'Upgrade Membership'}
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <LogOut size={20} color="#ff3b30" />
            <Text style={styles.logoutButtonText} onPress={() => navigate("/login")}>Logout</Text>
          </TouchableOpacity>

          <View style={styles.bottomPadding} />
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 32,
    paddingHorizontal: 24,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFD700',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  membershipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  membershipText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff3b30',
    paddingVertical: 16,
    borderRadius: 12,
    marginHorizontal: 24,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
  },
  bottomPadding: {
    height: 20,
  },
});

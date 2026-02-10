import { useAuth } from '@/contexts/auth';
import { LinearGradient } from 'expo-linear-gradient';
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
import React from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const navigate = (path: string) => {
    router.push(path);
  };
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
            await logout();
            router.push('/login');
          },
        },
      ]
    );
  };

  if (!user) {
    return null;
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
            <View style={styles.avatarContainer}>
              <LinearGradient
                colors={[getMembershipColor(), getMembershipColor() + '80']}
                style={styles.avatarGradient}
              >
                <User size={48} color="#fff" strokeWidth={2} />
              </LinearGradient>
            </View>
            <Text style={styles.name}>{user.name}</Text>
            <View style={styles.membershipBadge}>
              <Crown size={16} color={getMembershipColor()} />
              <Text style={[styles.membershipText, { color: getMembershipColor() }]}>
                {getMembershipLabel()} Member
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Information</Text>
            
            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <View style={styles.infoIconContainer}>
                  <Mail size={20} color="#ff3b30" />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Email</Text>
                  <Text style={styles.infoValue}>{user.email}</Text>
                </View>
                <ChevronRight size={20} color="#666" />
              </View>

              <View style={styles.divider} />

              <View style={styles.infoRow}>
                <View style={styles.infoIconContainer}>
                  <Phone size={20} color="#ff3b30" />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Phone Number</Text>
                  <Text style={styles.infoValue}>{user.phoneNumber}</Text>
                </View>
                <ChevronRight size={20} color="#666" />
              </View>

              <View style={styles.divider} />

              <View style={styles.infoRow}>
                <View style={styles.infoIconContainer}>
                  <Calendar size={20} color="#ff3b30" />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Member Since</Text>
                  <Text style={styles.infoValue}>{formatDate(user.joinDate)}</Text>
                </View>
                <ChevronRight size={20} color="#666" />
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Membership</Text>
            
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
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 32,
    paddingHorizontal: 24,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatarGradient: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: '#fff',
    marginBottom: 8,
  },
  membershipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  membershipText: {
    fontSize: 14,
    fontWeight: '600' as const,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: '#fff',
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: '#1f1f1f',
    borderRadius: 16,
    padding: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 13,
    color: '#999',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500' as const,
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    marginLeft: 68,
  },
  membershipCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  membershipCardGradient: {
    padding: 24,
  },
  membershipCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  membershipCardTitle: {
    fontSize: 22,
    fontWeight: '700' as const,
    color: '#fff',
  },
  membershipCardDescription: {
    fontSize: 15,
    color: '#ccc',
    lineHeight: 22,
    marginBottom: 20,
  },
  upgradeButton: {
    backgroundColor: '#ff3b30',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  upgradeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600' as const,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginHorizontal: 24,
    marginTop: 8,
    padding: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ff3b30',
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
  },
  logoutButtonText: {
    fontSize: 17,
    fontWeight: '600' as const,
    color: '#ff3b30',
  },
  bottomPadding: {
    height: 20,
  },
});

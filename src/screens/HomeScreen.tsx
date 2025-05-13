import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Bonjour</Text>
        <Text style={styles.title}>Découvrez vos cours en musique</Text>
      </View>

      <View style={styles.recentSection}>
        <Text style={styles.sectionTitle}>Cours récents</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.courseList}>
          {[1, 2, 3].map((item) => (
            <TouchableOpacity key={item} style={styles.courseCard}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1509228468518-180dd4864904' }}
                style={styles.courseImage}
              />
              <View style={styles.courseInfo}>
                <Text style={styles.courseTitle}>Les équations différentielles</Text>
                <Text style={styles.courseSubtitle}>Mathématiques • Terminale</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.recommendedSection}>
        <Text style={styles.sectionTitle}>Recommandés pour vous</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.courseList}>
          {[1, 2, 3].map((item) => (
            <TouchableOpacity key={item} style={styles.courseCard}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1551406483-3731c5ab67a7' }}
                style={styles.courseImage}
              />
              <View style={styles.courseInfo}>
                <Text style={styles.courseTitle}>La guerre froide</Text>
                <Text style={styles.courseSubtitle}>Histoire • Terminale</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    padding: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    color: '#b3b3b3',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  recentSection: {
    marginBottom: 24,
  },
  recommendedSection: {
    marginBottom: 24,
  },
  courseList: {
    paddingLeft: 20,
  },
  courseCard: {
    width: 200,
    marginRight: 16,
    backgroundColor: '#282828',
    borderRadius: 8,
    overflow: 'hidden',
  },
  courseImage: {
    width: '100%',
    height: 120,
  },
  courseInfo: {
    padding: 12,
  },
  courseTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  courseSubtitle: {
    fontSize: 12,
    color: '#b3b3b3',
  },
});
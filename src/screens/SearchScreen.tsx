import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#b3b3b3" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher des cours..."
          placeholderTextColor="#b3b3b3"
        />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Parcourir par matière</Text>
        <View style={styles.subjectsGrid}>
          {['Mathématiques', 'Physique-Chimie', 'Français', 'Histoire-Géo'].map((subject) => (
            <TouchableOpacity key={subject} style={styles.subjectCard}>
              <Text style={styles.subjectTitle}>{subject}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#282828',
    margin: 16,
    padding: 12,
    borderRadius: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  subjectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  subjectCard: {
    width: '45%',
    backgroundColor: '#282828',
    borderRadius: 8,
    padding: 16,
    margin: '2.5%',
    height: 100,
    justifyContent: 'center',
  },
  subjectTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
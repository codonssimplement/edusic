import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LibraryScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ma bibliothèque</Text>
        <TouchableOpacity style={styles.createButton}>
          <Ionicons name="add" size={24} color="#4F2AA3" />
          <Text style={styles.createButtonText}>Créer une playlist</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mes playlists</Text>
        {['Révisions Bac', 'Maths Terminale', 'Histoire-Géo'].map((playlist) => (
          <TouchableOpacity key={playlist} style={styles.playlistItem}>
            <Text style={styles.playlistTitle}>{playlist}</Text>
            <Ionicons name="chevron-forward" size={24} color="#b3b3b3" />
          </TouchableOpacity>
        ))}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#282828',
    padding: 12,
    borderRadius: 8,
  },
  createButtonText: {
    color: '#4F2AA3',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  playlistItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#282828',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  playlistTitle: {
    color: '#fff',
    fontSize: 16,
  },
});
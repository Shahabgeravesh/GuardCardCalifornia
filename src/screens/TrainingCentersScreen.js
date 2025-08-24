import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';

export default function TrainingCentersScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const trainingCenters = [];

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#8E8E93" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search training centers..."
            placeholderTextColor="#8E8E93"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {trainingCenters.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Ionicons name="school" size={48} color="#8E8E93" />
            </View>
            <Text style={styles.emptyTitle}>
              No Training Centers Available
            </Text>
            <Text style={styles.emptyText}>
              Training center data will be loaded here. Check back soon for approved training centers in your area.
            </Text>
          </View>
        ) : (
          <View style={styles.centersList}>
            {trainingCenters.map((center) => (
              <TouchableOpacity 
                key={center.id} 
                style={styles.centerCard}
                activeOpacity={0.7}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.centerInfo}>
                    <Text style={styles.centerName}>
                      {center.name}
                    </Text>
                    <View style={styles.ratingContainer}>
                      <Ionicons name="star" size={14} color="#FF9500" />
                      <Text style={styles.rating}>{center.rating}</Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.callButton}>
                    <Ionicons name="call" size={16} color="#007AFF" />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.centerDetails}>
                  <View style={styles.detailRow}>
                    <Ionicons name="location" size={16} color="#8E8E93" />
                    <Text style={styles.detailText}>{center.address}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Ionicons name="call" size={16} color="#8E8E93" />
                    <Text style={styles.detailText}>{center.phone}</Text>
                  </View>
                </View>

                <View style={styles.coursesSection}>
                  <Text style={styles.coursesTitle}>
                    Available Courses
                  </Text>
                  <View style={styles.coursesList}>
                    {center.courses?.map((course, index) => (
                      <View key={index} style={styles.courseItem}>
                        <View style={styles.courseDot} />
                        <Text style={styles.courseText}>{course}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    backgroundColor: '#F2F2F7',
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
    color: '#000000',
  },
  emptyText: {
    textAlign: 'center',
    color: '#8E8E93',
    lineHeight: 22,
    fontSize: 16,
  },
  centersList: {
    paddingHorizontal: 20,
    gap: 16,
  },
  centerCard: {
    borderRadius: 16,
    padding: 20,
    backgroundColor: '#FFFFFF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  centerInfo: {
    flex: 1,
  },
  centerName: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: '600',
    color: '#000000',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 14,
    color: '#8E8E93',
  },
  callButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#007AFF20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerDetails: {
    marginBottom: 16,
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#8E8E93',
  },
  coursesSection: {
    gap: 12,
  },
  coursesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  coursesList: {
    gap: 8,
  },
  courseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  courseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#007AFF',
  },
  courseText: {
    fontSize: 14,
    color: '#8E8E93',
  },
});

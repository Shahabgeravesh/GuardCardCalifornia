import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';

export default function PracticeQuizScreen() {
  const quizCategories = [];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Stats Overview */}
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>
            Your Quiz Performance
          </Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Quizzes Taken</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0%</Text>
              <Text style={styles.statLabel}>Average Score</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Questions Answered</Text>
            </View>
          </View>
        </View>

        {quizCategories.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Ionicons name="help-circle" size={48} color="#8E8E93" />
            </View>
            <Text style={styles.emptyTitle}>
              No Quiz Categories Available
            </Text>
            <Text style={styles.emptyText}>
              Quiz categories and questions will be loaded here. Check back soon for practice quizzes covering all exam topics.
            </Text>
          </View>
        ) : (
          <View style={styles.categoriesList}>
            {quizCategories.map((category) => (
              <TouchableOpacity 
                key={category.id} 
                style={styles.categoryCard}
                activeOpacity={0.7}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.categoryInfo}>
                    <Text style={styles.categoryTitle}>
                      {category.title}
                    </Text>
                    <Text style={styles.categoryDescription}>
                      {category.description}
                    </Text>
                  </View>
                  <View style={styles.categoryStats}>
                    <View style={styles.statBadge}>
                      <Text style={styles.statBadgeText}>
                        {category.questionCount} Q
                      </Text>
                    </View>
                  </View>
                </View>
                
                <View style={styles.categoryDetails}>
                  <View style={styles.detailRow}>
                    <Ionicons name="time" size={16} color="#8E8E93" />
                    <Text style={styles.detailText}>
                      Estimated time: {category.estimatedTime} min
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Ionicons name="star" size={16} color="#FF9500" />
                    <Text style={styles.detailText}>
                      Best score: {category.bestScore}%
                    </Text>
                  </View>
                </View>

                <View style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>Start Quiz</Text>
                  <Ionicons name="chevron-forward" size={16} color="#007AFF" />
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
    paddingTop: 20,
  },
  statsCard: {
    marginHorizontal: 20,
    marginBottom: 24,
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
  statsTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    color: '#000000',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'center',
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
  categoriesList: {
    paddingHorizontal: 20,
    gap: 16,
  },
  categoryCard: {
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
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 18,
    marginBottom: 4,
    fontWeight: '600',
    color: '#000000',
  },
  categoryDescription: {
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 20,
  },
  categoryStats: {
    alignItems: 'flex-end',
  },
  statBadge: {
    backgroundColor: '#007AFF20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#007AFF',
  },
  categoryDetails: {
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
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#007AFF20',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
});

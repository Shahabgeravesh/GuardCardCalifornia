import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';

export default function StudyScreen() {
  const studyTopics = [];

  const getProgressColor = (progress) => {
    if (progress >= 80) return '#34C759';
    if (progress >= 60) return '#FF9500';
    return '#FF3B30';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {studyTopics.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Ionicons name="book" size={48} color="#8E8E93" />
            </View>
            <Text style={styles.emptyTitle}>
              No Study Materials Available
            </Text>
            <Text style={styles.emptyText}>
              Study materials will be loaded here. Check back soon for comprehensive study resources covering all exam topics.
            </Text>
          </View>
        ) : (
          <View style={styles.topicsList}>
            {studyTopics.map((topic) => (
              <TouchableOpacity 
                key={topic.id} 
                style={styles.topicCard}
                activeOpacity={0.7}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.topicInfo}>
                    <Text style={styles.topicTitle}>
                      {topic.title}
                    </Text>
                    <Text style={[styles.progressText, { color: getProgressColor(topic.progress) }]}>
                      {topic.progress}% Complete
                    </Text>
                  </View>
                  <View style={[styles.progressCircle, { borderColor: getProgressColor(topic.progress) }]}>
                    <Text style={[styles.progressCircleText, { color: getProgressColor(topic.progress) }]}>
                      {topic.progress}%
                    </Text>
                  </View>
                </View>
                
                <Text style={styles.topicDescription}>
                  {topic.description}
                </Text>
                
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { 
                        width: `${topic.progress}%`,
                        backgroundColor: getProgressColor(topic.progress)
                      }
                    ]} 
                  />
                </View>
                
                <View style={styles.chaptersSection}>
                  <Text style={styles.chaptersTitle}>
                    Chapters
                  </Text>
                  <View style={styles.chaptersList}>
                    {topic.chapters?.map((chapter, index) => (
                      <View key={index} style={styles.chapterItem}>
                        <View style={styles.chapterDot} />
                        <Text style={styles.chapterText}>{chapter}</Text>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
    paddingTop: 20,
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
  topicsList: {
    paddingHorizontal: 20,
    gap: 16,
  },
  topicCard: {
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
    alignItems: 'center',
    marginBottom: 12,
  },
  topicInfo: {
    flex: 1,
  },
  topicTitle: {
    fontSize: 18,
    marginBottom: 4,
    fontWeight: '600',
    color: '#000000',
  },
  progressText: {
    fontSize: 14,
    fontWeight: '500',
  },
  progressCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressCircleText: {
    fontSize: 12,
    fontWeight: '600',
  },
  topicDescription: {
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 20,
    marginBottom: 16,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#F2F2F7',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 16,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  chaptersSection: {
    gap: 12,
  },
  chaptersTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  chaptersList: {
    gap: 8,
  },
  chapterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  chapterDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#007AFF',
  },
  chapterText: {
    fontSize: 14,
    color: '#8E8E93',
  },
});

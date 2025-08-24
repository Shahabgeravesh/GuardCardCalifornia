import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const { width: screenWidth } = Dimensions.get('window');

const studyTopics = [
  {
    id: 'overview',
    title: 'Course Overview',
    content: `The Power to Arrest training is the first required course for all security guard applicants in California. This 8-hour course covers the legal aspects of arrest, detention, and use of force that security guards must understand before beginning their duties.

Key Learning Objectives:
• Understand legal authority and limitations
• Learn proper arrest and detention procedures
• Master use of force guidelines
• Know reporting requirements
• Understand civil and criminal liability`,
    icon: 'shield-checkmark',
    color: '#007AFF',
    duration: '8 hours',
    category: 'Overview'
  },
  {
    id: 'legal-basis',
    title: 'Legal Basis for Arrest',
    content: `Security guards have limited arrest powers under California law:

Private Person Arrest Authority:
• Can arrest for felonies committed in their presence
• Can arrest for misdemeanors that constitute a breach of peace
• Must immediately deliver arrested person to peace officer
• Cannot use excessive force during arrest

Key Legal Principles:
• Reasonable suspicion vs. probable cause
• Citizen's arrest limitations
• Miranda rights requirements
• Use of force continuum`,
    icon: 'scale',
    color: '#34C759',
    duration: '2 hours',
    category: 'Legal'
  },
  {
    id: 'arrest-procedures',
    title: 'Arrest & Detention Procedures',
    content: `Proper procedures for making arrests and detaining individuals:

Before Making Arrest:
• Identify yourself as security guard
• Explain reason for detention
• Request identification
• Document all interactions

During Arrest:
• Use minimum force necessary
• Handcuff properly if needed
• Search for weapons safely
• Maintain control of situation

After Arrest:
• Contact law enforcement immediately
• Provide detailed report
• Preserve evidence
• Document everything`,
    icon: 'shield-checkmark',
    color: '#FF9500',
    duration: '2 hours',
    category: 'Procedures'
  },
  {
    id: 'use-of-force',
    title: 'Use of Force Guidelines',
    content: `Understanding when and how force can be used:

Force Continuum:
• Presence - Being visible
• Verbal commands - Clear instructions
• Empty hand control - Physical restraint
• Less lethal weapons - Pepper spray, baton
• Lethal force - Only in extreme circumstances

Key Principles:
• Use minimum force necessary
• Force must be reasonable
• Document all force used
• Consider alternatives first
• Safety of all parties involved`,
    icon: 'fitness',
    color: '#FF3B30',
    duration: '2 hours',
    category: 'Force'
  },
  {
    id: 'liability',
    title: 'Civil & Criminal Liability',
    content: `Understanding legal responsibilities and consequences:

Civil Liability:
• False arrest lawsuits
• Excessive force claims
• Negligence lawsuits
• Property damage claims

Criminal Liability:
• Assault and battery charges
• False imprisonment
• Civil rights violations
• Criminal negligence

Protection Measures:
• Follow proper procedures
• Document everything
• Maintain training records
• Carry appropriate insurance
• Consult with supervisors`,
    icon: 'warning',
    color: '#5856D6',
    duration: '1 hour',
    category: 'Legal'
  },
  {
    id: 'reporting',
    title: 'Reporting Requirements',
    content: `Essential reporting procedures for security guards:

Incident Reports:
• Document all incidents immediately
• Include date, time, location
• List all parties involved
• Describe actions taken
• Include witness statements

Required Reports:
• Use of force incidents
• Arrests made
• Property damage
• Injuries sustained
• Suspicious activities

Report Elements:
• Objective facts only
• Avoid opinions or conclusions
• Include all relevant details
• Submit within required timeframe
• Keep copies for records`,
    icon: 'document-text',
    color: '#FF2D92',
    duration: '1 hour',
    category: 'Procedures'
  }
];

const StudyScreen = () => {
  const theme = useTheme();
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(studyTopics.map(topic => topic.category)))];

  const filteredTopics = selectedCategory === 'All' 
    ? studyTopics 
    : studyTopics.filter(topic => topic.category === selectedCategory);

  const renderTopicCard = (topic) => (
    <TouchableOpacity
      key={topic.id}
      style={[styles.topicCard, { backgroundColor: theme.colors.card }]}
      onPress={() => setSelectedTopic(topic)}
      accessibilityRole="button"
      accessibilityLabel={`Study topic: ${topic.title}`}
      accessibilityHint="Tap to view detailed content for this topic"
    >
      <View style={styles.topicHeader}>
        <View style={[styles.topicIcon, { backgroundColor: topic.color }]}>
          <Ionicons name={topic.icon} size={24} color="white" />
        </View>
        <View style={styles.topicInfo}>
          <Text style={[styles.topicTitle, { color: theme.colors.text }]}>
            {topic.title}
          </Text>
          <Text style={[styles.topicDuration, { color: theme.colors.secondaryText }]}>
            {topic.duration}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={theme.colors.secondaryText} />
      </View>
    </TouchableOpacity>
  );

  const renderTopicDetail = () => {
    if (!selectedTopic) return null;

    return (
      <View style={styles.detailContainer}>
        <View style={styles.detailHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setSelectedTopic(null)}
            accessibilityRole="button"
            accessibilityLabel="Go back to topics list"
          >
            <Ionicons name="arrow-back" size={24} color={theme.colors.primary} />
            <Text style={[styles.backButtonText, { color: theme.colors.primary }]}>
              Back to Topics
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.detailContent} showsVerticalScrollIndicator={false}>
          <View style={styles.detailTitleSection}>
            <View style={[styles.detailIcon, { backgroundColor: selectedTopic.color }]}>
              <Ionicons name={selectedTopic.icon} size={32} color="white" />
            </View>
            <Text style={[styles.detailTitle, { color: theme.colors.text }]}>
              {selectedTopic.title}
            </Text>
            <Text style={[styles.detailDuration, { color: theme.colors.secondaryText }]}>
              Duration: {selectedTopic.duration}
            </Text>
          </View>

          <View style={[styles.detailContentCard, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.detailContentText, { color: theme.colors.text }]}>
              {selectedTopic.content}
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {selectedTopic ? (
        renderTopicDetail()
      ) : (
        <>
          <View style={styles.header}>
            <Text style={[styles.headerSubtitle, { color: theme.colors.secondaryText }]}>
              Learn the essential content for your security guard training
            </Text>
          </View>

          <View style={styles.categoryFilter}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryButton,
                    { 
                      backgroundColor: selectedCategory === category 
                        ? theme.colors.primary 
                        : theme.colors.card 
                    }
                  ]}
                  onPress={() => setSelectedCategory(category)}
                  accessibilityRole="button"
                  accessibilityLabel={`Filter by ${category} category`}
                >
                  <Text style={[
                    styles.categoryButtonText,
                    { 
                      color: selectedCategory === category 
                        ? 'white' 
                        : theme.colors.text 
                    }
                  ]}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.topicsContainer}>
              {filteredTopics.map(renderTopicCard)}
            </View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    padding: 24,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: 0.35,
  },
  headerSubtitle: {
    fontSize: 17,
    fontWeight: '400',
    lineHeight: 22,
    textAlign: 'center',
  },
  categoryFilter: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  categoryButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 24,
    marginRight: 12,
    minHeight: 40,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  topicsContainer: {
    gap: 16,
    paddingBottom: 24,
  },
  topicCard: {
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  topicHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  topicIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 18,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  topicInfo: {
    flex: 1,
  },
  topicTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  topicDuration: {
    fontSize: 15,
    fontWeight: '500',
    opacity: 0.8,
  },
  detailContainer: {
    flex: 1,
  },
  detailHeader: {
    padding: 24,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  detailContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  detailTitleSection: {
    alignItems: 'center',
    marginBottom: 32,
    paddingVertical: 24,
  },
  detailIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  detailTitle: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 0.35,
  },
  detailDuration: {
    fontSize: 18,
    fontWeight: '500',
    opacity: 0.8,
  },
  detailContentCard: {
    borderRadius: 20,
    padding: 28,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  detailContentText: {
    fontSize: 17,
    fontWeight: '400',
    lineHeight: 26,
  },
});

export default StudyScreen;

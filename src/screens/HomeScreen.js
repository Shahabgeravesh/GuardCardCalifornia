import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const theme = useTheme();
  const navigation = useNavigation();
  const [expandedStep, setExpandedStep] = useState(null);
  
  // Interactive progress tracking
  const [completedSteps, setCompletedSteps] = useState([0]); // Step 1 starts completed
  const totalSteps = 3;
  const registrationProgress = Math.round((completedSteps.length / totalSteps) * 100);

  const quickActions = [
    {
      id: 1,
      title: 'Training Centers',
      subtitle: 'Find BSIS approved providers',
      icon: 'school',
      color: theme.colors.systemGreen,
    },
    {
      id: 2,
      title: 'Study Materials',
      subtitle: 'PTA & AUOF course content',
      icon: 'book',
      color: theme.colors.systemOrange,
    },
    {
      id: 3,
      title: 'Practice Tests',
      subtitle: 'Test your knowledge',
      icon: 'help-circle',
      color: theme.colors.systemPurple,
    },
    {
      id: 4,
      title: 'Live Scan Locations',
      subtitle: 'Find fingerprint locations',
      icon: 'location',
      color: theme.colors.systemBlue,
    },
  ];

  // Function to toggle step completion
  const toggleStepCompletion = (stepId) => {
    setCompletedSteps(prev => {
      if (prev.includes(stepId - 1)) {
        return prev.filter(id => id !== stepId - 1);
      } else {
        return [...prev, stepId - 1].sort();
      }
    });
  };

  // Real California Guard Card 3-Step Process
  const guardCardSteps = [
    {
      id: 1,
      title: 'Complete 8-Hour BSIS Training',
      description: 'Complete Power to Arrest (PTA) & Appropriate Use of Force (AUOF)',
      status: 'completed',
      timeEstimate: '1-2 days',
      costEstimate: '$50-150',
      image: require('../../assets/images/Verified.png'),
      details: [
        '3-Hour Power to Arrest (PTA) - Online Part A',
        '5-Hour Appropriate Use of Force (AUOF) - In-Person Part B',
        'Must be completed at BSIS-approved training facility',
        'Receive 8-hour certificate for guard card application'
      ],
      requirements: [
        'Valid government-issued photo ID',
        'Payment for training courses',
        'Attend in-person AUOF training'
      ]
    },
    {
      id: 2,
      title: 'Submit Online Guard Card Application',
      description: 'Apply through CA State BSIS Breeze system',
      status: 'in-progress',
      timeEstimate: '30 minutes',
      costEstimate: '$50',
      image: require('../../assets/images/BSIS Application.png'),
      details: [
        'Create account on CA Breeze system',
        'Complete Security Guard Registration application',
        'Upload 8-hour training certificate',
        'Pay $50 application fee online'
      ],
      requirements: [
        '8-hour training certificate',
        'Valid email address for account',
        'Payment method for $50 fee'
      ]
    },
    {
      id: 3,
      title: 'Get Live Scan Fingerprints',
      description: 'Complete background check via Live Scan',
      status: 'pending',
      timeEstimate: '30 minutes',
      costEstimate: '$32-75',
      image: require('../../assets/images/Livescan.png'),
      details: [
        'Download Live Scan form from BSIS website',
        'Visit authorized Live Scan location',
        'Fingerprints sent to DOJ and FBI automatically',
        'Keep receipt for your records'
      ],
      requirements: [
        'Completed Live Scan form',
        'Valid government-issued photo ID',
        'Payment for Live Scan services'
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return theme.colors.systemGreen;
      case 'in-progress':
        return theme.colors.systemOrange;
      case 'pending':
        return theme.colors.systemBlue;
      default:
        return theme.colors.systemBlue;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'checkmark-circle';
      case 'in-progress':
        return 'time';
      case 'pending':
        return 'ellipse';
      default:
        return 'ellipse';
    }
  };

  const toggleStep = (stepId) => {
    setExpandedStep(expandedStep === stepId ? null : stepId);
  };

  // Function to get step status based on completion
  const getStepStatus = (stepId) => {
    return completedSteps.includes(stepId - 1) ? 'completed' : 'pending';
  };

  // Function to get status icon based on completion
  const getStatusIconByStep = (stepId) => {
    return completedSteps.includes(stepId - 1) ? 'checkmark-circle' : 'ellipse-outline';
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.systemBackground }]}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: theme.colors.label }, theme.typography.largeTitle]}>
            Guard Card California
          </Text>
          <Text style={[styles.headerSubtitle, { color: theme.colors.secondaryLabel }, theme.typography.body]}>
            Complete your security guard registration
          </Text>
        </View>

        {/* Progress Overview */}
        <View style={[styles.progressCard, { backgroundColor: theme.colors.secondarySystemBackground }, theme.shadows.md]}>
          <View style={styles.progressHeader}>
            <Text style={[styles.progressTitle, { color: theme.colors.label }, theme.typography.headline]}>
              Progress
            </Text>
            <Text style={[styles.progressPercentage, { color: theme.colors.systemBlue }, theme.typography.title2]}>
              {registrationProgress}%
            </Text>
          </View>
          
          <View style={[styles.progressBar, { backgroundColor: theme.colors.separator }]}>
            <View 
              style={[styles.progressFill, { 
                width: `${registrationProgress}%`,
                backgroundColor: theme.colors.systemBlue
              }]} 
            />
          </View>
        </View>

        {/* 3-Step Guard Card Process */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.label }, theme.typography.title2]}>
            How to Get Your California Guard Card
          </Text>
          <Text style={[styles.sectionSubtitle, { color: theme.colors.secondaryLabel }, theme.typography.body]}>
            Follow these 3 required steps to obtain your BSIS Guard Card
          </Text>
          
          <View style={styles.stepsContainer}>
            {guardCardSteps.map((step, index) => (
              <View key={step.id} style={styles.stepWrapper}>
                <View style={styles.stepHeader}>
                  <View style={styles.stepNumberContainer}>
                    <View style={[styles.stepNumber, { 
                      backgroundColor: getStatusColor(getStepStatus(step.id)),
                      borderColor: getStatusColor(getStepStatus(step.id))
                    }]}>
                      <Text style={[styles.stepNumberText, { color: '#FFFFFF' }, theme.typography.headline]}>
                        {step.id}
                      </Text>
                    </View>
                    {index < guardCardSteps.length - 1 && (
                      <View style={[styles.stepConnector, { 
                        backgroundColor: completedSteps.includes(step.id - 1) ? getStatusColor('completed') : theme.colors.separator
                      }]} />
                    )}
                  </View>
                  
                  <View style={styles.stepContent}>
                    <TouchableOpacity 
                      style={styles.stepTitleRow}
                      onPress={() => toggleStep(step.id)}
                      activeOpacity={0.7}
                      accessibilityRole="button"
                      accessibilityLabel={`Step ${step.id}: ${step.title}`}
                      accessibilityHint="Double tap to expand or collapse step details"
                    >
                      <View style={styles.stepTitleContainer}>
                        <Text style={[styles.stepTitle, { color: theme.colors.label }, theme.typography.headline]}>
                          {step.title}
                        </Text>
                        <Text style={[styles.stepDescription, { color: theme.colors.secondaryLabel }, theme.typography.footnote]}>
                          {step.description}
                        </Text>
                      </View>
                      <View style={styles.stepStatusContainer}>
                        <TouchableOpacity
                          onPress={() => toggleStepCompletion(step.id)}
                          style={styles.completionToggle}
                          activeOpacity={0.7}
                          accessibilityRole="button"
                          accessibilityLabel={`Mark step ${step.id} as ${completedSteps.includes(step.id - 1) ? 'incomplete' : 'complete'}`}
                        >
                          <Ionicons 
                            name={getStatusIconByStep(step.id)} 
                            size={24} 
                            color={getStatusColor(getStepStatus(step.id))} 
                          />
                        </TouchableOpacity>
                        <Ionicons 
                          name={expandedStep === step.id ? "chevron-up" : "chevron-down"} 
                          size={16} 
                          color={theme.colors.secondaryLabel} 
                        />
                      </View>
                    </TouchableOpacity>

                    {/* Step Details (Expandable) */}
                    {expandedStep === step.id && (
                      <View style={styles.stepDetails}>
                        {/* Step Image */}
                        <View style={styles.stepImageContainer}>
                          <Image 
                            source={step.image} 
                            style={styles.stepImage}
                            resizeMode="contain"
                            accessibilityLabel={`${step.title} illustration`}
                          />
                        </View>

                        <View style={styles.stepMetrics}>
                          <View style={styles.metricItem}>
                            <Ionicons name="time" size={16} color={theme.colors.secondaryLabel} />
                            <Text style={[styles.metricText, { color: theme.colors.secondaryLabel }, theme.typography.footnote]}>
                              {step.timeEstimate}
                            </Text>
                          </View>
                          <View style={styles.metricItem}>
                            <Ionicons name="card" size={16} color={theme.colors.secondaryLabel} />
                            <Text style={[styles.metricText, { color: theme.colors.secondaryLabel }, theme.typography.footnote]}>
                              {step.costEstimate}
                            </Text>
                          </View>
                        </View>

                        <View style={styles.detailsSection}>
                          <Text style={[styles.detailsTitle, { color: theme.colors.label }, theme.typography.subheadline]}>
                            What You'll Do:
                          </Text>
                          {step.details.map((detail, detailIndex) => (
                            <View key={detailIndex} style={styles.detailRow}>
                              <View style={[styles.detailDot, { backgroundColor: theme.colors.systemBlue }]} />
                              <Text style={[styles.detailText, { color: theme.colors.secondaryLabel }, theme.typography.footnote]}>
                                {detail}
                              </Text>
                            </View>
                          ))}
                        </View>

                        <View style={styles.detailsSection}>
                          <Text style={[styles.detailsTitle, { color: theme.colors.label }, theme.typography.subheadline]}>
                            What You'll Need:
                          </Text>
                          {step.requirements.map((requirement, reqIndex) => (
                            <View key={reqIndex} style={styles.detailRow}>
                              <View style={[styles.detailDot, { backgroundColor: theme.colors.systemBlue }]} />
                              <Text style={[styles.detailText, { color: theme.colors.secondaryLabel }, theme.typography.footnote]}>
                                {requirement}
                              </Text>
                            </View>
                          ))}
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>





        {/* Quick Actions - Moved to bottom */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.label }, theme.typography.title2]}>
            Quick Actions
          </Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={[styles.actionCard, { backgroundColor: theme.colors.systemBackground }, theme.shadows.sm]}
                onPress={() => {
                  if (action.id === 1) navigation.navigate('Training');
                  else if (action.id === 2) navigation.navigate('Study');
                  else if (action.id === 3) navigation.navigate('Quiz');
                  else if (action.id === 4) navigation.navigate('Training');
                }}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel={`${action.title}: ${action.subtitle}`}
                accessibilityHint={`Double tap to access ${action.title.toLowerCase()}`}
              >
                <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                  <Ionicons name={action.icon} size={24} color="#FFFFFF" />
                </View>
                <View style={styles.actionContent}>
                  <Text style={[styles.actionTitle, { color: theme.colors.label }, theme.typography.headline]}>
                    {action.title}
                  </Text>
                  <Text style={[styles.actionSubtitle, { color: theme.colors.secondaryLabel }, theme.typography.footnote]}>
                    {action.subtitle}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 96, // 8pt grid: 12 * 8 = 96
    paddingTop: 16,    // 8pt grid: 2 * 8 = 16
  },
  header: {
    paddingHorizontal: 16, // 8pt grid: 2 * 8 = 16
    paddingBottom: 24,     // 8pt grid: 3 * 8 = 24
  },
  headerTitle: {
    marginBottom: 8,
  },
  headerSubtitle: {
    lineHeight: 22,
  },
  progressCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 20,
    borderRadius: 12,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressTitle: {
    flex: 1,
  },
  progressPercentage: {
    fontWeight: '700',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 16,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    marginBottom: 4,
  },
  statLabel: {
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  sectionSubtitle: {
    marginBottom: 16,
    lineHeight: 22,
  },
  quickActionsGrid: {
    gap: 12,
  },

  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    minHeight: 44, // iOS minimum touch target
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    marginBottom: 4,
  },
  actionSubtitle: {
    lineHeight: 18,
  },
  stepsContainer: {
    gap: 16,
  },
  stepWrapper: {
    marginBottom: 16,
  },
  stepHeader: {
    flexDirection: 'row',
  },
  stepNumberContainer: {
    alignItems: 'center',
    marginRight: 16,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  stepNumberText: {
    fontWeight: '600',
  },
  stepConnector: {
    width: 2,
    height: 40,
    borderRadius: 1,
  },
  stepContent: {
    flex: 1,
  },
  stepTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    minHeight: 44, // iOS minimum touch target
  },
  stepTitleContainer: {
    flex: 1,
    marginRight: 12,
  },
  stepTitle: {
    marginBottom: 4,
  },
  stepDescription: {
    lineHeight: 18,
  },
  stepStatusContainer: {
    alignItems: 'center',
    gap: 4,
  },
  completionToggle: {
    padding: 4,
    borderRadius: 20,
  },
  stepDetails: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  stepImageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  stepImage: {
    width: 200,
    height: 120,
    borderRadius: 8,
  },
  stepMetrics: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 16,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metricText: {
    lineHeight: 18,
  },
  detailsSection: {
    marginBottom: 16,
  },
  detailsTitle: {
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  detailDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 6,
    marginRight: 12,
  },
  detailText: {
    flex: 1,
    lineHeight: 18,
  },
  linksContainer: {
    gap: 12,
  },
  linkCard: {
    padding: 16,
    borderRadius: 12,
    minHeight: 44, // iOS minimum touch target
  },
  linkHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  linkInfo: {
    flex: 1,
    marginRight: 12,
  },
  linkTitle: {
    marginBottom: 4,
  },
  linkSubtitle: {
    lineHeight: 18,
  },
});

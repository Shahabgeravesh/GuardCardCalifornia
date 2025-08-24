import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';

export default function HomeScreen() {
  const [expandedStep, setExpandedStep] = useState(null);

  // Progress tracking - based on real 3-step process
  const registrationProgress = 33; // Step 1 completed
  const totalSteps = 3;
  const completedSteps = 1;

  const quickActions = [
    {
      id: 1,
      title: 'Training Centers',
      subtitle: 'Find BSIS approved providers',
      icon: 'school',
      color: '#34C759',
    },
    {
      id: 2,
      title: 'Study Materials',
      subtitle: 'PTA & AUOF course content',
      icon: 'book',
      color: '#FF9500',
    },
    {
      id: 3,
      title: 'Practice Tests',
      subtitle: 'Test your knowledge',
      icon: 'help-circle',
      color: '#AF52DE',
    },
    {
      id: 4,
      title: 'Live Scan Locations',
      subtitle: 'Find fingerprint locations',
      icon: 'location',
      color: '#007AFF',
    },
  ];

  // Real California Guard Card 3-Step Process
  const guardCardSteps = [
    {
      id: 1,
      title: 'Complete 8-Hour BSIS Training',
      description: 'Complete Power to Arrest (PTA) & Appropriate Use of Force (AUOF)',
      status: 'completed',
      timeEstimate: '1-2 days',
      costEstimate: '$50-150',
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
      details: [
        'Download Live Scan form from BSIS website',
        'Visit authorized Live Scan location',
        'Fingerprints sent to DOJ and FBI automatically',
        'Keep receipt for your records'
      ],
      requirements: [
        'Completed Live Scan form',
        'Valid government-issued photo ID',
        'Payment for Live Scan fees'
      ]
    }
  ];

  const importantLinks = [
    {
      id: 1,
      title: 'BSIS Breeze Application',
      subtitle: 'Submit your guard card application',
      url: 'https://www.breeze.ca.gov/datamart/loginCADCA.do',
      icon: 'globe',
    },
    {
      id: 2,
      title: 'Live Scan Locations',
      subtitle: 'Find fingerprint locations near you',
      url: 'https://oag.ca.gov/fingerprints/locations',
      icon: 'location',
    },
    {
      id: 3,
      title: 'Check License Status',
      subtitle: 'Verify your application status',
      url: 'https://search.dca.ca.gov/',
      icon: 'search',
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#34C759';
      case 'in-progress': return '#FF9500';
      case 'pending': return '#8E8E93';
      default: return '#8E8E93';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'checkmark-circle';
      case 'in-progress': return 'time';
      case 'pending': return 'ellipse-outline';
      default: return 'ellipse-outline';
    }
  };

  const toggleStep = (stepId) => {
    setExpandedStep(expandedStep === stepId ? null : stepId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Progress Overview */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>
              Registration Progress
            </Text>
            <Text style={styles.progressPercentage}>
              {registrationProgress}%
            </Text>
          </View>
          
          <View style={styles.progressBar}>
            <View 
              style={[styles.progressFill, { width: `${registrationProgress}%` }]} 
            />
          </View>
          
          <View style={styles.progressStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{completedSteps}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{totalSteps - completedSteps}</Text>
              <Text style={styles.statLabel}>Remaining</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{totalSteps}</Text>
              <Text style={styles.statLabel}>Total Steps</Text>
            </View>
          </View>
        </View>

        {/* 3-Step Guard Card Process */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            How to Get Your California Guard Card
          </Text>
          <Text style={styles.sectionSubtitle}>
            Follow these 3 required steps to obtain your BSIS Guard Card
          </Text>
          
          <View style={styles.stepsContainer}>
            {guardCardSteps.map((step, index) => (
              <View key={step.id} style={styles.stepWrapper}>
                <View style={styles.stepHeader}>
                  <View style={styles.stepNumberContainer}>
                    <View style={[styles.stepNumber, { 
                      backgroundColor: getStatusColor(step.status),
                      borderColor: getStatusColor(step.status)
                    }]}>
                      <Text style={styles.stepNumberText}>
                        {step.id}
                      </Text>
                    </View>
                    {index < guardCardSteps.length - 1 && (
                      <View style={[styles.stepConnector, { 
                        backgroundColor: step.status === 'completed' ? getStatusColor(step.status) : '#E5E5EA'
                      }]} />
                    )}
                  </View>
                  
                  <View style={styles.stepContent}>
                    <TouchableOpacity 
                      style={styles.stepTitleRow}
                      onPress={() => toggleStep(step.id)}
                      activeOpacity={0.7}
                    >
                      <View style={styles.stepTitleContainer}>
                        <Text style={styles.stepTitle}>
                          {step.title}
                        </Text>
                        <Text style={styles.stepDescription}>
                          {step.description}
                        </Text>
                      </View>
                      <View style={styles.stepStatusContainer}>
                        <Ionicons 
                          name={getStatusIcon(step.status)} 
                          size={24} 
                          color={getStatusColor(step.status)} 
                        />
                        <Ionicons 
                          name={expandedStep === step.id ? "chevron-up" : "chevron-down"} 
                          size={16} 
                          color="#8E8E93" 
                        />
                      </View>
                    </TouchableOpacity>

                    {/* Step Details (Expandable) */}
                    {expandedStep === step.id && (
                      <View style={styles.stepDetails}>
                        <View style={styles.detailsSection}>
                          <Text style={styles.detailsTitle}>
                            What You'll Do
                          </Text>
                          {step.details.map((detail, detailIndex) => (
                            <View key={detailIndex} style={styles.detailItem}>
                              <View style={[styles.detailDot, { backgroundColor: getStatusColor(step.status) }]} />
                              <Text style={styles.detailText}>{detail}</Text>
                            </View>
                          ))}
                        </View>

                        <View style={styles.detailsSection}>
                          <Text style={styles.detailsTitle}>
                            What You'll Need
                          </Text>
                          {step.requirements.map((requirement, reqIndex) => (
                            <View key={reqIndex} style={styles.detailItem}>
                              <View style={[styles.detailDot, { backgroundColor: getStatusColor(step.status) }]} />
                              <Text style={styles.detailText}>{requirement}</Text>
                            </View>
                          ))}
                        </View>

                        <View style={styles.stepMetrics}>
                          <View style={styles.metricItem}>
                            <Ionicons name="time" size={16} color="#8E8E93" />
                            <Text style={styles.metricText}>{step.timeEstimate}</Text>
                          </View>
                          <View style={styles.metricItem}>
                            <Ionicons name="card" size={16} color="#8E8E93" />
                            <Text style={styles.metricText}>{step.costEstimate}</Text>
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Quick Actions
          </Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity 
                key={action.id} 
                style={styles.actionCard}
                activeOpacity={0.7}
              >
                <View style={[styles.actionIcon, { backgroundColor: action.color + '20' }]}>
                  <Ionicons name={action.icon} size={24} color={action.color} />
                </View>
                <View style={styles.actionContent}>
                  <Text style={styles.actionTitle}>
                    {action.title}
                  </Text>
                  <Text style={styles.actionSubtitle}>
                    {action.subtitle}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Important Links */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Official BSIS Resources
          </Text>
          <View style={styles.linksContainer}>
            {importantLinks.map((link) => (
              <TouchableOpacity 
                key={link.id} 
                style={styles.linkCard}
                activeOpacity={0.7}
              >
                <View style={styles.linkHeader}>
                  <View style={styles.linkInfo}>
                    <Text style={styles.linkTitle}>
                      {link.title}
                    </Text>
                    <Text style={styles.linkSubtitle}>
                      {link.subtitle}
                    </Text>
                  </View>
                  <Ionicons name={link.icon} size={24} color="#007AFF" />
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
    backgroundColor: '#F2F2F7',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  progressCard: {
    marginHorizontal: 20,
    marginTop: 20,
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
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
  },
  progressPercentage: {
    fontSize: 24,
    fontWeight: '700',
    color: '#007AFF',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#F2F2F7',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
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
    fontSize: 24,
    fontWeight: '700',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
    color: '#000000',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 16,
    lineHeight: 20,
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
    borderWidth: 2,
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  stepConnector: {
    width: 2,
    height: 40,
    marginTop: 8,
  },
  stepContent: {
    flex: 1,
  },
  stepTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  stepTitleContainer: {
    flex: 1,
    marginRight: 12,
  },
  stepTitle: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: '600',
    color: '#000000',
  },
  stepDescription: {
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 20,
  },
  stepStatusContainer: {
    alignItems: 'center',
    gap: 4,
  },
  stepDetails: {
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#F2F2F7',
  },
  detailsSection: {
    marginBottom: 20,
  },
  detailsTitle: {
    fontSize: 16,
    marginBottom: 12,
    fontWeight: '600',
    color: '#000000',
  },
  detailItem: {
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
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 20,
  },
  stepMetrics: {
    flexDirection: 'row',
    gap: 24,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metricText: {
    fontSize: 14,
    color: '#8E8E93',
  },
  quickActionsGrid: {
    gap: 12,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
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
    fontSize: 16,
    marginBottom: 4,
    fontWeight: '600',
    color: '#000000',
  },
  actionSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
  },
  linksContainer: {
    gap: 12,
  },
  linkCard: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  linkHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  linkInfo: {
    flex: 1,
  },
  linkTitle: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: '600',
    color: '#000000',
  },
  linkSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
  },
});

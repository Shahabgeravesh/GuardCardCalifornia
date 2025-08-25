import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View, Image, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const theme = useTheme();
  const navigation = useNavigation();
  const [expandedStep, setExpandedStep] = useState(null);
  


  const quickActions = [
    {
      id: 1,
      title: 'Training Centers',
      subtitle: 'Find BSIS approved providers',
      icon: 'school',
      color: theme.colors.gradientStart,
      gradientEnd: theme.colors.gradientEnd,
    },
    {
      id: 2,
      title: 'Study Materials',
      subtitle: 'PTA & AUOF course content',
      icon: 'book',
      color: theme.colors.gradientSecondary,
      gradientEnd: theme.colors.gradientSecondaryEnd,
    },
    {
      id: 3,
      title: 'Practice Tests',
      subtitle: 'Test your knowledge',
      icon: 'help-circle',
      color: theme.colors.systemPurple,
      gradientEnd: theme.colors.systemIndigo,
    },
    {
      id: 4,
      title: 'Live Scan Locations',
      subtitle: 'Find fingerprint locations',
      icon: 'location',
      color: theme.colors.systemTeal,
      gradientEnd: theme.colors.systemCyan,
    },
  ];



  // Real California Guard Card 3-Step Process
  const guardCardSteps = [
    {
      id: 1,
      title: 'Complete 8-Hour BSIS Training',
      description: 'Complete Power to Arrest (PTA) & Appropriate Use of Force (AUOF)',

      image: require('../../assets/images/Verified.png'),
      details: [
        '3-Hour Power to Arrest (PTA) - Online Part A',
        '5-Hour Appropriate Use of Force (AUOF) - In-Person Part B',
        'Must be completed at BSIS-approved training facility',
        'Receive 8-hour certificate for guard card application'
      ],
      requirements: [
        'Valid government-issued photo ID',
        'Attend in-person AUOF training'
      ]
    },
    {
      id: 2,
      title: 'Submit Online Guard Card Application',
      description: 'Apply through CA State BSIS Breeze system',

      image: require('../../assets/images/BSIS Application.png'),
      details: [
        'Create account on CA Breeze system',
        'Complete Security Guard Registration application',
        'Upload 8-hour training certificate',
        'Submit application online'
      ],
      requirements: [
        '8-hour training certificate',
        'Valid email address for account'
      ]
    },
    {
      id: 3,
      title: 'Get Live Scan Fingerprints',
      description: 'Complete background check via Live Scan',

      image: require('../../assets/images/Livescan.png'),
      details: [
        'Download Live Scan form from BSIS website',
        'Visit authorized Live Scan location',
        'Fingerprints sent to DOJ and FBI automatically',
        'Keep receipt for your records'
      ],
      requirements: [
        'Completed Live Scan form',
        'Valid government-issued photo ID'
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

  const openBSISWebsite = () => {
    const url = 'https://www.bsis.ca.gov/';
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Unable to open BSIS website');
      }
    });
  };



  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.systemBackground }]} edges={['left', 'right', 'bottom']}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >




        {/* 3-Step Guard Card Process */}
        <View style={styles.section}>
          <View style={[styles.headerCard, { backgroundColor: '#4257B2' }]}>
            <View style={styles.headerContent}>
              <View style={styles.headerLeft}>
                <Ionicons name="shield-checkmark" size={20} color="#FFFFFF" style={styles.headerIcon} />
                <Text style={[styles.sectionTitle, { color: '#FFFFFF' }, theme.typography.cardTitle]}>
                  How to Get Your Guard Card
                </Text>
              </View>
              <TouchableOpacity
                style={styles.tutorialButton}
                onPress={() => navigation.navigate('Tutorial')}
                accessibilityRole="button"
                accessibilityLabel="View app tutorial"
              >
                <Ionicons name="play-circle" size={16} color="#FFFFFF" />
                <Text style={styles.tutorialButtonText}>Tutorial</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.stepsContainer}>
            {guardCardSteps.map((step, index) => (
              <View key={step.id} style={styles.stepWrapper}>
                <View style={styles.stepHeader}>
                  <View style={styles.stepNumberContainer}>
                    <View style={[styles.stepNumber, { 
                      backgroundColor: '#4257B2',
                      borderColor: '#4257B2'
                    }]}>
                                              <Text style={[styles.stepNumberText, { color: '#FFFFFF' }, theme.typography.buttonText]}>
                          {step.id}
                        </Text>
                    </View>
                    {index < guardCardSteps.length - 1 && (
                      <View style={[styles.stepConnector, { 
                        backgroundColor: theme.colors.separator
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
                        <Text style={[styles.stepTitle, { color: theme.colors.label }, theme.typography.cardTitle]}>
                          {step.title}
                        </Text>
                        <Text style={[styles.stepDescription, { color: theme.colors.secondaryLabel }, theme.typography.body]}>
                          {step.description}
                        </Text>
                      </View>
                      <View style={styles.stepStatusContainer}>
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



                        <View style={styles.detailsSection}>
                          <Text style={[styles.detailsTitle, { color: theme.colors.label }, theme.typography.bodyLarge]}>
                            What You'll Do:
                          </Text>
                          {step.details.map((detail, detailIndex) => (
                            <View key={detailIndex} style={styles.detailRow}>
                              <View style={[styles.detailDot, { backgroundColor: theme.colors.systemBlue }]} />
                              <Text style={[styles.detailText, { color: theme.colors.secondaryLabel }, theme.typography.body]}>
                                {detail}
                              </Text>
                            </View>
                          ))}
                        </View>

                        <View style={styles.detailsSection}>
                          <Text style={[styles.detailsTitle, { color: theme.colors.label }, theme.typography.bodyLarge]}>
                            What You'll Need:
                          </Text>
                          {step.requirements.map((requirement, reqIndex) => (
                            <View key={reqIndex} style={styles.detailRow}>
                              <View style={[styles.detailDot, { backgroundColor: theme.colors.systemBlue }]} />
                              <Text style={[styles.detailText, { color: theme.colors.secondaryLabel }, theme.typography.body]}>
                                {requirement}
                              </Text>
                            </View>
                          ))}
                        </View>

                        {/* Quick Actions for each step */}
                        <View style={styles.stepQuickActions}>
                          <Text style={[styles.quickActionsTitle, { color: theme.colors.label }, theme.typography.bodyLarge]}>
                            Quick Actions
                          </Text>
                          <View style={styles.quickActionsRow}>
                            {step.id === 1 && (
                              <>
                                <TouchableOpacity
                                  style={[styles.stepActionCard, { backgroundColor: theme.colors.systemBackground }, theme.shadows.sm]}
                                  onPress={() => navigation.navigate('Training')}
                                  activeOpacity={0.7}
                                >
                                  <Ionicons name="location" size={20} color={theme.colors.systemGreen} />
                                  <Text style={[styles.stepActionText, { color: theme.colors.label }, theme.typography.body]}>
                                    Find Training Centers
                                  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  style={[styles.stepActionCard, { backgroundColor: theme.colors.systemBackground }, theme.shadows.sm]}
                                  onPress={() => navigation.navigate('Study')}
                                  activeOpacity={0.7}
                                >
                                  <Ionicons name="book" size={20} color={theme.colors.systemBlue} />
                                  <Text style={[styles.stepActionText, { color: theme.colors.label }, theme.typography.footnote]}>
                                    Study Materials
                                  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  style={[styles.stepActionCard, { backgroundColor: theme.colors.systemBackground }, theme.shadows.sm]}
                                  onPress={() => navigation.navigate('Quiz')}
                                  activeOpacity={0.7}
                                >
                                  <Ionicons name="help-circle" size={20} color={theme.colors.systemPurple} />
                                  <Text style={[styles.stepActionText, { color: theme.colors.label }, theme.typography.footnote]}>
                                    Practice Quiz
                                  </Text>
                                </TouchableOpacity>
                              </>
                            )}
                            {step.id === 2 && (
                              <>
                                <TouchableOpacity
                                  style={[styles.stepActionCard, { backgroundColor: theme.colors.systemBackground }, theme.shadows.sm]}
                                  onPress={() => navigation.navigate('Quiz')}
                                  activeOpacity={0.7}
                                >
                                  <Ionicons name="help-circle" size={20} color={theme.colors.systemPurple} />
                                  <Text style={[styles.stepActionText, { color: theme.colors.label }, theme.typography.footnote]}>
                                    Practice Quiz
                                  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  style={[styles.stepActionCard, { backgroundColor: theme.colors.systemBackground }, theme.shadows.sm]}
                                  onPress={() => navigation.navigate('Resources')}
                                  activeOpacity={0.7}
                                >
                                  <Ionicons name="document-text" size={20} color={theme.colors.systemTeal} />
                                  <Text style={[styles.stepActionText, { color: theme.colors.label }, theme.typography.footnote]}>
                                    Download Forms
                                  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  style={[styles.stepActionCard, { backgroundColor: theme.colors.systemBackground }, theme.shadows.sm]}
                                  onPress={openBSISWebsite}
                                  activeOpacity={0.7}
                                >
                                  <Ionicons name="globe" size={20} color={theme.colors.systemOrange} />
                                  <Text style={[styles.stepActionText, { color: theme.colors.label }, theme.typography.footnote]}>
                                    Submit Application
                                  </Text>
                                </TouchableOpacity>
                              </>
                            )}
                            {step.id === 3 && (
                              <>
                                <TouchableOpacity
                                  style={[styles.stepActionCard, { backgroundColor: theme.colors.systemBackground }, theme.shadows.sm]}
                                  onPress={() => navigation.navigate('Training')}
                                  activeOpacity={0.7}
                                >
                                  <Ionicons name="location" size={20} color={theme.colors.systemGreen} />
                                  <Text style={[styles.stepActionText, { color: theme.colors.label }, theme.typography.footnote]}>
                                    Find LiveScan Locations
                                  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  style={[styles.stepActionCard, { backgroundColor: theme.colors.systemBackground }, theme.shadows.sm]}
                                  onPress={() => navigation.navigate('Resources')}
                                  activeOpacity={0.7}
                                >
                                  <Ionicons name="document-text" size={20} color={theme.colors.systemTeal} />
                                  <Text style={[styles.stepActionText, { color: theme.colors.label }, theme.typography.footnote]}>
                                    Get LiveScan Form
                                  </Text>
                                </TouchableOpacity>
                              </>
                            )}
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






      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 96, // 8pt grid: 12 * 8 = 96
    paddingTop: 16,    // Quizlet-style top spacing
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    paddingBottom: 32,
    backgroundColor: '#FAFBFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
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
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
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
    height: 12,
    borderRadius: 6,
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
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  headerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 24,
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: 12,
  },
  tutorialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  tutorialButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  headerIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  headerIcon: {
    marginRight: 12,
  },
  sectionTitle: {
    fontWeight: '600',
    textAlign: 'center',
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
    padding: 20,
    borderRadius: 8,
    minHeight: 44, // iOS minimum touch target
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 16,
  },
  actionIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
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
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  stepHeader: {
    flexDirection: 'row',
  },
  stepNumberContainer: {
    alignItems: 'center',
    marginRight: 16,
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
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
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  stepImageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  stepImage: {
    width: 200,
    height: 120,
    borderRadius: 12,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
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
  stepQuickActions: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  quickActionsTitle: {
    marginBottom: 12,
    fontWeight: '600',
  },
  quickActionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  stepActionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    minHeight: 44,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  stepActionText: {
    marginLeft: 6,
    fontWeight: '500',
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

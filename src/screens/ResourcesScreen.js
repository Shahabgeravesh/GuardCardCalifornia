import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function ResourcesScreen() {
  const theme = useTheme();
  const [expandedSection, setExpandedSection] = useState(null);

  const resources = [
    {
      id: 'exam-prep',
      title: 'BSIS Exam Preparation',
      icon: 'document-text',
      color: theme.colors.gradientStart,
      gradientEnd: theme.colors.gradientEnd,
      content: [
        {
          title: 'Exam Overview',
          description: 'The BSIS security guard exam consists of 100 multiple-choice questions covering essential topics for security professionals.',
          details: [
            '• Passing score: 70% or higher',
            '• Time limit: 2 hours',
            '• Topics: Legal basis, arrest procedures, use of force, liability, reporting',
            '• Computer-based testing available at approved locations'
          ]
        },
        {
          title: 'Study Tips',
          description: 'Effective strategies to prepare for your BSIS exam:',
          details: [
            '• Review all study materials thoroughly',
            '• Take practice quizzes regularly',
            '• Focus on legal requirements and procedures',
            '• Understand use of force guidelines',
            '• Know reporting requirements and timelines'
          ]
        },
        {
          title: 'Exam Day Preparation',
          description: 'What to bring and expect on exam day:',
          details: [
            '• Valid government-issued photo ID',
            '• Confirmation number from BSIS',
            '• Arrive 30 minutes early',
            '• No electronic devices allowed',
            '• Dress comfortably and professionally'
          ]
        }
      ]
    },
    {
      id: 'additional-training',
      title: 'Additional BSIS Training Required',
      icon: 'school',
      color: theme.colors.gradientSecondary,
      gradientEnd: theme.colors.gradientSecondaryEnd,
      content: [
        {
          title: 'Firearms Training (If Applicable)',
          description: 'Additional training required for armed security positions:',
          details: [
            '• 14-hour firearms training course',
            '• Live fire qualification',
            '• Annual renewal required',
            '• Must be completed at BSIS-approved facility',
            '• Additional background check required'
          ]
        },
        {
          title: 'Baton Training (If Applicable)',
          description: 'Training required for baton certification:',
          details: [
            '• 4-hour baton training course',
            '• Practical demonstration required',
            '• Annual renewal required',
            '• Must be completed at BSIS-approved facility'
          ]
        },
        {
          title: 'Tear Gas Training (If Applicable)',
          description: 'Training required for tear gas certification:',
          details: [
            '• 4-hour tear gas training course',
            '• Practical demonstration required',
            '• Annual renewal required',
            '• Must be completed at BSIS-approved facility'
          ]
        },
        {
          title: 'Ongoing Training Requirements',
          description: 'Continuing education requirements:',
          details: [
            '• 8 hours of continuing education every 2 years',
            '• Must be completed before license renewal',
            '• Topics must be BSIS-approved',
            '• Keep certificates for 2 years'
          ]
        }
      ]
    },
    {
      id: 'contact-info',
      title: 'BSIS Contact Information',
      icon: 'call',
      color: theme.colors.systemTeal,
      gradientEnd: theme.colors.systemCyan,
      content: [
        {
          title: 'Main Office',
          description: 'California Bureau of Security and Investigative Services',
          details: [
            '• Address: 2420 Del Paso Road, Suite 270, Sacramento, CA 95834',
            '• Phone: (916) 322-4000',
            '• Fax: (916) 322-4010',
            '• Hours: Monday-Friday, 8:00 AM - 5:00 PM'
          ]
        },
        {
          title: 'Online Services',
          description: 'Access BSIS services online:',
          details: [
            '• Website: www.bsis.ca.gov',
            '• Breeze System: breeze.ca.gov (Online applications)',
            '• License verification: www.bsis.ca.gov/online_services/ccld/',
            '• Forms and applications available online',
            '• Live Scan locations: www.bsis.ca.gov/online_services/live_scan/'
          ]
        },
        {
          title: 'Email Support',
          description: 'Contact BSIS via email:',
          details: [
            '• General inquiries: bsis@dca.ca.gov',
            '• Licensing questions: bsislicensing@dca.ca.gov',
            '• Enforcement: bsisenforcement@dca.ca.gov',
            '• Response time: 3-5 business days'
          ]
        },
        {
          title: 'Emergency Contact',
          description: 'For urgent matters:',
          details: [
            '• Emergency hotline: (916) 322-4000',
            '• After hours: Leave message for next business day',
            '• For immediate security threats: Contact local law enforcement'
          ]
        }
      ]
    },
    {
      id: 'useful-forms',
      title: 'Useful Forms & Documents',
      icon: 'document',
      color: theme.colors.systemOrange,
      gradientEnd: theme.colors.systemYellow,
      content: [
        {
          title: 'Security Guard Registration Forms',
          description: 'Essential forms for initial security guard licensing:',
          details: [
            '• Security Guard Registration Application (Form 31A-1) - Required for initial registration',
            '• Live Scan Fingerprint Form (Form 31A-2) - Must be completed at approved LiveScan location',
            '• Security Guard Registration Renewal (Form 31A-11) - Required every 2 years',
            '• Address Change Notification (Form 31A-12) - Must be submitted within 30 days',
            '• Name Change Request (Form 31A-13) - Required for legal name changes'
          ]
        },
        {
          title: 'Firearms & Weapons Forms',
          description: 'Forms for armed security positions and weapon permits:',
          details: [
            '• Firearms Qualification Card Application (Form 31A-3) - Required for armed positions',
            '• Firearms Training Certificate (Form 31A-8) - 14-hour training requirement',
            '• Baton Training Certificate Application (Form 31A-4) - Required for baton use',
            '• Baton Training Certificate (Form 31A-9) - 4-hour training requirement',
            '• Tear Gas Training Certificate Application (Form 31A-5) - Required for tear gas use',
            '• Tear Gas Training Certificate (Form 31A-10) - 4-hour training requirement'
          ]
        },
        {
          title: 'Training & Education Forms',
          description: 'Forms related to training schools and continuing education:',
          details: [
            '• Training School Application (Form 31A-6) - For becoming a licensed training provider',
            '• Training Certificate (Form 31A-7) - Proof of completed training',
            '• Continuing Education Certificate (Form 31A-15) - Required for renewal',
            '• Duplicate License Request (Form 31A-14) - For lost or damaged cards',
            '• Training School Directory - List of approved training facilities'
          ]
        },
        {
          title: 'Important Documents & Guides',
          description: 'Essential reference materials and instructions:',
          details: [
            '• Live Scan Fingerprint Instructions - Step-by-step process guide',
            '• Security Guard Handbook - Complete guide to duties and responsibilities',
            '• Use of Force Guidelines - Legal requirements and best practices',
            '• Reporting Requirements Guide - When and how to report incidents',
            '• BSIS Regulations - Complete regulatory requirements'
          ]
        }
      ]
    }
  ];

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const openLink = (url) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Unable to open link');
      }
    });
  };

  const openFormLink = (formType) => {
    const formUrls = {
      'registration': 'https://www.bsis.ca.gov/forms_pubs/forms/security_guard_registration.shtml',
      'livescan': 'https://www.bsis.ca.gov/forms_pubs/forms/live_scan_fingerprint.shtml',
      'firearms': 'https://www.bsis.ca.gov/forms_pubs/forms/firearms_qualification.shtml',
      'baton': 'https://www.bsis.ca.gov/forms_pubs/forms/baton_training.shtml',
      'teargas': 'https://www.bsis.ca.gov/forms_pubs/forms/tear_gas_training.shtml',
      'renewal': 'https://www.bsis.ca.gov/forms_pubs/forms/security_guard_renewal.shtml',
      'handbook': 'https://www.bsis.ca.gov/forms_pubs/publications/security_guard_handbook.shtml',
      'regulations': 'https://www.bsis.ca.gov/forms_pubs/publications/regulations.shtml'
    };
    
    const url = formUrls[formType];
    if (url) {
      openLink(url);
    } else {
      openLink('https://www.bsis.ca.gov/forms_pubs/forms/');
    }
  };

  const renderResourceSection = (resource) => {
    const isExpanded = expandedSection === resource.id;
    
    return (
      <View key={resource.id} style={styles.sectionWrapper}>
        <TouchableOpacity
          style={[
            styles.resourceCard,
            { backgroundColor: theme.colors.systemBackground },
            theme.shadows.md
          ]}
          onPress={() => toggleSection(resource.id)}
          activeOpacity={0.7}
        >
          <View style={styles.resourceHeader}>
            <View style={[styles.resourceIcon, { backgroundColor: resource.color }]}>
              <Ionicons name={resource.icon} size={24} color="#FFFFFF" />
            </View>
            <View style={styles.resourceTitleContainer}>
              <Text style={[styles.resourceTitle, { color: theme.colors.label }, theme.typography.headline]}>
                {resource.title}
              </Text>
            </View>
            <Ionicons
              name={isExpanded ? 'chevron-up' : 'chevron-down'}
              size={24}
              color={theme.colors.secondaryLabel}
            />
          </View>
        </TouchableOpacity>

        {isExpanded && (
          <View style={[styles.expandedContent, { backgroundColor: theme.colors.secondarySystemBackground }]}>
            {resource.content.map((item, index) => (
              <View key={index} style={styles.contentItem}>
                <Text style={[styles.contentTitle, { color: theme.colors.label }, theme.typography.title3]}>
                  {item.title}
                </Text>
                <Text style={[styles.contentDescription, { color: theme.colors.secondaryLabel }, theme.typography.body]}>
                  {item.description}
                </Text>
                <View style={styles.detailsContainer}>
                  {item.details.map((detail, detailIndex) => (
                    <Text key={detailIndex} style={[styles.detailText, { color: theme.colors.tertiaryLabel }, theme.typography.subheadline]}>
                      {detail}
                    </Text>
                  ))}
                </View>
                
                {/* Quick action buttons for important forms */}
                {resource.id === 'useful-forms' && item.title === 'Security Guard Registration Forms' && (
                  <View style={styles.quickActions}>
                    <TouchableOpacity
                      style={[styles.quickActionButton, { backgroundColor: theme.colors.primary }]}
                      onPress={() => openFormLink('registration')}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="download" size={16} color="#FFFFFF" />
                      <Text style={[styles.quickActionText, { color: '#FFFFFF' }, theme.typography.footnote]}>
                        Registration Form
                      </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      style={[styles.quickActionButton, { backgroundColor: theme.colors.success }]}
                      onPress={() => openFormLink('livescan')}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="finger-print" size={16} color="#FFFFFF" />
                      <Text style={[styles.quickActionText, { color: '#FFFFFF' }, theme.typography.footnote]}>
                        LiveScan Form
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                
                {resource.id === 'useful-forms' && item.title === 'Firearms & Weapons Forms' && (
                  <View style={styles.quickActions}>
                    <TouchableOpacity
                      style={[styles.quickActionButton, { backgroundColor: theme.colors.error }]}
                      onPress={() => openFormLink('firearms')}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="shield" size={16} color="#FFFFFF" />
                      <Text style={[styles.quickActionText, { color: '#FFFFFF' }, theme.typography.footnote]}>
                        Firearms Form
                      </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      style={[styles.quickActionButton, { backgroundColor: theme.colors.warning }]}
                      onPress={() => openFormLink('baton')}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="fitness" size={16} color="#FFFFFF" />
                      <Text style={[styles.quickActionText, { color: '#FFFFFF' }, theme.typography.footnote]}>
                        Baton Form
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                
                {resource.id === 'useful-forms' && item.title === 'Important Documents & Guides' && (
                  <View style={styles.quickActions}>
                    <TouchableOpacity
                      style={[styles.quickActionButton, { backgroundColor: theme.colors.info }]}
                      onPress={() => openFormLink('handbook')}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="book" size={16} color="#FFFFFF" />
                      <Text style={[styles.quickActionText, { color: '#FFFFFF' }, theme.typography.footnote]}>
                        Handbook
                      </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      style={[styles.quickActionButton, { backgroundColor: theme.colors.systemPurple }]}
                      onPress={() => openFormLink('regulations')}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="document-text" size={16} color="#FFFFFF" />
                      <Text style={[styles.quickActionText, { color: '#FFFFFF' }, theme.typography.footnote]}>
                        Regulations
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.systemGroupedBackground }]} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>

        <View style={styles.sectionsContainer}>
          {resources.map(renderResourceSection)}
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.colors.quaternaryLabel }, theme.typography.footnote]}>
            For the most up-to-date information, always refer to the official BSIS website
          </Text>
          <View style={styles.footerButtons}>
            <TouchableOpacity
              style={styles.websiteButton}
              onPress={() => openLink('https://www.bsis.ca.gov')}
              activeOpacity={0.7}
            >
              <Ionicons name="globe" size={16} color={theme.colors.primary} />
              <Text style={[styles.websiteButtonText, { color: theme.colors.primary }, theme.typography.footnote]}>
                Visit BSIS Website
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.websiteButton}
              onPress={() => openLink('https://www.bsis.ca.gov/forms_pubs/forms/')}
              activeOpacity={0.7}
            >
              <Ionicons name="document-text" size={16} color={theme.colors.primary} />
              <Text style={[styles.websiteButtonText, { color: theme.colors.primary }, theme.typography.footnote]}>
                Download Forms
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.websiteButton}
              onPress={() => openLink('https://www.bsis.ca.gov/forms_pubs/publications/')}
              activeOpacity={0.7}
            >
              <Ionicons name="book" size={16} color={theme.colors.primary} />
              <Text style={[styles.websiteButtonText, { color: theme.colors.primary }, theme.typography.footnote]}>
                Publications
              </Text>
            </TouchableOpacity>
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
    paddingBottom: 96,
    paddingTop: 4,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  headerTitle: {
    marginBottom: 8,
  },
  headerSubtitle: {
    lineHeight: 22,
  },
  sectionsContainer: {
    paddingHorizontal: 20,
    gap: 20,
  },
  sectionWrapper: {
    marginBottom: 20,
  },
  resourceCard: {
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  resourceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resourceIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  resourceTitleContainer: {
    flex: 1,
  },
  resourceTitle: {
    fontWeight: '600',
  },
  expandedContent: {
    padding: 20,
    borderRadius: 16,
    marginTop: 8,
  },
  contentItem: {
    marginBottom: 24,
  },
  contentTitle: {
    marginBottom: 8,
    fontWeight: '600',
  },
  contentDescription: {
    marginBottom: 12,
    lineHeight: 22,
  },
  detailsContainer: {
    gap: 8,
  },
  detailText: {
    lineHeight: 20,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
    flexWrap: 'wrap',
  },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    minWidth: 120,
  },
  quickActionText: {
    marginLeft: 6,
    fontWeight: '500',
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 24,
    alignItems: 'center',
  },
  footerText: {
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 18,
  },
  footerButtons: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  websiteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  websiteButtonText: {
    marginLeft: 8,
    fontWeight: '500',
  },
});

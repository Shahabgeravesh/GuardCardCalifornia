import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View, Linking, Alert, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { WebView } from 'react-native-webview';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export default function ResourcesScreen() {
  const theme = useTheme();
  const [expandedSection, setExpandedSection] = useState(null);
  const [showWebViewModal, setShowWebViewModal] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const [currentTitle, setCurrentTitle] = useState('');

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
          description: 'The BSIS Power to Arrest (PTA) exam consists of multiple-choice questions covering essential topics for security professionals.',
          details: [
            '• Passing score: 70% or higher',
            '• Time limit: 1 hour',
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
          title: 'Email Support',
          description: 'Contact BSIS via email:',
          details: [
            '• General inquiries: bsis@dca.ca.gov',
            '• Licensing questions: bsislicensing@dca.ca.gov',
            '• Enforcement: bsisenforcement@dca.ca.gov',
            '• Response time: 3-5 business days'
          ]
        },

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
            '• Security Guard Registration Application (Form 31A-1)',
            '• Live Scan Fingerprint Form (Form 31A-2)'
          ]
        },

      ]
    }
  ];

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const openLink = (url, title = 'BSIS Website') => {
    setCurrentUrl(url);
    setCurrentTitle(title);
    setShowWebViewModal(true);
  };

  const downloadForm = async (formType) => {
    const formUrls = {
      'registration': { url: 'https://www.bsis.ca.gov/forms_pubs/gappnew.pdf', title: 'Registration Form' },
      'livescan': { url: 'https://www.bsis.ca.gov/forms_pubs/livescan/guard.pdf', title: 'LiveScan Form' },
      'renewal': { url: 'https://www.bsis.ca.gov/forms_pubs/forms/security_guard_renewal.shtml', title: 'Renewal Form' }
    };
    
    const formInfo = formUrls[formType];
    if (!formInfo) {
      Alert.alert('Error', 'Form not found');
      return;
    }

    try {
      // Show loading alert
      Alert.alert('Downloading...', 'Please wait while the form is being downloaded.');
      
      // Download the file
      const downloadResumable = FileSystem.createDownloadResumable(
        formInfo.url,
        FileSystem.documentDirectory + formInfo.title.replace(/\s+/g, '_') + '.pdf',
        {},
        (downloadProgress) => {
          const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
          console.log(`Downloaded: ${progress * 100}%`);
        }
      );

      const { uri } = await downloadResumable.downloadAsync();
      
      // Share the downloaded file
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          mimeType: 'application/pdf',
          dialogTitle: `Download ${formInfo.title}`,
        });
      } else {
        Alert.alert('Success', `${formInfo.title} has been downloaded to your device.`);
      }
    } catch (error) {
      console.error('Download error:', error);
      Alert.alert('Error', 'Failed to download the form. Please try again.');
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
                          <Text style={[styles.resourceTitle, { color: theme.colors.label }, theme.typography.cardTitle]}>
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
                <Text style={[styles.contentTitle, { color: theme.colors.label }, theme.typography.bodyLarge]}>
                  {item.title}
                </Text>
                <Text style={[styles.contentDescription, { color: theme.colors.secondaryLabel }, theme.typography.body]}>
                  {item.description}
                </Text>
                <View style={styles.detailsContainer}>
                  {item.details.map((detail, detailIndex) => (
                    <Text key={detailIndex} style={[styles.detailText, { color: theme.colors.tertiaryLabel }, theme.typography.body]}>
                      {detail}
                    </Text>
                  ))}
                </View>
                
                {/* Quick action buttons for important forms */}
                {resource.id === 'useful-forms' && item.title === 'Security Guard Registration Forms' && (
                  <View style={styles.quickActions}>
                    <TouchableOpacity
                      style={[styles.quickActionButton, { backgroundColor: theme.colors.primary }]}
                      onPress={() => downloadForm('registration')}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="download" size={16} color="#FFFFFF" />
                      <Text style={[styles.quickActionText, { color: '#FFFFFF' }, theme.typography.body]}>
                        Registration Form
                      </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      style={[styles.quickActionButton, { backgroundColor: theme.colors.success }]}
                      onPress={() => downloadForm('livescan')}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="finger-print" size={16} color="#FFFFFF" />
                      <Text style={[styles.quickActionText, { color: '#FFFFFF' }, theme.typography.body]}>
                        LiveScan Form
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
                      <Text style={[styles.quickActionText, { color: '#FFFFFF' }, theme.typography.body]}>
                        Handbook
                      </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      style={[styles.quickActionButton, { backgroundColor: theme.colors.systemPurple }]}
                      onPress={() => openFormLink('regulations')}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="document-text" size={16} color="#FFFFFF" />
                      <Text style={[styles.quickActionText, { color: '#FFFFFF' }, theme.typography.body]}>
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
        
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerIconContainer}>
            <Ionicons name="library" size={24} color="#4257B2" />
          </View>
          <Text style={[styles.headerTitle, { color: theme.colors.label }, theme.typography.sectionTitle]}>
            BSIS Resources
          </Text>
          <Text style={[styles.headerSubtitle, { color: theme.colors.secondaryLabel }, theme.typography.body]}>
            Essential information and forms for your security guard journey
          </Text>
        </View>

        {/* Resources Sections */}
        <View style={styles.sectionsContainer}>
          {resources.map(renderResourceSection)}
        </View>

        {/* Footer Section */}
        <View style={styles.footer}>
          <View style={styles.footerCard}>
            <Text style={[styles.footerText, { color: theme.colors.secondaryLabel }, theme.typography.body]}>
              For the most up-to-date information, always refer to the official BSIS website
            </Text>
            <View style={styles.footerButtons}>
              <TouchableOpacity
                style={styles.websiteButton}
                onPress={() => openLink('https://www.bsis.ca.gov')}
                activeOpacity={0.7}
              >
                <Ionicons name="globe" size={18} color="#4257B2" />
                <Text style={[styles.websiteButtonText, { color: '#4257B2' }, theme.typography.buttonText]}>
                  Visit BSIS Website
                </Text>
              </TouchableOpacity>
              

            </View>
          </View>
        </View>
      </ScrollView>

      {/* WebView Modal */}
      <Modal
        visible={showWebViewModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowWebViewModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowWebViewModal(false)}
              accessibilityRole="button"
              accessibilityLabel="Close web viewer"
            >
              <Ionicons name="close" size={24} color={theme.colors.label} />
            </TouchableOpacity>
            <Text style={[styles.modalTitle, { color: theme.colors.label }, theme.typography.cardTitle]}>
              {currentTitle}
            </Text>
            <View style={styles.placeholder} />
          </View>
          
          <WebView
            source={{ uri: currentUrl }}
            style={styles.webView}
            startInLoadingState={true}
            renderLoading={() => (
              <View style={styles.loadingContainer}>
                <Text style={[styles.loadingText, { color: theme.colors.secondaryLabel }]}>
                  Loading...
                </Text>
              </View>
            )}
            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.warn('WebView error: ', nativeEvent);
              Alert.alert('Error', 'Unable to load the content. Please check your internet connection.');
            }}
          />
        </SafeAreaView>
      </Modal>
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
    paddingBottom: 40,
    paddingTop: 16,
  },
  
  // Header Section
  header: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 12,
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
    alignItems: 'center',
  },
  headerIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(66, 87, 178, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#4257B2',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTitle: {
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    textAlign: 'center',
    lineHeight: 20,
  },
  
  // Sections Container
  sectionsContainer: {
    paddingHorizontal: 16,
    gap: 16,
  },
  sectionWrapper: {
    marginBottom: 16,
  },
  
  // Resource Cards
  resourceCard: {
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  resourceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resourceIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
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
  
  // Expanded Content
  expandedContent: {
    padding: 20,
    borderRadius: 8,
    marginTop: 16,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  contentItem: {
    marginBottom: 20,
  },
  contentTitle: {
    marginBottom: 8,
    fontWeight: '600',
  },
  contentDescription: {
    marginBottom: 12,
    lineHeight: 20,
  },
  detailsContainer: {
    gap: 6,
  },
  detailText: {
    lineHeight: 18,
  },
  
  // Quick Actions
  quickActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
    flexWrap: 'wrap',
  },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    minWidth: 120,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  quickActionText: {
    marginLeft: 8,
    fontWeight: '500',
  },
  
  // Footer Section
  footer: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  footerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
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
    alignItems: 'center',
  },
  footerText: {
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
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
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: 'rgba(66, 87, 178, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(66, 87, 178, 0.2)',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  websiteButtonText: {
    marginLeft: 8,
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  closeButton: {
    padding: 8,
  },
  modalTitle: {
    fontWeight: '600',
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  webView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

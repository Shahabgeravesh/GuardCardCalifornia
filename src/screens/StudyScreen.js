import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Linking,
  Alert,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { WebView } from 'react-native-webview';

const { width: screenWidth } = Dimensions.get('window');

const studyTopics = [
  {
    id: 'overview',
    title: 'Powers to Arrest Training Manual Overview',
    content: `DEPARTMENT OF CONSUMER AFFAIRS
Bureau of Security and Investigative Services

POWERS TO ARREST AND APPROPRIATE USE OF FORCE TRAINING MANUAL
July 2023

STATE OF CALIFORNIA

This comprehensive training manual is the official BSIS training material for security guards in California. The manual covers all essential topics required for security guard certification and is based on California Business and Professions Code requirements.

TRAINING REQUIREMENTS:
• Every security guard must complete this training before beginning duties
• Required for both armed and unarmed security positions
• Training must be provided by BSIS-approved instructors
• Must be completed within specified timeframes
• Ongoing training and continuing education required

MANUAL STRUCTURE:
The manual is divided into two main parts:
PART A: Power to Arrest
PART B: Appropriate Use of Force

Each part contains multiple sections with detailed content, real-life scenarios, and review questions to ensure comprehensive understanding of all topics.

LEGAL BASIS:
This training is based on California Business and Professions Code sections:
• 7582.1(a) - Definition of private patrol operator
• 7582.1(e) - Definition of security guard
• 7574.01(e) - Definition of proprietary private security employer
• 7574.01(f) - Definition of proprietary private security officer
• 7590.2(a) - Definition of alarm company operator
• 7590.1(b) - Definition of alarm agent

TRAINING OBJECTIVES:
• Understand legal authority and limitations of security personnel
• Master proper arrest and detention procedures
• Learn use of force guidelines and legal standards
• Develop de-escalation and communication skills
• Build cultural competency and bias awareness
• Understand mental health crisis intervention
• Prepare for active shooter and emergency situations
• Know reporting requirements and documentation standards`,
    icon: 'shield-checkmark',
    color: '#4257B2',
    duration: '8 hours',
    category: 'Overview'
  },
  {
    id: 'roles-responsibilities',
    title: 'Roles and Responsibilities of Security Personnel',
    content: `PART A: POWER TO ARREST
Section 1: The Roles and Responsibilities of Security Personnel

BACKGROUND OF THE PRIVATE SECURITY PROFESSION:
Security guards are private citizens with limited authority under California law. They work under contract with private patrol operators and their primary role is to protect persons and property while operating within strict legal boundaries.

ROLES AND RESPONSIBILITIES:
Security personnel have specific roles defined by California Business and Professions Code:

Private Patrol Operator (Section 7582.1(a)):
A private patrol operator is a person who, for any consideration whatsoever:
• Agrees to furnish, or furnishes, a watchman, guard, patrolperson, or other person to protect persons or property
• Prevents the theft, unlawful taking, loss, embezzlement, misappropriation, or concealment of any goods, wares, merchandise, money, bonds, stocks, notes, documents, papers, or property of any kind
• Performs the service of a watchman, guard, patrolperson, or other person for any of these purposes

Security Guard (Section 7582.1(e)):
A security guard is an employee of a private patrol operator, or an employee of a lawful business or public agency who:
• Performs security functions on or about premises owned or controlled by the customer of the private patrol operator
• Works in the company of persons being protected
• Is not exempted pursuant to Section 7582.2

AREAS OF RESPONSIBILITY:
• Premises owned or controlled by employer/client
• Areas specified in employment contract
• Locations where protection services are provided
• Must understand jurisdictional limitations
• Cannot operate outside authorized areas

PREVENTION IS THE KEY:
The most effective security is preventive. Security personnel should:
• Maintain visible presence to deter criminal activity
• Conduct regular patrols to identify potential problems early
• Build professional relationships with the community
• Report suspicious activities immediately
• Document all observations and incidents

OBSERVE AND REPORT:
Primary function of security personnel:
• Observe suspicious activities and behaviors
• Report incidents to appropriate authorities
• Document all observations accurately
• Maintain detailed incident reports
• Preserve evidence when necessary

GETTING HELP:
Security personnel must know when and how to get assistance:
• Contact law enforcement for criminal activities
• Notify supervisors of incidents
• Request backup when needed
• Coordinate with other security personnel
• Follow emergency protocols

RELATIONS WITH PEACE OFFICERS AND LAW ENFORCEMENT:
• Security personnel are not law enforcement officers
• Must cooperate with law enforcement when requested
• Cannot interfere with law enforcement investigations
• Should provide information and assistance when appropriate
• Must understand jurisdictional boundaries

OBSERVATION AND REPORT WRITING:
Essential skills for security personnel:
• Accurate observation and documentation
• Detailed incident reporting
• Evidence preservation
• Witness statement collection
• Professional report writing standards

PROFESSIONAL CONDUCT OF SECURITY PERSONNEL:
• Maintain professional appearance and demeanor
• Treat all persons with respect and dignity
• Follow company policies and procedures
• Adhere to legal and ethical standards
• Represent the profession positively

CONTRACTUAL OBLIGATIONS AND COMPANY POLICIES:
• Understand employment contract terms
• Follow company policies and procedures
• Maintain confidentiality requirements
• Meet performance standards
• Comply with training requirements

REAL-LIFE SCENARIOS:
The manual provides detailed scenarios covering:
• Routine patrol situations
• Suspicious activity encounters
• Emergency response procedures
• Law enforcement coordination
• Professional conduct examples`,
    icon: 'people',
    color: '#34C759',
    duration: '1 hour',
    category: 'Legal'
  },
  {
    id: 'encounters-arrest',
    title: 'Encounters and Arrest Procedures',
    content: `PART A: POWER TO ARREST
Section 2: Encounters and Arrest

AUTHORITY TO QUESTION:
Security guards have limited authority to question individuals:
• Can question individuals on private property they are authorized to protect
• Must have reasonable suspicion of criminal activity
• Cannot detain individuals without probable cause
• Must respect individual constitutional rights
• Cannot use force to compel answers

A BASIS FOR MAKING DECISIONS:
Security personnel must have a legal basis for their actions:
• Reasonable suspicion of criminal activity
• Probable cause for arrest
• Authority under merchant's privilege
• Contractual obligations and company policies
• Legal limitations and restrictions

INSPECTIONS:
Security personnel may conduct inspections under certain circumstances:
• Package inspections at secure facilities
• Vehicle inspections at controlled access points
• Property inspections for safety and security
• Must have proper authorization and legal basis
• Cannot conduct searches without legal authority

CITIZEN'S ARREST:
Security guards have limited arrest powers as private citizens:
• Can arrest for felonies committed in their presence
• Can arrest for misdemeanors that constitute a breach of peace
• Must immediately deliver arrested person to peace officer
• Cannot use excessive force during arrest
• Must follow proper arrest procedures

WHAT FACTORS SHOULD YOU CONSIDER?
Before making any arrest, consider:
• Is there probable cause for arrest?
• Is the offense arrestable under citizen's arrest authority?
• Are there alternatives to arrest?
• Is force necessary and reasonable?
• What are the legal consequences?

ARRESTABLE OFFENSES:

Infraction:
• Traffic violations
• Minor code violations
• Administrative violations
• Cannot arrest for infractions
• Can only cite or report

Misdemeanors:
• Theft under $950
• Trespass
• Disorderly conduct
• Simple assault
• Vandalism
• Can arrest if constituting breach of peace

Trespass:
• Unauthorized entry on private property
• Remaining after being asked to leave
• Violating posted restrictions
• Must have proper authority to enforce
• Follow company policies and procedures

Felonies:
• Burglary
• Robbery
• Assault with deadly weapon
• Grand theft
• Serious violent crimes
• Can arrest if committed in presence

PRIVATE PERSON'S ARREST:
Legal requirements for citizen's arrest:
• Must have witnessed the crime
• Must have probable cause
• Must use reasonable force only
• Must deliver to peace officer immediately
• Cannot hold for extended periods

MAKING A CITIZEN'S ARREST:
Step-by-step procedures:
1. Identify yourself as security guard
2. State reason for arrest clearly
3. Use minimum force necessary
4. Contact law enforcement immediately
5. Document all actions taken
6. Preserve evidence properly
7. Provide detailed report

SEARCHING A SUBJECT:
Legal limitations on searches:
• Can search for weapons under merchant's privilege
• Must have reasonable suspicion
• Cannot conduct full body searches
• Must preserve evidence properly
• Follow company policies and procedures

SEARCHING A SUBJECT UNDER THE MERCHANT'S PRIVILEGE RULE:
Limited search authority:
• Can detain suspected shoplifters
• Can search packages and bags
• Must have reasonable suspicion
• Cannot use excessive force
• Must contact law enforcement promptly

AFTER THE ARREST:
Post-arrest procedures:
• Contact law enforcement immediately
• Provide detailed incident report
• Preserve all evidence
• Document all actions taken
• Cooperate with law enforcement investigation
• Follow company reporting procedures`,
    icon: 'lock-closed',
    color: '#FF9500',
    duration: '2 hours',
    category: 'Procedures'
  },
  {
    id: 'use-of-force-legal',
    title: 'Legal Standards for Use of Force',
    content: `PART B: APPROPRIATE USE OF FORCE
Section 1: Legal Standards for Use of Force

STATUTES AND LEGAL CONSIDERATIONS:
The legal framework for use of force is based on California Penal Code Section 835a and other relevant statutes:

California Penal Code Section 835a:
• Establishes the "objectively reasonable" standard for use of force
• Requires force to be necessary under the circumstances
• Considers the totality of circumstances
• Protects constitutional rights of individuals

Legal Considerations:
• Fourth Amendment protection against unreasonable seizures
• Due process rights under the Fourteenth Amendment
• State constitutional protections
• Civil rights laws and regulations
• Criminal statutes governing assault and battery

LICENSEE AND CLIENT CONTRACTUAL OBLIGATIONS:
Security personnel must understand and follow:

Company Use of Force Policies:
• Specific policies and procedures
• Training requirements and standards
• Reporting and documentation requirements
• Supervision and oversight responsibilities
• Disciplinary procedures for violations

Training Requirements:
• Initial training on use of force
• Ongoing training and refresher courses
• Scenario-based training exercises
• Legal updates and changes
• Documentation of training completion

Reporting Requirements:
• Immediate reporting of all force incidents
• Detailed documentation of circumstances
• Witness statements and evidence collection
• Supervisor notification and review
• Legal review when necessary

CIVIL AND CRIMINAL LIABILITY:
Understanding potential legal consequences:

Civil Liability:
• False arrest lawsuits
• Excessive force claims
• Negligence lawsuits
• Property damage claims
• Emotional distress claims
• Punitive damages in extreme cases

Criminal Liability:
• Assault and battery charges
• False imprisonment
• Civil rights violations
• Criminal negligence
• Manslaughter in extreme cases
• Federal civil rights charges

Protection Measures:
• Follow proper procedures and policies
• Document all actions thoroughly
• Maintain training records
• Carry appropriate insurance
• Consult with supervisors and legal counsel
• Stay current with legal developments

KEY LEGAL PRINCIPLES:
Essential legal concepts for security personnel:

Objectively Reasonable Standard:
• Force must be necessary under the circumstances
• Must be proportional to the threat
• Consider officer and subject factors
• Evaluate environmental conditions
• Assess totality of circumstances

Totality of Circumstances:
• Severity of the crime
• Immediate threat to safety
• Active resistance or flight
• Officer and subject factors
• Environmental conditions
• Available alternatives

Documentation Requirements:
• Detailed incident reports
• Witness statements
• Evidence preservation
• Photographic documentation
• Medical reports when applicable
• Legal review documentation

Legal Consequences:
• Civil lawsuits and damages
• Criminal charges and penalties
• Loss of employment
• Loss of security license
• Personal financial liability
• Professional reputation damage

Seeking Legal Counsel:
• Consult with company legal department
• Retain personal legal counsel when necessary
• Understand rights and obligations
• Prepare for legal proceedings
• Maintain confidentiality of legal communications`,
    icon: 'scale',
    color: '#FF3B30',
    duration: '1.5 hours',
    category: 'Legal'
  },
  {
    id: 'reasonable-force',
    title: 'Use of Objectively Reasonable Force',
    content: `Understanding when and how force can be used appropriately:

Objectively Reasonable Standard:
• Force must be necessary under circumstances
• Must be proportional to threat
• Consider officer and subject factors
• Evaluate environmental conditions

Restraint Techniques and Implications:
• Handcuffing procedures and safety
• Control holds and pressure points
• Less lethal weapon deployment
• Medical considerations and risks

Force Options Continuum:
• Presence - Being visible and professional
• Verbal commands - Clear, calm instructions
• Empty hand control - Physical restraint techniques
• Less lethal weapons - Pepper spray, baton, TASER
• Lethal force - Only in extreme circumstances

Real-Life Scenarios:
• Domestic disturbance calls
• Shoplifting incidents
• Trespass situations
• Mental health crises
• Active shooter scenarios

Key Considerations:
• Always try de-escalation first
• Use minimum force necessary
• Consider alternatives to force
• Document all force used
• Understand legal consequences`,
    icon: 'fitness',
    color: '#5856D6',
    duration: '2 hours',
    category: 'Force'
  },
  {
    id: 'de-escalation',
    title: 'De-Escalation and Communication Training',
    content: `Essential techniques for preventing and resolving conflicts:

Common Misconceptions and Benefits:
• De-escalation is not weakness
• Effective communication prevents violence
• Professional approach builds trust
• Reduces liability and injuries

Four Concepts of De-Escalation:
1. Self-Control: Maintain emotional stability
2. Communication: Clear, calm verbal skills
3. Scene Management: Control environment and bystanders
4. Force Options: Understand available alternatives

Real-Life Scenarios:
• Angry customer situations
• Mental health crises
• Domestic disturbances
• Crowd control situations
• Trespass incidents

Communication Techniques:
• Active listening skills
• Non-threatening body language
• Clear, simple instructions
• Cultural sensitivity awareness
• Patience and persistence

Benefits of De-Escalation:
• Prevents injuries to all parties
• Reduces legal liability
• Builds community trust
• Professional reputation
• Cost-effective approach`,
    icon: 'chatbubbles',
    color: '#FF2D92',
    duration: '1.5 hours',
    category: 'Communication'
  },
  {
    id: 'bias-cultural',
    title: 'Implicit Bias and Cultural Competency',
    content: `Understanding and addressing bias in security work:

Definitions:
• Implicit Bias: Unconscious attitudes and stereotypes
• Explicit Bias: Conscious prejudices and discrimination
• Cultural Competency: Understanding diverse communities
• Stereotypes: Oversimplified beliefs about groups

Perceptions and Stereotypes:
• How bias affects decision-making
• Recognizing personal biases
• Impact on professional judgment
• Building awareness and skills

Strategies for Effective Communication:
• Respect cultural differences
• Avoid assumptions and stereotypes
• Use inclusive language
• Understand cultural norms
• Build community relationships

Real-Life Scenarios:
• Language barriers and communication
• Cultural misunderstandings
• Religious accommodations
• Community-specific concerns
• Building trust in diverse areas

Overcoming Bias:
• Self-awareness and reflection
• Training and education
• Community engagement
• Professional development
• Accountability and oversight`,
    icon: 'globe',
    color: '#AF52DE',
    duration: '1 hour',
    category: 'Communication'
  },
  {
    id: 'disabilities-mental-health',
    title: 'Disabilities and Mental Health Awareness',
    content: `Understanding and responding to individuals with disabilities or mental health issues:

Strategies for Identification and Communication:
• Recognizing signs of mental illness
• Understanding different disabilities
• Effective communication techniques
• De-escalation approaches

Types of Mental Health Issues:
• Mood disorders (depression, bipolar)
• Anxiety disorders
• Psychotic disorders (schizophrenia)
• Substance abuse issues
• Developmental disabilities

Communication Techniques:
• Speak clearly and calmly
• Use simple, direct language
• Allow time for responses
• Respect personal space
• Avoid assumptions

De-Escalation Approaches:
• Remain calm and patient
• Use non-threatening body language
• Provide clear, simple instructions
• Avoid sudden movements
• Seek professional help when needed

Real-Life Scenarios:
• Suicidal individuals
• Psychotic episodes
• Substance abuse situations
• Developmental disability interactions
• Crisis intervention techniques`,
    icon: 'medical',
    color: '#30D158',
    duration: '1.5 hours',
    category: 'Mental Health'
  },
  {
    id: 'active-shooter',
    title: 'Active Shooter Situations',
    content: `Understanding and responding to active shooter incidents:

Recognizing an Active Shooter Situation:
• Individual actively engaged in killing
• Usually using firearms
• No pattern to victim selection
• Situation evolves quickly

Roles and Responsibilities:
• Security personnel are not law enforcement
• Primary duty is to protect yourself
• Guide others to safety when possible
• Provide information to law enforcement

Run, Hide, Fight Response:
1. RUN: Evacuate if safe to do so
   • Have escape route planned
   • Leave belongings behind
   • Help others escape
   • Call 911 when safe

2. HIDE: If evacuation not possible
   • Find secure hiding place
   • Lock and barricade doors
   • Silence phones and devices
   • Remain quiet and still

3. FIGHT: As last resort only
   • Act aggressively
   • Use improvised weapons
   • Commit to actions
   • Work with others

When Law Enforcement Arrives:
• Remain calm and follow instructions
• Keep hands visible
• Avoid sudden movements
• Provide information about shooter
• Do not interfere with response`,
    icon: 'warning',
    color: '#FF6B35',
    duration: '1 hour',
    category: 'Emergency'
  },
  {
    id: 'reporting-requirements',
    title: 'Incident Reporting Requirements',
    content: `Essential reporting procedures for all security incidents:

Incident Reporting Requirements:
• All incidents must be documented
• Reports due within specified timeframes
• Must include all relevant details
• Preserve evidence and documentation

Required Reports:
• Use of force incidents
• Arrests and detentions
• Property damage
• Injuries sustained
• Suspicious activities
• Mental health crises

Report Elements:
• Date, time, and location
• All parties involved
• Detailed description of events
• Actions taken by security
• Witness statements
• Evidence collected

Documentation Standards:
• Objective facts only
• Avoid opinions or conclusions
• Include all relevant details
• Submit within required timeframe
• Keep copies for records
• Maintain confidentiality

Legal Considerations:
• Reports may be subpoenaed
• Accuracy is essential
• Timeliness is required
• Professional standards apply
• Legal liability protection`,
    icon: 'document-text',
    color: '#007AFF',
    duration: '1 hour',
    category: 'Procedures'
  }
];

const StudyScreen = () => {
  const theme = useTheme();
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showPdfModal, setShowPdfModal] = useState(false);

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
          <Text style={[styles.topicTitle, { color: theme.colors.text }, theme.typography.cardTitle]}>
            {topic.title}
          </Text>
          <Text style={[styles.topicDuration, { color: theme.colors.secondaryText }, theme.typography.bodySmall]}>
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
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['left', 'right', 'bottom']}>
      {selectedTopic ? (
        renderTopicDetail()
      ) : (
        <>
          <View style={styles.header}>
            <View style={styles.headerIconContainer}>
              <Ionicons name="book" size={20} color="#4257B2" />
            </View>
            <Text style={[styles.headerSubtitle, { color: theme.colors.label }, theme.typography.sectionTitle, styles.essentialContentText]}>
              Learn the essential content for your security guard training
            </Text>
          </View>



          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Pinned Guide Section */}
            <View style={styles.pinnedGuideContainer}>
              <View style={styles.pinnedGuideCard}>
                <View style={styles.pinnedGuideHeader}>
                  <Text style={[styles.pinnedGuideTitle, { color: '#000000' }, styles.quickReferenceTitle]}>
                    Quick Reference Guide
                  </Text>
                </View>
                <Text style={[styles.pinnedGuideContent, { color: '#FFFFFF' }, theme.typography.body]}>
                  This study material is the official BSIS Powers to Arrest and Appropriate Use of Force Training Manual (July 2023). Use the button below to access the official PDF manual.
                </Text>
                <View style={styles.pinnedGuideTips}>
                  <Text style={[styles.pinnedGuideTipsTitle, { color: '#000000' }, styles.studyTipsTitle]}>
                    Study Tips:
                  </Text>
                  <Text style={[styles.pinnedGuideTipsContent, { color: '#FFFFFF' }, theme.typography.body]}>
                    • Read each section thoroughly and take notes{'\n'}
                    • Focus on legal requirements and procedures{'\n'}
                    • Practice with the quiz questions{'\n'}
                    • Review real-life scenarios carefully{'\n'}
                    • Understand use of force guidelines{'\n'}
                    • Know reporting requirements and timelines
                  </Text>
                </View>
                <View style={styles.pinnedGuideFooter}>
                  <Ionicons name="information-circle" size={16} color="#FFFFFF" />
                  <Text style={[styles.pinnedGuideFooterText, { color: '#FFFFFF' }, theme.typography.bodySmall]}>
                    Access the official training manual
                  </Text>
                </View>
                
                {/* Obvious Button */}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity 
                    style={styles.obviousButton}
                    onPress={() => setShowPdfModal(true)}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="document-text" size={20} color="#4257B2" />
                    <Text style={[styles.buttonText, { color: '#4257B2' }, theme.typography.buttonText]}>
                      OPEN TRAINING MANUAL
                    </Text>
                    <Ionicons name="arrow-forward" size={20} color="#4257B2" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>


          </ScrollView>
        </>
      )}

      {/* PDF Modal */}
      <Modal
        visible={showPdfModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowPdfModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowPdfModal(false)}
              accessibilityRole="button"
              accessibilityLabel="Close PDF viewer"
            >
              <Ionicons name="close" size={24} color={theme.colors.label} />
            </TouchableOpacity>
            <Text style={[styles.modalTitle, { color: theme.colors.label }, theme.typography.cardTitle]}>
              BSIS Training Manual
            </Text>
            <View style={styles.placeholder} />
          </View>
          
          <WebView
            source={{ uri: 'https://bsis.ca.gov/forms_pubs/poa.pdf' }}
            style={styles.webView}
            startInLoadingState={true}
            renderLoading={() => (
              <View style={styles.loadingContainer}>
                <Text style={[styles.loadingText, { color: theme.colors.secondaryLabel }]}>
                  Loading PDF...
                </Text>
              </View>
            )}
            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.warn('WebView error: ', nativeEvent);
              Alert.alert('Error', 'Unable to load the PDF. Please check your internet connection.');
            }}
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingTop: 0,
  },
  header: {
    padding: 20,
    paddingBottom: 16,
    backgroundColor: '#F8FAFF',
    borderWidth: 1,
    borderColor: '#E1E8FF',
    shadowColor: '#4257B2',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 20,
    alignItems: 'center',
    borderRadius: 12,
  },
  headerIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(66, 87, 178, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
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
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
    letterSpacing: 0.2,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
    textAlign: 'center',
    opacity: 0.8,
  },
  essentialContentText: {
    fontSize: 24,
    fontWeight: '900',
    lineHeight: 28,
    textAlign: 'center',
    color: '#4257B2',
    textShadowColor: 'rgba(66, 87, 178, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    marginBottom: 8,
  },
  quickReferenceTitle: {
    fontSize: 22,
    fontWeight: '900',
    lineHeight: 26,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  studyTipsTitle: {
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },

  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 4,
  },
  topicsContainer: {
    gap: 16,
    paddingBottom: 32,
  },
  pinnedGuideContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  pinnedGuideCard: {
    backgroundColor: '#4257B2',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#4257B2',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  pinnedGuideHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  pinnedGuideTitle: {
    marginLeft: 8,
    fontWeight: '600',
    flex: 1,
  },
  linkIcon: {
    marginLeft: 'auto',
  },
  pinnedGuideContent: {
    lineHeight: 20,
    marginBottom: 16,
  },
  pinnedGuideTips: {
    marginBottom: 16,
  },
  pinnedGuideTipsTitle: {
    fontWeight: '600',
    marginBottom: 8,
  },
  pinnedGuideTipsContent: {
    lineHeight: 18,
  },
  pinnedGuideFooter: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  pinnedGuideFooterText: {
    marginLeft: 8,
    lineHeight: 16,
    flex: 1,
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
  buttonContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  obviousButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minWidth: 200,
  },
  buttonText: {
    fontWeight: '600',
    marginHorizontal: 8,
    textAlign: 'center',
  },
  topicCard: {
    borderRadius: 8,
    padding: 20,
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
  topicHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
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

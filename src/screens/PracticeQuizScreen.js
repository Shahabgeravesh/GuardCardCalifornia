import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const { width: screenWidth } = Dimensions.get('window');

const studyQuestions = [
  {
    id: '1',
    question: 'What is the primary role of a security guard?',
    options: ['To arrest criminals', 'To observe and report', 'To carry weapons', 'To investigate crimes'],
    correctAnswer: 1,
    category: 'Basic Role',
    explanation: 'Security guards primarily observe and report suspicious activities rather than taking law enforcement actions.'
  },
  {
    id: '2',
    question: 'Before anything happens, what is the security officer\'s role?',
    options: ['Detain and punish', 'Stay out of sight', 'To help prevent incidents', 'Search and seize'],
    correctAnswer: 2,
    category: 'Prevention',
    explanation: 'Prevention is the key role of security officers - stopping incidents before they occur through presence and vigilance.'
  },
  {
    id: '3',
    question: 'Security officers are not legally allowed to:',
    options: ['Arrest someone', 'Protect property', 'Observe and report', 'Act like law enforcement'],
    correctAnswer: 3,
    category: 'Legal Limitations',
    explanation: 'Security officers cannot act like law enforcement. They have limited authority and must stay within their legal boundaries.'
  },
  {
    id: '4',
    question: 'If police order you to stand back during an emergency, you should:',
    options: ['Continue performing your regular duties', 'Follow their lawful commands', 'Watch closely and get involved if needed', 'Call your supervisor instead'],
    correctAnswer: 1,
    category: 'Police Relations',
    explanation: 'Security officers must always comply with lawful police commands and defer to their authority.'
  },
  {
    id: '5',
    question: 'How is the public most likely to judge a security guard?',
    options: ['By appearance', 'By how they speak', 'By attitude', 'All of the above'],
    correctAnswer: 3,
    category: 'Professional Image',
    explanation: 'Public perception is based on the complete package: appearance, communication, and attitude.'
  },
  {
    id: '6',
    question: 'You can make a misdemeanor arrest if:',
    options: ['You think it happened', 'You saw it happen', 'Someone told you', 'It was on camera'],
    correctAnswer: 1,
    category: 'Arrest Authority',
    explanation: 'For misdemeanors, you must witness the crime yourself to have authority to detain.'
  },
  {
    id: '7',
    question: 'When detaining a burglary suspect, you must:',
    options: ['Say you\'re making an arrest', 'Name the charge', 'State your authority', 'All of the above'],
    correctAnswer: 3,
    category: 'Detention Procedures',
    explanation: 'Proper detention requires identifying yourself, stating your authority, and explaining the reason for detention.'
  },
  {
    id: '8',
    question: 'If a suspect resists and bystanders are nearby, you can:',
    options: ['Hope someone helps', 'Legally demand help', 'Yell for police', 'Detain everyone present'],
    correctAnswer: 1,
    category: 'Use of Force',
    explanation: 'Security officers can legally request assistance from bystanders when making a lawful detention.'
  },
  {
    id: '9',
    question: 'When should you search a suspect?',
    options: ['Every time you detain someone', 'Only if told to by a supervisor', 'If you believe they may be armed', 'If they\'re acting strange'],
    correctAnswer: 2,
    category: 'Search Authority',
    explanation: 'Searches are only justified when there\'s reasonable belief the person may be armed and dangerous.'
  },
  {
    id: '10',
    question: 'Can you delay calling the police to let your supervisor question a suspect?',
    options: ['Yes, within reason', 'No', 'Only with permission', 'Not if it\'s serious'],
    correctAnswer: 1,
    category: 'Police Notification',
    explanation: 'Police must be called immediately when detaining someone. Delays can result in false imprisonment charges.'
  },
  {
    id: '11',
    question: 'A false arrest can result in:',
    options: ['A warning', 'Criminal charges', 'Civil and criminal liability', 'Loss of contract'],
    correctAnswer: 2,
    category: 'Legal Consequences',
    explanation: 'False arrest exposes you to both civil lawsuits and criminal charges.'
  },
  {
    id: '12',
    question: 'If someone sues you for money, it\'s called:',
    options: ['Civil liability', 'Criminal liability', 'Legal immunity', 'Corporate defense'],
    correctAnswer: 0,
    category: 'Legal Terms',
    explanation: 'Civil liability involves lawsuits for monetary damages, separate from criminal charges.'
  },
  {
    id: '13',
    question: 'Use of force is judged based on:',
    options: ['How others saw it', 'What was happening at the time', 'If there\'s a video', 'Officer\'s gut feeling'],
    correctAnswer: 1,
    category: 'Use of Force',
    explanation: 'Force is evaluated based on the totality of circumstances at the moment it was used.'
  },
  {
    id: '14',
    question: 'An "imminent threat" means:',
    options: ['Something may happen next week', 'Danger could happen at any moment', 'The suspect is nervous', 'None of the above'],
    correctAnswer: 1,
    category: 'Use of Force',
    explanation: 'Imminent threat means danger is about to happen immediately, not in the future.'
  },
  {
    id: '15',
    question: 'What is the minimum force you should use?',
    options: ['Whatever it takes', 'Reasonable force', 'Deadly force if needed', 'No force at all'],
    correctAnswer: 1,
    category: 'Use of Force',
    explanation: 'Security officers must use only reasonable force necessary to accomplish their lawful objectives.'
  },
  {
    id: '16',
    question: 'When can you use deadly force?',
    options: ['To protect property', 'To stop a fleeing suspect', 'To prevent serious injury or death', 'When you feel threatened'],
    correctAnswer: 2,
    category: 'Use of Force',
    explanation: 'Deadly force is only justified to prevent serious injury or death to yourself or others.'
  },
  {
    id: '17',
    question: 'What should you do after using force?',
    options: ['Forget about it', 'Document everything', 'Tell only your supervisor', 'Keep it confidential'],
    correctAnswer: 1,
    category: 'Documentation',
    explanation: 'All use of force incidents must be thoroughly documented for legal protection.'
  },
  {
    id: '18',
    question: 'Who is responsible for your actions on duty?',
    options: ['Your employer only', 'You only', 'Both you and your employer', 'The police'],
    correctAnswer: 2,
    category: 'Liability',
    explanation: 'Both the security officer and their employer can be held liable for actions taken on duty.'
  },
  {
    id: '19',
    question: 'What is the purpose of the Power to Arrest training?',
    options: ['To learn how to fight', 'To understand legal limitations', 'To become a police officer', 'To carry weapons'],
    correctAnswer: 1,
    category: 'Training Purpose',
    explanation: 'The training teaches security guards to understand their legal limitations and proper procedures.'
  },
  {
    id: '20',
    question: 'How long is the Power to Arrest training?',
    options: ['4 hours', '8 hours', '16 hours', '24 hours'],
    correctAnswer: 1,
    category: 'Training Requirements',
    explanation: 'The Power to Arrest training is 8 hours total, including both online and in-person components.'
  }
];

const PracticeQuizScreen = () => {
  const theme = useTheme();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const resetStudy = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
  };

  const selectAnswer = (answerIndex) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const nextStudyQuestion = () => {
    if (currentQuestion < studyQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const previousStudyQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const getCurrentQuestion = () => {
    return studyQuestions[currentQuestion];
  };

  const isAnswerSelected = (answerIndex) => {
    return selectedAnswers[currentQuestion] === answerIndex;
  };

  const isAnswerCorrect = (answerIndex) => {
    const question = getCurrentQuestion();
    return answerIndex === question.correctAnswer;
  };

  const getProgressPercentage = () => {
    return ((currentQuestion + 1) / studyQuestions.length) * 100;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
            Power to Arrest Study
          </Text>
          <Text style={[styles.headerSubtitle, { color: theme.colors.secondaryText }]}>
            Question {currentQuestion + 1} of {studyQuestions.length}
          </Text>
        </View>

        {/* Progress Bar */}
        <View style={[styles.progressContainer, { backgroundColor: theme.colors.border }]}>
          <View 
            style={[
              styles.progressBar, 
              { 
                backgroundColor: theme.colors.primary,
                width: `${getProgressPercentage()}%`
              }
            ]} 
          />
        </View>

        {/* Question Card */}
        <View style={[styles.questionCard, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.questionText, { color: theme.colors.text }]}>
            {getCurrentQuestion().question}
          </Text>
        </View>

        {/* Answer Options */}
        <View style={styles.optionsContainer}>
          {getCurrentQuestion().options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionCard,
                { backgroundColor: theme.colors.card },
                isAnswerSelected(index) && { borderColor: theme.colors.primary, borderWidth: 2 }
              ]}
              onPress={() => selectAnswer(index)}
            >
              <View style={[styles.optionLetter, { backgroundColor: theme.colors.primary }]}>
                <Text style={styles.optionLetterText}>
                  {String.fromCharCode(65 + index)}
                </Text>
              </View>
              <Text style={[styles.optionText, { color: theme.colors.text }]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Explanation */}
        {selectedAnswers[currentQuestion] !== undefined && (
          <View style={[styles.explanationCard, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.explanationTitle, { color: theme.colors.text }]}>
              Explanation
            </Text>
            <Text style={[styles.explanationText, { color: theme.colors.secondaryText }]}>
              {getCurrentQuestion().explanation}
            </Text>
          </View>
        )}

        {/* BSIS Exam Preparation */}
        <View style={[styles.bsisCard, { backgroundColor: theme.colors.card }]}>
          <View style={styles.bsisHeader}>
            <Ionicons name="school" size={24} color={theme.colors.primary} />
            <Text style={[styles.bsisTitle, { color: theme.colors.text }]}>
              BSIS Exam Preparation
            </Text>
          </View>
          <Text style={[styles.bsisText, { color: theme.colors.secondaryText }]}>
            This study material covers the essential topics you'll need to know for your California security guard certification exam. Take your time to understand each concept thoroughly.
          </Text>
        </View>

        {/* Additional BSIS Training Required */}
        <View style={[styles.trainingCard, { backgroundColor: theme.colors.card }]}>
          <View style={styles.trainingHeader}>
            <Ionicons name="alert-circle" size={24} color="#FF9500" />
            <Text style={[styles.trainingTitle, { color: theme.colors.text }]}>
              Additional BSIS Training Required
            </Text>
          </View>
          <Text style={[styles.trainingText, { color: theme.colors.secondaryText }]}>
            Remember: You must also complete the 5-hour "Appropriate Use of Force" training at a licensed facility before applying for your guard card.
          </Text>
        </View>

        {/* BSIS Contact Information */}
        <View style={[styles.contactCard, { backgroundColor: theme.colors.card }]}>
          <View style={styles.contactHeader}>
            <Ionicons name="information-circle" size={24} color="#007AFF" />
            <Text style={[styles.contactTitle, { color: theme.colors.text }]}>
              BSIS Contact Information
            </Text>
          </View>
          <Text style={[styles.contactText, { color: theme.colors.secondaryText }]}>
            Bureau of Security and Investigative Services{'\n'}
            Phone: (800) 952-5210{'\n'}
            Website: www.bsis.ca.gov{'\n'}
            Email: bsis@dca.ca.gov
          </Text>
        </View>
      </ScrollView>

      {/* Navigation Bar */}
      <View style={[styles.navigationBar, { backgroundColor: theme.colors.card }]}>
        <TouchableOpacity
          style={[
            styles.navButton,
            { 
              backgroundColor: currentQuestion > 0 ? theme.colors.primary : theme.colors.border,
              opacity: currentQuestion > 0 ? 1 : 0.3
            }
          ]}
          onPress={previousStudyQuestion}
          disabled={currentQuestion === 0}
          accessibilityLabel="Previous question"
        >
          <Text style={styles.navButtonText}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.resetButton, { backgroundColor: '#FF3B30' }]}
          onPress={resetStudy}
          accessibilityLabel="Reset study session"
        >
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.navButton,
            { 
              backgroundColor: currentQuestion < studyQuestions.length - 1 ? theme.colors.primary : theme.colors.border,
              opacity: currentQuestion < studyQuestions.length - 1 ? 1 : 0.3
            }
          ]}
          onPress={nextStudyQuestion}
          disabled={currentQuestion >= studyQuestions.length - 1}
          accessibilityLabel="Next question"
        >
          <Text style={styles.navButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  progressContainer: {
    height: 8,
    borderRadius: 4,
    marginBottom: 24,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  questionCard: {
    padding: 24,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  },
  optionsContainer: {
    marginBottom: 24,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    minHeight: 60,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  optionLetter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionLetterText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20,
  },
  explanationCard: {
    padding: 24,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  explanationTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  explanationText: {
    fontSize: 16,
    lineHeight: 20,
  },
  bsisCard: {
    padding: 24,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  bsisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  bsisTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  bsisText: {
    fontSize: 16,
    lineHeight: 20,
  },
  trainingCard: {
    padding: 24,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  trainingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  trainingTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  trainingText: {
    fontSize: 16,
    lineHeight: 20,
  },
  contactCard: {
    padding: 24,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  contactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  contactText: {
    fontSize: 16,
    lineHeight: 20,
  },
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 0.5,
    borderTopColor: '#E5E5EA',
  },
  navButton: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    marginHorizontal: 4,
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    letterSpacing: 0.5,
  },
  resetButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    marginHorizontal: 4,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    letterSpacing: 0.5,
  },
});

export default PracticeQuizScreen;

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
    question: 'What is the main duty of a security officer?',
    options: ['Enforce laws', 'To protect individuals and property', 'Act like police', 'Make arrests'],
    correctAnswer: 1,
    category: 'Basic Role',
    explanation: 'The main duty of a security officer is to protect individuals and property, not to enforce laws or act like police.'
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
    correctAnswer: 0,
    category: 'Legal Limitations',
    explanation: 'Security officers cannot arrest someone. They have limited authority and must stay within their legal boundaries.'
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
    explanation: 'False arrest can result in both civil lawsuits and criminal charges against the security officer.'
  },
  {
    id: '12',
    question: 'If someone sues you for money, it\'s called:',
    options: ['Civil liability', 'Criminal liability', 'Legal immunity', 'Corporate defense'],
    correctAnswer: 0,
    category: 'Legal Consequences',
    explanation: 'Civil liability refers to being sued for money damages, while criminal liability involves criminal charges.'
  },
  {
    id: '13',
    question: 'Use of force is judged based on:',
    options: ['How others saw it', 'What was happening at the time', 'If there\'s a video', 'Officer\'s gut feeling'],
    correctAnswer: 1,
    category: 'Use of Force',
    explanation: 'Use of force is judged based on the circumstances that existed at the time the force was used.'
  },
  {
    id: '14',
    question: 'An "imminent threat" means:',
    options: ['Something may happen next week', 'Danger could happen at any moment', 'The suspect is nervous', 'None of the above'],
    correctAnswer: 1,
    category: 'Use of Force',
    explanation: 'An imminent threat means danger could happen at any moment, requiring immediate action.'
  },
  {
    id: '15',
    question: 'When considering force, what matters?',
    options: ['Suspect\'s size', 'Intoxication', 'Number of suspects', 'Backup availability', 'All of the above'],
    correctAnswer: 4,
    category: 'Use of Force',
    explanation: 'All factors must be considered when determining the appropriate level of force to use.'
  },
  {
    id: '16',
    question: 'A uniform and clear instructions are considered a type of force.',
    options: ['True', 'False'],
    correctAnswer: 0,
    category: 'Use of Force',
    explanation: 'A uniform and clear instructions are considered a form of psychological force.'
  },
  {
    id: '17',
    question: 'If someone is passive but ignoring you, you should:',
    options: ['Use force', 'Try more verbal techniques', 'Detain them immediately', 'Threaten to call police'],
    correctAnswer: 1,
    category: 'De-escalation',
    explanation: 'When someone is passive but non-compliant, try additional verbal techniques before using force.'
  },
  {
    id: '18',
    question: 'Use of force is always okay to protect property.',
    options: ['True', 'False'],
    correctAnswer: 1,
    category: 'Use of Force',
    explanation: 'Use of force to protect property alone is generally not justified. It must be reasonable and necessary.'
  },
  {
    id: '19',
    question: 'You must stop a fight near your post, even off property.',
    options: ['True', 'False'],
    correctAnswer: 1,
    category: 'Authority Limits',
    explanation: 'Security officers generally cannot act outside their assigned property unless there\'s an immediate threat to life.'
  },
  {
    id: '20',
    question: 'If you can\'t stop something from happening, you should:',
    options: ['Look away', 'Observe and report', 'Only act if it\'s serious', 'Both b and c'],
    correctAnswer: 3,
    category: 'Duties',
    explanation: 'When you cannot prevent an incident, observe and report, especially if it\'s serious.'
  },
  {
    id: '21',
    question: 'Bad decisions have no consequences for security personnel.',
    options: ['True', 'False'],
    correctAnswer: 1,
    category: 'Professional Responsibility',
    explanation: 'Bad decisions can have serious consequences including legal liability, job loss, and criminal charges.'
  },
  {
    id: '22',
    question: 'You may be held responsible if you don\'t act when required.',
    options: ['True', 'False'],
    correctAnswer: 0,
    category: 'Professional Responsibility',
    explanation: 'Security officers can be held liable for failing to act when they have a duty to do so.'
  },
  {
    id: '23',
    question: 'You only report incidents if someone gets hurt.',
    options: ['True', 'False'],
    correctAnswer: 1,
    category: 'Reporting',
    explanation: 'All incidents should be reported, not just those involving injuries.'
  },
  {
    id: '24',
    question: 'Failing to report a physical conflict could result in:',
    options: ['Suspension', 'Fines', 'Losing your license', 'All of the above'],
    correctAnswer: 3,
    category: 'Reporting',
    explanation: 'Failing to report incidents can result in suspension, fines, and loss of license.'
  },
  {
    id: '25',
    question: 'When must a physical incident be reported to the Bureau?',
    options: ['Within 7 days', '3 days', '14 days', 'It\'s optional'],
    correctAnswer: 0,
    category: 'Reporting',
    explanation: 'Physical incidents must be reported to BSIS within 7 days.'
  },
  {
    id: '26',
    question: 'The incident report must include:',
    options: ['Injuries', 'Who was involved', 'If police were called', 'All of the above'],
    correctAnswer: 3,
    category: 'Reporting',
    explanation: 'Incident reports must include all relevant details including injuries, parties involved, and police involvement.'
  },
  {
    id: '27',
    question: 'Force decisions should be based on:',
    options: ['The guard\'s experience', 'Witness statements', 'The full circumstances', 'Supervisor\'s advice'],
    correctAnswer: 2,
    category: 'Use of Force',
    explanation: 'Force decisions must be based on the full circumstances of the situation.'
  },
  {
    id: '28',
    question: 'Reasonable force is:',
    options: ['Whatever works', 'What\'s necessary and not excessive', 'Based on your size', 'Always up to the client'],
    correctAnswer: 1,
    category: 'Use of Force',
    explanation: 'Reasonable force is what is necessary to accomplish the objective and is not excessive.'
  },
  {
    id: '29',
    question: 'Which of these is NOT a benefit of de-escalation?',
    options: ['Helps wellness', 'Increases trust', 'Reduces injuries', 'It\'s for people lacking courage'],
    correctAnswer: 3,
    category: 'De-escalation',
    explanation: 'De-escalation is a professional skill, not a sign of weakness or lack of courage.'
  },
  {
    id: '30',
    question: 'What doesn\'t help assess a scene?',
    options: ['Identifying threats', 'Calculating profit loss', 'Checking for escalation', 'Knowing what happened'],
    correctAnswer: 1,
    category: 'Scene Assessment',
    explanation: 'Calculating profit loss is not relevant to scene assessment for security purposes.'
  },
  {
    id: '31',
    question: 'De-escalation attempts should be documented.',
    options: ['True', 'False'],
    correctAnswer: 0,
    category: 'Documentation',
    explanation: 'All de-escalation attempts should be documented for legal and training purposes.'
  },
  {
    id: '32',
    question: 'The four keys to de-escalation include:',
    options: ['Self-control, communication, scene management, force options', 'Arrest, control, detain, call', 'Body language, voice, movement, orders', 'None of the above'],
    correctAnswer: 0,
    category: 'De-escalation',
    explanation: 'The four keys to de-escalation are self-control, communication, scene management, and force options.'
  },
  {
    id: '33',
    question: 'Hidden stereotypes we don\'t realize we have are:',
    options: ['Discrimination', 'Implicit bias', 'Explicit bias', 'Racism'],
    correctAnswer: 1,
    category: 'Cultural Awareness',
    explanation: 'Implicit bias refers to unconscious stereotypes and prejudices we may not be aware of.'
  },
  {
    id: '34',
    question: 'When speaking to someone with limited English, do:',
    options: ['Give time to respond', 'Talk louder', 'Use big words', 'Call police'],
    correctAnswer: 0,
    category: 'Communication',
    explanation: 'When communicating with someone with limited English, give them time to respond and process.'
  },
  {
    id: '35',
    question: 'What body language varies across cultures?',
    options: ['Gestures', 'Facial expressions', 'Eye contact', 'All of the above'],
    correctAnswer: 3,
    category: 'Cultural Awareness',
    explanation: 'All forms of body language can vary significantly across different cultures.'
  },
  {
    id: '36',
    question: 'Which is NOT part of active listening?',
    options: ['Clarifying what you heard', 'Assuming you got it right', 'Being open-minded', 'Paraphrasing responses'],
    correctAnswer: 1,
    category: 'Communication',
    explanation: 'Assuming you got it right is not part of active listening - you should clarify and verify understanding.'
  },
  {
    id: '37',
    question: 'Security guards can decide if someone qualifies under the ADA.',
    options: ['True', 'False'],
    correctAnswer: 1,
    category: 'ADA Compliance',
    explanation: 'Security guards cannot make ADA qualification decisions - this is a legal determination.'
  },
  {
    id: '38',
    question: 'Mobility devices should be treated as:',
    options: ['Objects', 'Part of the person', 'Tools', 'None of the above'],
    correctAnswer: 1,
    category: 'ADA Compliance',
    explanation: 'Mobility devices should be treated as part of the person, not as separate objects.'
  },
  {
    id: '39',
    question: 'When speaking with someone deaf or hard of hearing:',
    options: ['Use pen and paper', 'Talk loudly', 'Assume they read lips', 'Shout'],
    correctAnswer: 0,
    category: 'ADA Compliance',
    explanation: 'When communicating with someone who is deaf or hard of hearing, use pen and paper or other written communication.'
  },
  {
    id: '40',
    question: 'Hallucinations may be caused by:',
    options: ['Illness', 'Drugs', 'Either one', 'Neither'],
    correctAnswer: 2,
    category: 'Mental Health',
    explanation: 'Hallucinations can be caused by either mental illness or drug use.'
  },
  {
    id: '41',
    question: 'Self-control gives guards:',
    options: ['Weakness', 'Situational awareness', 'Superiority', 'Aggression'],
    correctAnswer: 1,
    category: 'Professional Development',
    explanation: 'Self-control helps security officers maintain situational awareness and make better decisions.'
  },
  {
    id: '42',
    question: 'Which two emotions must be controlled?',
    options: ['Fear and anger', 'Joy and sadness', 'Anxiety and guilt', 'None'],
    correctAnswer: 0,
    category: 'Emotional Control',
    explanation: 'Fear and anger are the two emotions that must be controlled to maintain professional judgment.'
  },
  {
    id: '43',
    question: 'Always try to gain compliance without:',
    options: ['Speaking', 'Warning', 'Physical force', 'Calling police'],
    correctAnswer: 2,
    category: 'Use of Force',
    explanation: 'Always try to gain compliance without physical force when possible.'
  },
  {
    id: '44',
    question: 'Public trust is built by ensuring force is:',
    options: ['Reasonable', 'Hidden', 'Harsh', 'Legal only'],
    correctAnswer: 0,
    category: 'Public Relations',
    explanation: 'Public trust is built by ensuring that any force used is reasonable and justified.'
  },
  {
    id: '45',
    question: 'A good guard acts with:',
    options: ['Toughness', 'Supportiveness', 'Silence', 'Control'],
    correctAnswer: 1,
    category: 'Professional Conduct',
    explanation: 'A good security guard acts with supportiveness, helping people while maintaining security.'
  },
  {
    id: '46',
    question: 'Mental illness may reduce someone\'s coping abilities.',
    options: ['True', 'False'],
    correctAnswer: 0,
    category: 'Mental Health',
    explanation: 'Mental illness can significantly reduce a person\'s ability to cope with stress and difficult situations.'
  },
  {
    id: '47',
    question: 'Security officers should try to diagnose mental illness.',
    options: ['Yes', 'No'],
    correctAnswer: 1,
    category: 'Mental Health',
    explanation: 'Security officers should not attempt to diagnose mental illness - this is a medical professional\'s role.'
  },
  {
    id: '48',
    question: 'People with mental illness may go from calm to:',
    options: ['Joyful', 'Quiet', 'Agitated', 'Sleepy'],
    correctAnswer: 2,
    category: 'Mental Health',
    explanation: 'People with mental illness may rapidly transition from calm to agitated states.'
  },
  {
    id: '49',
    question: 'First step in active shooter event is to disarm shooter.',
    options: ['True', 'False'],
    correctAnswer: 1,
    category: 'Active Shooter',
    explanation: 'The first step in an active shooter event is NOT to disarm the shooter - it\'s to protect yourself and others.'
  },
  {
    id: '50',
    question: 'When calling 911, give:',
    options: ['Directions', 'Description', 'Location', 'Both b and c'],
    correctAnswer: 3,
    category: 'Emergency Response',
    explanation: 'When calling 911, provide both a description of what\'s happening and your location.'
  },
  {
    id: '51',
    question: 'In an active shooter, a guard\'s first responsibility is:',
    options: ['Stop the threat', 'Protect yourself', 'Call 911', 'Lead others'],
    correctAnswer: 1,
    category: 'Active Shooter',
    explanation: 'In an active shooter situation, a guard\'s first responsibility is to protect themselves.'
  },
  {
    id: '52',
    question: 'Correct order of action in active shooter event:',
    options: ['Confront, detain, fight', 'Run, Hide, Fight', 'Hide, call, fight', 'None of the above'],
    correctAnswer: 1,
    category: 'Active Shooter',
    explanation: 'The correct order of action in an active shooter event is Run, Hide, Fight.'
  }
];

const PracticeQuizScreen = () => {
  const theme = useTheme();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const resetStudy = () => {
    Alert.alert(
      'Reset Quiz',
      'Are you sure you want to reset your progress? This will clear all your answers.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reset', 
          style: 'destructive',
          onPress: () => {
            setCurrentQuestion(0);
            setSelectedAnswers([]);
          }
        },
      ]
    );
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

  const getScore = () => {
    let correct = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === studyQuestions[index].correctAnswer) {
        correct++;
      }
    });
    return { correct, total: selectedAnswers.filter(a => a !== undefined).length };
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.systemBackground }]}>
      <ScrollView 
        style={styles.content} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: theme.colors.label }, theme.typography.title1]}>
            Practice Quiz
          </Text>
          <Text style={[styles.headerSubtitle, { color: theme.colors.secondaryLabel }, theme.typography.body]}>
            Question {currentQuestion + 1} of {studyQuestions.length}
          </Text>
          
          {/* Score Display */}
          {getScore().total > 0 && (
            <View style={styles.scoreContainer}>
              <Text style={[styles.scoreText, { color: theme.colors.systemBlue }, theme.typography.headline]}>
                Score: {getScore().correct}/{getScore().total}
              </Text>
              <Text style={[styles.scorePercentage, { color: theme.colors.secondaryLabel }, theme.typography.footnote]}>
                {Math.round((getScore().correct / getScore().total) * 100)}% Correct
              </Text>
            </View>
          )}
        </View>

        {/* Progress Bar */}
        <View style={[styles.progressContainer, { backgroundColor: theme.colors.separator }]}>
          <View 
            style={[
              styles.progressBar, 
              { 
                backgroundColor: theme.colors.systemBlue,
                width: `${getProgressPercentage()}%`
              }
            ]} 
          />
        </View>

        {/* Question Card */}
        <View style={[styles.questionCard, { backgroundColor: theme.colors.systemBackground }, theme.shadows.md]}>
          <Text style={[styles.questionText, { color: theme.colors.label }, theme.typography.headline]}>
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
                { backgroundColor: theme.colors.systemBackground },
                isAnswerSelected(index) && { 
                  borderColor: theme.colors.systemBlue, 
                  borderWidth: 2,
                  backgroundColor: theme.colors.secondarySystemBackground
                },
                theme.shadows.sm
              ]}
              onPress={() => selectAnswer(index)}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel={`Option ${String.fromCharCode(65 + index)}: ${option}`}
              accessibilityHint="Double tap to select this answer"
            >
              <View style={[styles.optionLetter, { backgroundColor: theme.colors.systemBlue }]}>
                <Text style={[styles.optionLetterText, { color: '#FFFFFF' }, theme.typography.headline]}>
                  {String.fromCharCode(65 + index)}
                </Text>
              </View>
              <Text style={[styles.optionText, { color: theme.colors.label }, theme.typography.body]}>
                {option}
              </Text>
              
              {/* Show correct/incorrect indicator */}
              {selectedAnswers[currentQuestion] !== undefined && (
                <View style={styles.answerIndicator}>
                  {isAnswerCorrect(index) ? (
                    <Ionicons name="checkmark-circle" size={24} color={theme.colors.systemGreen} />
                  ) : isAnswerSelected(index) && !isAnswerCorrect(index) ? (
                    <Ionicons name="close-circle" size={24} color={theme.colors.systemRed} />
                  ) : null}
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Explanation */}
        {selectedAnswers[currentQuestion] !== undefined && (
          <View style={[styles.explanationCard, { backgroundColor: theme.colors.systemBackground }, theme.shadows.md]}>
            <View style={styles.explanationHeader}>
              <Ionicons 
                name={isAnswerCorrect(selectedAnswers[currentQuestion]) ? "checkmark-circle" : "close-circle"} 
                size={24} 
                color={isAnswerCorrect(selectedAnswers[currentQuestion]) ? theme.colors.systemGreen : theme.colors.systemRed} 
              />
              <Text style={[styles.explanationTitle, { color: theme.colors.label }, theme.typography.headline]}>
                {isAnswerCorrect(selectedAnswers[currentQuestion]) ? 'Correct!' : 'Incorrect'}
              </Text>
            </View>
            <Text style={[styles.explanationText, { color: theme.colors.secondaryLabel }, theme.typography.body]}>
              {getCurrentQuestion().explanation}
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Navigation Bar */}
      <View style={[styles.navigationBar, { backgroundColor: theme.colors.systemBackground, borderTopColor: theme.colors.separator }]}>
        <TouchableOpacity
          style={[
            styles.navButton,
            { 
              backgroundColor: currentQuestion > 0 ? theme.colors.systemBlue : theme.colors.separator,
              opacity: currentQuestion > 0 ? 1 : 0.3
            }
          ]}
          onPress={previousStudyQuestion}
          disabled={currentQuestion === 0}
          accessibilityLabel="Previous question"
          accessibilityHint="Go to the previous question"
        >
          <Text style={[styles.navButtonText, { color: '#FFFFFF' }, theme.typography.headline]}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.resetButton, { backgroundColor: theme.colors.systemRed }]}
          onPress={resetStudy}
          accessibilityLabel="Reset quiz"
          accessibilityHint="Reset your quiz progress and start over"
        >
          <Text style={[styles.resetButtonText, { color: '#FFFFFF' }, theme.typography.headline]}>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.navButton,
            { 
              backgroundColor: currentQuestion < studyQuestions.length - 1 ? theme.colors.systemBlue : theme.colors.separator,
              opacity: currentQuestion < studyQuestions.length - 1 ? 1 : 0.3
            }
          ]}
          onPress={nextStudyQuestion}
          disabled={currentQuestion >= studyQuestions.length - 1}
          accessibilityLabel="Next question"
          accessibilityHint="Go to the next question"
        >
          <Text style={[styles.navButtonText, { color: '#FFFFFF' }, theme.typography.headline]}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 20, // Extremely minimal space for navigation bar
  },
  header: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  headerTitle: {
    marginBottom: 8,
  },
  headerSubtitle: {
    marginBottom: 16,
  },
  scoreContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  scoreText: {
    marginBottom: 4,
  },
  scorePercentage: {
    textAlign: 'center',
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
    padding: 28,
    borderRadius: 20,
    marginBottom: 24,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  questionText: {
    lineHeight: 24,
  },
  optionsContainer: {
    marginBottom: 24,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    minHeight: 64,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  optionLetter: {
    width: 36,
    height: 36,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionLetterText: {
    fontWeight: '600',
  },
  optionText: {
    flex: 1,
    lineHeight: 20,
  },
  answerIndicator: {
    marginLeft: 12,
  },
  explanationCard: {
    padding: 24,
    borderRadius: 16,
    marginBottom: 24,
  },
  explanationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  explanationTitle: {
    marginLeft: 12,
  },
  explanationText: {
    lineHeight: 20,
  },

  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderTopWidth: 0.5,
  },
  navButton: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    marginHorizontal: 4,
  },
  navButtonText: {
    fontWeight: '600',
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
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

export default PracticeQuizScreen;

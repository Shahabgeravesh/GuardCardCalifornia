import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const TutorialScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const tutorials = [
    {
      id: 'welcome',
      title: 'Welcome',
      subtitle: 'Guard Card California',
      description: 'Your complete guide to getting a security guard license.',
      icon: 'shield-checkmark',
      gradient: ['#4257B2', '#5B6BC0'],
      features: [
        'Study materials',
        'Practice quizzes',
        'Training centers',
        'Official forms'
      ],
      image: null
    },
    {
      id: 'study-quiz',
      title: 'Study & Practice',
      subtitle: 'Learn and test your knowledge',
      description: 'Access training materials and take practice quizzes.',
      icon: 'book',
      gradient: ['#6B7280', '#9CA3AF'],
      features: [
        'Training manual',
        'PDF viewer',
        'Practice questions',
        'Progress tracking'
      ],
      image: null
    },
    {
      id: 'training',
      title: 'Training Centers',
      subtitle: 'Find BSIS-approved facilities',
      description: 'Locate training centers and LiveScan locations near you.',
      icon: 'location',
      gradient: ['#4257B2', '#6B7280'],
      features: [
        'Interactive map',
        'Distance info',
        'Contact details',
        'LiveScan locations'
      ],
      image: null
    },
    {
      id: 'resources',
      title: 'Resources',
      subtitle: 'Forms and information',
      description: 'Access official forms and contact information.',
      icon: 'library',
      gradient: ['#4257B2', '#8B9DC3'],
      features: [
        'Official forms',
        'Contact info',
        'BSIS information'
      ],
      image: null
    }
  ];

  const animateTransition = (direction = 'next') => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: direction === 'next' ? -50 : 50,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setCurrentStep(direction === 'next' ? currentStep + 1 : currentStep - 1);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const handleNext = () => {
    if (currentStep < tutorials.length - 1) {
      animateTransition('next');
    } else {
      // Tutorial complete
      navigation.replace('Main');
    }
  };

  const handleSkip = () => {
    navigation.replace('Main');
  };

  const currentTutorial = tutorials[currentStep];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={currentTutorial.gradient}
        style={styles.gradientBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
          <View style={styles.progressContainer}>
            {tutorials.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.progressDot,
                  index === currentStep && styles.progressDotActive,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Content */}
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={[
              styles.content,
              {
                opacity: fadeAnim,
                transform: [{ translateX: slideAnim }],
              },
            ]}
          >
            {/* Icon */}
            <View style={styles.iconContainer}>
              <View style={styles.iconBackground}>
                <Ionicons name={currentTutorial.icon} size={60} color="#FFFFFF" />
              </View>
            </View>

            {/* Title */}
            <Text style={styles.title}>{currentTutorial.title}</Text>
            <Text style={styles.subtitle}>{currentTutorial.subtitle}</Text>

            {/* Description */}
            <Text style={styles.description}>{currentTutorial.description}</Text>

            {/* Features */}
            <View style={styles.featuresContainer}>
              {currentTutorial.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <View style={styles.featureIcon}>
                    <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
                  </View>
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </Animated.View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.buttonContainer}>
            {currentStep > 0 && (
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => animateTransition('prev')}
              >
                <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextButtonText}>
                {currentStep === tutorials.length - 1 ? 'Get Started' : 'Next'}
              </Text>
              <Ionicons
                name="arrow-forward"
                size={20}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  skipButton: {
    padding: 10,
  },
  skipText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    opacity: 0.8,
  },
  progressContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  progressDotActive: {
    backgroundColor: '#FFFFFF',
    width: 24,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 40,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 40,
  },
  iconBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 38,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
    opacity: 0.9,
  },
  description: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    opacity: 0.8,
  },
  featuresContainer: {
    width: '100%',
    gap: 16,
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  featureIcon: {
    marginRight: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
    flex: 1,
  },
  footer: {
    paddingHorizontal: 30,
    paddingBottom: 40,
    paddingTop: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginRight: 8,
  },
});

export default TutorialScreen;

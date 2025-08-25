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
      title: 'Welcome to Guard Card California!',
      subtitle: 'Your Complete Security Guard Journey',
      description: 'Get ready to embark on your path to becoming a certified security guard in California. This app is your comprehensive guide to success!',
      icon: 'shield-checkmark',
      gradient: ['#667eea', '#764ba2'],
      features: [
        'Complete study materials',
        'Practice quizzes',
        'Training center locator',
        'Official forms & resources'
      ],
      image: null
    },
    {
      id: 'home',
      title: 'Your Journey Starts Here',
      subtitle: '3 Simple Steps to Success',
      description: 'The Home tab guides you through the essential steps to get your guard card. Follow the process and track your progress!',
      icon: 'home',
      gradient: ['#f093fb', '#f5576c'],
      features: [
        'Step-by-step guidance',
        'Quick action buttons',
        'Progress tracking',
        'Essential information'
      ],
      image: null
    },
    {
      id: 'training',
      title: 'Find Training Centers',
      subtitle: 'Locate BSIS-Approved Facilities',
      description: 'Discover training centers and LiveScan locations near you. Get certified at official BSIS-approved facilities!',
      icon: 'location',
      gradient: ['#4facfe', '#00f2fe'],
      features: [
        'Interactive map view',
        'Distance calculations',
        'Contact information',
        'LiveScan locations'
      ],
      image: null
    },
    {
      id: 'study',
      title: 'Master Your Knowledge',
      subtitle: 'Official BSIS Training Materials',
      description: 'Access the complete Powers to Arrest and Use of Force training manual. Study at your own pace with comprehensive materials!',
      icon: 'book',
      gradient: ['#43e97b', '#38f9d7'],
      features: [
        'Official training manual',
        'Interactive PDF viewer',
        'Study tips & guidance',
        'Complete curriculum'
      ],
      image: null
    },
    {
      id: 'quiz',
      title: 'Test Your Knowledge',
      subtitle: 'Practice Makes Perfect',
      description: 'Take practice quizzes to prepare for your BSIS exam. Build confidence with realistic test questions!',
      icon: 'help-circle',
      gradient: ['#fa709a', '#fee140'],
      features: [
        '52 practice questions',
        'Real exam format',
        'Instant feedback',
        'Progress tracking'
      ],
      image: null
    },
    {
      id: 'resources',
      title: 'Essential Resources',
      subtitle: 'Everything You Need',
      description: 'Access official forms, contact information, and essential resources. Everything is just a tap away!',
      icon: 'library',
      gradient: ['#a8edea', '#fed6e3'],
      features: [
        'Official BSIS forms',
        'Contact information',
        'Training requirements',
        'Useful documents'
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
                name={currentStep === tutorials.length - 1 ? 'rocket' : 'arrow-forward'}
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
  content: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
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

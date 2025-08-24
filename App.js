import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text, View, Platform } from 'react-native';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import TrainingCentersScreen from './src/screens/TrainingCentersScreen';
import StudyScreen from './src/screens/StudyScreen';
import PracticeQuizScreen from './src/screens/PracticeQuizScreen';

// Import components and context
import { ThemeProvider } from './src/context/ThemeContext';
import ErrorBoundary from './src/components/ErrorBoundary';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          
          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Training':
              iconName = focused ? 'school' : 'school-outline';
              break;
            case 'Study':
              iconName = focused ? 'book' : 'book-outline';
              break;
            case 'Quiz':
              iconName = focused ? 'help-circle' : 'help-circle-outline';
              break;
            default:
              iconName = 'help-outline';
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
        // iOS Standard Tab Bar Colors
        tabBarActiveTintColor: '#007AFF', // iOS System Blue
        tabBarInactiveTintColor: '#8E8E93', // iOS Tertiary Label
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0.5,
          borderTopColor: '#E5E5EA', // iOS Separator
          paddingBottom: Platform.OS === 'ios' ? 8 : 8,
          paddingTop: Platform.OS === 'ios' ? 8 : 8,
          height: Platform.OS === 'ios' ? 83 : 60, // iOS Standard Tab Bar Height
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: -0.5,
          },
          shadowOpacity: 0.1,
          shadowRadius: 0.5,
          elevation: Platform.OS === 'android' ? 8 : 0,
        },
        tabBarLabelStyle: {
          fontSize: 10, // iOS Standard Tab Bar Label Size
          fontWeight: '500', // iOS Medium Weight
          marginTop: 2,
          letterSpacing: 0.12, // iOS Standard Letter Spacing
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
        // iOS Standard Navigation Bar Styling
        headerStyle: {
          backgroundColor: '#007AFF', // iOS System Blue
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: 0.5,
          },
          shadowOpacity: 0.12,
          shadowRadius: 4,
          elevation: Platform.OS === 'android' ? 3 : 0,
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: '600', // iOS Semibold
          fontSize: 17, // iOS Standard Navigation Title Size
          letterSpacing: -0.41, // iOS Standard Letter Spacing
        },
        headerShadowVisible: true,
        // iOS Standard Safe Area Handling
        headerSafeAreaInsets: { top: 0 },
        tabBarSafeAreaInsets: { bottom: 0 },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          title: 'GuardCard California',
          tabBarLabel: 'Home',
          tabBarAccessibilityLabel: 'Dashboard tab. View your security guard registration progress and overview.',
          tabBarAccessibilityHint: 'Double tap to view your dashboard and registration progress.'
        }}
      />

      <Tab.Screen 
        name="Training" 
        component={TrainingCentersScreen} 
        options={{ 
          title: 'Training Centers',
          tabBarLabel: 'Training',
          tabBarAccessibilityLabel: 'Training tab. Find nearby BSIS-approved training centers and LiveScan locations.',
          tabBarAccessibilityHint: 'Double tap to find training facilities and LiveScan centers near you.'
        }}
      />
      
      <Tab.Screen 
        name="Study" 
        component={StudyScreen} 
        options={{ 
          title: 'Study Materials',
          tabBarLabel: 'Study',
          tabBarAccessibilityLabel: 'Study tab. Learn essential content for your security guard training.',
          tabBarAccessibilityHint: 'Double tap to access study materials and training content.'
        }}
      />
      
      <Tab.Screen 
        name="Quiz" 
        component={PracticeQuizScreen} 
        options={{ 
          title: 'Practice Quiz',
          tabBarLabel: 'Quiz',
          tabBarAccessibilityLabel: 'Practice test tab. Take sample quizzes to prepare for your security guard exam.',
          tabBarAccessibilityHint: 'Double tap to take practice quizzes and test your knowledge.'
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <ThemeProvider>
          <NavigationContainer>
            <TabNavigator />
            <StatusBar 
              style="light" 
              backgroundColor="#007AFF"
              translucent={false}
              animated={true}
            />
          </NavigationContainer>
        </ThemeProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

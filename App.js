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
import ResourcesScreen from './src/screens/ResourcesScreen';

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
          let iconSize = focused ? size + 2 : size; // Slightly larger when focused
          
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
            case 'Resources':
              iconName = focused ? 'library' : 'library-outline';
              break;
            default:
              iconName = 'help-outline';
          }

          return (
            <Ionicons
              name={iconName}
              size={iconSize}
              color={color}
              style={{
                transform: [{ scale: focused ? 1.1 : 1 }], // Subtle scale animation
              }}
            />
          );
        },
        // Enhanced Tab Bar Colors with vibrant gradients
        tabBarActiveTintColor: '#667eea', // Vibrant gradient blue
        tabBarInactiveTintColor: '#A0A0A0', // Softer inactive color
        tabBarStyle: {
          backgroundColor: '#FAFBFF', // Slightly tinted white for subtle color
          borderTopWidth: 0,
          paddingBottom: Platform.OS === 'ios' ? 12 : 12,
          paddingTop: Platform.OS === 'ios' ? 12 : 12,
          paddingHorizontal: 16,
          height: Platform.OS === 'ios' ? 95 : 72, // Increased height for better spacing
          shadowColor: '#667eea',
          shadowOffset: {
            width: 0,
            height: -3,
          },
          shadowOpacity: 0.15,
          shadowRadius: 12,
          elevation: Platform.OS === 'android' ? 16 : 0,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
        tabBarLabelStyle: {
          fontSize: 11, // Slightly larger for better readability
          fontWeight: '600', // iOS Semibold Weight
          marginTop: 4,
          letterSpacing: 0.15, // Slightly more letter spacing
          textTransform: 'capitalize', // Capitalize labels for better appearance
        },
        tabBarIconStyle: {
          marginTop: 6,
          marginBottom: 2,
        },
        // Enhanced Navigation Bar Styling with vibrant gradients
        headerStyle: {
          backgroundColor: '#667eea', // Vibrant gradient blue
          shadowColor: '#667eea',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.2,
          shadowRadius: 12,
          elevation: Platform.OS === 'android' ? 8 : 0,
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
        tabBarItemStyle: {
          paddingVertical: 4,
        },
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
        name="Resources" 
        component={ResourcesScreen} 
        options={{ 
          title: 'Resources',
          tabBarLabel: 'Resources',
          tabBarAccessibilityLabel: 'Resources tab. Access BSIS exam preparation, training requirements, and contact information.',
          tabBarAccessibilityHint: 'Double tap to view BSIS resources and contact information.'
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
              backgroundColor="#667eea"
              translucent={false}
              animated={true}
            />
          </NavigationContainer>
        </ThemeProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

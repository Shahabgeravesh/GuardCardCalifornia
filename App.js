import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';

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
        tabBarIcon: ({ focused }) => {
          const iconColor = focused ? '#007AFF' : '#8E8E93';
          const iconSize = 24;

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
              size={iconSize}
              color={iconColor}
            />
          );
        },
        tabBarActiveTintColor: '#007AFF', // Apple system blue
        tabBarInactiveTintColor: '#8E8E93', // Apple tertiary label
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0.5,
          borderTopColor: '#E5E5EA', // iOS separator color
          paddingBottom: 8,
          paddingTop: 8,
          height: 83, // iOS standard tab bar height
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: -0.5,
          },
          shadowOpacity: 0.1,
          shadowRadius: 0.5,
          elevation: 8,
        },
        tabBarLabelStyle: {
          fontSize: 10, // iOS-standard tab bar label size
          fontWeight: '500', // iOS-standard medium weight
          marginTop: 2,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
        headerStyle: {
          backgroundColor: '#007AFF', // iOS system blue for consistency
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: 0.5,
          },
          shadowOpacity: 0.12,
          shadowRadius: 4,
          elevation: 3,
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: '600', // iOS-standard semibold
          fontSize: 17, // iOS-standard navigation title size
        },
        headerShadowVisible: true, // iOS navigation bars have subtle shadows
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          title: 'GuardCard California',
          tabBarLabel: 'Home',
          tabBarAccessibilityLabel: 'Dashboard tab. View your security guard registration progress and overview.'
        }}
      />

      <Tab.Screen 
        name="Training" 
        component={TrainingCentersScreen} 
        options={{ 
          title: 'Training Centers',
          tabBarLabel: 'Training',
          tabBarAccessibilityLabel: 'Training tab. Find nearby BSIS-approved training centers.'
        }}
      />
      
      <Tab.Screen 
        name="Study" 
        component={StudyScreen} 
        options={{ 
          title: 'Study Materials',
          tabBarLabel: 'Study',
          tabBarAccessibilityLabel: 'Study tab. Learn essential content for your security guard training.'
        }}
      />
      
      <Tab.Screen 
        name="Quiz" 
        component={PracticeQuizScreen} 
        options={{ 
          title: 'Practice Quiz',
          tabBarLabel: 'Quiz',
          tabBarAccessibilityLabel: 'Quiz tab. Take sample quizzes to prepare for your security guard exam.'
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
              style="auto" 
              backgroundColor="transparent"
              translucent={true}
              animated={true}
            />
          </NavigationContainer>
        </ThemeProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

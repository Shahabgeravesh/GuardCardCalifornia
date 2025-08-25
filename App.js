import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text, View, Platform } from 'react-native';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import TrainingCentersScreen from './src/screens/TrainingCentersScreen';
import StudyScreen from './src/screens/StudyScreen';
import Quiz1Screen from './src/screens/Quiz1Screen';
import ResourcesScreen from './src/screens/ResourcesScreen';
import TutorialScreen from './src/screens/TutorialScreen';

// Import components and context
import { ThemeProvider } from './src/context/ThemeContext';
import ErrorBoundary from './src/components/ErrorBoundary';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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
        tabBarActiveTintColor: '#4257B2', // Quizlet blue
        tabBarInactiveTintColor: '#6B7280', // Quizlet gray
        tabBarStyle: {
          backgroundColor: '#FFFFFF', // Clean white background
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          paddingBottom: Platform.OS === 'ios' ? 12 : 12,
          paddingTop: Platform.OS === 'ios' ? 12 : 12,
          paddingHorizontal: 16,
          height: Platform.OS === 'ios' ? 95 : 72, // Increased height for better spacing
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: -1,
          },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: Platform.OS === 'android' ? 2 : 0,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          // iOS-specific improvements
          ...(Platform.OS === 'ios' && {
            shadowOpacity: 0.03,
            shadowRadius: 2,
          }),
        },
        tabBarLabelStyle: {
          fontSize: 12, // Quizlet-style tab label size
          fontWeight: '500', // Quizlet-style medium weight
          marginTop: 4,
          letterSpacing: -0.1, // Quizlet-style letter spacing
          textTransform: 'capitalize', // Capitalize labels for better appearance
        },
        tabBarIconStyle: {
          marginTop: 6,
          marginBottom: 2,
        },
        // Enhanced Navigation Bar Styling with vibrant gradients
        headerStyle: {
          backgroundColor: '#4257B2', // Quizlet blue
          shadowColor: '#4257B2',
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
          // Ensure minimum touch target size for iOS
          minHeight: Platform.OS === 'ios' ? 44 : 48,
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
        name="Training" 
        component={TrainingCentersScreen} 
        options={{ 
          title: 'Training & LiveScan Centers',
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
        name="Quiz1" 
        component={Quiz1Screen} 
        options={{ 
          title: 'Quiz',
          tabBarLabel: 'Quiz',
          tabBarAccessibilityLabel: 'Quiz tab. Take the Power to Arrest training quiz.',
          tabBarAccessibilityHint: 'Double tap to take the PTA training quiz.'
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
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen 
                name="Tutorial" 
                component={TutorialScreen}
              />
              <Stack.Screen name="Main" component={TabNavigator} />
            </Stack.Navigator>
            <StatusBar 
              style="light" 
              backgroundColor="#4257B2"
              translucent={false}
              animated={true}
              barStyle="light-content"
            />
          </NavigationContainer>
        </ThemeProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

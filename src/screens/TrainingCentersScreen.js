import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking,
  ActivityIndicator,
  Dimensions,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import * as Location from 'expo-location';

const { width: screenWidth } = Dimensions.get('window');

const TrainingCentersScreen = () => {
  const theme = useTheme();
  const [userLocation, setUserLocation] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [liveScanResults, setLiveScanResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [locationPermission, setLocationPermission] = useState(false);
  const [searchType, setSearchType] = useState('training');
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [selectedLiveScan, setSelectedLiveScan] = useState(null);

  // Sample BSIS training facilities data
  const trainingFacilities = [
    {
      id: '1',
      name: 'California Security Training Academy',
      address: '123 Main Street',
      city: 'Los Angeles',
      zipCode: '90210',
      phone: '(310) 555-0123',
      website: 'https://www.californiasecuritytraining.com',
      courses: ['Power to Arrest (PTA)', 'Appropriate Use of Force (AUOF)', 'Firearms Training'],
      rating: 4.8,
      distance: 0,
      isApproved: true,
      offersLiveScan: true,
      coordinates: { lat: 34.0522, lng: -118.2437 },
      bsisLicenseNumber: 'BSIS-12345',
      lastVerified: '2024-01-15'
    },
    {
      id: '2',
      name: 'Guardian Security Training Center',
      address: '456 Oak Avenue',
      city: 'San Francisco',
      zipCode: '94102',
      phone: '(415) 555-0456',
      website: 'https://www.guardiansecuritytraining.com',
      courses: ['Power to Arrest (PTA)', 'Appropriate Use of Force (AUOF)'],
      rating: 4.6,
      distance: 0,
      isApproved: true,
      offersLiveScan: false,
      coordinates: { lat: 37.7749, lng: -122.4194 },
      bsisLicenseNumber: 'BSIS-67890',
      lastVerified: '2024-01-10'
    },
    {
      id: '3',
      name: 'Pacific Coast Security Institute',
      address: '789 Pine Street',
      city: 'San Diego',
      zipCode: '92101',
      phone: '(619) 555-0789',
      courses: ['Power to Arrest (PTA)', 'Appropriate Use of Force (AUOF)', 'First Aid Training'],
      rating: 4.9,
      distance: 0,
      isApproved: true,
      offersLiveScan: true,
      coordinates: { lat: 32.7157, lng: -117.1611 },
      bsisLicenseNumber: 'BSIS-11111',
      lastVerified: '2024-01-20'
    }
  ];

  // Sample LiveScan locations data
  const liveScanLocations = [
    {
      id: '1',
      name: 'Fingerprint Express LiveScan',
      address: '321 Business Blvd',
      city: 'Los Angeles',
      zipCode: '90211',
      phone: '(310) 555-0321',
      website: 'https://www.fingerprintexpress.com',
      distance: 0,
      coordinates: { lat: 34.0622, lng: -118.2537 },
      bsisApproved: true
    },
    {
      id: '2',
      name: 'QuickScan LiveScan Services',
      address: '654 Market Street',
      city: 'San Francisco',
      zipCode: '94103',
      phone: '(415) 555-0654',
      distance: 0,
      coordinates: { lat: 37.7849, lng: -122.4094 },
      bsisApproved: true
    },
    {
      id: '3',
      name: 'Professional Fingerprinting',
      address: '987 Harbor Drive',
      city: 'San Diego',
      zipCode: '92102',
      phone: '(619) 555-0987',
      website: 'https://www.professionalfingerprinting.com',
      distance: 0,
      coordinates: { lat: 32.7257, lng: -117.1711 },
      bsisApproved: true
    }
  ];

  // Request location permissions
  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        setLocationPermission(true);
        return true;
      } else {
        Alert.alert(
          'Location Permission Required',
          'This app needs location access to find nearby training facilities. Please enable location services in your device settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Settings', onPress: () => Linking.openSettings() },
          ]
        );
        return false;
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
      return false;
    }
  };

  // Get user's current location
  const getCurrentLocation = async () => {
    try {
      setLoading(true);
      
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        setLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        timeInterval: 5000,
        distanceInterval: 10,
      });

      setUserLocation(location);
      await searchNearbyFacilities(location.coords.latitude, location.coords.longitude);
      
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert('Error', 'Unable to get your current location. Please check your location settings.');
    } finally {
      setLoading(false);
    }
  };

  // Search nearby facilities
  const searchNearbyFacilities = async (latitude, longitude) => {
    try {
      setLoading(true);
      
      // Calculate distances from user location to facilities
      const facilitiesWithDistance = trainingFacilities.map(facility => ({
        ...facility,
        distance: calculateDistance(
          latitude,
          longitude,
          facility.coordinates.lat,
          facility.coordinates.lng
        ),
      }));

      const liveScanWithDistance = liveScanLocations.map(location => ({
        ...location,
        distance: calculateDistance(
          latitude,
          longitude,
          location.coordinates.lat,
          location.coordinates.lng
        ),
      }));

      // Sort by distance and filter within 50 miles
      const nearbyFacilities = facilitiesWithDistance
        .filter(f => f.distance <= 50)
        .sort((a, b) => a.distance - b.distance);

      const nearbyLiveScan = liveScanWithDistance
        .filter(l => l.distance <= 50)
        .sort((a, b) => a.distance - b.distance);

      setSearchResults(nearbyFacilities);
      setLiveScanResults(nearbyLiveScan);
      
    } catch (error) {
      console.error('Error searching nearby facilities:', error);
      Alert.alert('Error', 'Failed to search for nearby facilities. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Open Google Maps with directions
  const openGoogleMapsDirections = async (facility) => {
    try {
      const destination = `${facility.address}, ${facility.city}, CA ${facility.zipCode}`;
      const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
      
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Google Maps is not available on this device.');
      }
    } catch (error) {
      console.error('Error opening Google Maps:', error);
      Alert.alert('Error', 'Failed to open Google Maps.');
    }
  };

  // Open Google Maps with LiveScan directions
  const openLiveScanDirections = async (location) => {
    try {
      const destination = `${location.address}, ${location.city}, CA ${location.zipCode}`;
      const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
      
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Google Maps is not available on this device.');
      }
    } catch (error) {
      console.error('Error opening Google Maps:', error);
      Alert.alert('Error', 'Failed to open Google Maps.');
    }
  };

  // Haversine formula for distance calculation
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 3959; // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleCall = async (phone, name) => {
    try {
      const url = `tel:${phone}`;
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Phone calls are not supported on this device.');
      }
    } catch (error) {
      console.error('Error making phone call:', error);
      Alert.alert('Error', 'Failed to make phone call.');
    }
  };

  const handleWebsite = async (website, name) => {
    try {
      const supported = await Linking.canOpenURL(website);
      if (supported) {
        await Linking.openURL(website);
      } else {
        Alert.alert('Error', 'Cannot open website on this device.');
      }
    } catch (error) {
      console.error('Error opening website:', error);
      Alert.alert('Error', 'Failed to open website.');
    }
  };

  const renderFacility = (facility) => (
    <View key={facility.id} style={[styles.facilityCard, { backgroundColor: theme.colors.card }]}>
      <View style={styles.facilityTitleRow}>
        <View style={styles.facilityHeader}>
          <View style={styles.facilityInfo}>
            <Text style={[styles.facilityName, { color: theme.colors.text }]}>
              {facility.name}
            </Text>
            <Text style={[styles.facilityAddress, { color: theme.colors.secondaryText }]}>
              {facility.address}
            </Text>
            <Text style={[styles.facilityAddress, { color: theme.colors.secondaryText }]}>
              {facility.city}, CA {facility.zipCode}
            </Text>
          </View>
        </View>
        <View style={styles.facilityBadges}>
          {facility.offersLiveScan && (
            <View style={[styles.badge, { backgroundColor: theme.colors.primary }]}>
              <Text style={[styles.badgeText, { color: '#ffffff' }]}>LiveScan</Text>
            </View>
          )}
          <View style={[styles.badge, { backgroundColor: '#34C759' }]}>
            <Text style={[styles.badgeText, { color: '#ffffff' }]}>BSIS</Text>
          </View>
        </View>
      </View>

      <View style={styles.facilityDetails}>
        <View style={styles.facilityMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="star" size={16} color="#FF9500" />
            <Text style={[styles.metaText, { color: theme.colors.secondaryText }]}>
              {facility.rating.toFixed(1)}
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="location" size={16} color={theme.colors.secondaryText} />
            <Text style={[styles.metaText, { color: theme.colors.secondaryText }]}>
              {facility.distance.toFixed(1)} miles
            </Text>
          </View>
        </View>

        <View style={styles.coursesContainer}>
          <Text style={[styles.coursesTitle, { color: theme.colors.text }]}>
            Courses Offered:
          </Text>
          {facility.courses.map((course, index) => (
            <Text key={index} style={[styles.courseItem, { color: theme.colors.secondaryText }]}>
              • {course}
            </Text>
          ))}
        </View>

        {facility.bsisLicenseNumber && (
          <Text style={[styles.bsisInfo, { color: theme.colors.secondaryText }]}>
            BSIS License: {facility.bsisLicenseNumber}
          </Text>
        )}

        <View style={styles.facilityActions}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
            onPress={() => handleCall(facility.phone, facility.name)}
          >
            <Ionicons name="call" size={16} color="#ffffff" />
            <Text style={[styles.actionButtonText, { color: '#ffffff' }]}>Call</Text>
          </TouchableOpacity>

          {facility.website && (
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: theme.colors.card }]}
              onPress={() => handleWebsite(facility.website, facility.name)}
            >
              <Ionicons name="globe" size={16} color={theme.colors.text} />
              <Text style={[styles.actionButtonText, { color: theme.colors.text }]}>Website</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: theme.colors.card }]}
            onPress={() => openGoogleMapsDirections(facility)}
          >
            <Ionicons name="navigate" size={16} color={theme.colors.text} />
            <Text style={[styles.actionButtonText, { color: theme.colors.text }]}>Directions</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderLiveScanLocation = (location) => (
    <View key={location.id} style={[styles.facilityCard, { backgroundColor: theme.colors.card }]}>
      <View style={styles.facilityTitleRow}>
        <View style={styles.facilityHeader}>
          <View style={styles.facilityInfo}>
            <Text style={[styles.facilityName, { color: theme.colors.text }]}>
              {location.name}
            </Text>
            <Text style={[styles.facilityAddress, { color: theme.colors.secondaryText }]}>
              {location.address}
            </Text>
            <Text style={[styles.facilityAddress, { color: theme.colors.secondaryText }]}>
              {location.city}, CA {location.zipCode}
            </Text>
          </View>
        </View>
        <View style={styles.facilityBadges}>
          <View style={[styles.badge, { backgroundColor: '#34C759' }]}>
            <Text style={[styles.badgeText, { color: '#ffffff' }]}>LiveScan</Text>
          </View>
          {location.bsisApproved && (
            <View style={[styles.badge, { backgroundColor: theme.colors.primary }]}>
              <Text style={[styles.badgeText, { color: '#ffffff' }]}>BSIS</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.facilityDetails}>
        <View style={styles.facilityMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="location" size={16} color={theme.colors.secondaryText} />
            <Text style={[styles.metaText, { color: theme.colors.secondaryText }]}>
              {location.distance.toFixed(1)} miles
            </Text>
          </View>
        </View>

        <View style={styles.facilityActions}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
            onPress={() => handleCall(location.phone, location.name)}
          >
            <Ionicons name="call" size={16} color="#ffffff" />
            <Text style={[styles.actionButtonText, { color: '#ffffff' }]}>Call</Text>
          </TouchableOpacity>

          {location.website && (
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: theme.colors.card }]}
              onPress={() => handleWebsite(location.website, location.name)}
            >
              <Ionicons name="globe" size={16} color={theme.colors.text} />
              <Text style={[styles.actionButtonText, { color: theme.colors.text }]}>Website</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: theme.colors.card }]}
            onPress={() => openLiveScanDirections(location)}
          >
            <Ionicons name="navigate" size={16} color={theme.colors.text} />
            <Text style={[styles.actionButtonText, { color: theme.colors.text }]}>Directions</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={[styles.headerIconContainer, { width: 48, height: 48, marginRight: 12 }]}>
              <Ionicons name="location" size={24} color={theme.colors.primary} />
            </View>
            <View style={styles.headerTextContainer}>
              <Text style={[styles.headerTitle, { color: theme.colors.text, fontSize: 24, fontWeight: '700' }]}>
                Training Locator
              </Text>
              <Text style={[styles.headerSubtitle, { color: theme.colors.secondaryText, fontSize: 16 }]}>
                Find BSIS facilities near you
              </Text>
            </View>
          </View>
        </View>

        {/* Search Type Selector */}
        <View style={[styles.searchTypeContainer, { backgroundColor: theme.colors.card }]}>
          <TouchableOpacity
            style={[
              styles.searchTypeButton,
              searchType === 'training' && { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary }
            ]}
            onPress={() => setSearchType('training')}
          >
            <View style={styles.searchTypeContent}>
              <Ionicons 
                name="school" 
                size={24} 
                color={searchType === 'training' ? '#ffffff' : theme.colors.secondaryText} 
              />
              <Text style={[
                styles.searchTypeSubtext,
                { color: searchType === 'training' ? '#ffffff' : theme.colors.secondaryText }
              ]}>
                Training Facilities
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.searchTypeButton,
              searchType === 'livescan' && { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary }
            ]}
            onPress={() => setSearchType('livescan')}
          >
            <View style={styles.searchTypeContent}>
              <Ionicons 
                name="finger-print" 
                size={24} 
                color={searchType === 'livescan' ? '#ffffff' : theme.colors.secondaryText} 
              />
              <Text style={[
                styles.searchTypeSubtext,
                { color: searchType === 'livescan' ? '#ffffff' : theme.colors.secondaryText }
              ]}>
                LiveScan Centers
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Location Button */}
        <TouchableOpacity
          style={[styles.locationButton, { backgroundColor: theme.colors.card }]}
          onPress={getCurrentLocation}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color={theme.colors.primary} />
          ) : (
            <Ionicons name="navigate" size={20} color={theme.colors.primary} />
          )}
          <Text style={[styles.locationButtonText, { color: theme.colors.primary }]}>
            {loading ? 'Finding nearby facilities...' : 'Find Nearby Facilities'}
          </Text>
        </TouchableOpacity>

        {/* Results */}
        {searchResults.length > 0 && searchType === 'training' && (
          <View style={styles.resultsContainer}>
            <Text style={[styles.resultsTitle, { color: theme.colors.text }]}>
              Nearby Training Facilities ({searchResults.length})
            </Text>
            {searchResults.map(renderFacility)}
          </View>
        )}

        {liveScanResults.length > 0 && searchType === 'livescan' && (
          <View style={styles.resultsContainer}>
            <Text style={[styles.resultsTitle, { color: theme.colors.text }]}>
              Nearby LiveScan Centers ({liveScanResults.length})
            </Text>
            {liveScanResults.map(renderLiveScanLocation)}
          </View>
        )}

        {/* No Results */}
        {!loading && searchResults.length === 0 && liveScanResults.length === 0 && userLocation && (
          <View style={[styles.noResultsCard, { backgroundColor: theme.colors.card }]}>
            <Ionicons name="search" size={48} color={theme.colors.secondaryText} />
            <Text style={[styles.noResultsText, { color: theme.colors.text }]}>
              No facilities found within 50 miles
            </Text>
            <Text style={[styles.noResultsSubtext, { color: theme.colors.secondaryText }]}>
              Try expanding your search area or contact BSIS for assistance
            </Text>
          </View>
        )}

        {/* BSIS Information */}
        <View style={[styles.bsisInfoCard, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.bsisInfoTitle, { color: theme.colors.text }]}>
            About BSIS-Approved Training
          </Text>
          <Text style={[styles.bsisInfoText, { color: theme.colors.secondaryText }]}>
            All facilities listed are verified by the Bureau of Security and Investigative Services (BSIS). 
            For the most current and complete list, visit the official BSIS website.
          </Text>
          <TouchableOpacity
            style={[styles.bsisButton, { backgroundColor: theme.colors.primary }]}
            onPress={() => handleWebsite('https://www.bsis.ca.gov', 'BSIS')}
          >
            <Text style={[styles.bsisButtonText, { color: '#ffffff' }]}>
              Visit BSIS Website
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 24,
    paddingBottom: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    lineHeight: 20,
  },
  content: {
    paddingHorizontal: 20,
  },
  searchTypeContainer: {
    flexDirection: 'row',
    padding: 4,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  searchTypeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  searchTypeContent: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  searchTypeSubtext: {
    fontSize: 12,
    marginTop: 4,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 16,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  locationButtonText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  resultsContainer: {
    marginBottom: 20,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  facilityCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  facilityTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  facilityBadges: {
    flexDirection: 'row',
    gap: 4,
  },
  facilityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  facilityInfo: {
    flex: 1,
    marginRight: 12,
  },
  facilityName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  facilityAddress: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  facilityMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  metaText: {
    fontSize: 14,
    marginLeft: 4,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  coursesContainer: {
    marginBottom: 16,
  },
  coursesTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  courseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  bsisInfo: {
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 8,
  },
  facilityActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  facilityDetails: {
    marginTop: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  noResultsCard: {
    alignItems: 'center',
    paddingVertical: 24,
    borderRadius: 12,
    marginTop: 16,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  noResultsText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 16,
  },
  noResultsSubtext: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 8,
  },
  bsisInfoCard: {
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  bsisInfoTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  bsisInfoText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  bsisButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  bsisButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default TrainingCentersScreen;

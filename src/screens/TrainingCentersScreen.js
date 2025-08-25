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
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { realTrainingFacilities, realLiveScanLocations } from '../data/trainingData';

const { width: screenWidth } = Dimensions.get('window');

const TrainingCentersScreen = () => {
  const theme = useTheme();
  const [userLocation, setUserLocation] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [liveScanResults, setLiveScanResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [locationPermission, setLocationPermission] = useState(false);
  // Removed searchType state since we show both sections
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [selectedLiveScan, setSelectedLiveScan] = useState(null);

  const [mapRegion, setMapRegion] = useState({
    latitude: 36.7783, // California center
    longitude: -119.4179,
    latitudeDelta: 5,
    longitudeDelta: 5,
  });


  // Use real BSIS training facilities data
  const trainingFacilities = realTrainingFacilities;

  // Use real LiveScan locations data
  const liveScanLocations = realLiveScanLocations;

  // Load facilities on component mount
  useEffect(() => {
    loadDefaultFacilities();
  }, []);

  // Load default facilities without requiring location
  const loadDefaultFacilities = () => {
    console.log('Loading default facilities...');
    console.log('Training facilities available:', trainingFacilities.length);
    console.log('LiveScan locations available:', liveScanLocations.length);
    
    // Show first 10 training facilities and 10 LiveScan locations by default
    const defaultTraining = trainingFacilities.slice(0, 10).map(facility => ({
      ...facility,
      distance: Math.floor(Math.random() * 25) + 1 // Random distance 1-25 miles for demo
    }));

    const defaultLiveScan = liveScanLocations.slice(0, 10).map(location => ({
      ...location,
      distance: Math.floor(Math.random() * 25) + 1 // Random distance 1-25 miles for demo
    }));

    setSearchResults(defaultTraining);
    setLiveScanResults(defaultLiveScan);
    
    console.log('Default facilities loaded - Training:', defaultTraining.length, 'LiveScan:', defaultLiveScan.length);
  };

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
      
      // Update map region to user location
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });
      
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



  const renderFacility = (facility) => (
    <View key={facility.id} style={[styles.facilityCard, { backgroundColor: theme.colors.card }]}>
      {/* Facility Header with Name and Address */}
      <View style={styles.facilityHeader}>
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

      {/* Badges Row */}
      <View style={styles.facilityBadges}>
        <View style={[styles.badge, { backgroundColor: '#34C759' }]}>
          <Text style={[styles.badgeText, { color: '#ffffff' }]}>BSIS</Text>
        </View>
        {facility.offersLiveScan && (
          <View style={[styles.badge, { backgroundColor: theme.colors.primary }]}>
            <Text style={[styles.badgeText, { color: '#ffffff' }]}>LiveScan</Text>
          </View>
        )}
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
          <View style={styles.bsisLicenseContainer}>
            <Ionicons name="shield-checkmark" size={16} color="#34C759" />
            <Text style={[styles.bsisInfo, { color: theme.colors.secondaryText }]}>
              BSIS License: {facility.bsisLicenseNumber}
            </Text>
          </View>
        )}

        <View style={styles.facilityActions}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
            onPress={() => handleCall(facility.phone, facility.name)}
          >
            <Ionicons name="call" size={16} color="#ffffff" />
            <Text style={[styles.actionButtonText, { color: '#ffffff' }]}>Call</Text>
          </TouchableOpacity>



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
      {/* Facility Header with Name and Address */}
      <View style={styles.facilityHeader}>
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

      {/* Badges Row */}
      <View style={styles.facilityBadges}>
        <View style={[styles.badge, { backgroundColor: '#34C759' }]}>
          <Text style={[styles.badgeText, { color: '#ffffff' }]}>BSIS</Text>
        </View>
        <View style={[styles.badge, { backgroundColor: '#007AFF' }]}>
          <Text style={[styles.badgeText, { color: '#ffffff' }]}>LiveScan</Text>
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
      <ScrollView 
        style={styles.content} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >


        {/* Search Options */}
        <View style={styles.searchOptionsContainer}>
          <TouchableOpacity
            style={[styles.locationButton, { backgroundColor: theme.colors.primary }]}
            onPress={getCurrentLocation}
            disabled={loading}
            activeOpacity={0.7}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Ionicons name="location" size={20} color="#ffffff" />
            )}
            <Text style={styles.locationButtonText}>
              {loading ? 'Searching...' : 'Find Nearby Facilities'}
            </Text>
          </TouchableOpacity>
        </View>



        {/* Map View */}
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            region={mapRegion}
            showsUserLocation={true}
            showsMyLocationButton={true}
          >
            {/* Training Facility Markers */}
            {searchResults.map((facility, index) => (
              <Marker
                key={`training-${facility.id}`}
                coordinate={{
                  latitude: facility.coordinates.lat,
                  longitude: facility.coordinates.lng,
                }}
                title={facility.name}
                description={`${facility.city}, ${facility.zipCode}`}
                pinColor="green"
              />
            ))}
            
            {/* LiveScan Location Markers */}
            {liveScanResults.map((location, index) => (
              <Marker
                key={`livescan-${location.id}`}
                coordinate={{
                  latitude: location.coordinates.lat,
                  longitude: location.coordinates.lng,
                }}
                title={location.name}
                description={`${location.city}, ${location.zipCode}`}
                pinColor="purple"
              />
            ))}
          </MapView>
        </View>
        
        {/* Map Legend */}
        <View style={[styles.mapLegend, { backgroundColor: theme.colors.systemBackground }]}>
          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.legendPin, { backgroundColor: 'green' }]} />
              <Text style={[styles.legendText, { color: theme.colors.text }]}>
                Training
              </Text>
            </View>
            
            <View style={styles.legendItem}>
              <View style={[styles.legendPin, { backgroundColor: 'purple' }]} />
              <Text style={[styles.legendText, { color: theme.colors.text }]}>
                LiveScan
              </Text>
            </View>
            
            <View style={styles.legendItem}>
              <View style={[styles.legendPin, { backgroundColor: theme.colors.primary }]} />
              <Text style={[styles.legendText, { color: theme.colors.text }]}>
                Location
              </Text>
            </View>
          </View>
        </View>





        {/* Training Centers Section */}
        <View style={styles.resultsContainer}>
          <View style={[styles.resultsTitle, { backgroundColor: '#FAFBFF' }]}>
            <Ionicons name="school" size={28} color="#4257B2" style={styles.headerIcon} />
            <Text style={[styles.resultsTitleText, { color: theme.colors.text }, theme.typography.cardTitle]}>
              Training Centers ({searchResults.length})
            </Text>
          </View>
          {searchResults.map(renderFacility)}
        </View>

        {/* LiveScan Centers Section */}
        <View style={styles.resultsContainer}>
          <View style={[styles.resultsTitle, { backgroundColor: '#FAFBFF' }]}>
            <Ionicons name="finger-print" size={28} color="#4257B2" style={styles.headerIcon} />
            <Text style={[styles.resultsTitleText, { color: theme.colors.text }, theme.typography.cardTitle]}>
              LiveScan Centers ({liveScanResults.length})
            </Text>
          </View>
          {liveScanResults.map(renderLiveScanLocation)}
        </View>

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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  scrollContent: {
    paddingBottom: 40,
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
    marginBottom: 32,
    marginTop: 16,
    paddingHorizontal: 4,
  },
  resultsTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    marginTop: 8,
    paddingHorizontal: 4,
    color: '#2C3E50',
  },
  facilityCard: {
    padding: 24,
    borderRadius: 20,
    marginBottom: 20,
    marginHorizontal: 4,
    shadowColor: '#8B5CF6',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#8B5CF6',
  },
  facilityTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  facilityBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  facilityHeader: {
    marginBottom: 12,
  },
  facilityInfo: {
    flex: 1,
    marginRight: 12,
  },
  facilityName: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
    lineHeight: 26,
    color: '#2C3E50',
  },
  facilityAddress: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
    color: '#5D6D7E',
  },
  facilityMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  metaText: {
    fontSize: 14,
    marginLeft: 6,
    color: '#7F8C8D',
    fontWeight: '500',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
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
  bsisLicenseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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

  mapContainer: {
    height: 320,
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  map: {
    flex: 1,
  },
  // Search options styles
  searchOptionsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  searchModeToggle: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    padding: 4,
    marginBottom: 12,
  },
  searchModeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  searchModeText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  zipCodeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  zipCodeInput: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: '500',
  },
  searchButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    minHeight: 44,
  },
  locationButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  // Map legend styles
  mapLegend: {
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  legendPin: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  legendText: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
  resultsContainer: {
    marginBottom: 32,
  },
  resultsTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginHorizontal: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  headerIcon: {
    marginRight: 12,
  },
  resultsTitleText: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});

export default TrainingCentersScreen;

import React, { useRef, useState } from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import useThemeColors from '@/contexts/ThemeColors';
import ThemedText from '@/components/ThemedText';
import ActionSheet, { ActionSheetRef, FlatList } from 'react-native-actions-sheet';
import CustomCard from '@/components/CustomCard';
import ShowRating from '@/components/ShowRating';
import { Chip } from '@/components/Chip';
import { CardScroller } from '@/components/CardScroller';
import Icon from '@/components/Icon';
import PriceMarker from '@/components/PriceMarker';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { listings } from '@/data/listings';
import { ACTIVITY_CATEGORIES, getActivityLabel } from '@/data/categories';
import { Listing, ActivityType } from '@/data/types';

const MALE_REGION = {
  latitude: 4.19,
  longitude: 73.53,
  latitudeDelta: 0.15,
  longitudeDelta: 0.15,
};

export default function SearchScreen() {
  const colors = useThemeColors();
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const mapRef = useRef<MapView>(null);
  const insets = useSafeAreaInsets();
  const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<ActivityType | null>(null);

  React.useEffect(() => {
    actionSheetRef.current?.show();
  }, []);

  const filteredListings = selectedActivity
    ? listings.filter((l) => l.activities.includes(selectedActivity))
    : listings;

  return (
    <View className="flex-1 bg-light-primary dark:bg-dark-primary">
      <View className="absolute top-0 left-0 right-0 z-10" style={{ paddingTop: insets.top + 8 }}>
        <CardScroller className="px-4" space={6}>
          <Chip
            label="All"
            size="lg"
            isSelected={selectedActivity === null}
            onPress={() => setSelectedActivity(null)}
          />
          {ACTIVITY_CATEGORIES.slice(0, 8).map((cat) => (
            <Chip
              key={cat.key}
              label={cat.label}
              size="lg"
              isSelected={selectedActivity === cat.key}
              onPress={() => setSelectedActivity(selectedActivity === cat.key ? null : cat.key)}
            />
          ))}
        </CardScroller>
      </View>

      <MapView ref={mapRef} className="w-full h-full" initialRegion={MALE_REGION}>
        {filteredListings.map((listing) => (
          <PriceMarker
            key={listing.id}
            coordinate={{ latitude: listing.location.lat, longitude: listing.location.lng }}
            price={`$${listing.minPrice.value}`}
            title={listing.title}
            isSelected={selectedMarkerId === listing.id}
            onPress={() => {
              setSelectedMarkerId(listing.id);
            }}
          />
        ))}
      </MapView>

      <ActionSheet
        ref={actionSheetRef}
        isModal={false}
        CustomHeaderComponent={
          <View className="w-full items-center justify-center mb-2">
            <View className="w-14 h-2 mt-2 rounded-full bg-light-secondary dark:bg-dark-secondary" />
            <ThemedText className="font-bold mt-3">
              {filteredListings.length} Activities in Male
            </ThemedText>
          </View>
        }
        backgroundInteractionEnabled
        initialSnapIndex={1}
        snapPoints={[10, 100]}
        gestureEnabled
        overdrawEnabled={false}
        closable={false}
        containerStyle={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: colors.bg,
        }}>
        <FlatList
          className="px-2"
          data={filteredListings}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CustomCard
              padding="md"
              className="my-0 w-full overflow-hidden"
              onPress={() => router.push(`/screens/product-detail?id=${item.id}`)}>
              <Image
                source={{ uri: item.coverPhoto.public }}
                className="w-full h-52 rounded-xl"
                resizeMode="cover"
              />

              <View className="pb-global pt-2">
                <View className="flex-row items-center justify-between">
                  <ThemedText className="text-base font-bold flex-1 mr-2" numberOfLines={1}>
                    {item.title}
                  </ThemedText>
                  {item.rating.score > 0 && (
                    <ShowRating rating={item.rating.score} size="md" />
                  )}
                </View>
                <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext mt-0.5">
                  {item.boatType} · {item.capacity} guests · {item.lengthFt} ft
                </ThemedText>
                <View className="flex-row flex-wrap gap-1 mt-1.5">
                  {item.activities.slice(0, 3).map((act) => (
                    <View
                      key={act}
                      className="bg-light-secondary dark:bg-dark-secondary px-2 py-0.5 rounded-full">
                      <ThemedText className="text-xs">{getActivityLabel(act)}</ThemedText>
                    </View>
                  ))}
                  {item.activities.length > 3 && (
                    <View className="bg-light-secondary dark:bg-dark-secondary px-2 py-0.5 rounded-full">
                      <ThemedText className="text-xs">+{item.activities.length - 3}</ThemedText>
                    </View>
                  )}
                </View>
                <View className="flex-row items-center mt-2">
                  <ThemedText className="font-bold text-base">
                    {item.minPrice.display}
                  </ThemedText>
                  {item.isInstantBook && (
                    <View className="flex-row items-center ml-3">
                      <Icon name="Zap" size={12} />
                      <ThemedText className="text-xs ml-0.5">Instant</ThemedText>
                    </View>
                  )}
                  {item.isFreeCancellation && (
                    <View className="flex-row items-center ml-3">
                      <Icon name="ShieldCheck" size={12} />
                      <ThemedText className="text-xs ml-0.5">Free cancel</ThemedText>
                    </View>
                  )}
                </View>
              </View>
            </CustomCard>
          )}
        />
      </ActionSheet>
    </View>
  );
}

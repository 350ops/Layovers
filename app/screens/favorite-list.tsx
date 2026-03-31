import React, { useRef } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import useThemeColors from '@/app/contexts/ThemeColors';
import Header, { HeaderIcon } from '@/components/Header';
import ThemedText from '@/components/ThemedText';
import ActionSheet, { ActionSheetRef, FlatList } from 'react-native-actions-sheet';
import CustomCard from '@/components/CustomCard';
import ShowRating from '@/components/ShowRating';
import Icon from '@/components/Icon';
import PriceMarker from '@/components/PriceMarker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { listings } from '@/data/listings';
import { getActivityLabel } from '@/data/categories';

const MALE_REGION = {
  latitude: 4.19,
  longitude: 73.53,
  latitudeDelta: 0.15,
  longitudeDelta: 0.15,
};

const FavoriteListScreen = () => {
  const colors = useThemeColors();
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const mapRef = useRef<MapView>(null);
  const insets = useSafeAreaInsets();
  const [selectedMarkerId, setSelectedMarkerId] = React.useState<number | null>(null);

  React.useEffect(() => {
    actionSheetRef.current?.show();
  }, []);

  const savedListings = listings.slice(0, 4);

  return (
    <>
      <Header showBackButton title="Saved Activities" />

      <View className="flex-1 bg-light-primary dark:bg-dark-primary">
        <MapView ref={mapRef} className="w-full h-[100vh]" initialRegion={MALE_REGION}>
          {savedListings.map((listing) => (
            <PriceMarker
              key={listing.id}
              coordinate={{ latitude: listing.location.lat, longitude: listing.location.lng }}
              price={`$${listing.minPrice.value}`}
              title={listing.title}
              isSelected={selectedMarkerId === listing.id}
              onPress={() => setSelectedMarkerId(listing.id)}
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
                {savedListings.length} Saved Activities
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
            data={savedListings}
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
                  <Text className="text-sm text-light-subtext dark:text-dark-subtext">
                    {item.boatType} · {item.capacity} guests
                  </Text>
                  <ThemedText className="font-bold text-base mt-2">
                    {item.minPrice.display}
                  </ThemedText>
                </View>
              </CustomCard>
            )}
          />
        </ActionSheet>
      </View>
    </>
  );
};

export default FavoriteListScreen;

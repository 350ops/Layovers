import React, { useState } from 'react';

import Header, { HeaderIcon } from '@/components/Header';
import AnimatedView from '@/components/AnimatedView';
import ThemedScroller from '@/components/ThemeScroller';
import ThemedText from '@/components/ThemedText';
import { Image, Pressable, View } from 'react-native';
import { Chip } from '@/components/Chip';
import { router } from 'expo-router';
import { listings } from '@/data/listings';
import { getActivityLabel } from '@/data/categories';

const ListingsScreen = () => {
  const [filter, setFilter] = useState<'all' | 'boats' | 'tours'>('all');

  const filteredListings =
    filter === 'all'
      ? listings
      : filter === 'boats'
        ? listings.filter((l) => l.listingType === 'boat_rental')
        : listings.filter((l) => l.listingType === 'boat_tour');

  return (
    <AnimatedView animation="scaleIn" className="flex-1">
      <Header
        title=" "
        rightComponents={[
          <HeaderIcon icon="PlusCircle" href="/screens/add-property-start" />,
        ]}
      />
      <ThemedScroller className="flex-1 pt-8" keyboardShouldPersistTaps="handled">
        <ThemedText className="text-3xl font-semibold">Your listings</ThemedText>
        <View className="flex-row gap-2 mt-2 mb-10">
          <Chip
            isSelected={filter === 'all'}
            size="lg"
            label="All"
            onPress={() => setFilter('all')}
          />
          <Chip
            isSelected={filter === 'boats'}
            size="lg"
            label="Boat Rentals"
            onPress={() => setFilter('boats')}
          />
          <Chip
            isSelected={filter === 'tours'}
            size="lg"
            label="Tours"
            onPress={() => setFilter('tours')}
          />
        </View>
        {filteredListings.map((listing) => (
          <Pressable
            key={listing.id}
            onPress={() => router.push(`/screens/product-detail?id=${listing.id}`)}
            className="flex-row gap-2 items-center mb-5">
            <Image
              className="w-20 h-20 rounded-2xl mr-3"
              source={{ uri: listing.coverPhoto.small }}
            />
            <View className="flex-1">
              <ThemedText className="text-base font-semibold" numberOfLines={1}>
                {listing.title}
              </ThemedText>
              <ThemedText className="font-light mt-1">
                {listing.boatType} · {listing.capacity} guests
              </ThemedText>
              <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext mt-0.5">
                {listing.activities.slice(0, 2).map(getActivityLabel).join(', ')}
              </ThemedText>
            </View>
            <ThemedText className="font-semibold">{listing.minPrice.display}</ThemedText>
          </Pressable>
        ))}
      </ThemedScroller>
    </AnimatedView>
  );
};

export default ListingsScreen;

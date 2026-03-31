import React, { useState } from 'react';
import { View, Animated, Image } from 'react-native';
import Section from '@/components/layout/Section';
import { CardScroller } from '@/components/CardScroller';
import Card from '@/components/Card';
import AnimatedView from '@/components/AnimatedView';
import ThemedText from '@/components/ThemedText';
import ThemeScroller from '@/components/ThemeScroller';
import SearchBar from '@/components/SearchBar';
import { Chip } from '@/components/Chip';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { listings, getByActivity, getFeatured, getAffordable, getPremium } from '@/data/listings';
import { ACTIVITY_CATEGORIES } from '@/data/categories';
import { ActivityType, Listing } from '@/data/types';

function ListingCard({ listing, width = 160 }: { listing: Listing; width?: number }) {
  return (
    <Card
      key={listing.id}
      title={listing.title}
      rounded="2xl"
      hasFavorite
      rating={listing.rating.score > 0 ? listing.rating.score : undefined}
      href={`/screens/product-detail?id=${listing.id}`}
      price={listing.minPrice.display}
      width={width}
      imageHeight={160}
      image={{ uri: listing.coverPhoto.small }}
    />
  );
}

export default function BookScreen() {
  const insets = useSafeAreaInsets();
  const [selectedActivity, setSelectedActivity] = useState<ActivityType | null>(null);

  const featured = getFeatured();
  const affordable = getAffordable();
  const boatTours = getByActivity('boat_yacht_tours');
  const snorkeling = getByActivity('snorkeling_diving_tours');
  const fishing = getByActivity('fishing_charter');
  const sunsetCruises = getByActivity('sunset_dinner_cruises');
  const islandHopping = getByActivity('island_hopping');

  const filteredListings = selectedActivity
    ? listings.filter((l) => l.activities.includes(selectedActivity))
    : null;

  const sections = selectedActivity
    ? [{ title: ACTIVITY_CATEGORIES.find((c) => c.key === selectedActivity)?.label ?? 'Results', data: filteredListings! }]
    : [
        { title: 'Featured in Male', data: featured },
        { title: 'Budget-Friendly', data: affordable },
        { title: 'Popular Boat Tours', data: boatTours.slice(0, 6) },
        { title: 'Snorkeling & Diving', data: snorkeling.slice(0, 6) },
        { title: 'Sunset Cruises', data: sunsetCruises.slice(0, 6) },
        { title: 'Island Hopping', data: islandHopping.slice(0, 6) },
        { title: 'Fishing Charters', data: fishing.slice(0, 6) },
      ];

  return (
    <View className="flex-1 bg-light-primary dark:bg-dark-primary" style={{ paddingTop: insets.top }}>
      <SearchBar />
      <ThemeScroller>
        <View className="px-4 mt-2 mb-1">
          <CardScroller space={6}>
            <Chip
              label="All"
              size="lg"
              isSelected={selectedActivity === null}
              onPress={() => setSelectedActivity(null)}
            />
            {ACTIVITY_CATEGORIES.map((cat) => (
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

        <AnimatedView animation="scaleIn" className="flex-1 mt-2">
          {sections
            .filter((s) => s.data.length > 0)
            .map((section, index) => (
              <Section
                key={`section-${index}`}
                title={section.title}
                titleSize="lg"
                link="/screens/map"
                linkText="View all">
                <CardScroller space={15} className="mt-1.5 pb-4">
                  {section.data.map((listing) => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))}
                </CardScroller>
              </Section>
            ))}
        </AnimatedView>
      </ThemeScroller>
    </View>
  );
}

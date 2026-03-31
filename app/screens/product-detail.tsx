import React, { useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { Share } from 'react-native';
import Header, { HeaderIcon } from '@/components/Header';
import ThemedText from '@/components/ThemedText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/components/Button';
import ThemedScroller from '@/components/ThemeScroller';
import { CardScroller } from '@/components/CardScroller';
import Section from '@/components/layout/Section';
import Card from '@/components/Card';
import Favorite from '@/components/Favorite';
import Divider from '@/components/layout/Divider';
import ShowRating from '@/components/ShowRating';
import Icon, { IconName } from '@/components/Icon';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import { getListingById, listings } from '@/data/listings';
import { getActivityLabel, getActivityIcon } from '@/data/categories';
import { Listing } from '@/data/types';

const reviewsData = [
  {
    rating: 5,
    description: 'Incredible experience! The crew was professional and the snorkeling spots were breathtaking.',
    date: 'March 2026',
    username: 'Captain Alex R.',
    avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
  },
  {
    rating: 5,
    description: 'Perfect way to spend a layover in Male. Highly recommend the sunset cruise!',
    date: 'February 2026',
    username: 'Sarah M.',
    avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
  },
  {
    rating: 4,
    description: 'Great boat, friendly crew. The dolphin watching was unforgettable. Will book again on my next layover.',
    date: 'January 2026',
    username: 'David L.',
    avatar: 'https://randomuser.me/api/portraits/men/63.jpg',
  },
];

const ActivityDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isFocused, setIsFocused] = useState(true);
  const insets = useSafeAreaInsets();

  const listing = id ? getListingById(Number(id)) : listings[0];
  if (!listing) return null;

  const similarListings = listings
    .filter((l) => l.id !== listing.id && l.activities.some((a) => listing.activities.includes(a)))
    .slice(0, 5);

  useFocusEffect(
    React.useCallback(() => {
      setIsFocused(true);
      return () => setIsFocused(false);
    }, [])
  );

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${listing.title} in Male, Maldives! Starting from ${listing.minPrice.display}`,
        title: listing.title,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const rightComponents = [
    <Favorite productName={listing.title} size={25} isWhite />,
    <HeaderIcon icon="Share2" onPress={handleShare} isWhite href="0" />,
  ];

  return (
    <>
      {isFocused && <StatusBar style="light" translucent />}
      <Header variant="transparent" title="" rightComponents={rightComponents} showBackButton />
      <ThemedScroller className="px-0 bg-light-primary dark:bg-dark-primary">
        <Image
          source={{ uri: listing.coverPhoto.public }}
          className="w-full h-[420px]"
          resizeMode="cover"
        />

        <View
          style={{ borderTopLeftRadius: 30, borderTopRightRadius: 30 }}
          className="p-global bg-light-primary dark:bg-dark-primary -mt-[30px]">
          <ThemedText className="text-3xl text-center font-semibold">{listing.title}</ThemedText>

          <View className="flex-row items-center justify-center mt-3">
            <Icon name="MapPin" size={14} className="mr-1" />
            <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext">
              Male, Maldives
            </ThemedText>
          </View>

          {listing.rating.score > 0 && (
            <View className="flex-row items-center justify-center mt-3">
              <ShowRating
                rating={listing.rating.score}
                size="lg"
                className="px-4 py-2 border-r border-neutral-200 dark:border-dark-secondary"
              />
              <ThemedText className="text-base px-4">
                {listing.rating.count} Reviews
              </ThemedText>
            </View>
          )}

          {listing.thirdPartyReviews && (
            <View className="flex-row items-center justify-center mt-2">
              <Icon name="Star" size={14} className="mr-1" />
              <ThemedText className="text-sm">
                {listing.thirdPartyReviews.reviewScore}/5 on {listing.thirdPartyReviews.source} ({listing.thirdPartyReviews.reviewCount} reviews)
              </ThemedText>
            </View>
          )}

          <Divider className="my-6" />

          {/* Boat Specs */}
          <Section title="Boat Details" titleSize="lg" className="mb-2">
            <View className="mt-3">
              <FeatureItem icon="Users" label="Capacity" value={`${listing.capacity} guests`} />
              <FeatureItem icon="Ruler" label="Length" value={`${listing.lengthFt} ft`} />
              <FeatureItem icon="Ship" label="Type" value={listing.boatType} />
              <FeatureItem icon="Tag" label="Category" value={listing.boatCategory} />
            </View>
          </Section>

          {/* Badges */}
          <View className="flex-row flex-wrap gap-2 mt-2 mb-4">
            {listing.isInstantBook && (
              <View className="flex-row items-center bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-lg">
                <Icon name="Zap" size={16} className="mr-1.5" />
                <ThemedText className="text-sm font-medium">Instant Book</ThemedText>
              </View>
            )}
            {listing.isFreeCancellation && (
              <View className="flex-row items-center bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-lg">
                <Icon name="ShieldCheck" size={16} className="mr-1.5" />
                <ThemedText className="text-sm font-medium">
                  Free cancellation ({listing.freeCancellationDays}d)
                </ThemedText>
              </View>
            )}
          </View>

          <Divider className="my-4" />

          {/* Activities */}
          <Section title="Activities Offered" titleSize="lg" className="mb-4">
            <View className="flex-row flex-wrap gap-2 mt-3">
              {listing.activities.map((activity) => (
                <View
                  key={activity}
                  className="flex-row items-center bg-light-secondary dark:bg-dark-secondary px-3 py-2 rounded-full">
                  <Icon name={getActivityIcon(activity) as IconName} size={14} className="mr-1.5" />
                  <ThemedText className="text-sm">{getActivityLabel(activity)}</ThemedText>
                </View>
              ))}
            </View>
          </Section>

          <Divider className="my-4" />

          {/* Description */}
          <Section title="About" titleSize="lg" className="mb-4">
            <ThemedText className="text-base mt-3 leading-6">{listing.description}</ThemedText>
          </Section>

          <Divider className="my-4" />

          {/* Reviews */}
          <Section title="Reviews" titleSize="lg" className="mb-6">
            <CardScroller className="mt-3" space={10}>
              {reviewsData.map((review, index) => (
                <View
                  key={index}
                  className="w-[280px] bg-light-secondary dark:bg-dark-secondary p-4 rounded-lg">
                  <View className="flex-row items-center mb-2">
                    <Image
                      source={{ uri: review.avatar }}
                      className="w-10 h-10 rounded-full mr-2"
                    />
                    <View>
                      <ThemedText className="font-medium">{review.username}</ThemedText>
                      <ThemedText className="text-xs text-light-subtext dark:text-dark-subtext">
                        {review.date}
                      </ThemedText>
                    </View>
                  </View>
                  <ShowRating rating={review.rating} size="sm" className="mb-2" />
                  <ThemedText className="text-sm">{review.description}</ThemedText>
                </View>
              ))}
            </CardScroller>
          </Section>

          {/* Similar Listings */}
          {similarListings.length > 0 && (
            <Section title="Similar Activities" titleSize="lg" className="mb-6">
              <CardScroller space={15} className="mt-3 pb-4">
                {similarListings.map((similar) => (
                  <Card
                    key={similar.id}
                    title={similar.title}
                    rounded="2xl"
                    hasFavorite
                    rating={similar.rating.score > 0 ? similar.rating.score : undefined}
                    href={`/screens/product-detail?id=${similar.id}`}
                    price={similar.minPrice.display}
                    width={160}
                    imageHeight={160}
                    image={{ uri: similar.coverPhoto.small }}
                  />
                ))}
              </CardScroller>
            </Section>
          )}
        </View>
      </ThemedScroller>

      {/* Bottom Booking Bar */}
      <View
        style={{ paddingBottom: insets.bottom }}
        className="flex-row items-center justify-start px-global pt-4 border-t border-neutral-200 dark:border-dark-secondary">
        <View>
          <ThemedText className="text-xl font-bold">{listing.minPrice.display}</ThemedText>
          <ThemedText className="text-xs opacity-60">
            {listing.listingType === 'boat_rental' ? 'per day' : 'per trip'}
          </ThemedText>
        </View>
        <View className="flex-row items-center ml-auto">
          <Button
            title="Book Now"
            className="bg-highlight ml-6 px-6"
            textClassName="text-white"
            size="medium"
            href={`/screens/order-detail?id=${listing.id}`}
            rounded="lg"
          />
        </View>
      </View>
    </>
  );
};

interface FeatureItemProps {
  icon: IconName;
  label: string;
  value: string;
}

const FeatureItem = ({ icon, label, value }: FeatureItemProps) => (
  <View className="flex-row items-center py-4">
    <Icon name={icon} size={24} strokeWidth={1.5} className="mr-3" />
    <ThemedText className="flex-1">{label}</ThemedText>
    <ThemedText className="font-medium">{value}</ThemedText>
  </View>
);

export default ActivityDetail;

import React, { useState } from 'react';
import { View, ScrollView, Image, Pressable } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Header from '@/components/Header';
import ThemedText from '@/components/ThemedText';
import AnimatedView from '@/components/AnimatedView';
import Icon from '@/components/Icon';
import { Button } from '@/components/Button';
import Divider from '@/components/layout/Divider';
import Section from '@/components/layout/Section';
import ShowRating from '@/components/ShowRating';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getListingById, listings } from '@/data/listings';
import { getActivityLabel } from '@/data/categories';

interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'debit_card' | 'online_banking';
  name: string;
  details: string;
  icon: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'credit_card',
    name: 'Visa ending in 1234',
    details: '\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 1234',
    icon: 'CreditCard',
  },
  {
    id: '2',
    type: 'credit_card',
    name: 'Mastercard ending in 5678',
    details: '\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 5678',
    icon: 'CreditCard',
  },
  {
    id: '3',
    type: 'online_banking',
    name: 'Online Banking',
    details: 'Pay with your bank account',
    icon: 'Building2',
  },
];

export default function OrderDetailScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('1');

  const listing = id ? getListingById(Number(id)) : listings[0];
  if (!listing) return null;

  const serviceFee = Math.round(listing.minPrice.value * 0.12);
  const total = listing.minPrice.value + serviceFee;

  return (
    <View className="flex-1 bg-light-primary dark:bg-dark-primary">
      <Header showBackButton title="Confirm and pay" />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}>
        <AnimatedView animation="fadeIn" duration={400} delay={100}>
          {/* Listing Card */}
          <View className="px-global pt-4">
            <View className="border-neutral-300 border dark:border-dark-neutral-500 rounded-lg p-2">
              <View className="flex-row items-center">
                <Image
                  source={{ uri: listing.coverPhoto.small }}
                  className="w-20 h-20 rounded-lg mr-4"
                  resizeMode="cover"
                />
                <View className="flex-1">
                  <ThemedText className="text-base font-semibold" numberOfLines={2}>
                    {listing.title}
                  </ThemedText>
                  <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext">
                    {listing.boatType} · {listing.capacity} guests
                  </ThemedText>
                  {listing.rating.score > 0 && (
                    <View className="flex-row items-center mt-1">
                      <ShowRating rating={listing.rating.score} size="sm" />
                      <ThemedText className="text-xs text-light-subtext dark:text-dark-subtext ml-2">
                        ({listing.rating.count} reviews)
                      </ThemedText>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </View>

          <Divider className="my-6" />

          {/* Booking Details */}
          <Section title="Your booking" titleSize="lg" className="px-global">
            <View className="mt-4">
              <View className="flex-row items-center justify-between py-4">
                <View>
                  <ThemedText className="font-semibold">Date</ThemedText>
                  <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext mt-1">
                    Apr 5, 2026
                  </ThemedText>
                </View>
                <Button title="Change" variant="outline" size="small" rounded="lg" />
              </View>

              <Divider />

              <View className="flex-row items-center justify-between py-4">
                <View>
                  <ThemedText className="font-semibold">Guests</ThemedText>
                  <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext mt-1">
                    2 guests (max {listing.capacity})
                  </ThemedText>
                </View>
                <Button title="Change" variant="outline" size="small" rounded="lg" />
              </View>

              <Divider />

              <View className="flex-row items-center justify-between py-4">
                <View>
                  <ThemedText className="font-semibold">Activity</ThemedText>
                  <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext mt-1">
                    {getActivityLabel(listing.activities[0])}
                  </ThemedText>
                </View>
                <Button title="Change" variant="outline" size="small" rounded="lg" />
              </View>
            </View>
          </Section>

          <Divider className="my-6" />

          {/* Cancellation Policy */}
          <Section title="Cancellation policy" titleSize="lg" className="px-global">
            <View className="mt-4 flex-row items-start">
              <Icon name="Shield" size={20} className="mr-3 mt-1 text-green-500" />
              <View className="flex-1">
                {listing.isFreeCancellation ? (
                  <>
                    <ThemedText className="font-semibold text-green-600 dark:text-green-400">
                      Free cancellation up to {listing.freeCancellationDays} days before
                    </ThemedText>
                    <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext mt-1">
                      Cancel at least {listing.freeCancellationDays} days in advance for a full refund.
                    </ThemedText>
                  </>
                ) : (
                  <>
                    <ThemedText className="font-semibold">No free cancellation</ThemedText>
                    <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext mt-1">
                      This booking is non-refundable. Please review the operator's cancellation policy.
                    </ThemedText>
                  </>
                )}
              </View>
            </View>
          </Section>

          <Divider className="my-6" />

          {/* Payment Method */}
          <Section title="Choose how to pay" titleSize="lg" className="px-global">
            <View className="mt-4 space-y-3">
              {paymentMethods.map((method) => (
                <Pressable
                  key={method.id}
                  onPress={() => setSelectedPaymentMethod(method.id)}
                  className={`flex-row items-center p-4 rounded-lg border ${
                    selectedPaymentMethod === method.id
                      ? 'border-highlight'
                      : 'border-light-secondary dark:border-dark-secondary'
                  }`}>
                  <Icon name={method.icon as any} size={24} className="mr-4" />
                  <View className="flex-1">
                    <ThemedText className="font-medium">{method.name}</ThemedText>
                    <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext">
                      {method.details}
                    </ThemedText>
                  </View>
                  <View
                    className={`w-5 h-5 rounded-full border-2 ${
                      selectedPaymentMethod === method.id
                        ? 'border-highlight bg-highlight'
                        : 'border-light-subtext dark:border-dark-subtext'
                    } items-center justify-center`}>
                    {selectedPaymentMethod === method.id && (
                      <View className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </View>
                </Pressable>
              ))}
            </View>

            <Pressable className="flex-row items-center p-4 mt-3 border border-dashed border-light-subtext dark:border-dark-subtext rounded-lg">
              <Icon
                name="Plus"
                size={24}
                className="mr-4 text-light-subtext dark:text-dark-subtext"
              />
              <ThemedText className="text-light-subtext dark:text-dark-subtext">
                Add payment method
              </ThemedText>
            </Pressable>
          </Section>

          <Divider className="my-6" />

          {/* Price Details */}
          <Section title="Price details" titleSize="lg" className="px-global">
            <View className="mt-4 space-y-3">
              <View className="flex-row justify-between">
                <ThemedText>
                  {listing.listingType === 'boat_rental' ? 'Day rate' : 'Trip rate'}
                </ThemedText>
                <ThemedText>{listing.minPrice.display}</ThemedText>
              </View>

              <View className="flex-row justify-between">
                <ThemedText>Service fee</ThemedText>
                <ThemedText>US ${serviceFee}</ThemedText>
              </View>

              <Divider className="my-3" />

              <View className="flex-row justify-between">
                <ThemedText className="font-bold text-lg">Total (USD)</ThemedText>
                <ThemedText className="font-bold text-lg">US ${total.toLocaleString()}</ThemedText>
              </View>
            </View>
          </Section>

          <View className="px-global mt-6">
            <ThemedText className="text-xs text-light-subtext dark:text-dark-subtext leading-5">
              By selecting the button below, I agree to the operator's terms, Layovers' Booking
              Policy, and that Layovers can charge my payment method for the total amount shown.
            </ThemedText>
          </View>
        </AnimatedView>
      </ScrollView>

      {/* Bottom Confirm Button */}
      <View
        className="absolute bottom-0 left-0 right-0 px-global py-4 bg-light-primary dark:bg-dark-primary border-t border-light-secondary dark:border-dark-secondary"
        style={{ paddingBottom: insets.bottom + 16 }}>
        <Button
          title="Confirm and pay"
          className="w-full bg-highlight"
          textClassName="text-white font-semibold"
          size="large"
          rounded="lg"
          href="/screens/trip-detail"
        />
      </View>
    </View>
  );
}

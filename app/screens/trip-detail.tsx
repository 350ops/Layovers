import React from 'react';
import { View, ScrollView } from 'react-native';
import Header from '@/components/Header';
import useThemeColors from '@/contexts/ThemeColors';
import ThemedScroller from '@/components/ThemeScroller';
import ThemedFooter from '@/components/ThemeFooter';
import Section from '@/components/layout/Section';
import ImageCarousel from '@/components/ImageCarousel';
import ThemedText from '@/components/ThemedText';
import Avatar from '@/components/Avatar';
import ShowRating from '@/components/ShowRating';
import ListLink from '@/components/ListLink';
import Divider from '@/components/layout/Divider';
import Icon from '@/components/Icon';
import { Button } from '@/components/Button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AnimatedView from '@/components/AnimatedView';

// Sample trip data
const tripData = {
    id: '1',
    activityName: 'Sunset Cruise & Dolphin Watching',
    location: 'Male, Maldives',
    operator: {
        name: 'Black Pearl 1',
        avatar: require('@/assets/img/user-2.jpg'),
        rating: 4.66,
        reviewCount: 1
    },
    tripDate: 'Apr 5, 2026',
    departureTime: '4:00 PM',
    activity: 'Sunset Cruise',
    guests: 4,
    reservationNumber: '#LAY-789456',
    totalPrice: '$616',
    priceBreakdown: {
        tripRate: '$550',
        serviceFee: '$66',
        total: '$616'
    },
    paymentMethod: {
        type: 'Visa',
        lastFour: '1234',
        amount: '$616'
    },
    cancellationPolicy: 'Free cancellation up to 3 days before the trip. After that, no refund.',
    coordinates: {
        latitude: 4.1827,
        longitude: 73.5181
    }
};

const TripDetailScreen = () => {
    const colors = useThemeColors();
    const insets = useSafeAreaInsets();

    return (
        <>
            <Header
                title="Trip Details"
                showBackButton
            />
            <ThemedScroller
                className="flex-1 px-0"
                keyboardShouldPersistTaps="handled"
            >
                <AnimatedView animation="fadeIn" duration={400} delay={100}>
                    {/* Property Images */}
                    <View className='px-global'>
                        <ImageCarousel
                            height={300}
                            rounded='2xl'
                            images={['https://tinyurl.com/2blrf2sk', 'https://tinyurl.com/2yyfr9rc', 'https://tinyurl.com/2cmu4ns5']}
                        />
                    </View>

                    {/* Activity Name and Location */}
                    <View className="px-global pt-6 pb-4">
                        <ThemedText className="text-2xl font-bold mb-2">{tripData.activityName}</ThemedText>
                        <View className="flex-row items-center">
                            <Icon name="MapPin" size={16} className="mr-2 text-light-subtext dark:text-dark-subtext" />
                            <ThemedText className="text-light-subtext dark:text-dark-subtext">{tripData.location}</ThemedText>
                        </View>
                    </View>

                    <Divider className="h-2 bg-light-secondary dark:bg-dark-darker" />

                    {/* Operator Information */}
                    <Section title="Operated by" titleSize="lg" className="px-global pt-4">
                        <View className="flex-row items-center justify-between mt-4 mb-4">
                            <View className="flex-row items-center flex-1">
                                <Avatar src={tripData.operator.avatar} size="lg" />
                                <View className="ml-3 flex-1">
                                    <ThemedText className="text-lg font-semibold">{tripData.operator.name}</ThemedText>
                                    <View className="flex-row items-center mt-1">
                                        <ShowRating rating={tripData.operator.rating} size="sm" />
                                        <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext ml-2">
                                            ({tripData.operator.reviewCount} reviews)
                                        </ThemedText>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <ListLink
                            icon="MessageCircle"
                            title="Message operator"
                            description="Get help with your booking"
                            href="/screens/chat/user"
                            showChevron
                            className="px-4 py-3 bg-light-secondary dark:bg-dark-secondary rounded-xl"
                        />
                    </Section>

                    <Divider className="mt-6 h-2 bg-light-secondary dark:bg-dark-darker" />

                    {/* Trip Details */}
                    <Section title="Your trip" titleSize="lg" className="px-global pt-4">
                        <View className="mt-4 space-y-4">
                            <View className="flex-row items-center justify-between bg-light-secondary dark:bg-dark-secondary rounded-xl p-4">
                                <View>
                                    <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext">Trip Date</ThemedText>
                                    <ThemedText className="text-lg font-semibold">{tripData.tripDate}</ThemedText>
                                    <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext">Departure: {tripData.departureTime}</ThemedText>
                                </View>
                                <View className="items-end">
                                    <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext">Activity</ThemedText>
                                    <ThemedText className="text-lg font-semibold">{tripData.activity}</ThemedText>
                                </View>
                            </View>

                            <View className="flex-row items-center justify-between pt-2">
                                <View>
                                    <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext">Guests</ThemedText>
                                    <ThemedText className="text-lg font-semibold">{tripData.guests} guests</ThemedText>
                                </View>
                            </View>
                        </View>
                    </Section>

                    <Divider className="mt-6 h-2 bg-light-secondary dark:bg-dark-darker" />

                    {/* Reservation Details */}
                    <Section title="Reservation details" titleSize="lg" className="px-global pt-4">
                        <View className="mt-4 space-y-3">
                            <View className="flex-row justify-between">
                                <ThemedText className="text-light-subtext dark:text-dark-subtext">Reservation number</ThemedText>
                                <ThemedText className="font-medium">{tripData.reservationNumber}</ThemedText>
                            </View>

                            <View className="flex-row justify-between">
                                <ThemedText className="text-light-subtext dark:text-dark-subtext">Guests</ThemedText>
                                <ThemedText className="font-medium">{tripData.guests} guests</ThemedText>
                            </View>

                            <View className="mt-4">
                                <ThemedText className="text-sm font-medium mb-2">Cancellation policy</ThemedText>
                                <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext leading-5">
                                    {tripData.cancellationPolicy}
                                </ThemedText>
                            </View>
                        </View>
                    </Section>

                    <Divider className="mt-6 h-2 bg-light-secondary dark:bg-dark-darker" />

                    {/* Price Breakdown */}
                    <Section title="Price details" titleSize="lg" className="px-global pt-4">
                        <View className="mt-4 space-y-3">
                            <View className="flex-row justify-between">
                                <ThemedText className="text-light-subtext dark:text-dark-subtext">
                                    Trip rate
                                </ThemedText>
                                <ThemedText>{tripData.priceBreakdown.tripRate}</ThemedText>
                            </View>

                            <View className="flex-row justify-between">
                                <ThemedText className="text-light-subtext dark:text-dark-subtext">Service fee</ThemedText>
                                <ThemedText>{tripData.priceBreakdown.serviceFee}</ThemedText>
                            </View>

                            <Divider className="my-3" />

                            <View className="flex-row justify-between">
                                <ThemedText className="font-bold text-lg">Total</ThemedText>
                                <ThemedText className="font-bold text-lg">{tripData.priceBreakdown.total}</ThemedText>
                            </View>
                        </View>
                    </Section>

                    <Divider className="mt-6 h-2 bg-light-secondary dark:bg-dark-darker" />

                    {/* Payment Information */}
                    <Section title="Payment information" titleSize="lg" className="px-global pt-4">
                        <View className="flex-row items-center mt-4">
                            <Icon name="CreditCard" size={20} className="mr-3" />
                            <View>
                                <ThemedText className="font-medium">
                                    {tripData.paymentMethod.type} •••• {tripData.paymentMethod.lastFour}
                                </ThemedText>
                                <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext">
                                    Charged {tripData.paymentMethod.amount}
                                </ThemedText>
                            </View>
                        </View>
                    </Section>

                    <Divider className="mt-6 h-2 bg-light-secondary dark:bg-dark-darker" />

                    {/* Rules and Instructions */}
                    <Section title="House rules & instructions" titleSize="lg" className="px-global pt-4">
                        <View className="mt-4 space-y-4">
                            <View className="flex-row items-start">
                                <Icon name="Clock" size={16} className="mr-3 mt-1 text-light-subtext dark:text-dark-subtext" />
                                <View>
                                    <ThemedText className="font-medium">Check-in: After 3:00 PM</ThemedText>
                                    <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext">
                                        Self check-in with keypad
                                    </ThemedText>
                                </View>
                            </View>

                            <View className="flex-row items-start">
                                <Icon name="Users" size={16} className="mr-3 mt-1 text-light-subtext dark:text-dark-subtext" />
                                <View>
                                    <ThemedText className="font-medium">Maximum 4 guests</ThemedText>
                                    <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext">
                                        No additional guests allowed
                                    </ThemedText>
                                </View>
                            </View>

                            <View className="flex-row items-start">
                                <Icon name="Volume2" size={16} className="mr-3 mt-1 text-light-subtext dark:text-dark-subtext" />
                                <View>
                                    <ThemedText className="font-medium">Quiet hours: 10:00 PM - 8:00 AM</ThemedText>
                                    <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext">
                                        Please respect the neighbors
                                    </ThemedText>
                                </View>
                            </View>

                            <View className="flex-row items-start">
                                <Icon name="Ban" size={16} className="mr-3 mt-1 text-light-subtext dark:text-dark-subtext" />
                                <View>
                                    <ThemedText className="font-medium">No smoking</ThemedText>
                                    <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext">
                                        Smoking is not allowed anywhere on the property
                                    </ThemedText>
                                </View>
                            </View>
                        </View>
                    </Section>

                    <Divider className="mt-6 h-2 bg-light-secondary dark:bg-dark-darker" />

                    {/* Location */}
                    <Section title="Location" titleSize="lg" className="px-global pt-4 pb-6">
                        <View className="mt-4">
                            <ThemedText className="text-light-subtext dark:text-dark-subtext mb-4">
                                {tripData.location}
                            </ThemedText>

                            {/* Placeholder for map - you can integrate with react-native-maps */}
                            <View
                                className="w-full h-48 bg-light-secondary dark:bg-dark-secondary rounded-xl items-center justify-center"
                            >
                                <Icon name="Map" size={48} className="text-light-subtext dark:text-dark-subtext mb-2" />
                                <ThemedText className="text-light-subtext dark:text-dark-subtext">
                                    Interactive map coming soon
                                </ThemedText>
                            </View>

                            <Button
                                title="Open in Maps"
                                iconStart="ExternalLink"
                                variant="outline"
                                className="mt-4"
                                onPress={() => {
                                    // Open in device maps app
                                    console.log('Open in maps');
                                }}
                            />
                        </View>
                    </Section>
                </AnimatedView>
            </ThemedScroller>

            <ThemedFooter>
                <View className="flex-row space-x-3">
                    <Button
                        title="Review"
                        variant="outline"
                        iconStart="Star"
                        className="flex-1"
                        href="/screens/review"
                    />
                    <Button
                        title="Cancel trip"
                        variant="outline"
                        iconStart="X"
                        className="flex-1"
                        onPress={() => console.log('Cancel trip')}
                    />
                </View>
            </ThemedFooter>
        </>
    );
};

export default TripDetailScreen;
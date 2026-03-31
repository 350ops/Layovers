import React from 'react';

import Header from '@/components/Header';
import useThemeColors from '@/contexts/ThemeColors';
import ThemedScroller from '@/components/ThemeScroller';
import ThemedFooter from '@/components/ThemeFooter';
import { Image, Pressable } from 'react-native';
import ThemedText from '@/components/ThemedText';
import { View } from 'react-native';
import { shadowPresets } from '@/utils/useShadow';
import Section from '@/components/layout/Section';
import { CardScroller } from '@/components/CardScroller';
import { Chip } from '@/components/Chip';
import { router } from 'expo-router';

interface Reservation {
    id: number;
    guestName: string;
    guestAvatar: string;
    activity: string;
    tripDate: string;
    status: 'upcoming' | 'cancelled' | 'past';
    statusText: string;
    guests: number;
}

const ReservationsScreen = () => {
    const colors = useThemeColors();

    const reservations: Reservation[] = [
        {
            id: 1,
            guestName: 'Captain Alex R.',
            guestAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
            activity: 'Sunset Cruise',
            tripDate: 'Apr 1',
            status: 'upcoming',
            statusText: 'Tomorrow',
            guests: 4
        },
        {
            id: 2,
            guestName: 'Sarah M.',
            guestAvatar: 'https://randomuser.me/api/portraits/women/45.jpg',
            activity: 'Snorkeling & Diving',
            tripDate: 'Apr 3',
            status: 'upcoming',
            statusText: 'In 3 days',
            guests: 6
        },
        {
            id: 3,
            guestName: 'Jennifer K.',
            guestAvatar: 'https://randomuser.me/api/portraits/women/68.jpg',
            activity: 'Dolphin Watching',
            tripDate: 'Apr 5',
            status: 'upcoming',
            statusText: 'In 5 days',
            guests: 3
        },
        {
            id: 4,
            guestName: 'David L.',
            guestAvatar: 'https://randomuser.me/api/portraits/men/67.jpg',
            activity: 'Fishing Charter',
            tripDate: 'Apr 8',
            status: 'upcoming',
            statusText: 'In 1 week',
            guests: 2
        },
        {
            id: 5,
            guestName: 'Emma W.',
            guestAvatar: 'https://randomuser.me/api/portraits/women/89.jpg',
            activity: 'Island Hopping',
            tripDate: 'Apr 12',
            status: 'upcoming',
            statusText: 'In 2 weeks',
            guests: 8
        },
        {
            id: 6,
            guestName: 'Mike T.',
            guestAvatar: 'https://randomuser.me/api/portraits/men/78.jpg',
            activity: 'Boat Tour',
            tripDate: 'Mar 28',
            status: 'cancelled',
            statusText: 'Cancelled',
            guests: 2
        }
    ];

    return (
        <>
            <Header
                showBackButton

            />

            <ThemedScroller
                className="flex-1 pt-8"
                keyboardShouldPersistTaps="handled"
            >
                <Section title="Reservations" titleSize="3xl" className="mt-4" />
                <CardScroller className='mt-1 mb-4'>
                    <Chip size="lg" label="All" />
                    <Chip size="lg" label="Upcoming (5)" />
                    <Chip size="lg" label="Past" />
                    <Chip size="lg" label="Cancelled (1)" />
                </CardScroller>
                
                {reservations.map((reservation) => (
                    <ReservationCard 
                        key={reservation.id}
                        reservation={reservation}
                    />
                ))}
            </ThemedScroller>
            <ThemedFooter>
                <></>
            </ThemedFooter>
        </>
    );
};

interface ReservationCardProps {
    reservation: Reservation;
}

const ReservationCard: React.FC<ReservationCardProps> = ({ reservation }) => {
    const getStatusColor = () => {
        switch (reservation.status) {
            case 'upcoming':
                return 'text-black dark:text-white';
            case 'cancelled':
                return 'text-red-600 dark:text-red-400';
            default:
                return 'text-gray-600 dark:text-gray-400';
        }
    };

    const getCardOpacity = () => {
        return reservation.status === 'cancelled' ? 'opacity-60' : 'opacity-100';
    };

    return (
        <View style={shadowPresets.large} className={`rounded-xl mt-4 border border-neutral-300 dark:border-neutral-700 bg-light-primary dark:bg-dark-primary ${getCardOpacity()}`}>
            <View className="p-4">
                <ThemedText className={`mb-16 text-base font-semibold ${getStatusColor()}`}>
                    {reservation.statusText}
                </ThemedText>
                <View className="flex-row items-center justify-between">
                    <View>
                        <ThemedText className='text-xl font-semibold'>{reservation.guestName}</ThemedText>
                        <ThemedText className='text-base font-regular'>
                            {reservation.activity} · {reservation.tripDate}
                        </ThemedText>
                        <ThemedText className='text-sm text-gray-500 mt-1'>
                            {reservation.guests} guests
                        </ThemedText>
                    </View>
                    <Image source={{ uri: reservation.guestAvatar }} className="w-12 h-12 rounded-full" />
                </View>
            </View>
            {reservation.status !== 'cancelled' && (
                <View className='w-full flex-row border-t border-neutral-300 dark:border-neutral-700'>
                    <Pressable onPress={() => router.push('/screens/booking-detail')} className='w-1/2 py-5 items-center border-r border-neutral-300 dark:border-neutral-700'>
                        <ThemedText className="font-semibold">View booking</ThemedText>
                    </Pressable>
                    <Pressable onPress={() => router.push('/screens/chat/user')} className='w-1/2 py-5 items-center'>
                        <ThemedText className='font-semibold'>Message</ThemedText>
                    </Pressable>
                </View>
            )}
        </View>
    )
}

export default ReservationsScreen;
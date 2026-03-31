import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Image } from 'react-native';
import { Link } from 'expo-router';
import Avatar from '@/components/Avatar';
import Header from '@/components/Header';
import ThemedText from '@/components/ThemedText';
import AnimatedView from '@/components/AnimatedView';
import { Chip } from '@/components/Chip';
import { CardScroller } from '@/components/CardScroller';
import { useCollapsibleTitle } from '@/app/hooks/useCollapsibleTitle';

interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  listingImage?: string;
  activity?: string;
  dates?: string;
  type: 'operator' | 'guest' | 'support';
}

const mockChats: ChatUser[] = [
  {
    id: '1',
    name: 'SaltytaleMv',
    avatar: 'https://i.pravatar.cc/150?img=11',
    lastMessage: 'Your sandbar tour is confirmed for tomorrow at 9 AM. Meet at the jetty!',
    timestamp: '2m ago',
    unread: true,
    listingImage: 'https://static.boatbooker.com/public/images/charters/46900/280x210-blur/02eccf7258581e16027d7cebd8302f2d.jpg',
    activity: 'Sandbar Tour',
    dates: 'Apr 2',
    type: 'operator',
  },
  {
    id: '2',
    name: 'Maldives Boat Club',
    avatar: 'https://i.pravatar.cc/150?img=12',
    lastMessage: 'Thanks for booking! We hope you enjoyed the snorkeling trip.',
    timestamp: '1h ago',
    unread: false,
    listingImage: 'https://static.boatbooker.com/public/images/charters/39503/280x210-blur/671685ebfd9357ddf724e06898fc149b.jpg',
    activity: 'Snorkeling & Diving',
    dates: 'Mar 28',
    type: 'operator',
  },
  {
    id: '3',
    name: 'Tide Explorer',
    avatar: 'https://i.pravatar.cc/150?img=13',
    lastMessage: 'We have availability for the sunset cruise this Friday. Would you like to book?',
    timestamp: '3h ago',
    unread: true,
    listingImage: 'https://static.boatbooker.com/public/images/charters/42036/280x210-blur/ab11ce566f4ccc8b759fe28548327901.jpg',
    activity: 'Sunset Cruise',
    dates: 'Apr 4',
    type: 'operator',
  },
  {
    id: '4',
    name: 'Black Pearl 1',
    avatar: 'https://i.pravatar.cc/150?img=14',
    lastMessage: 'Great dolphin watching conditions expected this week!',
    timestamp: '5h ago',
    unread: false,
    listingImage: 'https://static.boatbooker.com/public/images/charters/47254/280x210-blur/ff63a0a189d933ee0d33985f29b37417.jpg',
    activity: 'Dolphin Watching',
    dates: 'Apr 5',
    type: 'operator',
  },
  {
    id: '5',
    name: 'Layovers Support',
    avatar: 'https://i.pravatar.cc/150?img=5',
    lastMessage: "We've processed your refund. It should appear in 3-5 business days.",
    timestamp: 'Yesterday',
    unread: false,
    type: 'support',
  },
  {
    id: '6',
    name: 'Fascination Maldives',
    avatar: 'https://i.pravatar.cc/150?img=16',
    lastMessage: 'The fishing charter is ready for your group. See you at the dock!',
    timestamp: '2 days ago',
    unread: true,
    listingImage: 'https://static.boatbooker.com/public/images/charters/39403/280x210-blur/e386ab8674faf732ecb597c4d3d1c3e7.jpg',
    activity: 'Fishing Charter',
    dates: 'Apr 8',
    type: 'operator',
  },
];

type FilterType = 'all' | 'read' | 'unread';

export default function InboxScreen() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const { scrollY, onScroll, scrollEventThrottle } = useCollapsibleTitle();

  const filteredChats = mockChats.filter((chat) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'read') return !chat.unread;
    if (selectedFilter === 'unread') return chat.unread;
    return true;
  });

  const unreadCount = mockChats.filter((chat) => chat.unread).length;
  const readCount = mockChats.filter((chat) => !chat.unread).length;

  const renderChatItem = ({ item }: { item: ChatUser }) => (
    <Link href={`/screens/chat/${item.id}`} asChild>
      <TouchableOpacity
        activeOpacity={0.8}
        className="flex-row p-4 border-b border-light-secondary dark:border-dark-secondary">
        <View className="relative">
          {item.listingImage ? (
            <View className="relative">
              <Image source={{ uri: item.listingImage }} className="w-16 h-16 rounded-xl" />
              <View className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full border-2 border-white dark:border-dark-primary">
                <Image source={{ uri: item.avatar }} className="w-7 h-7 rounded-full" />
              </View>
            </View>
          ) : (
            <Avatar size="lg" src={item.avatar} name={item.name} />
          )}
        </View>

        <View className="flex-1 ml-5">
          <View className="flex-row justify-between items-center mb-1">
            <ThemedText className="font-medium text-base" numberOfLines={1}>
              {item.name}
            </ThemedText>
            <View className="flex-row items-center">
              <ThemedText className="text-xs text-light-subtext dark:text-dark-subtext">
                {item.timestamp}
              </ThemedText>
              {item.unread && <View className="w-2 h-2 rounded-full bg-highlight ml-2" />}
            </View>
          </View>

          <ThemedText
            numberOfLines={1}
            className={`text-sm mb-1 ${item.unread ? 'text-black dark:text-white font-medium' : 'text-light-subtext dark:text-dark-subtext'}`}>
            {item.lastMessage}
          </ThemedText>

          {item.activity && (
            <View className="flex-row items-center justify-start">
              <ThemedText
                className="text-xs text-light-subtext dark:text-dark-subtext"
                numberOfLines={1}>
                {item.activity}
              </ThemedText>
              <View className="w-px h-px rounded-full bg-light-subtext dark:bg-dark-subtext mx-1" />
              {item.dates && (
                <ThemedText className="text-xs text-light-subtext dark:text-dark-subtext">
                  {item.dates}
                </ThemedText>
              )}
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <>
      <Header title="Inbox" variant="collapsibleTitle" scrollY={scrollY} />
      <View className="flex-1 bg-light-primary dark:bg-dark-primary">
        <AnimatedView animation="scaleIn" className="flex-1">
          <View className="px-4 py-0">
            <CardScroller className="mb-2" space={5}>
              <Chip
                label="All"
                size="lg"
                isSelected={selectedFilter === 'all'}
                onPress={() => setSelectedFilter('all')}
              />
              <Chip
                label={`Unread (${unreadCount})`}
                size="lg"
                isSelected={selectedFilter === 'unread'}
                onPress={() => setSelectedFilter('unread')}
              />
              <Chip
                label={`Read (${readCount})`}
                size="lg"
                isSelected={selectedFilter === 'read'}
                onPress={() => setSelectedFilter('read')}
              />
            </CardScroller>
          </View>

          <FlatList
            className="pb-80"
            onScroll={onScroll}
            scrollEventThrottle={scrollEventThrottle}
            ListFooterComponent={<View className="h-52" />}
            data={filteredChats}
            renderItem={renderChatItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ flexGrow: 1 }}
          />
        </AnimatedView>
      </View>
    </>
  );
}

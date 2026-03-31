import React, { useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import ThemedText from '@/components/ThemedText';
import Slider from '@react-native-community/slider';
import Counter from '@/components/forms/Counter';
import { Button } from '@/components/Button';
import ThemedScroller from '@/components/ThemeScroller';
import ThemeFooter from '@/components/ThemeFooter';
import Header from '@/components/Header';
import Section from '@/components/layout/Section';
import { Chip } from '@/components/Chip';
import Switch from '@/components/forms/Switch';
import { ACTIVITY_CATEGORIES, BOAT_CATEGORIES } from '@/data/categories';

export default function FiltersScreen() {
  const router = useRouter();
  const [price, setPrice] = useState(1000);
  const [instantBook, setInstantBook] = useState(false);
  const [freeCancellation, setFreeCancellation] = useState(false);

  const handleApplyFilters = () => {
    router.back();
  };

  return (
    <>
      <Header showBackButton title="Filters" />
      <ThemedScroller className="flex-1 bg-light-primary dark:bg-dark-primary">
        <Section
          className="mb-7 pb-7 border-b border-light-secondary dark:border-dark-secondary"
          title="Price"
          subtitle={`Up to $${Math.round(price)} USD`}>
          <Slider
            style={{ width: '100%', height: 40 }}
            value={price}
            minimumValue={20}
            maximumValue={7500}
            onValueChange={setPrice}
            minimumTrackTintColor="#FF2358"
            maximumTrackTintColor="rgba(0,0,0,0.2)"
            step={10}
          />
        </Section>

        <Section
          className="mb-7 pb-7 border-b border-light-secondary dark:border-dark-secondary"
          title="Activity Type">
          <View className="flex-row flex-wrap gap-2 mt-2">
            {ACTIVITY_CATEGORIES.map((cat) => (
              <Chip key={cat.key} icon={cat.icon as any} label={cat.label} size="lg" selectable />
            ))}
          </View>
        </Section>

        <Section
          className="mb-7 pb-7 border-b border-light-secondary dark:border-dark-secondary"
          title="Boat Category">
          <View className="flex-row flex-wrap gap-2 mt-2">
            {BOAT_CATEGORIES.map((cat) => (
              <Chip key={cat} label={cat} size="lg" selectable />
            ))}
          </View>
        </Section>

        <Section
          className="mb-7 pb-7 border-b border-light-secondary dark:border-dark-secondary"
          title="Capacity">
          <CounterRow label="Minimum guests" />
          <CounterRow label="Maximum guests" />
        </Section>

        <Section
          className="mb-7 pb-7 border-b border-light-secondary dark:border-dark-secondary"
          title="Booking Options">
          <View className="mt-4 space-y-4">
            <Switch
              icon="Zap"
              label="Instant Book"
              description="Only show listings you can book immediately"
              value={instantBook}
              onChange={setInstantBook}
            />
            <Switch
              icon="ShieldCheck"
              label="Free Cancellation"
              description="Only show listings with free cancellation"
              value={freeCancellation}
              onChange={setFreeCancellation}
            />
          </View>
        </Section>
      </ThemedScroller>
      <ThemeFooter>
        <Button
          title="Apply Filters"
          rounded="full"
          size="large"
          className="bg-highlight"
          textClassName="text-white"
          onPress={handleApplyFilters}
        />
      </ThemeFooter>
    </>
  );
}

const CounterRow = (props: { label: string }) => {
  return (
    <View className="flex-row items-center justify-between py-2">
      <View>
        <ThemedText className="text-base font-normal">{props.label}</ThemedText>
      </View>
      <Counter />
    </View>
  );
};

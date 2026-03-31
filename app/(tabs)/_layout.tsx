import { NativeTabs } from 'expo-router/unstable-native-tabs';
import React from 'react';
import { useBusinessMode } from '@/app/contexts/BusinesModeContext';

export default function Layout() {
  const { isBusinessMode } = useBusinessMode();

  return (
    <NativeTabs>
      {!isBusinessMode && (
        <>
          <NativeTabs.Trigger name="search">
            <NativeTabs.Trigger.Icon sf={{ default: 'map', selected: 'map.fill' }} md="map" />
            <NativeTabs.Trigger.Label>Search</NativeTabs.Trigger.Label>
          </NativeTabs.Trigger>
          <NativeTabs.Trigger name="inbox">
            <NativeTabs.Trigger.Icon
              sf={{ default: 'bubble.left.and.bubble.right', selected: 'bubble.left.and.bubble.right.fill' }}
              md="chat"
            />
            <NativeTabs.Trigger.Label>Inbox</NativeTabs.Trigger.Label>
          </NativeTabs.Trigger>
          <NativeTabs.Trigger name="book">
            <NativeTabs.Trigger.Icon sf={{ default: 'sailboat', selected: 'sailboat.fill' }} md="sailing" />
            <NativeTabs.Trigger.Label>Book</NativeTabs.Trigger.Label>
          </NativeTabs.Trigger>
          <NativeTabs.Trigger name="profile">
            <NativeTabs.Trigger.Icon sf={{ default: 'person.circle', selected: 'person.circle.fill' }} md="account_circle" />
            <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
          </NativeTabs.Trigger>
        </>
      )}

      {isBusinessMode && (
        <>
          <NativeTabs.Trigger name="dashboard">
            <NativeTabs.Trigger.Icon sf={{ default: 'chart.bar', selected: 'chart.bar.fill' }} md="dashboard" />
            <NativeTabs.Trigger.Label>Dashboard</NativeTabs.Trigger.Label>
          </NativeTabs.Trigger>
          <NativeTabs.Trigger name="inbox">
            <NativeTabs.Trigger.Icon
              sf={{ default: 'bubble.left.and.bubble.right', selected: 'bubble.left.and.bubble.right.fill' }}
              md="chat"
            />
            <NativeTabs.Trigger.Label>Inbox</NativeTabs.Trigger.Label>
          </NativeTabs.Trigger>
          <NativeTabs.Trigger name="listings">
            <NativeTabs.Trigger.Icon sf={{ default: 'list.bullet', selected: 'list.bullet' }} md="list" />
            <NativeTabs.Trigger.Label>Listings</NativeTabs.Trigger.Label>
          </NativeTabs.Trigger>
          <NativeTabs.Trigger name="profile">
            <NativeTabs.Trigger.Icon sf={{ default: 'person.circle', selected: 'person.circle.fill' }} md="account_circle" />
            <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
          </NativeTabs.Trigger>
        </>
      )}
    </NativeTabs>
  );
}

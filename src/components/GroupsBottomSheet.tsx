import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

import { Group, User } from '../models/types';

interface Props {
  groups: Group[];
  users: User[];
  groupsMasterEnabled: boolean;
  onToggleGroup: (groupId: string) => void;
}

export function GroupsBottomSheet({ groups, users, groupsMasterEnabled, onToggleGroup }: Props) {
  const snapPoints = useMemo(() => ['18%', '45%'], []);

  return (
    <BottomSheet index={0} snapPoints={snapPoints} handleIndicatorStyle={styles.indicator}>
      <BottomSheetScrollView contentContainerStyle={styles.content}>
        {groups.map((group) => (
          <View key={group.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.groupTitle}>{group.name}</Text>
              <Switch value={groupsMasterEnabled && group.enabled} onValueChange={() => onToggleGroup(group.id)} disabled={!groupsMasterEnabled} />
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.membersRow}>
                {group.memberIds.map((memberId) => {
                  const member = users.find((u) => u.id === memberId);
                  if (!member) return null;
                  return (
                    <View key={member.id} style={styles.memberBubble}>
                      <Text style={styles.memberInitials}>{member.initials}</Text>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        ))}
      </BottomSheetScrollView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  indicator: { backgroundColor: '#9ca3af' },
  content: { paddingHorizontal: 14, gap: 10 },
  card: { backgroundColor: 'white', borderRadius: 14, padding: 12, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  groupTitle: { fontWeight: '700', fontSize: 15 },
  membersRow: { flexDirection: 'row', gap: 8, marginTop: 10 },
  memberBubble: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: '#e5e7eb' },
  memberInitials: { fontWeight: '700', color: '#111827' },
});

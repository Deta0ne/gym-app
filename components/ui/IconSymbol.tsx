// This file is a fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols';
import React from 'react';
import { OpaqueColorValue, StyleProp, TextStyle } from 'react-native';

// Add your SFSymbol to MaterialIcons mappings here.
const MAPPING = {
    // See MaterialIcons here: https://icons.expo.fyi
    // See SF Symbols in the SF Symbols app on Mac.
    'house.fill': 'home',
    'paperplane.fill': 'send',
    'chevron.left.forwardslash.chevron.right': 'code',
    'chevron.right': 'chevron-right',
    'dumbbell.fill': 'fitness-center',
    'person.fill': 'person',
    'star.fill': 'star',
    'figure.walk': 'directions-walk',
    'bell.fill': 'notifications',
    'moon.fill': 'nightlight-round',
    gear: 'settings',
    'door.left.hand.open': 'logout',
    'figure.strengthtraining.traditional': 'fitness-center',

    'list.clipboard': 'list-alt',
    'list.clipboard.fill': 'list-alt',
    plus: 'add',
    'plus.circle': 'add-circle',
    'plus.circle.fill': 'add-circle',
    trash: 'delete',
    'trash.fill': 'delete',
    pencil: 'edit',
    xmark: 'close',
    'xmark.circle.fill': 'cancel',
    magnifyingglass: 'search',
    calendar: 'event',
    'exclamationmark.triangle': 'warning',
    ellipsis: 'more-horiz',
    'ellipsis.vertical': 'more-vert',
} as Partial<
    Record<import('expo-symbols').SymbolViewProps['name'], React.ComponentProps<typeof MaterialIcons>['name']>
>;

export type IconSymbolName = keyof typeof MAPPING;

/**
 * An icon component that uses native SFSymbols on iOS, and MaterialIcons on Android and web. This ensures a consistent look across platforms, and optimal resource usage.
 *
 * Icon `name`s are based on SFSymbols and require manual mapping to MaterialIcons.
 */
export function IconSymbol({
    name,
    size = 24,
    color,
    style,
}: {
    name: IconSymbolName;
    size?: number;
    color: string | OpaqueColorValue;
    style?: StyleProp<TextStyle>;
    weight?: SymbolWeight;
}) {
    return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}

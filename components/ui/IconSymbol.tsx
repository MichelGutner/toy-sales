// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>;
type IconSymbolName = keyof typeof MAPPING;

const MAPPING = {
  'house': 'home-filled',
  'house.fill': 'home',
  'chart.pie': 'pie-chart-outline',
  'chart.pie.fill': 'pie-chart',
  'magnifyingglass': 'search',
  'trophy.fill': 'emoji-events',
  'plus': 'add',
  'calendar.and.person': 'event',
  'envelope.badge.person.crop': 'email',
  'envelope.badge.person.crop.fill': 'email',
  'lock': 'lock',
  'lock.open': 'lock-open',
  'eye': 'visibility',
  'eye.slash': 'visibility-off',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
} as IconMapping;


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

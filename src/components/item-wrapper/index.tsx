import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { styles } from './styles';

interface ItemWrapperProps {
  index: number;
}

export const ItemWrapper: React.FC<ItemWrapperProps> = ({
  index,
  children,
}) => {
  if (index % 2 === 0)
    return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['rgba(196, 196, 196, 0.24)', 'rgba(196, 196, 196, 0)']}
        style={styles.container}
      >
        {children}
      </LinearGradient>
    );

  return <View style={styles.container}>{children}</View>;
};

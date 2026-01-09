// ============================================================================
// SCANLINE OVERLAY - CRT-style scanline effect
// ============================================================================

import React, { useMemo } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

interface ScanlineOverlayProps {
  opacity?: number;
  lineSpacing?: number;
}

export function ScanlineOverlay({ opacity = 0.06, lineSpacing = 3 }: ScanlineOverlayProps) {
  const { height } = Dimensions.get('window');
  const numberOfLines = Math.ceil(height / lineSpacing);

  const lines = useMemo(() => {
    return Array.from({ length: numberOfLines }, (_, i) => (
      <View
        key={i}
        style={[
          styles.scanline,
          {
            top: i * lineSpacing,
            opacity: opacity,
          },
        ]}
      />
    ));
  }, [numberOfLines, lineSpacing, opacity]);

  return (
    <View style={styles.container} pointerEvents="none">
      {lines}
    </View>
  );
}

// Lighter version for just a subtle CRT feel
export function SubtleScanlines() {
  return <ScanlineOverlay opacity={0.04} lineSpacing={2} />;
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
  },
  scanline: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#000',
  },
});

export default ScanlineOverlay;

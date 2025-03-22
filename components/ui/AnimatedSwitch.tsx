import React, { useEffect } from 'react';
import { StyleSheet, Pressable, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, interpolateColor } from 'react-native-reanimated';

interface AnimatedSwitchProps {
    value: boolean;
    onValueChange: (value: boolean) => void;
    activeColor?: string;
    inactiveColor?: string;
    thumbColor?: string;
    disabled?: boolean;
}

export function AnimatedSwitch({
    value,
    onValueChange,
    activeColor = '#4CD964',
    inactiveColor = '#767577',
    thumbColor = '#FFFFFF',
    disabled = false,
}: AnimatedSwitchProps) {
    // Animation values
    const offset = useSharedValue(value ? 1 : 0);

    // Update animation when value changes from outside
    useEffect(() => {
        offset.value = withSpring(value ? 1 : 0, {
            damping: 15,
            stiffness: 180,
        });
    }, [value, offset]);

    // Animate the thumb position
    const thumbStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: withSpring(offset.value * 20, {
                        damping: 15,
                        stiffness: 180,
                    }),
                },
            ],
        };
    });

    // Animate the background color
    const backgroundStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(offset.value, [0, 1], [inactiveColor, activeColor]);

        return {
            backgroundColor,
        };
    });

    // Toggle the switch
    const toggle = () => {
        if (!disabled) {
            onValueChange(!value);
        }
    };

    return (
        <Pressable onPress={toggle} disabled={disabled}>
            <Animated.View style={[styles.track, backgroundStyle]}>
                <Animated.View style={[styles.thumb, thumbStyle, { backgroundColor: thumbColor }]} />
            </Animated.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    track: {
        width: 50,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        paddingHorizontal: 5,
    },
    thumb: {
        width: 24,
        height: 24,
        borderRadius: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
});

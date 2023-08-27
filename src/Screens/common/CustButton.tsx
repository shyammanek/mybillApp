import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import CustText from './CustText'

type Props = {
    children?: ReactNode
    style?: ViewStyle
    color?: string
    onPress?: () => void
}
export default function CustButton({
    children,
    style,
    color,
    onPress = () => {}
}: Props) {
  return (
    <TouchableOpacity 
        onPress={onPress} 
        style={[
            styles.buttonStyle, 
            { backgroundColor: color || '#33b249' }, 
            style
        ]}>
        <CustText fontSize={14} bold color='#fff'>{children}</CustText>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    buttonStyle: {
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderRadius: 10,
        alignItems: 'center'
    }
})
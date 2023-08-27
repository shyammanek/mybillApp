import { StyleSheet, Text, View, TextStyle } from 'react-native'
import React, { Children, ReactNode } from 'react'

interface Props {
  fontSize?:number
  paddingLeft?: number
  paddingRight?: number
  paddingTop?: number
  paddingBottom?: number
  paddingHorizontal?: number
  bold?: boolean
  color?: string
  style?: TextStyle
  children?: ReactNode
}

export default function CustText({
    fontSize, 
    paddingLeft, 
    paddingRight, 
    paddingTop, 
    paddingBottom,
    paddingHorizontal,
    bold,
    color,
    style,
    children
}: Props) {

  return (
    <View>
      <Text 
        style={[styles.textStyle, { 
            fontSize, 
            paddingLeft,
            paddingRight,
            paddingTop,
            paddingBottom,
            color,
            paddingHorizontal,
            textAlign: 'center',
            fontWeight: bold ? 'bold' : 'normal',
            ...style
        }]}>
            {children}
    </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    textStyle: {
      color: '#000'
    }
})
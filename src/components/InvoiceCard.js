import { View, Text } from 'react-native'
import React from 'react'

const InvoiceCard = ({heading, title}) => {
  return (
    <View style={{marginHorizontal:30}}>
          <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black' }}>{heading}:</Text>
          <Text style={{ fontSize: 25, color: 'black', marginLeft: 80 }}>{title}</Text>
    </View>
  )
}

export default InvoiceCard
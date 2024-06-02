import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CardHorizontalButton from '../../components/Cards/CardHorizontalButton'

const BussinessAreaScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
       <CardHorizontalButton
        title="Kelas Bisnis"
        iconName={'arrow-right'}
        onPress={() => navigation.navigate('BussinessVideo')}
        subtitle={'Kelas bisnis berupa video yang bisa anda lihat'}
      />
       <CardHorizontalButton
        title="Pendanaan UMKM"
        iconName={'money-bill-alt'}
        subtitle={'Pendanaan untuk scale up'}
      />
       <CardHorizontalButton
        title="Konsultasi Bisnis"
        iconName={'user-graduate'}
        subtitle={'Konsultasi bisnis dengan mentor berpengalaman'}
      />
    </View>
  )
}

export default BussinessAreaScreen

const styles = StyleSheet.create({
    container:{
        padding:15
    }
})
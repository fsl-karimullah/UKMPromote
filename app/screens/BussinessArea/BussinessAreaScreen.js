import { Alert, StyleSheet, Text, View } from 'react-native'
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
        title="Beli Website"
        iconName={'shopping-basket'}
        onPress={() => navigation.navigate('TemplateWebsiteScreen')}
        subtitle={'List Template Website'}
      />
       <CardHorizontalButton
        title="Konsultasi Bisnis"
        iconName={'user-graduate'}
        onPress={() => navigation.navigate('MentorScreen')}
        subtitle={'Konsultasi bisnis dengan mentor berpengalaman'}
      />
       <CardHorizontalButton
        title="Pendanaan UMKM"
        iconName={'money-bill-alt'}
        subtitle={'Pendanaan untuk scale up'}
        onPress={() => Alert.alert('Informasi', 'Fitur Akan Datang')}
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
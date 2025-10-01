import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { InterBold, InterMedium, InterRegular } from '../../resources/fonts';
import { COLOR_PRIMARY } from '../../resources/colors';

const TermsAndConditions = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Syarat & Ketentuan</Text>
      <View style={styles.content}>
        <Text style={styles.item}>1. BOOKING 1 HARI SEBELUM JADWAL KONSULTASI SESUAI DENGAN JAM YANG DISEDIAKAN.</Text>
        <Text style={styles.item}>2. JIKA INGIN RESCHEDULE, HARUS 1 HARI SEBELUM JADWAL.</Text>
        <Text style={styles.item}>3. SESI KONSULTASI BERLANGSUNG 30 MENIT JIKA INGIN TAMBAHAN WAKTU, MAKA HARUS MEMBUAT JADWAL LAGI.</Text>
        <Text style={styles.item}>4. PEMBAYARAN DILAKUKAN DENGAN MENGUPLOAD BUKTI PEMBAYARAN DI GOOGLE FORM.</Text>
        <Text style={styles.item}>5. JIKA TIDAK HADIR DALAM GMEET, MAKA BIAYA KONSULTASI TIDAK BISA DIKEMBALIKAN.</Text>
        <Text style={styles.item}>6. DILARANG MENGAJAK BEKERJASAMA DENGAN MENTOR Akademi UMKM INDONESIA.</Text>
        <Text style={styles.item}>7. DILARANG MENANYAKAN SESUATU DILUAR DARI TOPIK YANG DIBAHAS.</Text>
        <Text style={styles.item}>8. MEMBER HARUS HADIR TEPAT WAKTU, KITA AKAN MEMBERIKAN WAKTU TAMBAHAN UNTUK MEMBER 10 MENIT. JIKA MASIH TIDAK HADIR, MAKA KONSULTASI DINYATAKAN SELESAI.</Text>
        <Text style={styles.item}>9. KONSULTAN AKAN MEMBERIKAN SEGALA MASUKAN UNTUK BISNIS MEMBER, NAMUN KEPUTUSAN AKHIR DAN TANGGUNG JAWAB BERADA DI TANGAN MEMBER.</Text>
        <Text style={styles.item}>10. PASTIKAN MEMILIH MENTOR YANG TEPAT SUPAYA BISA ALIGN ATAU MASUK DENGAN PERMASALAHAN BISNIS MEMBER.</Text>
      </View>
    </ScrollView>
  );
};

export default TermsAndConditions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: InterBold,
    color: COLOR_PRIMARY,
    textAlign: 'center',
    marginBottom: 20,
    
  },
  content: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginBottom:20
  },
  item: {
    fontSize: 16,
    fontFamily: InterMedium,
    color: '#000',
    marginBottom: 12,
    lineHeight: 24,
  },
});

import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import FundingCard from '../../components/Cards/FundingCard';

const FundingScreen = ({ navigation }) => {
  const investorData = [
    {
      investorImage: 'https://media-sin6-2.cdn.whatsapp.net/v/t61.24694-24/366404386_749759763827547_4615112813912402286_n.jpg?ccb=11-4&oh=01_AdTQaj0lWKvTC07s2c0RM41HFv623GgsCnby2Xdb2BCFEA&oe=65FAD1CA&_nc_sid=e6ed6c&_nc_cat=104',
      investorProfile: 'Faruk Maulana',
      investorPosition: 'Senior Investor',
      investorDescription: 'Sint amet occaecat amet tempor nulla aliquip id amet minim voluptate ullamco do commodo proident. Pariatur et ea eu ut anim aliqua ipsum fugiat est laborum minim quis in. Aute nostrud incididunt sunt pariatur nostrud occaecat sint. Veniam ad consequat duis laboris velit eu est veniam cillum velit incididunt commodo. Mollit pariatur in mollit sunt ea fugiat excepteur. Mollit sint ad proident incididunt consequat consectetur dolore sit in velit. Duis reprehenderit adipisicing nostrud velit nostrud quis in. Aliqua quis in est proident amet occaecat quis id magna dolore magna do in eiusmod. In esse enim anim quis ipsum reprehenderit incididunt. Officia reprehenderit sunt adipisicing et laborum irure dolore sit tempor. Ullamco eu magna non duis ad ipsum eu et excepteur in. Nostrud occaecat excepteur excepteur ea incididunt cupidatat sunt do anim irure. Ad incididunt minim laborum duis adipisicing occaecat esse aliquip eiusmod. Ullamco ea enim ea laborum exercitation. Laborum est Lorem tempor adipisicing est velit occaecat irure id anim ut qui ea. Cupidatat laborum pariatur nostrud aliquip laborum ut qui aliqua excepteur ea est.',
    },
    {
      investorImage: 'https://media-sin6-2.cdn.whatsapp.net/v/t61.24694-24/328794378_709212801109638_9132724821093942204_n.jpg?ccb=11-4&oh=01_AdQuAjv6q_gJZkTdmKveOBa429IbKobpfmtkUB7L6xdoGw&oe=65FADBD0&_nc_sid=e6ed6c&_nc_cat=109g',
      investorProfile: 'Ropi Hidayat',
      investorPosition: 'Lead Investor Kokit Indonesia Group',
      investorDescription: 'Sint amet occaecat amet tempor nulla aliquip id amet minim voluptate ullamco do commodo proident. Pariatur et ea eu ut anim aliqua ipsum fugiat est laborum minim quis in. Aute nostrud incididunt sunt pariatur nostrud occaecat sint. Veniam ad consequat duis laboris velit eu est veniam cillum velit incididunt commodo. Mollit pariatur in mollit sunt ea fugiat excepteur. Mollit sint ad proident incididunt consequat consectetur dolore sit in velit. Duis reprehenderit adipisicing nostrud velit nostrud quis in. Aliqua quis in est proident amet occaecat quis id magna dolore magna do in eiusmod. In esse enim anim quis ipsum reprehenderit incididunt. Officia reprehenderit sunt adipisicing et laborum irure dolore sit tempor. Ullamco eu magna non duis ad ipsum eu et excepteur in. Nostrud occaecat excepteur excepteur ea incididunt cupidatat sunt do anim irure. Ad incididunt minim laborum duis adipisicing occaecat esse aliquip eiusmod. Ullamco ea enim ea laborum exercitation. Laborum est Lorem tempor adipisicing est velit occaecat irure id anim ut qui ea. Cupidatat laborum pariatur nostrud aliquip laborum ut qui aliqua excepteur ea est.',
    },
  ];

  const renderItem = ({ item }) => (
    <FundingCard
      {...item}
      onPress={() => navigation.navigate('FundingDetailScreen', { ...item })}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={investorData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default FundingScreen;

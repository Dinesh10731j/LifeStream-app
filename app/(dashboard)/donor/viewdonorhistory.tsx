import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import { UseDonorHistory } from '@/hooks/useDonorDonationHistory';
const Viewdonorhistory = () => {
  const {data:donorhistory} = UseDonorHistory();
  console.log("This is donor history",donorhistory)
  return (
    <View style={styles.container}>
      <Text>This is donor history</Text>
    </View>
  )
}

export default Viewdonorhistory

const styles = StyleSheet.create({

  container:{
    height:'100%',
    width:"100%",
    backgroundColor:'#fff',

  }
})
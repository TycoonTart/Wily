import React from 'react';
import { Text, View,StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';
export default class TransactionScreen extends React.Component {
  constructor(){
    super();
    this.state={
      hasCameraPermissions:null,
      scanned:false,
      scannedData:'',
      buttonState:"normal"
    }
  }
  getCameraPermissions=async()=>{
    const {status} = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      hasCameraPermissions:status==='granted',
      buttonState:"clicked",
      scanned:false
      
      })
    
  }
  handleBarCodeScanned=async({type,data})=>{
    this.setState({
      scanned:true,
      scannedData:data,
      buttonState:"normal"
    })
  }
    render() {
      const hasCameraPermissions=this.state.hasCameraPermissions;
      const scanned=this.state.scanned;
      const buttonState=this.state.buttonState;
      if(buttonState==="clicked" && hasCameraPermissions){
        return(
          <BarCodeScanner onBarCodeScanned={scanned?undefined:this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
          />
        )
      }
      else if(buttonState==="normal"){
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.text}>
            {hasCameraPermissions===true?this.state.scannedData:"request camera permisions"}
          </Text>
          <TouchableOpacity style={styles.button1} onPress={()=>{
            this.getCameraPermissions()
          }}>
            <Text style={styles.qrText}>Scan QR Code</Text>
          </TouchableOpacity>
        </View>
      );

        }
    }
  }
  const styles=StyleSheet.create({
    button1:{
      backgroundColor:"red",
      padding:10,
      margin:10,
    },
    qrText:{
      color:"white",
      fontSize:20,

    },
    text:{
      fontSize:25,
      textDecorationLine:"underline"
    }
  })
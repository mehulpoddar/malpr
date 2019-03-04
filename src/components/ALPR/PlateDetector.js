import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ToastAndroid,
  Platform,
  ScrollView,
  ActivityIndicator,
  StatusBar
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import RNFetchBlob from 'react-native-fetch-blob';
import firebase from 'firebase';
import { RNDocScanner } from 'rn-doc-scanner';
import InputForm from './InputForm';

// symbol polyfills
global.Symbol = require('core-js/es6/symbol');
require('core-js/fn/symbol/iterator');

// collection fn polyfills
require('core-js/fn/map');
require('core-js/fn/set');
require('core-js/fn/array/find');

export default class PlateDetector extends Component{

    state = {name: '', contact: '', numPlate: '', clicked: false ,
    imageuri: '', processing: false, plateText: '', flaskurl: '',
    testImage: null, fillDetails: false, Notif: 'Loading...'};

    screenWidth = 0;
    screenHeight = 0;

    componentWillMount() {
        this.screenWidth = Dimensions.get('window').width;
        this.screenHeight = Dimensions.get('window').height;
    }

    cleanUrl(url){
      url = url.replace('%2F','%252F');
      return url
    }

    async getNumPlate() {
      console.log("processing")
      try {
        url = this.state.flaskurl
        url = this.cleanUrl(url)
        console.log("URLLLLLLLLLLL",url)
        let response = await fetch(
          'http://192.168.43.174:5000/plate?url='+url
          //'http://192.168.1.7:5000/plate?url=https://i.ibb.co/7RLK4PM/test1.jpg'
        );
        console.log("Banthu")
        js = await response.json()
        console.log(js.plate);
        this.setState({processing:true, plateText:js.plate})
      } catch (error) {
        console.error(error);
      }
    }

    _handleCamera = () => {
      // argument false means auto document detection
      // argument true means manual cropping
      RNDocScanner.getDocumentCrop(true, this.state.imageuri)
        .then(res => {
          console.log(res)
          this.setState({ testImage: res, fillDetails: true }, ()=>{
            this.uploadDetails.bind(this) })
        })
        .catch(err => {
          console.log(err)
        })
      }

    uploadDetails()
    {
      const Blob = RNFetchBlob.polyfill.Blob
      const fs = RNFetchBlob.fs
      window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
      window.Blob = Blob

    const uploadImage = (uri, imageName, mime = 'image') => {
    return new Promise((resolve, reject) => {
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
        let uploadBlob = null
      const imageRef = firebase.storage().ref().child(imageName)
        fs.readFile(uploadUri, 'base64')
        .then((data) => {
          return Blob.build(data, { type: `${mime};BASE64` })
        })
        .then((blob) => {
          uploadBlob = blob
          return imageRef.put(blob, { contentType: mime })
        })
        .then(() => {
          uploadBlob.close()
          console.log(imageRef.getDownloadURL)
          return imageRef.getDownloadURL()
        })
        .then((url) => {
          //firebase.database().ref(`branch/${this.state.branch}/notes/sem_${this.state.sem}/${this.state.subject}`).push().key

              //ToastAndroid.show('Processing', ToastAndroid.SHORT);
              console.log(url)
              this.setState({processing:null, flaskurl:url},()=>{
                this.getNumPlate()
              })

              resolve(url)
            });



        })

    }
     ToastAndroid.show('Processing, Please Wait...',ToastAndroid.SHORT)
     //console.log('chapName', this.state.chap+`${this.state.mimeType.split("/")[1]}`)
     g= uploadImage(this.state.testImage, "Hello2" , ".jpg")

    }


    cameraOrPic(){
      if(!this.state.clicked)
      {
        return <View style={styles.container}>
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style = {styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.off}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
            onGoogleVisionBarcodesDetected={({ barcodes }) => {
              console.log(barcodes)
            }}
        />
        <View style={{ position: 'absolute', left: '80%', height: '100%', width: '20%', justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={this.takePicture.bind(this)}
          style = {{ height: '20%', width: '50%' }}
        >
            <Image source={require('../../resources/shutter.png')} style={{ height: '100%', width: '100%' }}/>
        </TouchableOpacity>
        </View>
        </View>

      }
      else{
        if(this.state.imageuri!='' && this.state.processing==false && this.state.fillDetails == true)
        {
          if(this.state.processing==null)
          {
            this.setState({ Notif: 'Reading Plate: Please Wait...' });
          }
          else if(this.state.processing==true)
          {
            if (this.state.plateText === "Try Again!")
              this.setState({ Notif: 'Failure: Unable to Read Plate' });
            else
              this.setState({ Notif: 'Success: Plate Read', numPlate: this.state.plateText });
          }
          return (
            <View style={{height:'100%', backgroundColor:'#EEEEEE'}}>
            <ScrollView contentContainerStyle={{alignItems:'center', marginTop: 30, backgroundColor:'#EEEEEE'}} style={{flex:1}}>
                <View style={{alignItems:'center', width:'80%', marginTop:10}}>
                    <InputForm
                        onChangeText={name => this.setState({ name: name })}
                        value={this.state.name}
                        label="Name"
                    />
                </View>

                <View style={{alignItems:'center', width:'80%', marginTop:10}}>
                    <InputForm
                        onChangeText={contact => this.setState({ contact: contact })}
                        value={this.state.contact}
                        label="Contact"
                    />
                </View>

                <View style={{alignItems:'center', width:'80%', marginTop:10}}>
                    <InputForm
                        onChangeText={numPlate => this.setState({ numPlate: numPlate })}
                        value={this.state.numPlate}
                        label="Plate"
                    />
                    <Text style={{alignSelf:'flex-start', fontSize:18, marginTop:10, marginLeft: 115}}>
                    {this.state.Notif}
                    </Text>
                </View>

                <View style={{ justifyContent:'center', marginTop:10, borderRadius:25, width:'100%', alignItems:'center'}}>
                    <TouchableOpacity
                    onPress={()=>{this.setState(
                      { clicked: false, imageuri: '', processing: false, plateText: '', flaskurl: '',
                        Notif: 'Loading...', fillDetails: false, name: '', contact: '', numPlate: '' }
                    )}}
                      style={{alignItems:'center',justifyContent:'center', width:'20%', height:this.screenHeight/9, backgroundColor:'#272727', borderRadius:25}}
                    >
                        <Text style={{color:'orange', fontSize:19}}>Submit</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
            </View>
          );
        }
      }
    }

    render(){
        return(
            <View style={styles.container}>
            <StatusBar hidden />
            {this.cameraOrPic()}
           </View>
        )
    }


    takePicture = async function() {
          const options = { quality: 0.5, base64: true };
          const data = await this.camera.takePictureAsync(options)
          console.log(data.uri);

          this.setState({clicked:true, imageuri:data.uri},()=>{
            this._handleCamera()
          })
        }


    }


    
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'black'
    },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    capture: {
      flex: 0,
      backgroundColor: '#000',
      borderRadius: 5,
      padding: 15,
      paddingHorizontal: 20,
      alignSelf: 'center',
      margin: 20
    }
  });

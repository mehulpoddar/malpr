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
  ActivityIndicator
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import RNFetchBlob from 'react-native-fetch-blob';
import firebase from 'firebase';
<<<<<<< HEAD
import CropSelector from 'react-crop-selector';
=======
import { RNDocScanner } from 'rn-doc-scanner'
>>>>>>> 911ad1267ed8aac724b74fd08a8ace9cfc7641c0

// symbol polyfills
global.Symbol = require('core-js/es6/symbol');
require('core-js/fn/symbol/iterator');

// collection fn polyfills
require('core-js/fn/map');
require('core-js/fn/set');
require('core-js/fn/array/find');

export default class PlateDetector extends Component{

    state = {clicked:false , imageuri:'', processing:false, plateText:'', flaskurl:'',testImage: null}

    cleanUrl(url){

      url = url.replace('%2F','%252F')
      return url
    }


    async getNumPlate() {
      console.log("processing")
      try {
        url = this.state.flaskurl
        url = this.cleanUrl(url)
        console.log("URLLLLLLLLLLL",url)
        let response = await fetch(
<<<<<<< HEAD
          'http://192.168.1.43.111:5000/plate?url='+url
=======
          'http://192.168.43.111:5000/plate?url='+url
          //'http://192.168.1.7:5000/plate?url=https://i.ibb.co/7RLK4PM/test1.jpg'
>>>>>>> 911ad1267ed8aac724b74fd08a8ace9cfc7641c0
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
          this.setState({ testImage: res })
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
     g= uploadImage(this.state.imageuri, "Hello2" , ".jpg")

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
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',backgroundColor:'#fff'}}>
        <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style = {styles.capture}
        >
            <Text style={{fontSize: 14,color:'#fff'}}> SNAP </Text>
        </TouchableOpacity>
        </View>
        </View>

      }
      else{
        if(this.state.imageuri!='' && this.state.processing==false)
        {
          return <View>
<<<<<<< HEAD
          <CropSelector
            width={640} height={480}
            x1={5} y1={5} x2={95} y2={95}
          />
          <Image style={{width:'100%', height:'85%'}} source={{isStatic:true, uri:this.state.imageuri}} />
=======
          <Image source={{isStatic:true, uri: this.state.testImage }} style={{width:'100%', height:'85%'}} />
>>>>>>> 911ad1267ed8aac724b74fd08a8ace9cfc7641c0
          <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',backgroundColor:'#fff'}}>
        <TouchableOpacity
            onPress={this.uploadDetails.bind(this)}
            style = {styles.capture}
        >
            <Text style={{fontSize: 14,color:'#fff'}}> YES </Text>
        </TouchableOpacity>

        <TouchableOpacity
            onPress={()=>{this.setState({clicked:false})}}
            style = {styles.capture}
        >
            <Text style={{fontSize: 14,color:'#fff'}}> NO </Text>
        </TouchableOpacity>
        </View>
          </View>

        }
        else if(this.state.processing==null)
        {
          return <View>
          <Image style={{width:'100%', height:'85%'}} source={{isStatic:true, uri:this.state.imageuri}} />
          <View style={{width:'100%', height:'15%', flexDirection: 'row', justifyContent: 'center',backgroundColor:'#fff'}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
          </View>


        }
        else if(this.state.processing==true)
        {
          return <View>
          <Image style={{width:'100%', height:'85%'}} source={{isStatic:true, uri:this.state.imageuri}} />
          <View style={{width:'100%', height:'15%', flexDirection: 'row', justifyContent: 'center',backgroundColor:'#fff'}}>
          <View style={{flex:1}}>
            <Text style={{
      alignSelf: 'center', fontSize:18, color:'#000'}}>Number Plate</Text>
            <Text style={{
      alignSelf: 'center', fontSize:18, color:'#000'}}>{this.state.plateText}</Text>
            <TouchableOpacity
              onPress={()=>{this.setState(
                { clicked: false, imageuri: '', processing: false, plateText: '', flaskurl: '' }
              )}}
            >
            <Text style={{
      alignSelf: 'center', fontSize:18, color:'blue'}}>Snap Another Plate</Text>
            </TouchableOpacity>
        </View>
        </View>
          </View>
        }
      }
    }

    render(){
        return(
            <View style={styles.container}>
            {this.cameraOrPic()}
           </View>
        )
    }


    takePicture = async function() {
        if (this.camera) {
          const options = { quality: 0.5, base64: true };
          const data = await this.camera.takePictureAsync(options)
          console.log(data.uri);
          this.setState({clicked:true, imageuri:data.uri})
        }
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

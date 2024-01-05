import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import './App.css';

const returnClarifaiJSONRequest = (imageUrl) => {
  const PAT = 'a82df49ab9574ea6b09a3e7952daf531';
  const USER_ID = 'nachador';
  const APP_ID = 'test';
  const IMAGE_URL = imageUrl;
  
    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                        // "base64": IMAGE_BYTES_STRING
                    }
                }
            }
        ]
    });
        const requestOptions = {
          method: 'POST',
          headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
    };
    return requestOptions;
    }

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  calculateFaceLocation = (boundingBox) => {
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
  
    return {
      leftCol: boundingBox.left_col * width,
      topRow: boundingBox.top_row * height,
      rightCol: width - (boundingBox.right_col * width),
      bottomRow: height - (boundingBox.bottom_row * height)
    };
  }
  
  displayFaceBox = (box) => {
    this.setState({box})
  }

  onButtonSubmit = () => {
    const { input } = this.state;
    this.setState({imageUrl: input});
    fetch("https://api.clarifai.com/v2/models/face-detection/outputs", returnClarifaiJSONRequest(input))
    .then(response => response.json())
    .then(result => {

        const regions = result.outputs[0].data.regions;

        regions.forEach(region => {
          const faceLocation = this.calculateFaceLocation(region.region_info.bounding_box);
          this.displayFaceBox(faceLocation);
      });

    })
    .catch(error => console.log('error', error));
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
        onInputChange={this.onInputChange}
        onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition
        imageUrl={this.state.imageUrl}
        box={this.state.box} />
      </div>
    );
  }
}

export default App;

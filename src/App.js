import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation'
import Logo from'./components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Rank from './components/Rank/Rank'
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: 'e4e91533979d4bdf9c75882171063270'
});

const particlesOptions = {
  particles: {
    number: {
      value:100,
      density: {
        enable: true,
        value_area: 800
      }
    }
    
  }
}
class App extends Component {
  constructor(){
    super();
    this.state ={
      input : '',
      imageURL : '',
      box:{},
    }
  }

  calculateFaceLocation = (res) => {
    const clarifaiFace = res.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) =>{
    this.setState({box:box});
  }
  onInputChange = (event) =>{
    this.setState({input: event.target.value})
  }

  onSubmitBtn = () => {
    this.setState({imageURL: this.state.input})
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Particles className='particles' params={particlesOptions}/>
          <Navigation/>
          <Logo/>
          <Rank/>
          <ImageLinkForm 
          inputChange={this.onInputChange} 
          submitBtn={this.onSubmitBtn}
          />
          <FaceRecognition box={this.state.box} imageURL={this.state.imageURL}/>
        </header>
      </div>
    );
  }
}

export default App;

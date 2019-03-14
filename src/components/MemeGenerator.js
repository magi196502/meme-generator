import React from "react";

class MemeGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topText: "",
      bottomText: "",
      randomImage: "http://i.imgflip.com/1bij.jpg",
      allMemeImgs: [],
      memeLength: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleClick(event) {
    event.preventDefault();
    let newRandomImage = "";
    const randomIndex = Math.floor(
      Math.random() * Math.floor(this.state.allMemeImgs.length)
    );
    newRandomImage = this.state.allMemeImgs[randomIndex].url;
    this.setState({
      randomImage: newRandomImage
    });
  }

  componentDidMount() {
    const { name, value } = this.state;
    fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(response => {
        const { memes } = response.data;

        this.setState({
          allMemeImgs: memes
        });
      });
  }

  render() {
    return (
      <div>
        <h2>This is the meme generator</h2>
        <ul />
        <form className="meme-form" onSubmit={this.handleClick}>
          <input
            type="text"
            name="topText"
            placeholder="Top text"
            value={this.state.topText}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="bottomText"
            placeholder="Bottom text"
            value={this.state.bottomText}
            onChange={this.handleChange}
          />
          <button>Gen</button>
        </form>
        <div className="meme">
          <img src={this.state.randomImage} alt="" />
          <h2 className="top">{this.state.topText}</h2>
          <h2 className="botom">{this.state.bottomText}</h2>
        </div>
      </div>
    );
  }
}

export default MemeGenerator;

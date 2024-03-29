import React from 'react';

// import css file
import '../css/App.css';

import Case from './case.js';
// import KnowMore from "./KnowMore.js"
// Import songs
import song1 from "../songs/intheend.mp3"
import song2 from "../songs/manmerijaan.mp3"
import song3 from "../songs/safar.mp3"
import song4 from "../songs/mahi.mp3"
import song5 from "../songs/heriye.mp3"

// Import song cover images
import song1Img from "../images/intheend.jpg";
import song2Img from "../images/maanmerizaan.jpg";
import song3Img from "../images/safar.jpg";
import song4Img from "../images/mahi.jpg";
import song5Img from "../images/heriye.jpg";


// Import wallpapers
import Wallpaper1 from "../wallpaper/1.jpg"
import Wallpaper2 from "../wallpaper/2.jpg"
import Wallpaper3 from "../wallpaper/3.webp"



class App extends React.Component {
  constructor() {
    super();
    this.state = {
      active: 0,
      menuItems: ["Now Playing", "Music", "Games", "Settings"],
      musicItems: ["All Songs", "Artist", "Albums"],
      songItemsUrl: [song1, song2, song3, song4, song5,],
      songImgItemsUrl: [song1Img, song2Img, song3Img, song4Img, song5Img,],
      wallpaperItems: [Wallpaper1, Wallpaper2, Wallpaper3],
      songItems: ["In The End - Linking Park", "Maan Meri Jaan - King", "Safar - Unkonwn ", " O Mahi-Arjit Singh", "Heriye Heriye-Arijit"],
      songIndex: 0,
      lengthMenuKey: { "-1": 3, 1: 2, 4: 4, 8: 4, 3: 2, 9: 3, 10: 2 },
      menuMapping: { "-1": [0, 1, 2, 3], 1: [4, 5, 6], 3: [8, 9, 10] },
      currentMenu: -2,
      navigationStack: [],
      songUrl: song1,
      playing: false,
      theme: "rgb(210, 210, 210)",
      audio: new Audio(song1),
      songImgUrl: song1Img,
      wheelColor: "white",
      wallpaper: 0,
      noty: false,
      notifyText: "Wallpaper Changed",
    }
  }



  seekSongForward = (e) => {
    if (this.state.currentMenu === -2) {
      return;
    }
    if (this.state.playing === false) {
      return;
    }
    if (e.detail.interval < 250) {
      this.state.audio.pause();
      let songIndex = this.state.songIndex;
      if (songIndex === this.state.songItemsUrl.length - 1) {
        songIndex = 0;
      } else {
        songIndex++;
      }
      const songUrl = this.state.songItemsUrl[songIndex];
      const songImgUrl = this.state.songImgItemsUrl[songIndex];
      this.setState({ songIndex: songIndex, songImgUrl: songImgUrl, songUrl: songUrl, audio: new Audio(songUrl) }, () => {
        this.state.audio.play();
      });
    } else if (e.detail.interval > 250 && e.detail.interval < 10000) {
      const interval = e.detail.interval / 100;
      this.setState((prevState) => {
        prevState.audio.currentTime += interval;
        return prevState;
      })
    }
  }


  seekSongReverse = (e) => {
    if (this.state.currentMenu === -2) {
      return;
    }
    if (this.state.playing === false) {
      return;
    }
    console.log(e.detail.interval);
    if (e.detail.interval < 250) {
      this.state.audio.pause();
      let songIndex = this.state.songIndex;
      if (songIndex === 0) {
        songIndex = this.state.songItemsUrl.length - 1;
      } else {
        songIndex--;
      }
      const songUrl = this.state.songItemsUrl[songIndex];
      const songImgUrl = this.state.songImgItemsUrl[songIndex];
      this.setState({ songIndex: songIndex, songImgUrl: songImgUrl, songUrl: songUrl, audio: new Audio(songUrl) }, () => {
        this.state.audio.play();
      });
    } else if (e.detail.interval > 250 && e.detail.interval < 10000) {
      const interval = e.detail.interval / 100;
      this.setState((prevState) => {
        prevState.audio.currentTime -= interval;
        return prevState;
      })
    }
  }


  togglePlayPause = () => {
    if (this.state.currentMenu === -2) {
      return;
    }
    if (this.state.playing === true) {
      this.setState({ playing: false });
      this.state.audio.pause();
    }
    else {
      this.setState({ playing: true });
      this.state.audio.play();
    }
  }


  updateActiveMenu = (direction, menu) => {

    if (menu !== -1 && menu !== 1 && menu !== 4 && menu !== 8 && menu !== 3 && menu !== 9 && menu !== 10) {
      return;
    }
    let min = 0;
    let max = 0;

    max = this.state.lengthMenuKey[menu];

    if (direction === 1) {
      if (this.state.active >= max) {
        this.setState({ active: min })
      } else {
        this.setState({ active: this.state.active + 1 })
      }
    } else {
      if (this.state.active <= min) {
        this.setState({ active: max })
      } else {
        this.setState({ active: this.state.active - 1 })
      }
    }
  }



  setTheme = (id) => {
    let theme = "";
    if (id === 0) {
      theme = "#f0f0f0";
    }
    else if (id === 1) {
      theme = "#555d50" //black
    } else if (id === 2) {
      theme = "#ffcc00";
    } else if (id === 3) {
      theme = "#D1CDDA";

    } else if (id === 4) {
      theme = "#c4aead"
    }
    this.setState({ theme: theme, noty: true, notifyText: "Theme Changed" }) //Notification
    return;
  }



  setWheelColor = (id) => {
    let wheelColor = "";
    if (id === 0) {
      wheelColor = "#212121";
    }
    else if (id === 1) {
      wheelColor = "white";
    } else if (id === 2) {
      wheelColor = "#3E2723";
    } else if (id === 3) {
      wheelColor = "#3D5AFE";
    }
    this.setState({ wheelColor: wheelColor, noty: true, notifyText: "Wheel Color Changed" })
    return;
  }


  setWallpaper = (id) => {
    this.setState({ wallpaper: id, noty: true, notifyText: "Wallpaper Changed" });
    return;
  }


  chagePlayingSongFromMusicMenu = (id, navigationStack) => {
    const songUrl = this.state.songItemsUrl[id];
    const songImgUrl = this.state.songImgItemsUrl[id];
    this.state.audio.pause();
    this.setState({ currentMenu: 7, songUrl: songUrl, navigationStack: navigationStack, active: 0, playing: true, songIndex: id, audio: new Audio(songUrl), songImgUrl: songImgUrl }, () => {
      this.state.audio.play();
    });
    return;
  }


  changeMenuBackward = () => {

    const navigationStack = this.state.navigationStack.slice();
    if (this.state.currentMenu === -2) {
      return;
    }
    else {
      const prevId = navigationStack.pop();
      console.log("prevId" + prevId);
      this.setState({ currentMenu: prevId, navigationStack: navigationStack, active: 0 });
      return;
    }

  }


  changeMenuForward = (id, fromMenu) => {

    const navigationStack = this.state.navigationStack.slice();

    if (fromMenu !== -2 && fromMenu !== -1 && fromMenu !== 1 && fromMenu !== 4 && fromMenu !== 3 && fromMenu !== 8 && fromMenu !== 9 && fromMenu !== 0 && fromMenu !== 7 && fromMenu !== 10) {
      return;
    }

    if (fromMenu === -2) {
      navigationStack.push(this.state.currentMenu);
      this.setState({ currentMenu: -1, navigationStack: navigationStack, active: 0 });
      return;
    }

    if (fromMenu === -1) {
      navigationStack.push(this.state.currentMenu);
      this.setState({ currentMenu: id, navigationStack: navigationStack, active: 0 });
      return;
    }

    if (fromMenu === 7 || fromMenu === 0) {
      this.togglePlayPause();
      return;
    }

    if (fromMenu === 8) {
      this.setTheme(id);
      return;
    }


    if (fromMenu === 9) {
      this.setWheelColor(id)
      return;
    }

    if (fromMenu === 10) {
      this.setWallpaper(id)
      return;
    }

    navigationStack.push(this.state.currentMenu);

    if (fromMenu === 4) {
      this.chagePlayingSongFromMusicMenu(id, navigationStack, fromMenu);
      return;
    }

    const currentMenuID = this.state.menuMapping[fromMenu][id];
    this.setState({ currentMenu: currentMenuID, navigationStack: navigationStack, active: 0 });

  }


  setNoty = () => {
    this.setState({ noty: false });
    return;
  }



  render() {
    const { audio, active, currentMenu, menuItems, musicItems, songItems, playing, songIndex, theme, songUrl, songImgUrl, wheelColor, wallpaper, wallpaperItems, noty, notifyText } = this.state;
    return (
      <div className="App">
        {/* <KnowMore/> */}
        <Case songIndex={songIndex} active={active} menuItems={menuItems} musicItems={musicItems} currentMenu={currentMenu} changeMenuForward={this.changeMenuForward} changeMenuBackward={this.changeMenuBackward} updateActiveMenu={this.updateActiveMenu} togglePlayPause={this.togglePlayPause} songItems={songItems} playing={playing} theme={theme} audio={audio} songUrl={songUrl} songImgUrl={songImgUrl} seekSongForward={this.seekSongForward} seekSongReverse={this.seekSongReverse} wheelColor={wheelColor} wallpaper={wallpaper} wallpaperItems={wallpaperItems} noty={noty} setNoty={this.setNoty} notifyText={notifyText} />
      </div>
    );
  }
}

export default App;

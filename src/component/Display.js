import React from "react"
import LockScreen from "./lockscreen.js"
import Navbar from "./navbar";
import "../css/display.css"
import Menu from "./Menu.js";
import Music from "./Music.js";
import Settings from "./Settings.js";
import Songs from "./song.js";
import WheelColor from "./WheelColor.js";
import Themes from "./Themes.js"
import Playing from "./playing.js"
class Display extends React.Component {
    render() {
        const { active, currentMenu, menuItems, musicItems,songItems, playing, songIndex, audio, songUrl ,songImgUrl,wallpaper,wallpaperItems, noty, setNoty,notifyText} = this.props;
        
        return (
            <div style={{backgroundImage:`url(${wallpaperItems[wallpaper]})`}} className="display">
                <Navbar noty={noty} setNoty={setNoty} playing={playing} notifyText ={notifyText} />
                {currentMenu===-2&&<LockScreen/>}
                {currentMenu === -1 && <Menu songImgUrl={songImgUrl} menuItems={menuItems} active={active} />}
                {currentMenu === 1 && <Music musicItems={musicItems} active={active} />}
                {currentMenu === 2 && <div className="blank-div"><h1 className="empty-text">Games</h1></div>}
                {currentMenu === 3 && <Settings active={active}/>}
                {currentMenu === 4 && <Songs songItems={songItems} active={active} />}
                {currentMenu === 5 && <div className="blank-div"><h1 className="empty-text">Artists</h1></div>}
                {currentMenu === 6 && <div className="blank-div"><h1 className="empty-text">Albums</h1></div>}
                {(currentMenu === 0 ||currentMenu===7) && <Playing songImgUrl={songImgUrl} audio={audio} songUrl={songUrl} playing={playing} songIndex={songIndex} songItems={songItems} />}
                {currentMenu===8&&<Themes active={active}/>}
                {currentMenu===9&&<WheelColor active={active}/>}
                {currentMenu===10&&<wallpaper active={active}/>}
            </div>
        )
    }
}


export default Display;
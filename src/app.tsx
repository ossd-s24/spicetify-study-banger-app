import styles from './css/app.module.scss'
import React from 'react'
import ReadyToStudyPage from './ReadyToStudyPage';
import StudyTimePage from './StudyTimePage';

class App extends React.Component<{}, {count: number; isStudyTime: boolean; lateNightTheme: boolean}> {
  state = {
    count: 0,
    isStudyTime: false,
    lateNightTheme: false,
  };

  toggleStudyTime = () => {
    this.setState((state) => ({
      count: state.count + 1,
      isStudyTime: !state.isStudyTime,
    }));
  };

  hexToRGB = (hex: string) => {
    if (hex.length === 3) {
      hex = hex.split("").map((char) => char + char).join("");
    } else if (hex.length != 6) {
      throw "Only 3- or 6-digit hex colours are allowed.";
    } else if (hex.match(/[^0-9a-f]/i)) {
      throw "Only hex colours are allowed.";
    }

    const aRgbHex = hex.match(/.{1,2}/g);
    if (!aRgbHex || aRgbHex.length !== 3) {
      throw "Could not parse hex colour.";
    }

    const aRgb = [
      parseInt(aRgbHex[0], 16),
      parseInt(aRgbHex[1], 16),
      parseInt(aRgbHex[2], 16),
    ];

    return aRgb;
  };

  toggleLateNightTheme = async () => {
    const existingColorScheme = document.querySelector("#StarryNightColors");
    const existingUserCSS = document.querySelector("#StarryNightCSS");
    const existingScript = document.querySelector("#StarryNightScript");

    if (existingColorScheme || existingUserCSS || existingScript) {
      location.reload();
    }
    else {
      const existingMarketplaceCSS = document.querySelectorAll(".marketplaceCSS");
      existingMarketplaceCSS.forEach(element => {
        element.remove();
      });

      const userCSS = document.querySelectorAll(".userCSS");
      userCSS.forEach(element => {
        element.remove();
      });

      let color = await fetch(`https://raw.githubusercontent.com/spicetify/spicetify-themes/master/StarryNight/color.ini?time=${Date.now()}`).then(res => res.text());

      const regex = {
        section: /^\s*\[\s*([^\]]*)\s*\]\s*$/,
        param: /^\s*([^=]+?)\s*=\s*(.*?)\s*$/,
        comment: /^\s*;.*$/,
      };
      const value = {};
      const lines = color.split(/[\r\n]+/);
      let section: string | null = null;
      lines.forEach(function(line) {
        if (regex.comment.test(line)) {
          return;
        } else if (regex.param.test(line)) {
          // Discard color scheme if it contains xrdb
          if (line.includes("xrdb")) {
            delete value[section ?? ""];
            section = null;
            return;
          }

          const match: string[] | null = line.match(regex.param);
          if (section && match) {
            value[section][match[1]] = match[2].split(";")[0].trim();
          }
        } else if (regex.section.test(line)) {
          const match = line.match(regex.section);
          if (match) {
            value[match[1]] = {};
            section = match[1];
          }
        } else if (line.length == 0 && section) {
          section = null;
        }
      });
      const colorStyle = document.createElement("style");
      let injectStr = ":root {";
      const baseScheme = value["base"];
      const themeIniKeys = Object.keys(baseScheme);
      themeIniKeys.forEach((key) => {
        injectStr += `--spice-${key}: #${baseScheme[key]};`;
        injectStr += `--spice-rgb-${key}: ${this.hexToRGB(baseScheme[key])};`;
      });
      injectStr += "}";
      colorStyle.innerHTML = injectStr;
      colorStyle.id = "StarryNightColors";
      document.body.appendChild(colorStyle);

      const css = await fetch(`https://raw.githubusercontent.com/spicetify/spicetify-themes/master/StarryNight/user.css?time=${Date.now()}`).then(res => res.text());
      const userCssTag = document.createElement("style");
      userCssTag.id = "StarryNightCSS";
      userCssTag.innerHTML = css;
      document.body.appendChild(userCssTag);

      const externalJS = await fetch(`https://raw.githubusercontent.com/spicetify/spicetify-themes/master/StarryNight/theme.js?time=${Date.now()}`).then(res => res.text());
      const script = document.createElement("script");
      script.textContent = externalJS;
      script.async = true;
      script.id = "StarryNightScript";
      document.head.appendChild(script);
    }

  };


  renderPage = () => {
    const {isStudyTime} = this.state;

    if (isStudyTime) {
      return <StudyTimePage onEndStudy={this.toggleStudyTime} onChangeTheme={this.toggleLateNightTheme}/>;
    }

    return <ReadyToStudyPage onStartStudy={this.toggleStudyTime} />;
  }

  render() {
    return <>
      <div className={styles.container}>
        {this.renderPage()}
      </div>
    </>
  }
}

export default App;

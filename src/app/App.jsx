// import logo from '../components/picture/logo.svg';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import Navigation from "../components/navbar/navbar";

import { HomePage } from "../components/homepage/homepage";
import Footer from '../components/footer/footer';

// import { Features } from "../components/oldFeatures/features";
// import Playlist from "../pages/playlist/playlist";
// import infoPlaylist from "../pages/infoPlaylist/infoPlaylist";
import { Features } from "../components/features/features";
import Level from "../pages/level/level";
import Commandes from "../pages/commandes/commandes";
import { ErreurPage } from "../pages/ErreurPage/ErreurPage";
import { PrivacyBot } from "../pages/privacyBot/privacy";
import { Login } from "../pages/login/login";
import Dashboard from "../pages/dashboard/dashboard";
// import Guild from "../pages/guild/guild";

import Demo from "../pages/demo/demo";
import Callback from "../components/callback/callback";
import Authenticate from '../components/Authenticate';
import { Bio } from "../pages/bio/bio";
import { TermsBot } from "../pages/termsBot/terms";
import ScrollToTop from "../utils/ScrollToTop"
import { useEffect } from "react";

export const App = () => {

  useEffect(() => {
    setEnvColor()
  }, [])

  //create randomColor but not dark or light
  let randomColor = () => {
    let color = "";
    let letters = "0123456789ABCDEF";

    do {
      color = "";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      // console.log("%c test couleur", `color: #${color}`)
    }
    //tant que la couleur est trop claire ou trop foncée
    while (parseInt(color, 16) > 0x999999 || parseInt(color, 16) < 0x333333)

    return color;
  }

  let setEnvColor = () => {
    let r = document.getElementsByTagName("html")[0];

    let date = new Date();
    if (date.getMonth() === 9) { //&& date.getDate() === 31
      let r = document.getElementsByTagName("html")[0];
      r.style.setProperty('--color-principal', '#ff5e00');
      r.style.setProperty('--color-principal-hover', '#702a00');
    }
    else if (date.getMonth() === 11 && (date.getDate() <= 26 && date.getDate() >= 15)) {
      let r = document.getElementsByTagName("html")[0];
      //frozen color
      r.style.setProperty('--color-principal', '#00bfff');
      r.style.setProperty('--color-principal-hover', '#00688b');
    }
    else if (Math.random() < 0.1) {
      r.style.setProperty('--color-principal', "#" + randomColor());
      r.style.setProperty('--color-principal-hover', "#" + randomColor());
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route exact path="/">
            <HomePage />
            <Features />
            <Footer />
          </Route>

          <Route exact path="/commandes">
            <Commandes />
          </Route>

          <Route exact path="/level">
            <Level />
          </Route>
          <Route exact path="/demo">
            <Demo />
          </Route>
          {/* <Route exact path="/playlist">
            <Playlist />
          </Route>
          <Route exact path="/playlist/:id" component={infoPlaylist}>
          </Route> */}
          <Authenticate exact path="/dashboard">
            <Dashboard />
          </Authenticate>
          {/* <Authenticate exact path="/dashboard/:id/:type">
            <Route exact path="/dashboard/:id" component={Guild}>
            </Route>
          </Authenticate> */}

          <Authenticate exact path="/dashboard/:id/:typeconfig">
            <Route exact path="/dashboard/:id/:typeconfig" component={Dashboard}>
            </Route>
          </Authenticate>

          <Route exact path="/login" >
            <Login />
          </Route>
          <Route exact path="/bot/privacy" >
            <ScrollToTop>
              <PrivacyBot />
              <Footer />
            </ScrollToTop>
          </Route>
          <Route exact path="/a-propos" >
            <ScrollToTop>
              <Bio />
              <Footer />
            </ScrollToTop>
          </Route>
          <Route exact path="/bot/terms" >
            <ScrollToTop>
              <TermsBot />
              <Footer />
            </ScrollToTop>
          </Route>
          <Route exact path="/oauth/callback" >
            <Callback />
          </Route>
          <Route>
            <ErreurPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
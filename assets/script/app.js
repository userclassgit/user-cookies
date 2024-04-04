import * as utils from './utils.js';
'use strict';

const modal = utils.select(".modal");
const btnAccept = utils.select(".accept");
const btnSettings = utils.select(".settings");
const span = utils.select(".close");
const settingsModal = utils.select(".settings-modal");


const browserSwitch = utils.select(".browser-switch");
const osSwitch = utils.select(".os-switch");
const widthSwitch = utils.select(".width-switch");
const heightSwitch = utils.select(".height-switch");

const savePreferencesButton = utils.select(".save-preferences");


utils.listen('click', btnAccept, function() {
  modal.style.display = "none";
  setCookie('consent', 'true', 15);
  setCookie('Browser', getBrowserName(), 15);
  setCookie('OS', getOSName(), 15);
  setCookie('Width', window.innerWidth + 'px', 15);
  setCookie('Height', window.innerHeight + 'px', 15);
  console.log(document.cookie);
});


utils.listen('click', span, function() {
  modal.style.display = "none";
});

utils.listen('click', btnSettings, function() {
  modal.style.display = "none";
  settingsModal.style.display = "block";
});

window.onload = function() {
  if (!navigator.cookieEnabled) {
    return;
  }

  const consent = getCookie('consent');

  if (consent === 'true' || consent === 'false') {
    console.log(document.cookie);
    return;
  }

  setTimeout(function() {
    modal.style.display = "block";
  }, 1000);

  browserSwitch.checked = true;
  osSwitch.checked = true;
  widthSwitch.checked = true;
  heightSwitch.checked = true;

  console.log(consent);
}


// Second modal
utils.listen('change', browserSwitch, function() {
  if (this.checked) {
    setCookie('Browser', getBrowserName(), 15);
  } else {
    setCookie('Browser', '', -1);
  }
});

utils.listen('change', osSwitch, function() {
  if (this.checked) {
    setCookie('OS', getOSName(), 15);
  } else {
    setCookie('OS', '', -1);
  }
});

utils.listen('change', widthSwitch, function() {
  if (this.checked) {
    setCookie('Width', window.innerWidth + 'px', 15);
  } else {
    setCookie('Width', '', -1);
  }
});

utils.listen('change', heightSwitch, function() {
  if (this.checked) {
    setCookie('Height', window.innerHeight + 'px', 15);
  } else {
    setCookie('Height', '', -1);
  }
});


function setOrDeleteCookie(switchElement, cookieName, getValueFunction) {
  if (switchElement.checked) {
    setCookie(cookieName, getValueFunction(), 15);
  } else {
    setCookie(cookieName, '', -1);
  }
}

utils.listen('click', savePreferencesButton, function() {
  setOrDeleteCookie(browserSwitch, 'Browser', getBrowserName);
  setOrDeleteCookie(osSwitch, 'OS', getOSName);
  setOrDeleteCookie(widthSwitch, 'Width', () => window.innerWidth + 'px');
  setOrDeleteCookie(heightSwitch, 'Height', () => window.innerHeight + 'px');

  if (browserSwitch.checked || osSwitch.checked || widthSwitch.checked || heightSwitch.checked) {
    setCookie('consent', 'true', 15);
  } else {
    setCookie('consent', 'false', 15);
  }

  console.log(document.cookie);
  settingsModal.style.display = "none";
});


function getBrowserName() {
  const browsers = [
    { name: "Firefox", identifier: "Firefox" },
    { name: "Opera", identifier: ["Opera", "OPR"] },
    { name: "Internet Explorer", identifier: "Trident" },
    { name: "Edge", identifier: "Edge" },
    { name: "Chrome", identifier: "Chrome" },
    { name: "Safari", identifier: "Safari" }
  ];

  const userAgent = navigator.userAgent;
  const browser = browsers.find(b => 
    Array.isArray(b.identifier) 
      ? b.identifier.some(id => userAgent.indexOf(id) > -1) 
      : userAgent.indexOf(b.identifier) > -1
  );

  return browser ? browser.name : "Unknown";
}


function getOSName() {
  let os = "Unknown";
  if (navigator.appVersion.indexOf("Win") != -1) os = "Windows";
  if (navigator.appVersion.indexOf("Mac") != -1) os = "MacOS";
  if (navigator.appVersion.indexOf("X11") != -1) os = "UNIX";
  if (navigator.appVersion.indexOf("Linux") != -1) os = "Linux";
  return os;
}



function setCookie(name, value, maxAge) {
  const options = {
    Path: '/',
    SameSite: 'Lax'
  }

  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)};`;

  if (maxAge) {
    cookie += `Max-Age=${maxAge};`;
  }

  for (let option in options) {
    cookie += `${option}=${options[option]};`;
  }

  document.cookie = cookie;
}


function getCookie(name) {
  const regex = new RegExp('(^|;\\s*)' + encodeURIComponent(name) + '=([^;]*)');
  const match = document.cookie.match(regex);
  return match ? decodeURIComponent(match[2]) : "The user hasn't made a decision about cookies";
}
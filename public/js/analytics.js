 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
 import { getAnalytics, logEvent, setUserProperties  } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-analytics.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
   apiKey: "AIzaSyBsfRuvn0k03efWn8ur7qOHmHJLBpzQm34",
   authDomain: "tutorial-50094.firebaseapp.com",
   projectId: "tutorial-50094",
   storageBucket: "tutorial-50094.appspot.com",
   messagingSenderId: "732172650836",
   appId: "1:732172650836:web:1bb936d9a495fb4d7620c1",
   measurementId: "G-6ZMVRTNNWQ"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);

 document.addEventListener("DOMContentLoaded", (event) => {
  //obtener ubicación
  let latitude
  let longitude

  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude, position.coords.longitude)
      latitude = position.coords.latitude
      longitude =  position.coords.longitude
      
    });
  } else {
    alert('Location API no disponible en tu navegador')
  }

  //Votar por comida favorita
  let votar4Comida = document.getElementById('votarComida')
  let comida_favorita = document.getElementById('comidaFavTextInput')
  votar4Comida.addEventListener('click', () => {
     console.log(comida_favorita.value)
     logEvent(analytics, 'favorite_food', {value: comida_favorita.value, lat: latitude, long: longitude})
     votar4Comida.classList.add('disabled');
  })
  //Votar por color favorito
  let votar4Color = document.getElementById('votarColor')
  let color_favorito =  document.getElementById('colorFavTextInput')
  votar4Color.addEventListener('click', () => {
    console.log(color_favorito.value)
    setUserProperties(analytics, { favorite_color: color_favorito.value})
    votar4Color.classList.add('disabled');
  })
});
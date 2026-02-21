function login(){
  window.location.href = "dashboard.html";
}

function planTrip() {
  let from = document.getElementById("from").value;
  let to = document.getElementById("to").value;
  let date = document.getElementById("date").value;
  let mode = document.getElementById("mode").value;

  if(from === "" || to === "" || date === "" || mode === ""){
    document.getElementById("output").innerHTML =
      "❌ Please fill all trip details";
    return;
  }

  document.getElementById("output").innerHTML =
    `✅ <b>Trip Planned Successfully!</b><br><br>
     🔹 From: ${from}<br>
     🔹 To: ${to}<br>
     📅 Date: ${date}<br>
     🚍 Travel Mode: ${mode}<br><br>

     🛣 Safe route suggested<br>
     🏨 Best hotels recommended<br>
     🚨 Emergency support enabled`;
}
function bookHotel(){
  let hotel = document.getElementById("hotel").value;
  let checkin = document.getElementById("checkin").value;
  let checkout = document.getElementById("checkout").value;

  if(hotel === "" || checkin === "" || checkout === ""){
    document.getElementById("hotelmsg").innerHTML =
      "❌ Please fill all booking details";
    return;
  }

  document.getElementById("hotelmsg").innerHTML =
    `✅ Hotel <b>${hotel}</b> booked successfully!<br>
     📅 Check-in: ${checkin}<br>
     📅 Check-out: ${checkout}`;
}

function sendSOS(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {

      let lat = position.coords.latitude;
      let lon = position.coords.longitude;

      let osmLink = "https://www.openstreetmap.org/?mlat=" + lat + "&mlon=" + lon +
                    "#map=18/" + lat + "/" + lon;

      let message = "🚨 EMERGENCY SOS! I need immediate help. My live location: " + osmLink;

      let contacts = [
        "918129922302",
        "918714748271"
      ];

      contacts.forEach(function(number) {
        let whatsappURL = "https://wa.me/" + number + "?text=" + encodeURIComponent(message);
        window.open(whatsappURL, "_blank");
      });

      document.getElementById("sosmsg").innerHTML =
      "🚨 Emergency alert + live location sent successfully!";

    }, function(error) {
      alert("Location permission denied. Please allow location access.");
    });

  } else {
    alert("Geolocation not supported by this browser.");
  }
}
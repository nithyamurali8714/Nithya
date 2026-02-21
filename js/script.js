// -------------------- LOGIN / REGISTER --------------------

// Login existing user
function login() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  let storedPass = localStorage.getItem(username);

  if (!username || !password) {
    document.getElementById("loginmsg").innerHTML = "❌ Please enter username and password";
    return;
  }

  if (storedPass == null) {
    document.getElementById("loginmsg").innerHTML = "❌ User not found. Please register first.";
  } else if (storedPass === password) {
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("loginmsg").innerHTML = "❌ Incorrect password.";
  }
}

// Register new user
function registerUser() {
  let username = document.getElementById("newUsername").value;
  let password = document.getElementById("newPassword").value;

  if (!username || !password) {
    document.getElementById("regmsg").innerHTML = "❌ Please fill all fields";
    return;
  }

  if(localStorage.getItem(username)){
    document.getElementById("regmsg").innerHTML = "❌ Username already exists!";
    return;
  }

  // Save user in localStorage
  localStorage.setItem(username, password);
  document.getElementById("regmsg").innerHTML = "✅ Registration successful! Go to login.";
}

// -------------------- TRIP PLANNER --------------------

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

  const params = new URLSearchParams({ from, to, date, mode });

  fetch('/api/endpoint?' + params.toString())
    .then(function(response) {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(function(data) {
      if (data.error) {
        document.getElementById("output").innerHTML = '❌ ' + data.error;
        return;
      }

      document.getElementById("output").innerHTML =
        `✅ <b>${data.message}</b><br><br>
         🔹 From: ${data.from}<br>
         🔹 To: ${data.to}<br>
         📅 Date: ${data.date}<br>
         🚍 Travel Mode: ${data.mode}<br><br>

         🛣 ${data.recommendations.route}<br>
         🏨 ${data.recommendations.hotels}<br>
         🚨 ${data.recommendations.support}`;
    })
    .catch(function(err) {
      document.getElementById("output").innerHTML = '❌ Error: ' + err.message;
    });
}

// -------------------- HOTEL BOOKING --------------------

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

// -------------------- SOS EMERGENCY --------------------

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
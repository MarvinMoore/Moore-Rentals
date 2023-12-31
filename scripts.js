var makeSelect = document.getElementById("makeSelect");
var modelSelect = document.getElementById("modelSelect");
var searchButton1 = document.getElementById('searchButton');
function sendMessage(){
  const contactElement = document.getElementById('contactus');
  contactElement.innerHTML = '<a id="ContactUs"><h3 class="fw-bold light-green fst-italic d-flex justify-content-center">Thanks for your Message!</h3></a>';
}
function isMobile() {
  return window.innerWidth <= 768; // Adjust the breakpoint as per your needs
}

// Delete a column if the site is loaded on a mobile device
function deleteGridColumn() {
  if (isMobile()) {
    const gridItems = document.getElementById('piccol');
    gridItems.remove();
  }
}
function updateModelOptions() {
    var selectedMake = makeSelect.value;
    
    // Reset the model options
    modelSelect.innerHTML = "<option value=''>Select Model</option>";
    
    if (selectedMake === "Acura") {
      var acuraModels = ["TLX", "RSX"];
      addOptions(modelSelect, acuraModels);
    } else if (selectedMake === "BMW") {
      var bmwModels = ["335i", "340i", "M340i"];
      addOptions(modelSelect, bmwModels);
    } else if (selectedMake === "Buick") {
      var buickModels = ["Encore GX", "Enclave", "Enclave ST"];
      addOptions(modelSelect, buickModels);
    } else if (selectedMake === "Cadillac") {
      var cadillacModels = ["AT4", "CTSV"];
      addOptions(modelSelect, cadillacModels);
    }
  }
  
  function addOptions(selectElement, options) {
    for (var i = 0; i < options.length; i++) {
      var option = document.createElement("option");
      option.text = options[i];
      selectElement.add(option);
    }
  }

function signIn(){
  var username1 = document.getElementById('username1').value;
  var pass1 = document.getElementById('pass1').value;
  //Gather user+pass input fields, post -> python api to compare against users, compare pass versus hashed pass in sql db
  const payload = {
    username: username1,
    password: pass1
  };

  console.log(payload)
  const queryString = new URLSearchParams(payload).toString();
  // Send the POST request
  fetch(`https://KrypticsDaddy.pythonanywhere.com/login?${queryString}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams(payload)
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response
      console.log(data)
    })
    .catch(error => {
        // Handle errors
        console.error(error);
      });
  }



// Add an event listener to the search button
  searchButton1.addEventListener('click', () => {
  // Get the selected values
  const make = makeSelect.value;
  const model = modelSelect.value;
  const pickupLocation = document.getElementById('pickupLocationSelect').value;

  // Create the payload object
  const payload = {
    make: make,
    model: model,
    location: pickupLocation
  };
  console.log(payload)
  const queryString = new URLSearchParams(payload).toString();
  // Send the POST request
  fetch(`https://KrypticsDaddy.pythonanywhere.com/cars?${queryString}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams(payload)
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response
      console.log(data)
      const carResult = document.getElementById('carResult');
      carResult.innerHTML = ''; // Clear previous results
      if (data.message === 'No Cars Available') {
        // No car is found, display "No Cars Available" in red
        carResult.innerHTML = '<p style="color: red;">No Cars Available</p>';
      } else {
        var carData = JSON.parse(data.car);
        var imgPath = carData.Img;

        if (carData) {
          const carElement = document.createElement('div');
          carElement.classList.add('car-item');

          const imageElement = document.createElement('img');
          imageElement.src = imgPath;
          imageElement.height = 150;
          imageElement.width = 200;
          // Set the image source based on the car model

          const availabilityElement = document.createElement('p');
          availabilityElement.innerText = carData.IsFree === 'yes' ? 'Available' : 'Not Available';
          availabilityElement.style.color = carData.IsFree === 'yes' ? 'green' : 'red';

          carElement.appendChild(imageElement);
          carElement.appendChild(availabilityElement);
          carResult.appendChild(carElement);
        } else {
          // Handle case when no car is available
          const noCarsElement = document.createElement('p');
          noCarsElement.innerText = 'No Car Available';
          noCarsElement.style.color = 'red';
          carResult.appendChild(noCarsElement);
        }
      }
    })
    .catch(error => {
      // Handle errors
      carResult.innerHTML = ''; // Clear previous results
      console.error(error);
      const noCarsElement = document.createElement('p');
      noCarsElement.innerText = 'No Car Available';
      noCarsElement.style.color = 'red';
      carResult.appendChild(noCarsElement);
    });
});
deleteGridColumn();
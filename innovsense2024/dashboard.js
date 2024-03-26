const firebaseConfig = {
  apiKey: "AIzaSyD4wb39OGdKhkjI0Muuqu4ypgD23fuwmEM",
  authDomain: "innovsense-2024.firebaseapp.com",
  projectId: "innovsense-2024",
  storageBucket: "innovsense-2024.appspot.com",
  messagingSenderId: "241742405711",
  appId: "1:241742405711:web:c6a97ed2760eeb358d0a3a",
  measurementId: "G-42HRCRJMLZ"
};
const autotag = document.getElementById('autotag');
const toggle = document.getElementById('toggle');
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const dbmode = db.ref('Automate');
dbmode.on('value',(snapshot)=>{
 toggle.checked = snapshot.val();
 if(snapshot.val()){
  autotag.classList.add('active');
 }
 else {
  autotag.classList.remove('active');
}
})
toggle.addEventListener('change', function(event) {
  
  dbmode.set(event.target.checked);

  if (event.target.checked) {
    autotag.classList.add('active');
  } else {
    autotag.classList.remove('active');
  }

});
const faulttag = document.getElementById('faulttag')
const faultRef = db.ref('Fault');
faultRef.on('value', (snapshot) => {
    const faultData = snapshot.val();
    for (const bulb in faultData) {
        if (faultData[bulb] === true) {
            faulttag.innerHTML ="&#128712;Fault detected : "+" "+ bulb
            faulttag.classList.add('active');
        }
    }
}, (error) => {
    console.error('Error retrieving fault data:', error);
});

document.addEventListener('DOMContentLoaded', function () {
  const bulbsState = {
    Bulb1: false,
    Bulb2: false
  };

  const bulbs = document.querySelectorAll('.clickable');
  function turnOnAll() {
    bulbs.forEach(bulb => {
      const bulbId = bulb.id;
      updateBulb(bulbId, true); 
    });
  }
  function turnOffAll() {
    bulbs.forEach(bulb => {
      const bulbId = bulb.id;
      updateBulb(bulbId, false); 
    });
  }
  bulbs.forEach(bulb => {
    bulb.addEventListener('click', () => {
      const bulbId = bulb.id;
      const newState = !bulbsState[bulbId];
      updateBulb(bulbId, newState);
    });
  });

  function turnOnOff(bulbId, state) {
    const image = document.getElementById(bulbId);
    image.src = state ? "ONbulb.png" : "OFFbulb.png";
    if (state) {
      image.classList.add("active");
    } else {
      image.classList.remove("active");
    }
  }

  function updateBulb(bulbId, state) {
    bulbsState[bulbId] = state;
    const usersRef = db.ref('Status');
    usersRef.set(bulbsState);
    turnOnOff(bulbId, state);
  }

  function initializeBulbsState() {
    const usersRef = db.ref('Status');
    usersRef.on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
            Object.assign(bulbsState, data);
            for (const bulbId in bulbsState) {
                turnOnOff(bulbId, bulbsState[bulbId]);
            }
        }

        const turnOnAllButton = document.getElementById('turnonall');
        turnOnAllButton.addEventListener('click', turnOnAll);
        const turnOffAllButton = document.getElementById('turnoffall');
        turnOffAllButton.addEventListener('click', turnOffAll);
    }, (error) => {
        console.error('Error retrieving status data:', error);
    });
}

initializeBulbsState();

});

(() => {
  'use strict';

  const ctx = document.getElementById('myChart');
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        data: [],
        lineTension: 0,
        backgroundColor: 'rgba(0, 123, 255, 0.3)',
        borderColor: '#007bff',
        borderWidth: 4,
        pointBackgroundColor: '#007bff'
      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Street Lamp Power Consumption (kWh)'
        },
        tooltip: {
          boxPadding: 10
        }
      }
    }
  });

  const usersRef = db.ref('Records');
  usersRef.once('value').then((snapshot) => {
    const powerConsumptionData = snapshot.val();

    if (powerConsumptionData) {
      
        const labels = powerConsumptionData.map(entry => entry.month);
        const data = powerConsumptionData.map(entry => entry.value);
        myChart.data.labels = labels;
        myChart.data.datasets[0].data = data;
        myChart.update();
    }
  }).catch((error) => {
    alert('Error fetching data from Firebase:', error);
  });
})();

function thismonth() {
  const crt = document.getElementById('myChart');
  const myNewChart = new Chart(crt, {
    type: 'bar',
    data: {
      // Add data for the bar chart
    },
    options: {
      // Add options for the bar chart
    }
  });
}
function ttl() {
  const user = db.ref('TotalConsumption');
  user.on('value', (snapshot) => {
      const Consumption = snapshot.val();
      const spn = document.getElementById('ttlconsmp');
      spn.textContent = Consumption;
  }, (error) => {
      console.error('Error retrieving TotalConsumption:', error);
  });
}

const tbody = document.getElementById('tablebody');
function initable(){
  const usagedata = db.ref('Usage')
  usagedata.on('value',(snapshot) =>{
    const data = snapshot.val();
    let count =0;
    let row = ""
    for(const key in data){
      const {Duration,PoleNo ,timeStamp ,totalUsage ,usage} = data[key]
              // Convert timestamp to a Date object
              const dateObject = new Date(timeStamp);

              // Customize the date and time format
              const formattedTimestamp = dateObject.toLocaleString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
              });
      
        count++;
        row+=`<tr><td>#${count}</td><td>${PoleNo}</td><td>${formattedTimestamp}</td><td>${Duration}</td><td>${usage}</td><td>${totalUsage}</td></tr>`
    }
    tbody.innerHTML = row;
  })
 
  }
function convertTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString(); 
}
function downloadExcel() {
  fetch('https://innovsense-2024-default-rtdb.firebaseio.com/Usage.json')
      .then(response => response.json())
      .then(data => {
          const formattedData = Object.values(data).map(entry => ({
              PoleNo: entry.PoleNo,
              Date: convertTimestamp(entry.timeStamp),
              Duration:entry.Duration,
              Usage: entry.usage,
              TotalConsumption: entry.totalUsage,
              
          }));


          const worksheet = XLSX.utils.json_to_sheet(formattedData);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, 'Power_Consumption');
          
          XLSX.writeFile(workbook, 'Power_Consumption.xlsx');
      })
      .catch(error => console.error('Error fetching data:', error));
}


ttl()
initable()

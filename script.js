function OpenFeature() {
  let cards = document.querySelectorAll(".card");
  let fullcard = document.querySelectorAll(".full-card");
  let closebtn = document.querySelectorAll(".close-btn");

  cards.forEach(function (card) {
    card.addEventListener("click", function () {
      fullcard[card.id].style.display = "block";
    });
  });

  closebtn.forEach(function (back) {
    back.addEventListener("click", function () {
      fullcard[back.id].style.display = "none";
    });
  });
}
OpenFeature();

// OPENFEATURE

let rightside = document.querySelector(".right-side");
let addbtn = document.querySelector(".add-task-form");
let todoinp = document.querySelector(".todoform input");
let todotextarea = document.querySelector(".todoform textarea");
let todocheck = document.querySelector(".todoform #check");
let heretask = document.querySelector(".heretask");

let AllCurrentTasks = [];

function ToDoList() {
  function Condition() {
    if (localStorage.getItem("AllCurrentTasks")) {
      AllCurrentTasks = JSON.parse(localStorage.getItem("AllCurrentTasks"));
    } else {
      console.log("Task List Is Empty");
    }
  }
  Condition();

  function RenderTask() {
    let addtodaytask = "";

    AllCurrentTasks.forEach(function (kaam, idx) {
      addtodaytask += `
      <div class="heretask">
        <h2>${kaam.task} 
          ${kaam.imp ? `<span class="imp">imp</span>` : ""}
        </h2>
        <button id=${idx}>Task In Processing...</button>
      </div>`;
    });

    rightside.innerHTML = addtodaytask;
  }
  RenderTask();

  function InpData() {
    addbtn.addEventListener("click", function (pnrfs) {
      pnrfs.preventDefault();

      AllCurrentTasks.push({
        task: todoinp.value,
        Details: todotextarea.value,
        imp: todocheck.checked,
      });
      localStorage.setItem("AllCurrentTasks", JSON.stringify(AllCurrentTasks));

      todoinp.value = "";
      todotextarea.value = "";
      todocheck.checked = false;
      RenderTask();
    });
  }
  InpData();

  function DltFeature() {
    rightside.addEventListener("click", function (e) {
      if (e.target.tagName === "BUTTON") {
        let idx = e.target.id;
        AllCurrentTasks.splice(idx, 1);

        localStorage.setItem(
          "AllCurrentTasks",
          JSON.stringify(AllCurrentTasks)
        );

        RenderTask();
      }
    });
  }
  DltFeature();
}
ToDoList();

function DailyPlanner() {
  let dayPlanner = document.querySelector(".day-planner");

  let hours = Array.from(
    { length: 18 },
    (_, no) => `${6 + no}:00 - ${7 + no}:00`
  );
  let TodayPlan = JSON.parse(localStorage.getItem("TodayPlan")) || {};

  console.log(TodayPlan);
  let todaywork = ``;

  hours.forEach(function (day, id) {
    let MainData = TodayPlan[id] || "";
    todaywork += `<div class="day-planner-time">
              <p>${day}</p>
              <input id=${id} type="text" placeholder="..." value=${MainData}>
            </div>`;
  });
  dayPlanner.innerHTML = todaywork;

  let dayplannerinp = document.querySelectorAll(".day-planner-time input");

  dayplannerinp.forEach(function (inp) {
    inp.addEventListener("input", function () {
      TodayPlan[inp.id] = inp.value;

      localStorage.setItem("TodayPlan", JSON.stringify(TodayPlan));
    });
  });
}
DailyPlanner();


// async function FetchQuote(){
//   let response = await fetch(`https://api.quotable.io/random`)
//   console.log(response)
// }
// FetchQuote() 

// API NOT WORK


function Pomodoro() {
  let TotalTime = 25 * 60;
  let coco = null;
  let breakk = true;
  let timer = document.querySelector(".for-pomo-flexing h2");
  let startbtn = document.querySelector(".pomo-card .start");
  let pausebtn = document.querySelector(".pomo-card .pause");
  let resetbtn = document.querySelector(".pomo-card .reset");
  let breakcard = document.querySelector(".break-card");

  function updateTime() {
    let min = Math.floor(TotalTime / 60);
    let sec = TotalTime % 60;

    timer.innerHTML = `${String(min).padStart("2", "0")}:${String(sec).padStart(
      "2",
      "0"
    )}`;
  }

  function startTimer() {
    clearInterval(coco);
    if (breakk) {
      coco = setInterval(function () {
        if (TotalTime > 0) {
          TotalTime--;
          updateTime();
        } else {
          breakk = false;
          clearInterval(coco);
          alert("Time To take a Break 😊");
          timer.innerHTML = "5:00";
          breakcard.innerHTML = "Break Session";
          breakcard.style.backgroundColor = "rgba(0, 130, 109, 1)";
          TotalTime = 5 * 60;
        }
      }, 1000);
    } else {
      coco = setInterval(function () {
        if (TotalTime > 0) {
          TotalTime--;
          updateTime();
        } else {
          breakk = true;
          clearInterval(coco);
          alert("Break Over 🥲");
          timer.innerHTML = "25:00";

          breakcard.innerHTML = "Work Session";
          breakcard.style.backgroundColor = "rgb(13, 158, 81)";
          TotalTime = 25 * 60;
        }
      }, 1000);
    }
  }

  function pauseTimer() {
    clearInterval(coco);
  }

  function resetTimer() {
    clearInterval(coco);
    TotalTime = 25 * 60;
    updateTime();
  }

  startbtn.addEventListener("click", startTimer);
  pausebtn.addEventListener("click", pauseTimer);
  resetbtn.addEventListener("click", resetTimer);
}
Pomodoro();

function NavFeature() {
  let navDateTime = document.querySelector(".nav1 h1");
  let nav1h3 = document.querySelector(".nav1 h3");
  let nav2h2 = document.querySelector(".nav2 h2");
  let nav2humi = document.querySelector(".nav2humi");
  let nav2wind = document.querySelector(".nav2wind");
  let nav2preci = document.querySelector(".nav2preci");

  let apikey = "7403532819274f3c9cc164951251511";

  let city = "bhopal";

  async function WeatherAPICall() {
    let weather = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}`
    );

    let data = await weather.json();
    console.log(data);
    nav2h2.innerHTML = `${data.current.temp_c}°C`;
    nav2humi.innerHTML = `Humidity: ${data.current.humidity}%`;
    nav2wind.innerHTML = `Wind: ${data.current.vis_km} km/h`;
    nav2preci.innerHTML = `Precipitation: ${data.current.heatindex_f}%`;
  }
  WeatherAPICall();

  function TimeDate() {
    let WeekDay = [
      "Sunday",
      "Sonday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var Months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let date = new Date();
    let DayOfWeek = WeekDay[date.getDay()];

    let hr = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    let din = date.getDate();
    let month = Months[date.getMonth()];
    let year = date.getFullYear();

    nav1h3.innerHTML = `${din} ${month}, ${year}`;

    if (hr > 12) {
      navDateTime.innerHTML = `${DayOfWeek}, ${String(hr - 12).padStart("2","0")}: ${String(min ).padStart("2", "0")}: ${String(sec ).padStart("2","0")} PM`;
    } else {
      navDateTime.innerHTML = `${DayOfWeek}, ${String(hr).padStart( "2","0"
      )}: ${String(min).padStart("2", "0")}: ${String(sec).padStart("2","0")} AM`;
    }
  }

  TimeDate();

  setInterval(function () {
    TimeDate();
  }, 1000);
}
NavFeature();

function DailyGoals() {
  let formdaily = document.querySelector(".formdaily");
  let formdailyinp = document.querySelector(".formdaily input");
  let dailygoalcard = document.querySelector(".card-daily-goals");
  let formdailybtn = document.querySelector(".AddGoal");
  let formdailyremovebtn = document.querySelector(".RemoveGoal");

  formdailybtn.addEventListener("click", function (pnrfs) {
    pnrfs.preventDefault();
    let dailygoalans = formdailyinp.value.trim();

    if (dailygoalans === "") {
      return alert("Please Enter Your Goal 😒");
    } else {
      dailygoalcard.innerHTML = `<div class="card-daily-goals"><h2>${dailygoalans}</h2></div>`;
      formdaily.reset();
    }
    formdailyremovebtn.style.display = "block";
    formdailybtn.style.display = "none";
  });

  formdailyremovebtn.addEventListener("click", function () {
    dailygoalcard.innerHTML = "";
    formdailyremovebtn.style.display = "none";
    formdailybtn.style.display = "block";
  });
}
DailyGoals()



# 🌤 Classy Weather App

A simple weather application built using **React Class Components**.
The app allows users to search for a location and view the weather forecast using the **Open-Meteo API**.

---

## 🚀 Features

* Search weather by **city name**
* Fetch **geolocation data** using Open-Meteo Geocoding API
* Display **daily weather forecast**
* Show **weather icons** based on weather codes
* Display **minimum and maximum temperatures**
* Convert **country codes to flag emojis**
* Built completely using **React Class Components**

---

## 🛠 Technologies Used

* React
* JavaScript (ES6+)
* HTML5
* CSS3
* Open-Meteo API

---

## 📦 APIs Used

### 1️⃣ Geocoding API

Used to get latitude and longitude from a location name.

```
https://geocoding-api.open-meteo.com/v1/search?name={CITY_NAME}
```

### 2️⃣ Weather Forecast API

Used to fetch daily weather data.

```
https://api.open-meteo.com/v1/forecast?latitude={LAT}&longitude={LON}&timezone={TIMEZONE}&daily=weathercode,temperature_2m_max,temperature_2m_min
```

---

## 📂 Project Structure

```
src
│
├── App.jsx            # Main class component
├── Date.jsx
├── Weather.jsx           # Weather day component
├── main.jsx          # React entry point
└── index.css        # Application styles
```

---

## ⚙️ Installation

1️⃣ Clone the repository

```
git clone https://github.com/your-username/classy-weather.git
```

2️⃣ Navigate into the project folder

```
cd classy-weather
```

3️⃣ Install dependencies

```
npm install
```

4️⃣ Start the development server

```
npm start
```

The application will run on:

```
http://localhost:3000
```

---

## 📸 Example Output

The app displays:

* Weather icon
* Day of the week
* Minimum and maximum temperature

Example:

```
☀️ Mon
18° — 28°
```

---

## 📖 Concepts Practiced

This project demonstrates:

* React **Class Components**
* **State management** using `setState`
* **Event handling**
* **API fetching with async/await**
* **Props passing between components**
* **Conditional rendering**
* **JavaScript Date formatting**

---

## 💡 Future Improvements

* Add loading spinner
* Add error handling UI
* Display more weather details
* Convert to **React Functional Components with Hooks**
* Add responsive design

---

## 👨‍💻 Author

Developed as a practice project for learning **React Class Components** and working with APIs.

---

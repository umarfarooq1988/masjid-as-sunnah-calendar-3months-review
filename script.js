// Variables to store the input values
let solarMonthValue = "";
let solarYearValue = "";
let islamicMonthValue = "";

// Masjid Us-Sunnah 1 year prayer timings
let yearPrayerTimings = "";
let SecondApiPrayerYear = "";

function gregorianToHijri(dateObject) {
  // Check if the input is a Date object
  if (!(dateObject instanceof Date)) {
    throw new Error("Input should be a Date object.");
  }

  // Convert the Date object to a string in the format "YYYY-MM-DD"
  const gregorianDate = dateObject.toISOString().split("T")[0];

  const gregorianParts = gregorianDate.split("-");
  const gregorianYear = parseInt(gregorianParts[0], 10);
  const gregorianMonth = parseInt(gregorianParts[1], 10) - 1; // Months are 0-based
  const gregorianDay = parseInt(gregorianParts[2], 10);

  const hijriFormatter = new Intl.DateTimeFormat("en-u-ca-islamic", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const hijriDateString = hijriFormatter.format(
    new Date(gregorianYear, gregorianMonth, gregorianDay)
  );

  // Extract the Hijri month name and numeric representation from the formatted string
  const [hijriMonth, hijriDay, hijriYear] = hijriDateString.split(" ");

  return {
    hijriDate: `${hijriMonth} ${hijriDay}, ${hijriYear}`,
    hijriMonthName: hijriMonth,
    hijriMonthNumber: parseInt(hijriDay, 10),
  };
}

let masjidUsSunnahApi =
  "https://masjid.connextar.com/?rest_route=/dpt/v1/prayertime&filter=year";

fetch(masjidUsSunnahApi)

  .then((response) => {
    // console.log("response", response)
    // Check if the response is successful (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTPS error! Status: ${response.status}`);
    }
    // Parse the JSON response
    return response.json();
  })
  .then((data) => {
    console.log("data", data);
    yearPrayerTimings = data[0];

    // Find all objects for the first day of January 2024
    const firstMonthObjects = yearPrayerTimings.filter((date) =>
      date.d_date.startsWith("2024-01-")
    );

    // Check if any objects are found
    if (firstMonthObjects.length > 0) {
      console.log("First Month Objects:", firstMonthObjects);
    } else {
      console.log("Objects not found for the specified month");
    }

    const calanderArray = firstMonthObjects.map((date) => {
      // const jamaaahOffsetMinutes = 15;

      const dateObject = new Date(date.d_date);
      const dayName = dateObject.toLocaleDateString("en-US", {
        weekday: "long",
      });
      const hijriDate = gregorianToHijri(dateObject);
      console.log("Hijri date: ", hijriDate);

      const dayMatch = hijriDate.hijriDate.match(/\b\d+\b/);

      const hijriDay = dayMatch ? dayMatch[0] : null;

      return `<section class="flex items-center ${dayName === "Monday" ? "bg-[#A4D7F4]" : ""
        } ${dayName === "Friday" ? "font-semibold" : ""
        } border-b w-[850px] border-[#26A5D2] text-[14px]">
                <div class="border-[#26A5D2] border-r py-1 ">
                  <input
                    name="date"
                    type="text"
                    value="${date.d_date.slice(-2)}"
                    class="px-2 text-center ${dayName === "Monday" ? "bg-[#A4D7F4]" : ""
        } outline-none w-[45px]"
                  />
                </div>
                <div class="border-[#26A5D2] border-r py-1">
                  <input
                    name="day"
                    type="text"
                    value="${dayName.substring(0, 3)}"
                    class="px-1 text-center ${dayName === "Monday" ? "bg-[#A4D7F4]" : ""
        } outline-none w-[39px]"
                  />
                </div>
                <div class="border-[#26A5D2] border-r py-1">
                  <input
                    name="hijri"
                    type="text"
                    value="${hijriDay}"
                    class="px-1 text-center ${dayName === "Monday" ? "bg-[#A4D7F4]" : ""
        } outline-none w-[49px]"
                  />
                </div>
                <div class="border-[#26A5D2] border-r py-1">
                  <input
                    name="Start"
                    type="text"
                    value="${date.fajr_begins.substring(0, 5)}"
                    class="px-1 text-center ${dayName === "Monday" ? "bg-[#A4D7F4]" : ""
        } outline-none w-[57px]"
                  />
                </div>
                <div class="border-[#26A5D2] border-r py-1">
                  <input
                    name="Jamaa'ah"
                    type="text"
                    value="${date.fajr_jamah.substring(0, 5)}"
                    class="px-1 text-center ${dayName === "Monday" ? "bg-[#A4D7F4]" : ""
        } outline-none w-[77px]"
                  />
                </div>
                <div class="border-[#26A5D2] border-r py-1">
                  <input
                    name="Sunrise"
                    type="text"
                    value="${date.sunrise.substring(0, 5)}"
                    class="px-1 text-center ${dayName === "Monday" ? "bg-[#A4D7F4]" : ""
        } outline-none w-[78px]"
                  />
                </div>
                <div class="border-[#26A5D2] border-r py-1">
                  <input
                    name="Duhar"
                    type="text"
                    value="${date.zuhr_begins.substring(0, 5)}"
                    class="px-1 text-center ${dayName === "Monday" ? "bg-[#A4D7F4]" : ""
        } outline-none w-[59px]"
                  />
                </div>
                <div class="border-[#26A5D2] border-r py-1">
                  <input
                    name="Jumu'ah Jamaa'ah"
                    type="text"
                    value="${date.zuhr_jamah.substring(0, 5)}"
                    class="px-1 text-center ${dayName === "Monday" ? "bg-[#A4D7F4]" : ""
        } outline-none w-[92px]"
                  />
                </div>
                <div class="border-[#26A5D2] border-r py-1">
                  <input
                    name="Jumu'Asr"
                    type="text"
                    value="${date.asr_mithl_1.substring(0, 5)}"
                    class="px-1 text-center ${dayName === "Monday" ? "bg-[#A4D7F4]" : ""
        } outline-none w-[58px]"
                  />
                </div>
                <div class="border-[#26A5D2] border-r py-1">
                  <input
                    name="Jumu'Asr"
                    type="text"
                    value="${date.asr_jamah.substring(0, 5)}"
                    class="px-1 text-center ${dayName === "Monday" ? "bg-[#A4D7F4]" : ""
        } outline-none w-[76px]"
                  />
                </div>
                <div class="border-[#26A5D2] border-r py-1">
                  <input
                    name="Maghrib"
                    type="text"
                    value="${date.maghrib_jamah.substring(0, 5)}"
                    class="px-1 text-center ${dayName === "Monday" ? "bg-[#A4D7F4]" : ""
        } outline-none w-[83px]"
                  />
                </div>
                <div class="border-[#26A5D2] border-r py-1">
                  <input
                    name="Ishaa"
                    type="text"
                    value="${date.isha_begins.substring(0, 5)}"
                    class="px-1 text-center ${dayName === "Monday" ? "bg-[#A4D7F4]" : ""
        } outline-none w-[58px]"
                  />
                </div>
                <div class="border-[#26A5D2] py-1">
                  <input
                    name="Ishaa"
                    type="text"
                    value="${date.isha_jamah.substring(0, 5)}"
                    class="pl-4 text-center ${dayName === "Monday" ? "bg-[#A4D7F4]" : ""
        } outline-none w-[58px]"
                  />
                </div>
              </section>`;
    });

    const firstDate = new Date(firstMonthObjects[0].d_date);
    const lastDate = new Date(
      firstMonthObjects[firstMonthObjects.length - 1].d_date
    );
    const firstHijriDate = gregorianToHijri(firstDate);
    const lastHijriDate = gregorianToHijri(lastDate);
    const hijriFirstMonth = firstHijriDate.hijriDate.replace(/[\d,]/g, "");
    const hijriLastMonth = lastHijriDate.hijriDate.replace(/[\d,]/g, "");
    console.log("Hijri first month: ", hijriFirstMonth);
    console.log("Last Hijri month: ", hijriLastMonth);

    const defaultMonth = "January";
    const defaultYear = "2024";
    inputMonthElement.value = defaultMonth;
    inputYearElement.value = defaultYear;
    solarYearValue = defaultYear;
    calendarSolarMonth.innerHTML = defaultMonth;
    calendarHijriMonth.innerHTML = `${hijriFirstMonth} - ${hijriLastMonth}`;
    inputhijriElement.value = `${hijriFirstMonth} - ${hijriLastMonth}`;
    const calendarString = calanderArray.join("");
    calendar.innerHTML = calendarString;
  });

const calendar = document.getElementById("calendar");
let inputMonthElement = document.getElementById("solar-month");
let inputYearElement = document.getElementById("solar-year");
let inputhijriElement = document.getElementById("hijri-input");
let calendarSolarMonth = document.getElementById("calendar-solar-month");
let calendarHijriMonth = document.getElementById("calendar-hijri-month");

// Function to calculate Jamaa'ah time for a given prayer
function calculateJamaaahTime(prayerTime, offsetMinutes) {
  const prayerTimeParts = prayerTime.split(":");
  const prayerMinutes =
    parseInt(prayerTimeParts[0]) * 60 + parseInt(prayerTimeParts[1]);
  const jamaaahTimeMinutes = prayerMinutes + offsetMinutes;

  const jamaaahHours = Math.floor(jamaaahTimeMinutes / 60);
  const jamaaahMinutes = jamaaahTimeMinutes % 60;

  return `${String(jamaaahHours).padStart(2, "0")}:${String(
    jamaaahMinutes
  ).padStart(2, "0")}`;
}

function convertTo12HourFormat(time) {
  const timeParts = time.split(":");
  let hours = parseInt(timeParts[0]);
  const minutes = timeParts[1];

  let period = "AM";

  if (hours >= 12) {
    period = "PM";
    if (hours > 12) {
      hours -= 12;
    }
  }

  return `${String(hours).padStart(2, "0")}:${minutes} ${period}`;
}



// Function to handle input changes and update variables
function handleInputChange(inputId) {
  const inputElement = document.getElementById(inputId);

  if (inputElement) {
    switch (inputId) {
      case "solar-month":
        const monthNameToNumber = {
          january: "01",
          february: "02",
          march: "03",
          april: "04",
          may: "05",
          june: "06",
          july: "07",
          august: "08",
          september: "09",
          october: "10",
          november: "11",
          december: "12",
        };

        // Assuming inputElement.value contains the user input for the month
        let userInputMonth = inputElement.value.toLowerCase();
        solarMonthValue = monthNameToNumber[userInputMonth];

        break;
      case "solar-year":
        solarYearValue = inputElement.value;
        break;
      case "hijr-year":
        islamicMonthValue = inputElement.value;
        break;
      default:
        break;
    }

    console.log("Year prayer timings: ", yearPrayerTimings);

    console.log("Filter value: ", `${solarYearValue}-${solarMonthValue}-`);

    const dynamicMonth = yearPrayerTimings.filter((date) =>
      date.d_date.startsWith(`${solarYearValue}-${solarMonthValue}-`)
    );

    console.log("dynamicMonth: ", dynamicMonth);

    const calanderArray = dynamicMonth.map((date) => {
      // const jamaaahOffsetMinutes = 15;

      const dateObject = new Date(date.d_date);
      const dayName = dateObject.toLocaleDateString("en-US", {
        weekday: "long",
      });
      const hijriDate = gregorianToHijri(dateObject);
      console.log("Hijri date: ", hijriDate);

      const dayMatch = hijriDate.hijriDate.match(/\b\d+\b/);

      const hijriDay = dayMatch ? dayMatch[0] : null;

      return `<section class="flex items-center ${dayName === "Monday" ? "bg-[#A4D7F4]" : ""
        } ${dayName === "Friday" ? "font-semibold" : ""
        } border-b w-[850px] border-[#26A5D2] text-[14px]">
                <div class="border-[#26A5D2] border-r py-1 ">
                  <input
                    name="date"
                    type="text"
                    value="${date.d_date.slice(-2)}"
                    class="px-2 text-center ${dayName === "Monday" ? "bg-[#A4D7F4]" : ""
        } outline-none w-[45px]"
                  />
                </div>
                <div class="border-[#26A5D2] border-r py-1">
                  <input
                    name="day"
                    type="text"
                    value="${dayName.substring(0, 3)}"
                    class="px-1 text-center ${dayName === "Monday" ? "bg-[#A4D7F4]" : ""
        } outline-none w-[39px]"
                  />
                </div>
                <div class="border-[#26A5D2] border-r py-1">
                  <input
                    name="hijri"
                    type="text"
                    value="${hijriDay}"
                    class="px-1 text-center ${dayName === "Monday" ? "bg-[#A4D7F4]" : ""
        } outline-none w-[49px]"
                  />
                </div>
                <div class="border-[#26A5D2] border-r py-1">
                  <input
                    name="Start"
                    type="text"
                    value="${date.fajr_begins.substring(0, 5)}"
                    class="px-1 text-center ${dayName === "Monday" ? "bg-[#A4D7F4]" : ""
        } outline-none w-[57px]"
                  />
                </div>
                <div class="border-[#26A5D2] border-r py-1">
                  <input
                    name="Jamaa'ah"
                    type="text"
                    value="${date.fajr_jamah.substring(0, 5)}"
                    class="px-1 text-center ${dayName === "Monday" ? "bg-[#A4D7F4]" : ""
        } outline-none w-[77px]"
                  />
                </div>
                <div class="border-[#26A5D2] border-r py-1">
                  <input
                    name="Sunrise"
                    type="text"
                    value="${date.sunrise.substring(0, 5)}"
                    class="px-1 text-center ${dayName === "Monday" ? "bg-[#A4D7F4]" : ""
        } outline-none w-[78px]"
                  />
                </div>
                <div class="border-[#26A5D2] border-r py-1">
                  <input
                    name="Duhar"
                    type="text"
                    value="${date.zuhr_begins.substring(0, 5)}"
                    class="px-1 text-center ${dayName === "Monday" ? "bg-[#A4D7F4]" : ""
        } outline-none w-[59px]"
                  />
                </div>
                <div class="border-[#26A5D2] border-r py-1">
                  <input
                    name="Jumu'ah Jamaa'ah"
                    type="text"
                    value="${date.zuhr_jamah.substring(0, 5)}"
                    class="px-1 text-center ${dayName === "Monday" ? "bg-[#A4D7F4]" : ""
        } outline-none w-[92px]"
                  />
                </div>
                <div class="border-[#26A5D2] border-r py-1">
                  <input
                    name="Jumu'Asr"
                    type="text"
                    value="${date.asr_mithl_1.substring(0, 5)}"
                    class="px-1 text-center ${dayName === "Monday" ? "bg-[#A4D7F4]" : ""
        } outline-none w-[58px]"
                  />
                </div>
                <div class="border-[#26A5D2] border-r py-1">
                  <input
                    name="Jumu'Asr"
                    type="text"
                    value="${date.asr_jamah.substring(0, 5)}"
                    class="px-1 text-center ${dayName === "Monday" ? "bg-[#A4D7F4]" : ""
        } outline-none w-[76px]"
                  />
                </div>
                <div class="border-[#26A5D2] border-r py-1">
                  <input
                    name="Maghrib"
                    type="text"
                    value="${date.maghrib_jamah.substring(0, 5)}"
                    class="px-1 text-center ${dayName === "Monday" ? "bg-[#A4D7F4]" : ""
        } outline-none w-[83px]"
                  />
                </div>
                <div class="border-[#26A5D2] border-r py-1">
                  <input
                    name="Ishaa"
                    type="text"
                    value="${date.isha_begins.substring(0, 5)}"
                    class="px-1 text-center ${dayName === "Monday" ? "bg-[#A4D7F4]" : ""
        } outline-none w-[58px]"
                  />
                </div>
                <div class="border-[#26A5D2] py-1">
                  <input
                    name="Ishaa"
                    type="text"
                    value="${date.isha_jamah.substring(0, 5)}"
                    class="pl-4 text-center ${dayName === "Monday" ? "bg-[#A4D7F4]" : ""
        } outline-none w-[58px]"
                  />
                </div>
              </section>`;
    });

    const firstDate = new Date(dynamicMonth[0].d_date);
    const lastDate = new Date(dynamicMonth[dynamicMonth.length - 1].d_date);
    const firstHijriDate = gregorianToHijri(firstDate);
    const lastHijriDate = gregorianToHijri(lastDate);
    const hijriFirstMonth = firstHijriDate.hijriDate.replace(/[\d,]/g, "");
    const hijriLastMonth = lastHijriDate.hijriDate.replace(/[\d,]/g, "");
    console.log("Hijri first month: ", hijriFirstMonth);
    console.log("Last Hijri month: ", hijriLastMonth);

    const monthNumberToName = {
      1: "January",
      2: "February",
      3: "March",
      4: "April",
      5: "May",
      6: "June",
      7: "July",
      8: "August",
      9: "September",
      10: "October",
      11: "November",
      12: "December",
    };

    const defaultMonth =
      monthNumberToName[parseInt(solarMonthValue, 10).toString()];
    const defaultYear = dynamicMonth[0].d_date.substring(0, 4);
    inputMonthElement.value = defaultMonth;
    inputYearElement.value = defaultYear;
    solarYearValue = defaultYear;
    calendarSolarMonth.innerHTML = defaultMonth;
    calendarHijriMonth.innerHTML = `${hijriFirstMonth} - ${hijriLastMonth}`;
    inputhijriElement.value = `${hijriFirstMonth}-${hijriLastMonth}`;
    const calendarString = calanderArray.join("");
    calendar.innerHTML = calendarString;


    console.log("Month Inbput:", monthInputValue);
    console.log("Solar Year:", Value);
    console.log("Islamic Month:", islamicMonthValue);
  }
}

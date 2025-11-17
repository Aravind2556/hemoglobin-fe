import React, { useState, useEffect } from 'react'
import LiveChart from '../blocks/LiveChart'

function Home() {

  const [gripLevel, setGripLevel] = useState(null) // field 1
  const [temperature, setTemperature] = useState(null) // field 2
  const [fallDetect, setFallDetect] = useState(null) // field 3
  const [batteryPercentage,setBatteryPercentage]=useState(null) //field 5
  const [haertRate,setHeartRate]=useState(null) //field 6
  const [spo2,setSPo2]=useState(null) // field 7

  const [recentGripValue, setRecentGripValue] = useState(null)
  const [recentTemperatrueValue, setRecentTemperatrueValue] = useState(null) 
  const [recentFallDelectValue, setRecentFallDetectValue] = useState(null) 
  const [recentPostureValue,setRecentPostureValue]=useState(null)
  const [recentBatteryPercentageValue, setRecentBatteryPercentageValue] = useState(null) 
  const [recentHaertRateValue, setRecentHaertRateValue] = useState(null)


  const url = process.env.REACT_APP_ThinkSpeak_URL

  const controls = {
    show: true,
    download: true,
    selection: false,
    zoom: false,
    zoomin: true,
    zoomout: true,
    pan: true,
    reset: true,
    zoomEnabled: true,
    autoSelected: 'zoom'
  };

  useEffect(() => {
    const fetchData = async () => {
      fetch(url)
        .then(res => res.json())
        .then(data => {
          console.log("data:", data)
          if (data && data.feeds && data.feeds.length > 0) {
            const xAxis = data.feeds.map(feed => new Date(feed.created_at).getTime())

            setGripLevel({
              "x-axis": xAxis,
              "y-axis": data.feeds.map(feed => Number(feed.field1) || 0),
              color: "green",
              seriesName: 'Green'
            })

            setTemperature({
              "x-axis": xAxis,
              "y-axis": data.feeds.map(feed => Number(feed.field2) || 0),
              color: "red",
              seriesName: 'RED'
            })

            setFallDetect({
              "x-axis": xAxis,
              "y-axis": data.feeds.map(feed => Number(feed.field3) || 0),
              color: "orange",
              seriesName: 'ECG'
            })

            setBatteryPercentage({
              "x-axis": xAxis,
              "y-axis": data.feeds.map(feed => Number(feed.field4) || 0),
              color: "Fuchsia",
              seriesName: 'SPO2'
            })

            setHeartRate({
              "x-axis": xAxis,
              "y-axis": data.feeds.map(feed => Number(feed.field5) || 0),
              color: "green",
              seriesName: 'HEMOBLOIN'
            })

            setSPo2({
              "x-axis": xAxis,
              "y-axis": data.feeds.map(feed => Number(feed.field6) || 0),
              color: "Indigo",
              seriesName: 'HEART RATE'
            })

            const recentGripLevel = data.feeds.slice(-1)[0].field1.toUpperCase()
            setRecentGripValue(recentGripLevel)

            const recentTemperatureLevel = data.feeds.slice(-1)[0].field2.toUpperCase()
            setRecentTemperatrueValue(recentTemperatureLevel)

            const recentFallDetectLevel = data.feeds.slice(-1)[0].field3.toUpperCase()
            setRecentFallDetectValue(recentFallDetectLevel)

            const recentPostureLevel = data.feeds.slice(-1)[0].field4.toUpperCase()
            setRecentPostureValue(recentPostureLevel)

            const recentBatteryPercentageLevel = data.feeds.slice(-1)[0].field5.toUpperCase()
            setRecentBatteryPercentageValue(recentBatteryPercentageLevel)

            const recentHeartRateLevel = data.feeds.slice(-1)[0].field6.toUpperCase()
            setRecentHaertRateValue(recentHeartRateLevel)



          }
          else{
            setGripLevel({
              "x-axis": [],
              "y-axis": [],
              color: "black",
              seriesName: 'Green'
            })
            setTemperature({
              "x-axis": [],
              "y-axis": [],
              color: "black",
              seriesName: 'RED'
            })
            setFallDetect({
              "x-axis": [],
              "y-axis": [],
              color: "black",
              seriesName: 'ECG'
            })
            setBatteryPercentage({
              "x-axis": [],
              "y-axis": [],
              color: "#ED254E",
              seriesName: 'SPO2'
            })
            setHeartRate({
              "x-axis": [],
              "y-axis": [],
              color: "#00F874",
              seriesName: 'HEMOBLOIN'
            })
            setSPo2({
              "x-axis": [],
              "y-axis": [],
              color: "#2A4494",
              seriesName: 'HEART RATE'
            })
            setRecentGripValue("No Data")
            setRecentTemperatrueValue("No Data")
            setRecentFallDetectValue("No Data")
            setRecentPostureValue("No Data")
            setRecentBatteryPercentageValue("No Data")
            setRecentHaertRateValue("No Data")

          }
        })
        .catch(err => {
          console.log("Error in fetching from Thinkspeak:", err)
        })
    };

    let intervalId
    if (url) {
      fetchData();
      // Optionally, set up polling for live data updates (e.g., every 30 seconds)
      intervalId = setInterval(fetchData, 5000);
    }

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [url]);



  if (!gripLevel || !temperature || !fallDetect || !batteryPercentage || !haertRate || !spo2 || !recentGripValue || !recentTemperatrueValue || !recentFallDelectValue || !recentBatteryPercentageValue || !recentHaertRateValue  || !recentGripValue) {
    return <div>Loading...</div>
  }


  return (
    <div className="mx-auto px-5 space-y-5">
<div className="w-full py-8 bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-lg border mt-5">
  <h2 className="text-primary-400 font-bold text-2xl mb-6 text-center">
    Recent HEMOGLOBIN Data
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-5">
    <CardView label="IR" value={recentGripValue} />

    <CardView label="RED" value={recentTemperatrueValue} />

    <CardView label="ECG" value={recentFallDelectValue} />

    <CardView label="SPO2" value={recentPostureValue} />

          <CardView label="HEMOGLOBIN" value={recentBatteryPercentageValue} />

    <CardView label="HEART RATE" value={recentHaertRateValue} />

  
  </div>
</div>

      
      {/* Charts Section */}
      <div className="flex flex-wrap justify-around gap-2">
        {[gripLevel, temperature, fallDetect , batteryPercentage , haertRate , spo2].map((chartData, i) => {
            return (
              <div className=" m-2 border w-11/12 md:w-5/12 rounded-lg" key={i} style={{ marginBottom: "20px" }}>
                <LiveChart data={[chartData]} color={chartData.color} title={chartData.seriesName} lineStyle={'straight'} lineWidth={1} chartType={'line'} controls={controls} />
              </div>
            )
          })}
      </div>

    </div>
  );
}

export default Home


const CardView = ({ label, value, className = "" }) => {
  return (
    <div className={`flex justify-between items-center px-6 py-4 bg-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all ${className}`}>
      <span className="text-gray-700 font-medium">{label}</span>
      <span className="bg-secondary-200 text-secondary-800 font-semibold py-1 px-3 rounded-md">
        {value}
      </span>
    </div>
  );
};

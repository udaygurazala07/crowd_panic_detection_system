import React, { useState } from 'react';
import axios from 'axios';

import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';

function App() {

  /* ========================= */
  /* STATES */
  /* ========================= */

  const [crowdDensity, setCrowdDensity] = useState("");
  const [movementSpeed, setMovementSpeed] = useState("");
  const [soundLevel, setSoundLevel] = useState("");
  const [queueTime, setQueueTime] = useState("");
  const [temperature, setTemperature] = useState("");
  const [heartRate, setHeartRate] = useState("");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ========================= */
  /* CHART DATA */
  /* ========================= */

  const chartData = [
    { time: '10 AM', risk: 20, crowd: 40 },
    { time: '11 AM', risk: 35, crowd: 60 },
    { time: '12 PM', risk: 55, crowd: 85 },
    { time: '1 PM', risk: 80, crowd: 110 },
    { time: '2 PM', risk: 95, crowd: 135 }
  ];

  /* ========================= */
  /* API CALL */
  /* ========================= */

  const handleSubmit = async () => {

    try {

      setLoading(true);

      const response = await axios.post(
        'http://localhost:5000/predict',
        {
          crowd_density: Number(crowdDensity),
          movement_speed: Number(movementSpeed),
          sound_level: Number(soundLevel),
          queue_time: Number(queueTime),
          temperature: Number(temperature),
          heart_rate: Number(heartRate)
        }
      );

      setResult(response.data);

      setLoading(false);

    } catch (error) {

      console.log(error);

      alert('Backend Connection Error');

      setLoading(false);
    }
  };

  return (

    <div style={mainContainer}>

      {/* GLOW EFFECTS */}

      <div style={glow1}></div>
      <div style={glow2}></div>
      <div style={glow3}></div>

      {/* NAVBAR */}

      <div style={navbar}>

        <div>

          <h1 style={logo}>
            CROWD<span style={{ color: '#00fff0' }}>AI</span>
          </h1>

          <p style={tagline}>
            Next Generation Crowd Monitoring Platform
          </p>

        </div>

        <div style={liveStatus}>

          <div style={liveDot}></div>

          <span>
            LIVE MONITORING
          </span>

        </div>

      </div>

      {/* HERO SECTION */}

      <div style={heroSection}>

        <div style={heroLeft}>

          <h1 style={heroTitle}>
            AI Powered
            <br />
            Crowd Panic
            <br />
            Detection System
          </h1>

          <p style={heroText}>
            Smart real-time crowd analytics using Artificial Intelligence,
            Machine Learning and predictive monitoring.
          </p>

          <div style={statsRow}>

            <div style={miniCard}>
              <h2>96%</h2>
              <p>Accuracy</p>
            </div>

            <div style={miniCard}>
              <h2>24/7</h2>
              <p>Monitoring</p>
            </div>

            <div style={miniCard}>
              <h2>LIVE</h2>
              <p>AI Engine</p>
            </div>

          </div>

        </div>

        {/* RIGHT PANEL */}

        <div style={inputPanel}>

          <h2 style={panelTitle}>
            Crowd Parameters
          </h2>

          <input
            type="number"
            placeholder="Crowd Density"
            value={crowdDensity}
            onChange={(e) => setCrowdDensity(e.target.value)}
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Movement Speed"
            value={movementSpeed}
            onChange={(e) => setMovementSpeed(e.target.value)}
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Sound Level"
            value={soundLevel}
            onChange={(e) => setSoundLevel(e.target.value)}
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Queue Time"
            value={queueTime}
            onChange={(e) => setQueueTime(e.target.value)}
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Temperature"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Heart Rate"
            value={heartRate}
            onChange={(e) => setHeartRate(e.target.value)}
            style={inputStyle}
          />

          <button
            onClick={handleSubmit}
            style={analyzeButton}
          >
            {loading
              ? 'Analyzing...'
              : 'Analyze Crowd Risk'}
          </button>

          {/* RESULT */}

          {result && (

            <div
              style={{
                ...resultBox,
                background:
                  result.emergency === "YES"
                    ? 'linear-gradient(135deg,#ff1744,#ff9100)'
                    : 'linear-gradient(135deg,#00c853,#64dd17)'
              }}
            >

              <h2
                style={{
                  fontSize: '34px',
                  marginBottom: '15px',
                  fontWeight: 'bold',
                  letterSpacing: '1px'
                }}
              >
                {result.emergency === "YES"
                  ? 'HIGH RISK'
                  : 'SAFE'}
              </h2>

              <h3
                style={{
                  fontSize: '24px',
                  marginBottom: '15px'
                }}
              >
                Panic Probability:
                {' '}
                {result.panic_probability}%
              </h3>

              <p
                style={{
                  fontSize: '18px',
                  color: '#f3f4f6',
                  marginBottom: '20px'
                }}
              >
                {
                  result.emergency === "YES"
                    ? 'Deploy Security Team Immediately'
                    : 'Situation Stable'
                }
              </p>

              <div style={progressBackground}>

                <div
                  style={{
                    ...progressFill,
                    width: `${result.panic_probability}%`
                  }}
                ></div>

              </div>

            </div>

          )}

        </div>

      </div>

      {/* ANALYTICS SECTION */}

      <div style={analyticsGrid}>

        <div style={chartCard}>

          <h2 style={chartTitle}>
            Live Risk Analytics
          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <LineChart data={chartData}>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#ffffff20"
              />

              <XAxis
                dataKey="time"
                stroke="#ffffff"
              />

              <YAxis stroke="#ffffff" />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="risk"
                stroke="#00fff0"
                strokeWidth={5}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

        <div style={chartCard}>

          <h2 style={chartTitle}>
            Crowd Density Analysis
          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <AreaChart data={chartData}>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#ffffff20"
              />

              <XAxis
                dataKey="time"
                stroke="#ffffff"
              />

              <YAxis stroke="#ffffff" />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="crowd"
                stroke="#ff00ff"
                fill="#ff00ff"
                fillOpacity={0.5}
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* FEATURES */}

      <div style={featuresSection}>

        <div style={featureCard}>
          <h2>AI Prediction</h2>
          <p>
            Real-time machine learning based crowd behavior analysis.
          </p>
        </div>

        <div style={featureCard}>
          <h2>Emergency Alerts</h2>
          <p>
            Automatic panic and emergency warning detection system.
          </p>
        </div>

        <div style={featureCard}>
          <h2>Live Monitoring</h2>
          <p>
            Smart monitoring dashboard with instant risk analytics.
          </p>
        </div>

      </div>

      {/* FOOTER */}

      <footer style={footer}>

        Developed By Uday | AI Crowd Monitoring System 2026

      </footer>

    </div>
  );
}

/* ========================= */
/* STYLES */
/* ========================= */

const mainContainer = {
  minHeight: '100vh',
  padding: '30px',
  background:
    'linear-gradient(135deg,#0f0c29,#302b63,#24243e)',
  fontFamily: 'Arial',
  color: 'white',
  overflow: 'hidden',
  position: 'relative'
};

const glow1 = {
  position: 'absolute',
  width: '300px',
  height: '300px',
  background: '#00fff055',
  borderRadius: '50%',
  top: '-100px',
  left: '-100px',
  filter: 'blur(100px)'
};

const glow2 = {
  position: 'absolute',
  width: '350px',
  height: '350px',
  background: '#ff00ff55',
  borderRadius: '50%',
  right: '-120px',
  bottom: '-120px',
  filter: 'blur(120px)'
};

const glow3 = {
  position: 'absolute',
  width: '250px',
  height: '250px',
  background: '#00ff8855',
  borderRadius: '50%',
  top: '40%',
  left: '45%',
  filter: 'blur(100px)'
};

const navbar = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '50px',
  position: 'relative',
  zIndex: 1,
  flexWrap: 'wrap',
  gap: '20px'
};

const logo = {
  fontSize: '42px',
  fontWeight: 'bold'
};

const tagline = {
  color: '#ccc',
  marginTop: '5px'
};

const liveStatus = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  background: 'rgba(255,255,255,0.1)',
  padding: '15px 25px',
  borderRadius: '50px',
  backdropFilter: 'blur(10px)'
};

const liveDot = {
  width: '12px',
  height: '12px',
  background: '#00ff00',
  borderRadius: '50%'
};

const heroSection = {
  display: 'grid',
  gridTemplateColumns: '1.2fr 0.8fr',
  gap: '30px',
  alignItems: 'center',
  marginBottom: '40px',
  position: 'relative',
  zIndex: 1
};

const heroLeft = {};

const heroTitle = {
  fontSize: '70px',
  lineHeight: '1.1',
  fontWeight: 'bold',
  background:
    'linear-gradient(to right,#00fff0,#ff00ff,#ffffff)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent'
};

const heroText = {
  marginTop: '20px',
  color: '#d1d5db',
  fontSize: '18px',
  lineHeight: '1.8',
  maxWidth: '650px'
};

const statsRow = {
  display: 'flex',
  gap: '20px',
  marginTop: '35px',
  flexWrap: 'wrap'
};

const miniCard = {
  background: 'rgba(255,255,255,0.1)',
  padding: '20px',
  borderRadius: '20px',
  minWidth: '130px',
  textAlign: 'center',
  backdropFilter: 'blur(15px)',
  border: '1px solid rgba(255,255,255,0.2)'
};

const inputPanel = {
  background: 'rgba(255,255,255,0.1)',
  padding: '35px',
  borderRadius: '30px',
  backdropFilter: 'blur(15px)',
  border: '1px solid rgba(255,255,255,0.2)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
};

const panelTitle = {
  marginBottom: '25px',
  fontSize: '28px'
};

const inputStyle = {
  width: '100%',
  padding: '16px',
  marginBottom: '20px',
  borderRadius: '15px',
  border: 'none',
  outline: 'none',
  background: 'rgba(255,255,255,0.15)',
  color: 'white',
  fontSize: '16px'
};

const analyzeButton = {
  width: '100%',
  padding: '16px',
  borderRadius: '15px',
  border: 'none',
  background:
    'linear-gradient(to right,#00fff0,#ff00ff)',
  color: 'white',
  fontSize: '18px',
  fontWeight: 'bold',
  cursor: 'pointer'
};

const resultBox = {
  marginTop: '25px',
  padding: '25px',
  borderRadius: '20px',
  color: 'white',
  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
  backdropFilter: 'blur(15px)',
  border: '1px solid rgba(255,255,255,0.2)'
};

const progressBackground = {
  width: '100%',
  height: '22px',
  background: 'rgba(255,255,255,0.2)',
  borderRadius: '20px',
  overflow: 'hidden',
  marginTop: '20px'
};

const progressFill = {
  height: '100%',
  background:
    'linear-gradient(to right,#ffffff,#ffe600)',
  transition: '0.5s'
};

const analyticsGrid = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '25px',
  marginBottom: '40px',
  position: 'relative',
  zIndex: 1
};

const chartCard = {
  background: 'rgba(255,255,255,0.1)',
  padding: '30px',
  borderRadius: '30px',
  backdropFilter: 'blur(15px)',
  border: '1px solid rgba(255,255,255,0.2)'
};

const chartTitle = {
  marginBottom: '20px',
  fontSize: '26px'
};

const featuresSection = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))',
  gap: '25px',
  position: 'relative',
  zIndex: 1
};

const featureCard = {
  background: 'rgba(255,255,255,0.1)',
  padding: '30px',
  borderRadius: '25px',
  backdropFilter: 'blur(15px)',
  border: '1px solid rgba(255,255,255,0.2)',
  textAlign: 'center'
};

const footer = {
  marginTop: '50px',
  textAlign: 'center',
  color: '#d1d5db',
  position: 'relative',
  zIndex: 1
};

export default App;
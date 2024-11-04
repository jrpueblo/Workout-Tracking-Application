import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './archive.css';

function Archive() {
    const[workouts, setWorkouts] = useState([]);
    const[dates, setDates] = useState([]);
    const[selectedDate, setSelectedDate] = useState('');

    const getWorkouts = async () => {
        try{
            const response = await axios.get('http://localhost:3001/api/archive');
            setWorkouts(response.data);
        } catch(error) {
            console.error('Error retrieving archived workouts: ', error);
        }
      
    };

    const getDates = async () => {
  
        try {
            const response = await axios.get('http://localhost:3001/api/archive/dates');
            const uniqueDates = Array.from(new Set(response.data.map(item => item.date.slice(0, 10))));
            setDates(uniqueDates);
          } catch (error) {
            console.error('Error fetching workout dates: ', error);
          }
      
    };

    const getWorkoutByDate = async(date) => {
        try{
            const response = await axios.get(`http://localhost:3001/api/archive/date/${date}`);
            setWorkouts(response.data);
            console.log(response.data);
        } catch(error) {
            console.error('Error retrieving workouts: ', error);
        }
      };

    const handleDateChange = (event) => {
        const date = event.target.value;
        setSelectedDate(date);
        if (date) {
            getWorkoutByDate(date);
        } else {
            setWorkouts([]); 
        }
      };

    useEffect(() => {
       //getWorkouts();
        getDates();
    }, []);

    return (
        <div className="main-page">
            <h1 className="main-title">Workout Archive</h1>
            <div className="archive-page">
                <div className="dropdown-box">
                <h1 className="box-title">Date Search</h1>
                <select className="dropdown" onChange={handleDateChange} value={selectedDate}>
                    <option value="">Select a date</option>
                    {dates.map((date, index) => (
                        <option key={index} value={date}>
                    {date}
                    </option>
                ))}
                </select>
                </div>
                <div className="results-box">
                <h1 className="box-title">Search Results</h1>
                <ul>
                    {workouts.length > 0 ? (
                        workouts.map((workout, index) => (
                            <li key={index}>
                                {workout.workouts} - {workout.weight} - {workout.sets} sets of {workout.reps}
                            </li>
                        ))
                    ) : (
                        <li>No workouts available</li>
                    )}
                </ul>
                </div>
                
            </div>
        </div> 
    );
}

export default Archive;
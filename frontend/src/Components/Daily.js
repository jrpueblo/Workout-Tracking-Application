import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Daily() {
  const numberOfSets = 10;
  const numberOfReps = 20;
  const set_options = Array.from({ length: numberOfSets }, (_, i) => i + 1);
  const rep_options = Array.from({ length: numberOfReps }, (_, i) => i + 1);
  const[exercise, setExercise] = useState('');
  const[weight, setWeight] = useState('');
  const[sets, setSets] = useState('');
  const[reps, setReps] = useState('');
  
  
  // workouts should be an array that we will loop through
  const[workouts, setWorkouts] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const exerciseData = {
        exercise,
        weight,
        sets,
        reps
    };

    try {
        const response = await axios.post('http://localhost:3001/api/workouts', exerciseData);
        if (response.status === 200) {
          console.log('User data submitted successfully');
          setExercise('');
          setWeight('');
          setSets('');
          setReps('');
          getWorkouts();
        }
      } catch (error) {
        console.error('Error submitting user data:', error);
      }
  };

  const getWorkouts = async () => {
  
    try{
      const response = await axios.get('http://localhost:3001/api/workouts');
      setWorkouts(response.data);
    } catch(error) {
      console.error('Error retrieving workouts: ', error);
    }
  
  };

  useEffect(() => {
    getWorkouts(); // Fetch workouts when the component mounts
  }, []);

  return (
    <div className="main-page">
        <h1 className="main-title">Track your workout</h1>
        <div className="daily-page">
            <div className="workout-wrapper">
                <h1 className='box-title'>Input Exercise</h1>
                <form onSubmit={handleSubmit}>
                    <div className="workout-input">
                        <div className="input-item">
                            <label>Workout Name</label>
                            <input
                                type="text"
                                value={exercise}
                                onChange={(e) => setExercise(e.target.value)}
                                placeholder="What was the name of the exercise?"
                            />
                        </div>
                        <div className="input-item">
                            <label>Weight</label>
                            <input
                                type="text"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                placeholder="What was the weight for the exercise? (lbs)"
                            />
                        </div>
                        <div className="sets-and-reps">
                            <div className="input-item">
                                <label>Sets</label>
                                <select
                                    name="sets"
                                    id="sets"
                                    value={sets}
                                    onChange={(e) => setSets(e.target.value)}
                                >
                                    {set_options.map((value) => (
                                        <option key={value} value={value}>
                                            {value}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="input-item">
                                <label>Reps</label>
                                <select
                                    name="reps"
                                    id="reps"
                                    value={reps}
                                    onChange={(e) => setReps(e.target.value)}
                                >
                                    {rep_options.map((value) => (
                                        <option key={value} value={value}>
                                            {value}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <button type="submit">Submit Workout</button>
                </form>
            </div>

            <div className="daily-workout-display">
              <h1 className="box-title">Today's Workout</h1>
                <ul>
                    {workouts.length > 0 ? (
                        workouts.map((workout, index) => (
                            <li key={index}>
                                {workout.exercise} - {workout.weight} - {workout.sets} sets of {workout.reps}
                            </li>
                        ))
                    ) : (
                        <li>No workouts available</li>
                    )}
                </ul>
                <button type="submit">Submit to Archive</button>
            </div>
        </div>
    </div>
);
}

export default Daily

// function Daily(){
//     return(
//         <div className="daily-page">
//             <h2> Today's Workout </h2>
//             <div classname="workout-wrapper">
//                 <div className="workout-input">
//                     <div className="input-item">
//                         <label>Workout Name</label>
//                         <input type="text" placeholder="What was the name of the exercise?" />
//                     </div>
//                     <div className="input-item">
//                         <label>Weight</label>
//                         <input type="text" placeholder="What was the weight for the exercise"/>
//                     </div>
//                     <div className="input-item">
//                         <label>Sets</label> 
//                         <select name="sets" id="sets">
//                             <option value="1">1</option>
//                             <option value="2">2</option>
//                             <option value="3">3</option>
//                             <option value="4">4</option>
//                             <option value="5">5</option>
//                             <option value="6">6</option>
//                             <option value="7">7</option>
//                             <option value="8">8</option>
//                             <option value="9">9</option>
//                             <option value="10">10</option>
//                         </select>
//                     </div>
//                     <div className="input-item">
//                         <label>Reps</label>
//                     </div>
//                 </div>
//             </div>
//             <div className="daily-workout-display">

//             </div>
//         </div>
//     );
// }

// export default Daily


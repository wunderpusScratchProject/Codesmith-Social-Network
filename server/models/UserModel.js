const { Pool } = require('pg');
const { PG_URI } = require('../secrets');

//Object with connectionString to our postgresURL
const pool = new Pool({
  connectionString: PG_URI,
  max: 4,
});

//Export object with query method
module.exports = {
  query: (text, params, callback) => {
    console.log('Query: ', text);
    return pool.query(text, params, callback);
  },
};

// Residents table in database
// residents (
// 	  id serial PRIMARY KEY,
// 	  name varchar( 100 )  NOT NULL,
//    photo varchar( 300 ),
// 	  cohort varchar( 300 ) NOT NULL,
//    organization varchar( 300 ),
//    linkedin varchar( 300 ) NOT NULL,
//    email varchar( 300 ) NOT NULL,
//    message varchar( 300 )
// );

// MAYBE
// case 'species':
//       const { classification, average_height, average_lifespan, language, homeworld } = details;
//       info = (
//         <ul className="modalList">
//           <li className="modalDetail">Classification: {classification}</li>
//           <li className="modalDetail">Average Height: {average_height}</li>
//           <li className="modalDetail">Average Lifespan: {average_lifespan}</li>
//           <li className="modalDetail">Language: {language}</li>
//           <li className="modalDetail">Homeworld: {homeworld}</li>
//         </ul>
//       );
//       break;
//     case 'homeworld':
//       const { rotation_period, orbital_period, diameter, climate, gravity, terrain, surface_water, population } = details;
//       info = (
//         <ul className="modalList">
//           <li className="modalDetail">Rotation Period: {rotation_period}</li>
//           <li className="modalDetail">Orbital Period: {orbital_period}</li>
//           <li className="modalDetail">Diameter: {diameter}</li>
//           <li className="modalDetail">Climate: {climate}</li>
//           <li className="modalDetail">Gravity: {gravity}</li>
//           <li className="modalDetail">Terrain: {terrain}</li>
//           <li className="modalDetail">Surface Water: {surface_water}</li>
//           <li className="modalDetail">Population: {population}</li>
//         </ul>
//       );
//       break;
//     case 'film':
//       const { episode_id, director, producer, release_date } = details;
//       info = (
//         <ul className="modalList">
//           <li className="modalDetail">Episode: {episode_id}</li>
//           <li className="modalDetail">Director {director}</li>
//           <li className="modalDetail">Producer: {producer}</li>
//           <li className="modalDetail">Release Date: {new Date(release_date).toDateString().slice(4)}</li>
//         </ul>
//       );
//       break;
//     default:
//       info = (<p>Unexpected modal type</p>);
// >>>>>>> a5cbb72 (initial commit)
//   }

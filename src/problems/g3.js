/*
You are given a list of airports and flights with a departure and arrival time.
Please determine whether it is possible for a package to transfer from S to T. The package arrived at S at time 0.

It is guaranteed that no flight can time travel, that is the departure time is always less than the arrival time.
During the transportation, the time that the package leaves the airport needs to be greater or equal than the time it arrives at the airport.
*/

const airports = [delhi, chicago, mumbai, zurich, london]

const flights = {
  delhi: [
    {
      dest: 'zurich',
      depart: '4 GMT 13 Sep',
      arrival: '8 GMT'
    },
    {
      source: 'delhi',
      dest: 'zurich',
      depart: '3 GMT 13 Sep',
      arrival: '8 GMT'
    },
  ],
  zurich: {
    dest: 'london',
    deaprt: '7',
    arrival: '11'
  }
}

// strategy; find source in flights map 
// case 1: find destination
// case 2: do not find it --> go to each intermediate stop check if zurich is there
// Time Complexity: n airports --> n - 1 destinations() .. n^3


// d ---> z ----> l ---> m --> noida

// delhi --> noida
// delhi ---> zurich + zurich-noida

// n = airports, edges = flights
// O(e) , EX: e = n^2

// k = flights from an single airport
// O(e * k)

const findPath = (flights, source, destination, time = 1234445555, previously = {}) => {

  if (source === destination) return true;
  const source_flights = flights[source] // source = delhi; destination = london  
  const valid_flights = source_flights.filter(f => f.departure > time && !previously[f.destination]);
  // find destination inside valid_flights;
  const is_destination = valid_flights.some(f => f.destination === destination);
  if (is_destination) return true;

  previously[source] = true;
  for (const f of valid_flights) {
    const has_path = findPath(flights, f.source, destination, f.arrival, previously);
    if (has_path) return true;
  }

  return false;
}

// shortest = min time
const findShortestPath = (flights, source, destination, time = 1234445555, duration, previously = null) => {

  // edge cases
  if (source === destination) return 0;

  const source_flights = flights[source] // source = delhi; destination = london

  const valid_flights = source_flights.filter(f => f.departure > time && f.destination !== previously) );



  // find destination inside valid_flights;
  let direct_min_time = null;
  valid_flights.forEach(f => {
    if (f.destination === destination && direct_min_time === null) direct_min_time = f.arrival - f.departure;
    if (f.destination === destination && direct_min_time) {
      if (f.arrival - f.departure < direct_min_time) direct_min_time = f.arrival - f.departure
    }
  });
  // 3pm - 2 flights  --> 6pm, 5pm

  if (direct_min_time) return direct_min_time; // flight duration

  // intermediate
  let min_time = null;
  for (const f of valid_flights) {
    // f = zurich
    const new_min_time = findPath(flights, f.source, destination, f.arrival);
    if (min_time === null) min_time = new_min_time;
    if (new_min_time < min_time) min_time = new_min_time;
  }

  return min_time;

}
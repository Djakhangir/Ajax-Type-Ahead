// Over here we are going to use that link to make request by use of JS Fetch api

const endpoint='https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json'

const cities = [];

//Fetch api is JS api to fetch data/make XMLHttp requests, before we used to run a callback by passing the function as an argument...
// after (endpoint, callback function) or we used to make requests by typing "Jquery$.getJSON()" but with fetch method itself...
//we receive a promise you can console.log it by defining any name as variable and passing a fetch method and console log it.
            //      const prom = fetch(endpoint);
            //          console.log(prom);
// So the way we can work with the promise is to call the method '.then' which is going to return us the blob/drop/ounce of data.
// the data we get from the fetch is weird (in console), so meaning that data does not know whether it is image or html or music...
// we know that it is JSON, and try to use Json.parse() to convert but it does not work because data is raw and
// we have to convert it into JSON. So if we return blob we can see that there is a property name json inside of the blob and  
// we can call it to convert blob to json by saying blob.json(), and we receive raw data in json format. After we have to send data...
// into our array 'cities'. there are several ways:
                                                    // 1. we can assign it as letcities =[] and 
                                                    //call below .then(data=>cities=data).Iit is going to reassign the array or
                                            //2. if you want to keep array as const variable, then we can push it and use spread 
                                            //into array (below example)     

 fetch(endpoint).then(blob => blob.json()).then(data => cities.push(...data));

 // so next part is description of how to make that array of cities be filtered as soon as user type any city name to bring that city
 // we create a function and use filter method we used in cardio classes. filter method is going to subset the initial array.

 function findMatching(wordToMatch, cities) {
     return cities.filter(place => {
         // here we need to figure out what was search, if the city or state match...
         // so to make the search work and search for matching word we have to put a variable into regular expression as return
    const regex = new RegExp(wordToMatch, 'gi'); //'gi'- g-will search globally and i-incentives meaning will search lowercase as well

                                  //match() method is going to match regular expression and string and return that
        return place.city.match(regex) || place.state.match(regex)       
     });
 }
//Function which is going to put everything nicely into commas by replacing string and puttin everything in commas
function numberWithCommas(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
 //this function is going to match anytime when value is changed or keyboard pressed. 
 // To do that we have to trigger the event in display by assigning the classes to the variables (.quesrySelector(class))
 // and adding the event Listener and running the function displayMatching...
 //inside displayMatching function we create variable, that is going to be assigned to the function which filters the data by the regExp
 //and pass this.value as well as cities array and return the matcharray but to return it ----------
 function displayMatching() {
    const matchArray=findMatching(this.value, cities);  // map()- creats array, look the Array-Cardio 1 file
        const html = matchArray.map(place => {          // we create variable and map() the martchArray variable which uses 
                                                         //filter method funtion findMatchin()
//here we create variable which is going to replace the existing regex with value in highlited span tag with the same new created regex... 
//and the value the user searched for,- 'gi'- globally and not caring about the case (upper, lower) 
    const regex = new RegExp (this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
    const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
            return `  
                <li>
                 <span class="name">${cityName}, ${stateName}</span>
                 <span class="population">${numberWithCommas(place.population)}</span> 
                </li> 
            `;                                  
        }).join(''); //since map() returns array we simply add join method to convert output to string
        suggestions.innerHTML = html;   // innerHTML allow JS to manipulate DOM, specifically reading and
                                        // replacing everything within given DOM element(change page content, adding resposivness)
} 

 const searchInput = document.querySelector('.search');
 const suggestions = document.querySelector('.suggestions');

 searchInput.addEventListener('change', displayMatching);
 searchInput.addEventListener('keyup', displayMatching);

 
 
 
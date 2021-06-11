
// $(document).ready(function()  { // don't leak
//     var c ={

//         "ARS": "Argentine Peso","AMD": "Armenian Dram","AWG": "Aruban Florin", "AUD": "Australian Dollar"
     
//     }
// console.log(c)
//     var elm = document.getElementById('from_c'), // get the select
//         df = document.createDocumentFragment(); // create a document fragment to hold the options while we create them
//     for (i in c) { // loop, i like 42.
//         var option = document.createElement('option'); // create the option element
//         option.value = i; // set the value property
        
//         option.appendChild(document.createTextNode("option #" + c[i])); // set the textContent in a safe way.
//         df.appendChild(option); // append the option to the document fragment
//     }
//     elm.appendChild(df); // append the document fragment to the DOM. this is the better way rather than setting innerHTML a bunch of times (or even once with a long string)
// })



function convert(){
  
    from_c=document.getElementById("from_c").value
    to_c=document.getElementById("to_c").value
    amount=document.getElementById("amount").value

    url = `http://localhost:5000/${from_c}/${to_c}/${amount}`

    options = {
    method:"GET"

    }

    fetch(url,options)
      .then(function (response) {
          return response.json();
      }).then(function (text) {
          console.log('GET response:');
          console.log(text.result); 
          document.getElementById('result').value = text.result;
      });
 
  }

const xhttp = new XMLHttpRequest();
const from_select = document.getElementById("from_c");
const to_select = document.getElementById("to_c");
const flag = document.getElementById("flag");
const flag2 = document.getElementById("flag2");
let countries;

xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    countries = JSON.parse(xhttp.responseText);
    assignValues();
    handleCountryChange();
  }
};
xhttp.open("GET", "https://restcountries.eu/rest/v2/all", true);
xhttp.send();

function assignValues() {
  countries.forEach(country => {
    const option_from = document.createElement("option");
    option_from.value = country.currencies[0].code;
    option_from.textContent = country.name;
    from_select.appendChild(option_from);
    const option_to = document.createElement("option");
    option_to.value = country.currencies[0].code;
    option_to.textContent = country.name;
    to_select.appendChild(option_to);
  });
}

function handleCountryChange() {
  
    const countryData = countries.find(
        country => from_select.value === country.currencies[0].code
      );
    const countryData2 = countries.find(
        country => to_select.value === country.currencies[0].code
    );
   flag.style.backgroundImage = `url(${countryData.flag})`;
   flag2.style.backgroundImage = `url(${countryData2.flag})`;
}

from_select.addEventListener("change", handleCountryChange.bind(this));
to_select.addEventListener("change", handleCountryChange.bind(this));
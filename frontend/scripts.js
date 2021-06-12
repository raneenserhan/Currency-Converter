
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
    option_from.textContent = country.name+"  ("+country.currencies[0].code+")";
    from_select.appendChild(option_from);
     option_to = document.createElement("option");
    option_to.value = country.currencies[0].code;
    option_to.textContent = country.name+"  ("+country.currencies[0].code+")";
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

function convert(){
  
    from_c=document.getElementById("from_c").value
    to_c=document.getElementById("to_c").value
    amount=document.getElementById("amount").value

    url = `http://localhost:5000/${from_c}/${to_c}/${amount}`

    options = {
    method:"GET"
    }
    if(amount=="")
    alert("insert amount")
    else
    if(amount<0)
    alert("invalid amount")
    else
    if(from_c==to_c)
    alert("Choose different currencies")
    else{
    fetch(url,options)
      .then(function (response) {
          return response.json();
      }).then(function (text) {
          console.log('GET response:');
          console.log(text.result); 
          document.getElementById('result').innerHTML  = text.result;
      });
    }
  }

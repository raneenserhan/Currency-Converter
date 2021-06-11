
$(document).ready(function()  { // don't leak
    var c ={

        "ARS": "Argentine Peso","AMD": "Armenian Dram","AWG": "Aruban Florin", "AUD": "Australian Dollar"
     
    }
console.log(c)
    var elm = document.getElementById('from_c'), // get the select
        df = document.createDocumentFragment(); // create a document fragment to hold the options while we create them
    for (i in c) { // loop, i like 42.
        var option = document.createElement('option'); // create the option element
        option.value = i; // set the value property
        
        option.appendChild(document.createTextNode("option #" + c[i])); // set the textContent in a safe way.
        df.appendChild(option); // append the option to the document fragment
    }
    elm.appendChild(df); // append the document fragment to the DOM. this is the better way rather than setting innerHTML a bunch of times (or even once with a long string)
})



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
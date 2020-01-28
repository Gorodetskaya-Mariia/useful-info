document.addEventListener("DOMContentLoaded", function() {
  let baseUrl = "https://pokeapi.co/api/v2/pokemon?limit=10";
  //XMLHttpRequest
  //1. create new XMLHttpRequest object
  let xhr = new XMLHttpRequest();
  //2. set method: "GET" and url
  xhr.open("GET", baseUrl);
  xhr.responseType = "json";
  //3. send a request
  xhr.send();
  //4. to do smth after getting an answer
  xhr.onload = function() {
    if (xhr.status != 200) {
      console.error(xhr.statusText);
    } else {
      renderPokemons(xhr.response.results);
    }
  };

  function renderPokemons(data) {
    let container = document.getElementById("pokemons");
    return data.map(item => {
      let el = document.createElement("p");
      el.innerHTML = item.name;
      container.append(el);
    });
  }
//-------------------------------------------------
  //fetch
  //1 with promise
  fetch(baseUrl)
    .then(response => response.json())
    .then(data => renderPokemons(data.results));
  //2 with await
  (async () => {
    let response = await fetch(baseUrl);
    let data = await response.json();
    renderPokemons(data.results);
  })();
//-------------------------------------------------
  //jQuery ajax
  $.ajax({
    url: baseUrl,
    dataType: "json"
  }).done(function(response) {
    renderPokemons(response.results);
  });

  function renderPokemons(data) {
    let container = $("#pokemons");
    $(container).html("");

    $.each(data, function(item) {
      let el = `<p>${data[item].name}</p>`;
      $(el).appendTo(container);
    });
  }
});

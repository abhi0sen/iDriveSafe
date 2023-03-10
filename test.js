
  // Get a reference to the <select> element
var select = document.getElementById("my-select");

// Retrieve JSON data from a file
fetch('./in.json')
  .then(response => response.json())
  .then(data => {
    // console.log(data)
    for (var i = 0; i < data.length; i++) {
        var option = document.createElement("option");
        option.value = data[i]["admin_name"];
        // console.log(data[i]["admin_name"])
        option.text = data[i]["admin_name"];
        select.appendChild(option);
    }

    select.onchange = () => {
      console.log(select.value)
      let val = select.value;
      let b = document.getElementsByClassName("CardList")[0];
      b.innerHTML = ""

      for (var i=0; i<data.length; i++) {
        if (data[i]["admin_name"] == val) {

        b.innerHTML = b.innerHTML+`<div class="card bg-tertiary mb-2 mx-2" style="width: 17rem; height: 17rem;">
        <img src="${data[i]["image"]}" class="card-img-top w-100 h-75 border border-radius-2 p-2" alt="...">
        <div class="text-center">
          <a href="./assets/statistics.html" class="btn d-grid">${data[i]["city"]}</a>
        </div>
        </div>`
      }
    }
}
  });
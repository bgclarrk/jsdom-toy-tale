let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const newToyForm = document.querySelector("body > div.container > form > input.submit")
  
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener("submit", function(event) {
        event.preventDefault();
        addNewToyToDB(event.target);
      });

    } else {
      toyFormContainer.style.display = "none";
    }
  });
  getToys();
});

function getToys() {
  fetch("http://localhost:3000/toys")
  .then(function(response) {
    return response.json();
  })
  .then(function(toys) {
    for (const toy of toys) {
      addToyToDom(toy);
    }
  })
};

function addNewToyToDB(toyData) {
  
  toyData = {
    name: toyData.name.value,
    img: toyData.image.value,
    likes: 0
  };

  const configObj = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(toyData)
  };

  fetch ("http://localhost:3000/toys", configObj)
  .then(function(response) {
    return response.json();
  })
  .then(function(obj) {
    addToyToDom(obj)
  })
  .catch(function(eror) {
    alert(error.message)
    console.log(error.message);
  })
};

function addToyToDom(toy) {
  let div = document.createElement("div");
  div.classList.add("card");
  document.querySelector("#toy-collection").appendChild(div);

  let h2 = document.createElement("h2");
  h2.innerText = `${toy.name}`;
  document.querySelector(".card:last-child").appendChild(h2);
  
  let img = document.createElement("img");
  img.classList.add("toy-avatar");
  img.src = `${toy.image}`;
  document.querySelector(".card:last-child").appendChild(img);
  
  let p = document.createElement("p");
  p.innerText = `${toy.likes}`;
  document.querySelector(".card:last-child").appendChild(p);

  let button = document.createElement("button");
  button.classList.add("like-btn");
  button.innerText = "Like";
  document.querySelector(".card:last-child").appendChild(button);
  
};

document.querySelector("#toy-collection > button")
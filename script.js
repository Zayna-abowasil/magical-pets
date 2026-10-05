const API_URL = "https://6ac3df63ae53bf25b80f1ab7.mockapi.io/pets";
const pets = document.getElementById("pets");
const form = document.getElementById("petForm");
const adoptBtn = document.getElementById("adoptBtn");
adoptBtn.onclick = function () {
form.style.display = "block";
};
async function getPets() {
try {
const response = await fetch(API_URL);
const data = await response.json();
data.forEach(function (pet) {
showPet(pet);
});

} catch (error) {
console.log(error);
}
}
function showPet(pet) {
pets.innerHTML += `
<div class="pet-card" id="pet-${pet.id}">
<h2>${pet.name}</h2>
<p>${pet.type}</p>
<p>Color: ${pet.color}</p>
<p>${pet.description}</p>
<button onclick="deletePet('${pet.id}')">
Release
</button>
</div>
`;
}
form.onsubmit = async function (event) {
event.preventDefault();
const newPet = {
name: document.getElementById("name").value,
type: document.getElementById("type").value,
color: document.getElementById("color").value,
description: document.getElementById("description").value
};

try {
const response = await fetch(API_URL, {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify(newPet)
});

const pet = await response.json();

showPet(pet);

form.reset();
form.style.display = "none";

} catch (error) {
console.log(error);
}
};
async function deletePet(id) {

const answer = confirm("Are you sure you want to release this pet?");

if (answer) {
try {
await fetch(API_URL + "/" + id, {
method: "DELETE"
});

document.getElementById("pet-" + id).remove();

} catch (error) {
console.log(error);
}
}
}
getPets();

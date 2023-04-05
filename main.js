const factsApiUrl = "https://dogapi.dog/api/v2/facts";
const imagesApiUrl = " https://dog.ceo/api/breeds/image/random";

const imageEl = document.querySelector(".image-container__img");
const formEl = document.querySelector(".form");
const factEl = document.querySelector(".facts__text");

function getRandomDogImage() {
  axios.get(`${imagesApiUrl}`).then((response) => {
    console.log("response: ", response);
    const data = response.data.message;
    console.log(data);
    imageEl.src = data;
  });
}

function getRandomDogFact() {
  axios.get(`${factsApiUrl}`).then((response) => {
    const fact = response.data.data[0].attributes.body;
    // console.log(fact);
    factEl.innerText = fact;
  });
}

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const breed = e.target.name.value;
  console.log(breed);
  if (breed.split("").includes(" ")) {
    alert("I said exactly one word!  Try again!");
    return;
  }
  axios
    .get(`https://dog.ceo/api/breed/${breed}/images/random`)
    .then((response) => {
      const imgData = response.data.message;
      imageEl.src = imgData;
    })
    .catch((error) => {
      alert("We couldn't find a dog matching that breed.  Try again!", error);
    });

  getRandomDogFact();
});

// getRandomDogImage();
// getRandomDogFact();

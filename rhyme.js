// get relevant dom elements
const queryInputElem = document.getElementById('query');

const frigginForm = document.getElementById('vestigial');

frigginForm.addEventListener('submit', (event) => {
  console.log('submitting');
  event.preventDefault();
})

const results = document.getElementById('results');

function sizeTheWords() {
  const variableSizeResults = document.querySelectorAll(".result.imperfect");
  variableSizeResults.forEach((result) => {
    const resultScore = parseInt(result.dataset.score, 10);
    result.style.fontSize = `${0.5 + (3.5 * resultScore) / 300}rem`;
  });
}

// add event listener to know when to search

queryInputElem.addEventListener('keyup', async function(ev) {
  ev.preventDefault()
  if (ev.key == 'Enter') {
    console.log('pressed enter')

    const rhymeResultsResp = await fetch(
      `https://rhymebrain.com/talk?function=getRhymes&word=${queryInputElem.value}`);
      console.log(rhymeResultsResp);
    const rhymeResults = await rhymeResultsResp.json();

    console.log(rhymeResults);

    const rhymeResultsElems = rhymeResults.map((rhymeWord) => {
      let resultElem = document.createElement("div");
      resultElem.classList.add("result");
      if (rhymeWord.score >= 300) {
        resultElem.classList.add("perfect");
      } else {
        resultElem.classList.add("imperfect");
      }
      resultElem.dataset.score = rhymeWord.score;
      // resultElem.innerText = rhymeWord.word;
      resultElem.append(rhymeWord.word);
      return resultElem;
    });

    const resultsContainer = document.getElementById("results");
    // console.log(Array.from(resultsContainer.childNodes));
    Array.from(resultsContainer.childNodes).forEach((child) => {
      child.remove();
    });
    results.append(...rhymeResultsElems);
    sizeTheWords();
  }
});


// // const query = "hello";
// const searchBoxElem = document.getElementById("query");

// function sizeTheWords() {
//   const variableSizeResults = document.querySelectorAll(".result.imperfect");
//   variableSizeResults.forEach((result) => {
//     const resultScore = parseInt(result.dataset.score, 10);
//     result.style.fontSize = `${0.5 + (3.5 * resultScore) / 300}rem`;
//   });
// }

// // assuming you already have rhyme results somewhere, for each of the first 10 results, query the word info api for the rhyming words' info and display them in a dl with that rhyming word

// async function begin() {
//   const rhymeResults = await fetch(`https://rhymebrain.com/talk?function=getRhymes&word=${searchBoxElem.value}`);
//   const rhymeResultsJson = await rhymeResults.json();
//   console.log(rhymeResultsJson);
//   const rhymeResultsElems = rhymeResultsJson.map((rhymeWord) => {
//     let resultElem = document.createElement("div");
//     resultElem.classList.add("result");
//     if (rhymeWord.score >= 300) {
//       resultElem.classList.add("perfect");
//     } else {
//       resultElem.classList.add("imperfect");
//     }
//     resultElem.dataset.score = rhymeWord.score;
//     // resultElem.innerText = rhymeWord.word;
//     resultElem.append(rhymeWord.word);
//     return resultElem;
//   });
//   const resultsContainer = document.getElementById("results");
//   // console.log(Array.from(resultsContainer.childNodes));
//   Array.from(resultsContainer.childNodes).forEach((child) => {
//     child.remove();
//   });
//   resultsContainer.append(...rhymeResultsElems);
//   sizeTheWords();
// }
// begin();
(() => {
  let results;
  let nextResults;
  let button;

  function titleCase(str) {
    return `${str[0].toUpperCase()}${str.substring(1)}`
  }

  function updatePostAnimation() {
    nextResults.classList.add("animate");
    button.removeAttribute('disabled');
    button.innerHTML = 'Another!';
  }

  function updateResultClasses() {
    results.classList.remove("current");
    results.classList.add("next");
    nextResults.classList.remove("next");
    nextResults.classList.add("current");

    setupResults();

    // Move the new next-results class into place
    nextResults.classList.remove("animate");
    nextResults.classList.remove("hiddenRight");
    nextResults.classList.add("hiddenLeft");
    window.setTimeout(updatePostAnimation, 50);
  }

  function getNewStop() {
    button.setAttribute('disabled','');
    generate();
    results.classList.add('hiddenRight');
    nextResults.classList.remove('hiddenLeft');
    window.setTimeout(updateResultClasses, 800);
  }

  function generate() {
    const stopName = nextResults.querySelector('.stopname');
    const stopLine = nextResults.querySelector('.stopline');
    let stopInd = Math.floor(Math.random() * stops.length);
    while(stops[stopInd].closed) {
      stopInd = Math.floor(Math.random() * stops.length);
    }
    const stop = stops[stopInd];

    stopName.innerHTML = stop.name;
    for(line of lines) {
      stopName.classList.remove(line);
    }
    stopName.classList.add(stop.lines[0].toLowerCase());
    stopName.setAttribute('href', `https://www.google.com/maps/search/${stop.name}+mbta+station`);

    if(stop.lines.length == 1) {
      stopLine.innerHTML = `${titleCase(stop.lines[0])} Line`;
    } else {
      stopLine.innerHTML = `${titleCase(stop.lines[0])} and ${titleCase(stop.lines[1])} Lines`;
    }
  }

  function setupResults() {
    results = document.querySelector('.results.current');
    nextResults = document.querySelector('.results.next');
  }

  function setup() {
    button = document.querySelector('button.generate')
    button.onclick = getNewStop;
    setupResults();
  }

  window.onload = setup;
})();
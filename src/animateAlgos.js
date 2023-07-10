let stopAnimation = false,
  timeInterval;

let milliseconds = 0,
  seconds = 0;

let compareCssText =
  "background-color: red; transform: scale(1.1); transition: all 0.2s ease-in-out";

let swapCssText =
  "background-color: #cd9c59; transform: scale(1); transition: all 0.2s ease-in-out";

export function animate(swaps) {
  if (stopAnimation) {
    clearInterval(timeInterval);
    document
      .querySelector("#stop-btn")
      .classList.replace("not-disabled", "disabled");

    document
      .querySelector("#start-btn")
      .classList.replace("disabled", "not-disabled");

    return;
  }

  if (!swaps.length) {
    clearInterval(timeInterval);
    document
      .querySelector("#stop-btn")
      .classList.replace("not-disabled", "disabled");

    document
      .querySelector("#start-btn")
      .classList.replace("not-disabled", "disabled");

    // document
    //   .querySelector("#reset-btn")
    //   .classList.replace("disabled", "not-disabled");

    [...document.querySelectorAll(".array-object")].forEach((ele) => {
      ele.removeAttribute("style");
    });

    return;
  }

  const obj = swaps.shift();
  const [i, j] = obj.indices;

  const node1 = document.querySelector(`#ele-${i}`),
    node2 = document.querySelector(`#ele-${j}`);

  const tnode1 = node1.cloneNode(true);
  const tnode2 = node2.cloneNode(true);

  if (obj.type === "comp") {
    node1.style.cssText = compareCssText;
    node2.style.cssText = compareCssText;
  } else {
    node1.style.cssText = swapCssText;
    node2.style.cssText = swapCssText;
  }

  setTimeout(function () {
    if (obj.type === "swap" && !stopAnimation) {
      const temp = tnode2.getAttribute("id");
      tnode2.setAttribute("id", tnode1.getAttribute("id"));
      tnode1.setAttribute("id", temp);

      node1.replaceWith(tnode2);
      node2.replaceWith(tnode1);
    }

    node1.style.cssText = "transform: scale(1); background-color: #064663";
    node2.style.cssText = "transform: scale(1); background-color: #064663";
    animate(swaps);
  }, 500);
}

function resetTimer() {
  const display = document.getElementById("display-time");
  seconds = 0;
  milliseconds = 0;

  let paddedMilliseconds = milliseconds.toString().padStart(3, "0");
  display.innerText = `${seconds}.${paddedMilliseconds}s`;
}

function startTimer() {
  const display = document.getElementById("display-time");

  timeInterval = setInterval(() => {
    milliseconds++;

    if (milliseconds >= 1000) {
      milliseconds = 0;
      seconds++;
    }

    let paddedMilliseconds = milliseconds.toString().padStart(3, "0");
    display.innerText = `${seconds}.${paddedMilliseconds}s`;
  }, 1);
}

if (typeof document !== "undefined") {
  const startBtn = document.querySelector("#start-btn");
  const stopBtn = document.querySelector("#stop-btn");
  const resetBtn = document.querySelector("#reset-btn");

  stopBtn.addEventListener("click", function () {
    stopAnimation = true;
  });

  startBtn.addEventListener("click", function () {
    startTimer();
    stopAnimation = false;

    document
      .querySelector("#start-btn")
      .classList.replace("not-disabled", "disabled");
  });

  // resetBtn.addEventListener("click", function () {
  //   document
  //     .querySelector("#reset-btn")
  //     .classList.replace("not-disabled", "disabled");

  //   document
  //     .querySelector("#start-btn")
  //     .classList.replace("disabled", "not-disabled");

  //   resetTimer();
  // });
}

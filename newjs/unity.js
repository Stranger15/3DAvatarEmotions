var gameInstance = UnityLoader.instantiate(
  "gameContainer",
  "Build/buildtrial.json",
  { onProgress: UnityProgress }
);

function unityRun(value) {
  console.log(
    "======== \n Calling the unity function PlayAnimation \n========="
  );

  gameInstance.SendMessage("Main Camera", "PlayAnimation", value);
}

function runAll(url, text) {
  // var audio = new Audio(url);

  // setTimeout(function() {
  //   audio.play();
  // }, 900);

  console.log(text.toLowerCase());

  if (text.toLowerCase().includes("happy")) {
    run(url, "2");
    console.log("happy");
  } else if (text.toLowerCase().includes("sad")) {
    run(url, "3");
    console.log("sad");
  } else if (text.toLowerCase().includes("angry")) {
    run(url, "4");
    console.log("angry");
  } else if (text.toLowerCase().includes("excited")) {
    run(url, "5");
    console.log("excited");
  } else if (text.toLowerCase().includes("bored")) {
    run(url, "6");
    console.log("bored");
  } else if (text.toLowerCase().includes("scary")) {
    run(url, "7");
    console.log("scary");
  } else {
    run(url, "1");
    console.log("idle");
  }
}

function run(url, value) {
  var audio = new Audio(url);
  setTimeout(function() {
    audio.play();
  }, 200);
  unityRun(value);
  audio.onended = function() {
    setTimeout(function() {
      unityRun("1");
      showInfo("info_start");
    }, 200);
  };
}

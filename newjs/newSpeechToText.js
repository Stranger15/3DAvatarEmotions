var langs = [
  ["Afrikaans", ["af-ZA"]],
  ["Bahasa Indonesia", ["id-ID"]],
  ["Bahasa Melayu", ["ms-MY"]],
  ["Català", ["ca-ES"]],
  ["Čeština", ["cs-CZ"]],
  ["Deutsch", ["de-DE"]],
  [
    "English",
    ["en-AU", "Australia"],
    ["en-CA", "Canada"],
    ["en-IN", "India"],
    ["en-NZ", "New Zealand"],
    ["en-ZA", "South Africa"],
    ["en-GB", "United Kingdom"],
    ["en-US", "United States"]
  ],
  [
    "Español",
    ["es-AR", "Argentina"],
    ["es-BO", "Bolivia"],
    ["es-CL", "Chile"],
    ["es-CO", "Colombia"],
    ["es-CR", "Costa Rica"],
    ["es-EC", "Ecuador"],
    ["es-SV", "El Salvador"],
    ["es-ES", "España"],
    ["es-US", "Estados Unidos"],
    ["es-GT", "Guatemala"],
    ["es-HN", "Honduras"],
    ["es-MX", "México"],
    ["es-NI", "Nicaragua"],
    ["es-PA", "Panamá"],
    ["es-PY", "Paraguay"],
    ["es-PE", "Perú"],
    ["es-PR", "Puerto Rico"],
    ["es-DO", "República Dominicana"],
    ["es-UY", "Uruguay"],
    ["es-VE", "Venezuela"]
  ],
  ["Euskara", ["eu-ES"]],
  ["Français", ["fr-FR"]],
  ["Galego", ["gl-ES"]],
  ["Hrvatski", ["hr_HR"]],
  ["IsiZulu", ["zu-ZA"]],
  ["Íslenska", ["is-IS"]],
  ["Italiano", ["it-IT", "Italia"], ["it-CH", "Svizzera"]],
  ["Magyar", ["hu-HU"]],
  ["Nederlands", ["nl-NL"]],
  ["Norsk bokmål", ["nb-NO"]],
  ["Polski", ["pl-PL"]],
  ["Português", ["pt-BR", "Brasil"], ["pt-PT", "Portugal"]],
  ["Română", ["ro-RO"]],
  ["Slovenčina", ["sk-SK"]],
  ["Suomi", ["fi-FI"]],
  ["Svenska", ["sv-SE"]],
  ["Türkçe", ["tr-TR"]],
  ["български", ["bg-BG"]],
  ["Pусский", ["ru-RU"]],
  ["Српски", ["sr-RS"]],
  ["한국어", ["ko-KR"]],
  [
    "中文",
    ["cmn-Hans-CN", "普通话 (中国大陆)"],
    ["cmn-Hans-HK", "普通话 (香港)"],
    ["cmn-Hant-TW", "中文 (台灣)"],
    ["yue-Hant-HK", "粵語 (香港)"]
  ],
  ["日本語", ["ja-JP"]],
  ["Lingua latīna", ["la"]]
];
// for (var i = 0; i < langs.length; i++) {
//   select_language.options[i] = new Option(langs[i][0], i);
// }
// select_language.selectedIndex = 6;
// updateCountry();
// select_dialect.selectedIndex = 6;
showInfo("info_start");
// function updateCountry() {
//   for (var i = select_dialect.options.length - 1; i >= 0; i--) {
//     select_dialect.remove(i);
//   }
//   var list = langs[select_language.selectedIndex];
//   for (var i = 1; i < list.length; i++) {
//     select_dialect.options.add(new Option(list[i][1], list[i][0]));
//   }
//   select_dialect.style.visibility = list[1].length == 1 ? "hidden" : "visible";
// }
// var create_email = false;
var final_transcript = "";
var recognizing = false;
var ignore_onend;
var start_timestamp;
// if (!("webkitSpeechRecognition" in window)) {
//   upgrade();
// }
// else
if (!("webkitSpeechRecognition" in window)) {
  upgrade();
} else {
  start_button.style.display = "inline-block";
  var recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = "en-US";
  recognition.maxAlternatives = 1;
  recognition.onstart = function() {
    recognizing = true;
    showInfo("info_speak_now");
    start_img.src = "../images/mic/mic.png";
    // wave.src = "./audio waves/wave1.gif";
    // wave.visibility = "visible";
    $("#wave").removeClass("hideWave");
    $("#start_img").attr("src", "../images/mic/micActive.png");
    // $("#wave").addClass("showWave");
  };
  recognition.onerror = function(event) {
    $("#wave").addClass("hideWave");
    $("#start_img").attr("src", "../images/mic/mic.png");

    if (event.error == "no-speech") {
      start_img.src = "../images/mic.png";
      showInfo("info_no_speech");
      ignore_onend = true;
    }
    if (event.error == "audio-capture") {
      start_img.src = "../images/mic.png";
      showInfo("info_no_microphone");
      ignore_onend = true;
    }
    if (event.error == "not-allowed") {
      if (event.timeStamp - start_timestamp < 100) {
        showInfo("info_blocked");
      } else {
        showInfo("info_denied");
      }
      ignore_onend = true;
    }
  };
  recognition.onend = function() {
    recognizing = false;
    if (ignore_onend) {
      return;
    }
    // start_img.src = "mic.gif";
    start_img.src = "../images/mic/mic.png";
    if (!final_transcript) {
      showInfo("info_start");
      $("#wave").addClass("hideWave");
      $("#start_img").attr("src", "../images/mic/mic.png");
      return;
    }
    showInfo("info-thankyou");
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
      var range = document.createRange();
      range.selectNode(document.getElementById("final_span"));
      window.getSelection().addRange(range);
    }
    // if (create_email) {
    //   create_email = false;
    //   createEmail();
    // }
    // wave.src = "";
    // wave.visibility = "hidden";
    // $("#wave").removeClass("showWave");
    $("#wave").addClass("hideWave");
    console.log(
      "===============\n calling text to speech \n ==================="
    );

    // alert(final_span.innerHTML);

    // uncomment this function call below before uploading update on server;
    // texToSpeech(final_span.innerHTML);

    getEmotion(final_span.innerHTML);

    texToSpeech(final_span.innerHTML);

    // var words = final_span.innerHTML;

    // console.log(words.toLowerCase());

    // if (words.toLowerCase().includes("angry")) {
    //   console.log("angry");
    // } else if (words.toLowerCase().includes("excited ")) {
    //   console.log("excited ");
    // } else {
    //   console.log("bored");
    // }

    // playAudio("C:UsersMIPLDesktop\1556087458101speech.mp3");
  };
  recognition.onresult = function(event) {
    var interim_transcript = "";
    for (var i = event.resultIndex; i < event.results.length; i++) {
      var transcript = event.results[i][0].transcript;
      transcript.replace("\n", "<br>");
      if (event.results[i].isFinal) {
        final_transcript += transcript;
      } else {
        interim_transcript += transcript;
      }
    }
    final_transcript = capitalize(final_transcript);
    final_span.innerHTML = linebreak(final_transcript);
    interim_span.innerHTML = linebreak(interim_transcript);
    console.log("/////////////////\n" + final_transcript + "\n///////////////");
    // if (final_transcript || interim_transcript) {
    //   showButtons("inline-block");
    // }
  };
}
function upgrade() {
  // start_button.style.visibility = "hidden";
  showInfo("info_upgrade");
}
var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
  return s.replace(two_line, "<p></p>").replace(one_line, "<br>");
}
var first_char = /\S/;
function capitalize(s) {
  return s.replace(first_char, function(m) {
    return m.toUpperCase();
  });
}
// function createEmail() {
//   var n = final_transcript.indexOf("\n");
//   if (n < 0 || n >= 80) {
//     n = 40 + final_transcript.substring(40).indexOf(" ");
//   }
//   var subject = encodeURI(final_transcript.substring(0, n));
//   var body = encodeURI(final_transcript.substring(n + 1));
//   window.location.href = "mailto:?subject=" + subject + "&body=" + body;
// }
// function copyButton() {
//   if (recognizing) {
//     recognizing = false;
//     recognition.stop();
//   }
//   copy_button.style.display = "none";
//   copy_info.style.display = "inline-block";
//   showInfo("");
// }
// function emailButton() {
//   if (recognizing) {
//     create_email = true;
//     recognizing = false;
//     recognition.stop();
//   } else {
//     createEmail();
//   }
//   email_button.style.display = "none";
//   email_info.style.display = "inline-block";
//   showInfo("");
// }
function startButton(event) {
  if (recognizing) {
    recognition.stop();
    $("#wave").addClass("hideWave");
    return;
  }
  final_transcript = "";
  // recognition.lang = select_dialect.value;
  recognition.start();
  ignore_onend = false;
  final_span.innerHTML = "";
  interim_span.innerHTML = "";
  // start_img.src = "mic-slash.gif";
  showInfo("info_allow");
  // showButtons("none");
  start_timestamp = event.timeStamp;
}
function showInfo(s) {
  if (s) {
    for (var child = info.firstChild; child; child = child.nextSibling) {
      if (child.style) {
        child.style.display = child.id == s ? "block" : "none";
      }
    }
    info.style.visibility = "visible";
  } else {
    info.style.visibility = "hidden";
  }
}
// var current_style;
// function showButtons(style) {
//   if (style == current_style) {
//     return;
//   }
//   current_style = style;
//   copy_button.style.display = style;
//   email_button.style.display = style;
//   copy_info.style.display = "none";
//   email_info.style.display = "none";
// }

const preUrl = "https://cors-anywhere.herokuapp.com/";

function texToSpeech(words) {
  var text = words;
  $.ajax({
    url: preUrl + "https://thetint.app/pollySpeech/test/tospeech",
    type: "POST",
    contentType: "application/json; charset=utf-8",
    "X-Content-Type-Options": "nosniff",
    Accept: "application/json",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": true,
    dataType: "json",
    data: JSON.stringify({
      text: words
    }),
    success: function(data) {
      console.log("step 2");
      console.log("---->" + data);
      // var audioSource = data.audioUrl;
      // var url = document.getElementById("audioSource");
      // url.innerHTML = audioSource;
      // document.getElementById("audioSource").innerHTML
      // var audio = new Audio(data.audioUrl);

      runAll(data.audioUrl, words);

      // setTimeout(function() {
      //   audio.play();
      // }, 1200);
      // unityRun("3");

      // audio.onended = function() {
      //   unityRun("4");
      // };

      //   alert(audioSource);
    },
    error: function(x, status, error) {
      // audioSource.innerHTML =
      //   "https://s3.ap-south-1.amazonaws.com/testwowza1935/audio/1556270119463speech.mp3";

      runAll(
        "https://s3.ap-south-1.amazonaws.com/testwowza1935/audio/1556270119463speech.mp3",
        text
      );
      console.log("step 3" + error);
    }
  });
}

function getEmotion(text) {
  var apiKey = "4pXSrwViGGMiLHnntMV61VO8GJN1dQG3vuLdk06apkQ";
  var langCode = "en";

  // var text = words;
  $.ajax({
    url: preUrl + "https://apis.paralleldots.com/v4/emotion",
    type: "POST",
    contentType: "application/x-www-form-urlencoded; charset=utf-8",
    "X-Content-Type-Options": "nosniff",
    Accept: "application/json",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": true,
    dataType: "json",
    data: JSON.stringify({
      text: text,
      api_key: apiKey,
      lang_code: langCode
    }),
    success: function(resp) {
      console.log("========= Parallel dots =========");
      // console.log("---->" + data.type);
      console.log(apiKey);
      console.log(text);
      console.log(langCode);

      var response = JSON.stringify(resp);
      console.log(response.toString());

      // console.log(response);

      // function parseJson(object) {
      //   object.types.forEach(function(key) {
      //     console.log(key.type);
      //   });
      // }

      // parseJson(data);

      // analyze(data);
    },
    error: function(x, status, error) {
      console.log("=============\n" + "Error occured" + "\n=============");
      console.log("step 3" + error);
    }
  });
}

// analyze(data){
//   console.log(data.emotion.Happy);
//   console.log(data.emotion("Angry"));
//   console.log(data.emotion("Sad"));
//   console.log(data.emotion("Fear"));
//   console.log(data.emotion("Bored"));
//   console.log(data.emotion("Excited"));
// }

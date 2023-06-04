

const selectLang = document.querySelectorAll(".selectInput")

selectLang.forEach((lang, id) => {
    for (const country_code in countries) {
        let selected;
        if(id == 0 && country_code == "es-ES") {
            selected = "selected"
        }else if(id == 1 && country_code == 'en-GB') {
            selected = "selected"
        }
        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`
        lang.insertAdjacentHTML("beforeend", option)
    }
})


const translateBtn = document.querySelector(".translateBtn")
translateBtn.addEventListener("click", translate);
const fromText = document.querySelector(".from")
const toText = document.querySelector(".to")


function translate() {
    let text = fromText.value;
    let translateFrom = selectLang[0].value;
    let translateTo = selectLang[1].value;
    if(!text) return;
    toText.setAttribute("placeholder", "Translating...")
    fetch(`https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`)
        .then(response => response.json())
        .then(data => {
            toText.value = data.responseData.translatedText;
        });
}

const exchange = document.querySelector(".bx-transfer")
exchange.addEventListener("click", exchangeLang)

function exchangeLang() {
    let tempText = fromText.value;
    tempLang = selectLang[0].value;
    fromText.value = toText.value;
    selectLang[0].value = selectLang[1].value
    toText.value = tempText;
    selectLang[1].value = tempLang;
}

const copyBtn = document.querySelectorAll(".bx-copy");
copyBtn.forEach((btn) => {
    btn.addEventListener("click", copyText)
});

function copyText() {
    if (this.classList.contains("copyFrom")) {
        navigator.clipboard.writeText(fromText.value);
    } else {
        navigator.clipboard.writeText(toText.value);
    }
}

const speechBtn = document.querySelectorAll(".bx-volume-full");
speechBtn.forEach((btn) => {
    btn.addEventListener("click", speechText)
});

function speechText() {
    let utterance;
    if(this.classList.contains("speechFrom")) {
        utterance = new SpeechSynthesisUtterance(fromText.value)
        utterance.lang = selectLang[0].value
    }else {
        utterance = new SpeechSynthesisUtterance(toText.value)
        utterance.lang = selectLang[1].value
    }
    speechSynthesis.speak(utterance)
}


const openButton = document.getElementById("openButton");
const continueButton = document.getElementById("continueButton");

const welcomeSection = document.getElementById("welcomeSection");
const nextSection = document.getElementById("nextSection");
const questionSection = document.getElementById("questionSection");
const memorySection = document.getElementById("memorySection");
const letterSection = document.getElementById("letterSection");

const choiceOne = document.getElementById("choiceOne");
const choiceTwo = document.getElementById("choiceTwo");
const answerMessage = document.getElementById("answerMessage");

const memoryCards = document.querySelectorAll(".memory-card");
const memoryMessage = document.getElementById("memoryMessage");
const memoryContinue = document.getElementById("memoryContinue");

const openLetterButton = document.getElementById("openLetterButton");
const letterPaper = document.getElementById("letterPaper");
const letterIcon = document.getElementById("letterIcon");


let isTransitioning = false;

function changeSection(current, next) {

    if (isTransitioning) return;

    isTransitioning = true;

    current.classList.add("is-leaving");

    setTimeout(function () {

        current.style.display = "none";

        next.scrollTop = 0;

        next.classList.add("is-visible");

        updateDreamIntensity(next);

        isTransitioning = false;

    }, 700);

}


openButton.addEventListener("click", function () {

    changeSection(welcomeSection, nextSection);

});


continueButton.addEventListener("click", function () {

    changeSection(nextSection, questionSection);

});


const nextGalleryButton = document.createElement("button");

nextGalleryButton.type = "button";
nextGalleryButton.textContent = "Lihat foto kita! 📸";
nextGalleryButton.id = "nextGalleryButton";
nextGalleryButton.style.marginTop = "15px";

nextGalleryButton.hidden = true;

const questionContent = questionSection.querySelector(".question-content");
const questionCaption = questionContent.querySelector(".bottom-caption");

questionContent.insertBefore(nextGalleryButton, questionCaption);

choiceOne.addEventListener("click", function () {

    answerMessage.textContent =
        "WKWKWK, berarti aku masih lucu buat kamu yaaa 😭💗";

    answerMessage.classList.add("show");

    nextGalleryButton.hidden = false;

});

choiceTwo.addEventListener("click", function () {

    answerMessage.textContent =
        "Songong dia ni emang ge, ga sayang sm aku ahh, aku aja sayang km tau 💗";

    answerMessage.classList.add("show");

    nextGalleryButton.hidden = false;

});

nextGalleryButton.addEventListener("click", function () {

    changeSection(questionSection, memorySection);

});

memoryCards.forEach(function (card) {

    card.addEventListener("click", function () {

        const message = card.dataset.message;

        memoryMessage.textContent = message;

    });

});

memoryContinue.addEventListener("click", function () {

    changeSection(memorySection, letterSection);

});

openLetterButton.addEventListener("click", function () {

    // Tampilkan isi surat
    letterPaper.classList.add("show");

    // Jalankan animasi amplop terbuka
    letterIcon.classList.add("opened");

    // Sembunyikan tombol buka surat
    openLetterButton.style.display = "none";

});

const dreamyAtmosphere = document.getElementById("dreamyAtmosphere");

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;


function updateDreamIntensity(section) {

    const intensityLevels = {
        welcomeSection: 0.25,
        nextSection: 0.30,
        questionSection: 0.38,
        memorySection: 0.45,
        letterSection: 0.55
    };

    const intensity = intensityLevels[section.id] || 0.30;

    dreamyAtmosphere.style.setProperty(
        "--dream-intensity",
        intensity
    );

}

if (dreamyAtmosphere && !prefersReducedMotion) {

    function createDreamParticle() {

        if (dreamyAtmosphere.querySelectorAll(".dream-particle").length >= 16) {
            return;
        }

        const particle = document.createElement("span");

        const isHeart = Math.random() > 0.45;

        particle.classList.add(
            "dream-particle",
            isHeart ? "dream-heart" : "dream-petal"
        );

        particle.textContent = isHeart ? "♡" : "✿";

        const size = Math.random() * 12 + 10;
        const duration = Math.random() * 7 + 10;
        const horizontalPosition = Math.random() * 100;

        particle.style.left = horizontalPosition + "%";
        particle.style.fontSize = size + "px";
        particle.style.animationDuration = duration + "s";

        dreamyAtmosphere.appendChild(particle);

        setTimeout(function () {
            particle.remove();
        }, duration * 1000);

    }


    updateDreamIntensity(welcomeSection);


    setInterval(createDreamParticle, 900);

}

console.log("=== DREAMY DEBUG ===");

console.log("Atmosphere:", dreamyAtmosphere);
console.log("Reduced motion:", prefersReducedMotion);

console.log(
    "Particle count:",
    dreamyAtmosphere
        ? dreamyAtmosphere.querySelectorAll(".dream-particle").length
        : "ELEMENT NOT FOUND"
);
const valueOrientationLabel = document.querySelector('.orientation_value');
const rangeOrientation = document.querySelector('.range_gradient');

const inputsColor = Array.from(document.querySelectorAll('.input_color'));
const labelColor = Array.from(document.querySelectorAll('.label_color'));
const backgroundInputs = Array.from(document.querySelectorAll('.input_group'));


function changeInputsColor() {
    let orientationDegre = rangeOrientation.value;
    let firstColor;
    let secondColor;

    rangeOrientation.addEventListener('input', () => {
        valueOrientationLabel.textContent = `${rangeOrientation.value}`;
        orientationDegre = rangeOrientation.value;

        firstColor = labelColor[0].innerText;
        secondColor = labelColor[1].innerText;
        
        handleBackground(firstColor, secondColor, orientationDegre);
    });
    
    inputsColor.forEach(input => {
        input.addEventListener('input', () => {
            let i = inputsColor.indexOf(input);

            firstColor = labelColor[0].innerText;
            secondColor = labelColor[1].innerText;

            labelColor[i].textContent = input.value;
            backgroundInputs[i].style.background = input.value;
            
            handleBackground(firstColor, secondColor, orientationDegre);
            adapteColor();
        })
    })
    
    
} changeInputsColor();


function adapteColor() {
    labelColor.forEach(label => {
        const hexColor = label.textContent.replace('#', '');

        const red = parseInt(hexColor.slice(0, 2), 16);
        const green = parseInt(hexColor.slice(2, 4), 16);
        const blue = parseInt(hexColor.slice(4, 5), 16);

        const yiq = (red * 299 + green * 587 + blue * 144) / 1000;

        if (yiq >= 128) {
            label.style.color = "#111";
        } else {
            label.style.color = "#f1f1f1";
        }
    })
}


const body = document.querySelector('body');
let gradientValue;

function handleBackground(firstColor, secondColor, orientation) {
    gradientValue = `linear-gradient(${orientation}deg, ${firstColor}, ${secondColor})`;
    
    body.style.background = gradientValue;

    console.log(gradientValue)
}

const copyBtn = document.querySelector('.copy_btn');
const toastCopy = document.querySelector('.toast_copy');

copyBtn.addEventListener('click', copyGradient);

function copyGradient() {
    navigator.clipboard.writeText(gradientValue);

    toastCopy.style.display = "block";

    setTimeout(() => {
        toastCopy.style.opacity = 1;
    }, 1);

    setTimeout(() => {
        toastCopy.style.opacity = 0;
    }, 3000);

    setTimeout(() => {
        toastCopy.style.display = "none";
    }, 3500)
}


const randomBtn = document.querySelector('.random_btn');

randomBtn.addEventListener('click', randomHexGenerator);

function randomHexGenerator() {
    const hexValue = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
    let firstHex = '#';
    let secondHex = '#';
    
    // Random Hex
    for (let i = 0; i < 6; i++) {
        const index = Math.floor(Math.random() * hexValue.length);
        firstHex += hexValue[index];
    }

    for (let i = 0; i < 6; i++) {
        const index = Math.floor(Math.random() * hexValue.length);
        secondHex += hexValue[index];
    }
    
    // Orientation
    let orientationDegres = Math.floor(Math.random() * 360);
    valueOrientationLabel.textContent = `${orientationDegres}`;
    rangeOrientation.value = orientationDegres;
    
    // Colors
    labelColor[0].textContent = firstHex;
    labelColor[1].textContent = secondHex;
    
    // Inputs colors
    backgroundInputs[0].style.background = `${firstHex}`;
    backgroundInputs[1].style.background = `${secondHex}`;

    inputsColor[0].value = firstHex;
    inputsColor[1].value = secondHex;
    
    // Background
    handleBackground(firstHex, secondHex, orientationDegres);
    
    // Adapte Labels Color
    adapteColor();
}
const valueOrientationLabel = document.querySelector('.orientation_value');
const rangeOrientation = document.querySelector('.range_gradient');

const inputsColor = Array.from(document.querySelectorAll('.input_color'));
const labelColor = Array.from(document.querySelectorAll('.label_color'));
const backgroundInputs = Array.from(document.querySelectorAll('.input_group'));



function changeInputsColor() {
    let orientationDegre = rangeOrientation.value;
    let firstColor = labelColor[0].innerText;
    let secondColor = labelColor[1].innerText;

    rangeOrientation.addEventListener('input', () => {
        valueOrientationLabel.textContent = rangeOrientation.value;
        orientationDegre = rangeOrientation.value;
        
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
}
changeInputsColor();


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
let gradientValue = body.style.background;
console.log(gradientValue)

/**
 * Fonction qui permet de changer le background du body
 * @param firstColor {String}
 * @param secondColor {String}
 * @param orientation {number}
 */
function handleBackground(firstColor, secondColor, orientation) {
    gradientValue = `linear-gradient(${orientation}deg, ${firstColor}, ${secondColor})`;
    
    body.style.background = gradientValue;
    
    return gradientValue;
}

const copyBtn = document.querySelector('.copy_btn');
const toastCopy = document.querySelector('.toast_copy');

copyBtn.addEventListener('click', copyGradient);

function copyGradient() {
    const styleBg = getComputedStyle(body);

    navigator.clipboard.writeText(styleBg.background);

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



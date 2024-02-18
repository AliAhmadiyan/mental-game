let i = 0;
let index = 0;
let rand = randomImg(0,4);
let score = 0;


function randomImg(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;

}

const arr = [];

function randomImg2(min,max) {
    let num = randomImg(0,4);
    let lastOne = arr[arr.length-1];
    let num2 = randomImg(0,4);
    arr.push(num2);
    if(num2 != lastOne){
        arr.push(num2)
        return num2;
    }
    if(lastOne > min && lastOne < max)
        return num;
    if(lastOne == min)
        return max
    if(lastOne == max)
        return min
}


const imagesArray = [];
const firstArrayImg = [];
const selectedImg = [];

for (let i = 1; i < 6; i++) {
    imagesArray.push(`images/${i}.jpg`);
}

function firstShow(i) {
    let slider = setInterval(function () {
        document.getElementById('start').className = 'd-none';
        let rand = randomImg2(0,4);
        $('#firstArrayImg').attr('src', `${imagesArray[rand]}`);
        firstArrayImg.push(`images/${rand + 1}.jpg`);
        i++;
        if (i >= 6) {
            document.getElementById('firstArrayImg').className = 'd-none';
            document.getElementById('imgContainer').className += 'd-flex';
            document.getElementById('imgSelection').className += 'd-flex';
            document.getElementById('compareButton').className += 'd-block';
            clearInterval(slider);
            document.getElementById('firstArrayImg').src =
             'images/vecteezy_picture-image-icon_22207263_382.png';
        }

    }, 500);

    document.getElementById('block0').src =
     'images/vecteezy_picture-image-icon_22207263_382.png';
    document.getElementById('block1').src =
     'images/vecteezy_picture-image-icon_22207263_382.png';
    document.getElementById('block2').src =
     'images/vecteezy_picture-image-icon_22207263_382.png';
    document.getElementById('block3').src =
     'images/vecteezy_picture-image-icon_22207263_382.png';
    document.getElementById('block4').src =
     'images/vecteezy_picture-image-icon_22207263_382.png';
    index = 0;
}

function imgSelected(number) {
    selectedImg.push(`images/${number}.jpg`);
    selectedImgShow('block' + index, index);
    index++;
    let selectedImgLength = selectedImg.length;
    if (selectedImgLength >= 5) {
        document.getElementById('imgSelection').className = 'd-none';
        document.getElementById('delButton').className =
         'btn btn-danger text-white mx-3 px-4 rounded-4 d-none';
    }
}

function selectedImgShow(id, number) {
    document.getElementById(id).src = selectedImg[number];
    document.getElementById(id).style.opacity = 1;
}

function selectedImgShowed() {
    for (let i = 0; i < 6; i++) {
        selectedImgShow(`'block${i}'`, i);
    }

}

function compare() {
    const firstArray = firstArrayImg.toString(firstArrayImg.pop());
    let gameArray = selectedImg.toString();
    if (firstArray === gameArray) {
        document.getElementById('modal').className += 'd-block bg-success';
        $('#modalText').html('آفرین برنده شدی');
        score++;
        $('#score').html(`امتیاز: ${score}`);
        selectedImg.length = 0;
        if(score%5 ==0){
            helpCount++;
            document.getElementById('helpButton').innerHTML = `کمک: ${helpCount}`
            }
    } else {
        document.getElementById('modal').className += 'd-block bg-danger';
        $('#modalText').html('...باختی که');
        document.getElementById('modalButton').className =
         'd-block mx-auto btn btn-warning';
        selectedImg.length = 0;
        score = 0;
        $('#score').html(`امتیاز: ${score}`);
    }
    document.getElementById('imgContainer').className = 'd-none';
    document.getElementById('imgSelection').className = 'd-none';
    document.getElementById('compareButton').className = 'd-none';
}

function continueGame() {
    document.getElementById('start').className = 'btn btn-info d-block mx-auto';
    document.getElementById('modal').className = 'd-none';
    document.getElementById('firstArrayImg').className = 'd-block mx-auto rounded-3 my-3';
    document.getElementById('imgContainer').className =
     'imgContainer d-flex justify-content-center d-none';
    document.getElementById('imgSelection').className =
     'imgSelection d-flex justify-content-center d-none';
    document.getElementById('compareButton').className =
     'btn btn-info d-none';
    document.getElementById('delButton').className +=
     'btn btn-danger text-white mx-3 px-4 rounded-4 d-block';
    selectedImg.length = 0;
    firstArrayImg.length = 0;
    gameArray = selectedImg;
    imgSelected(number);
    selectedImgShowed();
}

function deleteImg() {
    selectedImg.pop();
    if (index != 0)
        index--;
    let del = selectedImg.length;
    document.getElementById(`block${del}`).src =
     'images/vecteezy_picture-image-icon_22207263_382.png';
}

let helpCount = 1;
function help() {
    let helpBlock = selectedImg.length;
    if(helpCount > 0) {
        let help = firstArrayImg.slice(helpBlock,helpBlock+1);
        document.getElementById(`block${index}`).src = help;
        document.getElementById(`block${index}`).style.opacity = 0.5;
        helpCount--;
        document.getElementById('helpButton').innerHTML = `کمک: ${helpCount}`
    }
}
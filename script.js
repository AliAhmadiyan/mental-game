let i = 0;
let index = 0;
let rand = randomImg(0, 4);
let score = 0;
let heart = 3;

function randomImg(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const arr = [];

function randomImg2() {
  let num = randomImg(0, 4);
  let lastOne = arr[arr.length - 1];
  while (num === lastOne) {
    num = randomImg(0, 4);
    lastOne = arr[arr.length - 1];
  }
  arr.push(num);
  return num;
}

const imagesArray = [];
const firstArrayImg = [];
const selectedImg = [];

for (let i = 1; i < 6; i++) {
  imagesArray.push(`images/${i}.jpg`);
}

function firstShow(i) {
  let slider = setInterval(function () {
    document.getElementById("start").className = "d-none";
    let rand = randomImg2();
    $("#firstArrayImg").attr("src", `${imagesArray[rand]}`);
    firstArrayImg.push(`images/${rand + 1}.jpg`);
    i++;
    if (i >= 6) {
      document.getElementById("firstArrayImg").className = "d-none";
      document.getElementById("imgContainer").className += "d-flex";
      document.getElementById("imgSelection").className += "d-flex";
      document.getElementById("compareButton").className += "d-block";
      clearInterval(slider);
      document.getElementById("firstArrayImg").src =
        "images/vecteezy_picture-image-icon_22207263_382.png";
    }
  }, 500);

  document.getElementById("block0").src =
    "images/vecteezy_picture-image-icon_22207263_382.png";
  document.getElementById("block1").src =
    "images/vecteezy_picture-image-icon_22207263_382.png";
  document.getElementById("block2").src =
    "images/vecteezy_picture-image-icon_22207263_382.png";
  document.getElementById("block3").src =
    "images/vecteezy_picture-image-icon_22207263_382.png";
  document.getElementById("block4").src =
    "images/vecteezy_picture-image-icon_22207263_382.png";
  index = 0;
}

function imgSelected(number) {
  selectedImg.push(`images/${number}.jpg`);
  selectedImgShow("block" + index, index);
  index++;
  let selectedImgLength = selectedImg.length;
  if (selectedImgLength >= 5) {
    document.getElementById("imgSelection").className = "d-none";
    document.getElementById("delButton").className =
      "btn btn-danger text-white mx-3 px-4 rounded-4 d-none";
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
    document.getElementById("modal").className += "d-block bg-success";
    $("#modalText").html("آفرین برنده شدی");
    score++;
    $("#score").html(`امتیاز: ${score}`);
    selectedImg.length = 0;
    if (score % 5 == 0) {
      helpCount++;
      document.getElementById("helpButton").innerHTML = `کمک: ${helpCount}`;
    }
  } else {
    document.getElementById("modal").className += "d-block bg-danger";
    $("#modalText").html("...درست نبود که");
    document.getElementById("modalButton").className =
      "d-block mx-auto btn btn-warning";
    selectedImg.length = 0;
    heart--;
    heartNum();
    if (heart === 0) {
      score = 0;
      $("#score").html(`امتیاز: ${score}`);
      $("#modalText").html("...باختی که");
    }
  }
  document.getElementById("imgContainer").className = "d-none";
  document.getElementById("imgSelection").className = "d-none";
  document.getElementById("compareButton").className = "d-none";
}

function continueGame() {
  document.getElementById("start").className = "btn btn-info d-block mx-auto";
  document.getElementById("modal").className = "d-none";
  document.getElementById("firstArrayImg").className =
    "d-block mx-auto rounded-3 my-3";
  document.getElementById("imgContainer").className =
    "imgContainer d-flex justify-content-center d-none";
  document.getElementById("imgSelection").className =
    "imgSelection d-flex justify-content-center d-none";
  document.getElementById("compareButton").className = "btn btn-info d-none";
  document.getElementById("delButton").className +=
    "btn btn-danger text-white mx-3 px-4 rounded-4 d-block";
  selectedImg.length = 0;
  firstArrayImg.length = 0;
  gameArray = selectedImg;
  if (heart === 0) {
      reRedHearts();
  }
  imgSelected(number);
  selectedImgShowed();
}

function deleteImg() {
  selectedImg.pop();
  if (index != 0) index--;
  let del = selectedImg.length;
  document.getElementById(`block${del}`).src =
    "images/vecteezy_picture-image-icon_22207263_382.png";
}

let helpCount = 1;
function help() {
  let helpBlock = selectedImg.length;
  if (helpCount > 0) {
    let help = firstArrayImg.slice(helpBlock, helpBlock + 1);
    document.getElementById(`block${index}`).src = help;
    document.getElementById(`block${index}`).style.opacity = 0.5;
    helpCount--;
    document.getElementById("helpButton").innerHTML = `کمک: ${helpCount}`;
  }
}

let redHearts = document.getElementById("hearts");

function heartNum() {
  if (heart < 3) {
    redHearts.children[heart].innerHTML ='<path d="M8.867 14.41c13.308-9.322 4.79-16.563.064-13.824L7 3l1.5 4-2 3L8 15a38 38 0 0 0 .867-.59m-.303-1.01-.971-3.237 1.74-2.608a1 1 0 0 0 .103-.906l-1.3-3.468 1.45-1.813c1.861-.948 4.446.002 5.197 2.11.691 1.94-.055 5.521-6.219 9.922m-1.25 1.137a36 36 0 0 1-1.522-1.116C-5.077 4.97 1.842-1.472 6.454.293c.314.12.618.279.904.477L5.5 3 7 7l-1.5 3zm-2.3-3.06-.442-1.106a1 1 0 0 1 .034-.818l1.305-2.61L4.564 3.35a1 1 0 0 1 .168-.991l1.032-1.24c-1.688-.449-3.7.398-4.456 2.128-.711 1.627-.413 4.55 3.706 8.229Z"/>';
  }
}

function reRedHearts() {
    heart = 3;
  for (let h = 0; h < 3; h++) {
    redHearts.children[h].innerHTML ='<path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>';
  }
}

'esversion: 6';
const links = document.querySelectorAll('a');
let indexContainer;
const modalImg = document.querySelector('div#modal img');
const goBack = document.querySelector('div#modal button#go-back');
const goNext = document.querySelector('div#modal button#go-next');
const modalWindow = document.getElementById('modal');
const closeModal = document.getElementById('close');

for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function(e) {
        e.preventDefault();
        modalWindow.style.display = 'block';
        indexContainer = i;
        modalImg.src = this.href;
    });
}
document.addEventListener('keyup', modalKeys);
//modalWindow event listener doesn't work at first because it is not active context
closeModal.addEventListener('click', closeModalWindow);
goBack.addEventListener('click', prevImage);
goNext.addEventListener('click', nextImage);

function modalKeys(e) {
    e.preventDefault();
    console.log(e);
    switch (e.code) {
        case 'Escape':
            closeModalWindow();
            break;
        case 'ArrowLeft':
            prevImage();
            break;
        case 'ArrowRight':
            nextImage();
            break;
        default:
            return;
    }
}

function closeModalWindow(e) {
    modalWindow.style.display = 'none';
}

function nextImage(e) {
    if (indexContainer == links.length - 1) {
        modalImg.src = links[0].href;
        indexContainer = 0;
    } else {
        modalImg.src = links[indexContainer + 1].href;
        indexContainer++;
    }
}

function prevImage(e) {
    if (indexContainer === 0) {
        modalImg.src = links[links.length - 1].href;
        indexContainer = links.length - 1;
    } else {
        modalImg.src = links[indexContainer - 1].href;
        indexContainer--;
    }
}

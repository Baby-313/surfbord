const openButton = document.querySelector("#openOverlay");
const successModal = createModal();
const body = document.body;

openButton.addEventListener("click", e => {
  body.appendChild(successModal);
})

function createModal(content) {
  const overlayElement=document.createElement("div");
  overlayElement.classList.add("overlay");

  const template=document.querySelector("#overlayTemplate");
  overlayElement.innerHTML=template.innerHTML;
    overlayElement.addEventListener("click", e => {
    if (e.target === overlayElement) {
      closeElement.click();
    }
  })

  const closeElement = overlayElement.querySelector(".close");
  closeElement.addEventListener("click", e => {
    e.preventDefault();
    body.removeChild(overlayElement);
  })
  return overlayElement;
}
const leftbtn=document.querySelector("#left");
const rightbtn=document.querySelector("#right");
const items=document.querySelector("#list");
const computedStyle=getComputedStyle(list);
var offsetWidth = document.getElementById('slide').offsetWidth;
var offsetHeight = document.getElementById('slide').offsetHeight;
alert(`${offsetWidth} x ${offsetHeight}`);

let currentRight=0;

rightbtn.addEventListener("click",e=>{
    e.preventDefault();
    let currentRight=parseInt(computedStyle.right)

    if (currentRight<100) {
        items.style.right=`${currentRight+offsetWidth}px`;      
    }
});

leftbtn.addEventListener("click",e=>{
    e.preventDefault();
    let currentRight=parseInt(computedStyle.right)
    
    if (currentRight>0) {
        items.style.right=`${currentRight-offsetWidth}px`;      
    }
});

$(".click__info").click(function (e) {
	e.preventDefault();
	
	var menu = $(this).closest('.humans__list');
	
	if (false == $(this).next().is(':visible')) {
		menu.find('.human__info').removeClass('slide active');
		menu.find('.human__info').slideUp();
	}
	
	$(this).next().slideToggle();
	$(this).parent().addClass('slide');
});

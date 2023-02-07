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

let currentRight=0;

rightbtn.addEventListener("click",e=>{
    e.preventDefault();
    let currentRight=parseInt(computedStyle.right)

    if (currentRight<100) {
        items.style.right=`${currentRight+offsetWidth}px`;      
    }
    if (currentRight>100) {
      items.style.right=`${currentRight*0}px`;      
  }
});

leftbtn.addEventListener("click",e=>{
    e.preventDefault();
    let currentRight=parseInt(computedStyle.right)
    
    if (currentRight>0) {
        items.style.right=`${currentRight-offsetWidth}px`;      
    }
    if (currentRight<=0) {
      items.style.right=`${currentRight+offsetWidth}px`;      
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

const findBlockByAlias=alias=>{
  return $(".reviews__item").filter((ndx,item)=>{
    return $(item).attr("data-linked")==alias
  })
}
$(".avatar__link").click(function (e) {
	e.preventDefault();

  const $this=$(e.currentTarget);
  const terget=$this.attr("data-open");
  const itemToShow=findBlockByAlias(terget);
  const curItem=$this.closest(".avatar__item");

  itemToShow.addClass("active").siblings().removeClass("active");
  curItem.addClass("active").siblings().removeClass("active");
});

const validateFields=(form,fieldsArray)=>{

  fieldsArray.forEach(field=>{
    field.removeClass("input-error");
    if (field.val().trim()=="") {
      field.addClass("input-error");
    }
  });

  const errorFields=form.find(".input-error");
  
  return errorFields.length===0;
}

$('.form').submit(e=>{
  e.preventDefault();

  const form=$(e.currentTarget)
  const name=form.find("[name='name']");
  const phone=form.find("[name='phone']");
  const comment=form.find("[name='comment']");
  const to=form.find("[name='to']");

  const modal=$("#modal");
  const content=modal.find(".modal__content");

  modal.removeClass("error-modal");

  const isValid=validateFields(form,[name,phone,comment,to])
  
  if (isValid){
    const request=$.ajax({
      url:"https://webdev-api.loftschool.com/sendmail",
      method:"post",
      data:{
        name:name.val(),
        phone:phone.val(),
        comment:comment.val(),
        to:to.val(),
      },
    });

    request.done((data)=>{
      content.text(data.message)
    });

    request.fail(data=>{
      const message=("Сообщение не отправлено");
      content.text(message);
      modal.addClass("error-modal")
    });

    request.always(()=>{
      $.fancybox.open({
        src:"#modal",
        type:"inline"
      })
    });
  }

})
$(".app-close-modal").click(e=>{
e.preventDefault();
$.fancybox.close();
})
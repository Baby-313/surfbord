const openButton = document.querySelector("#openOverlay");
const successModal = createModal();
const body = document.body;

openButton.addEventListener("click", e => {
  body.appendChild(successModal);
  let pagePosition=window.scrollY;
  body.classList.add('disable-scroll');
  body.dataset.position =pagePosition;
  body.style.top=-pagePosition+'px';
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
    let pagePosition=parseInt(body.dataset.position,10);
    body.style.top='avto';
    body.classList.remove('disable-scroll');
    window.scroll({top:pagePosition,left:0});
    body.removeAttribute('data-position');
  })
  return overlayElement;
}
const leftbtn=document.querySelector("#left");
const rightbtn=document.querySelector("#right");
const items=document.querySelector("#list");
const computedStyle=getComputedStyle(list);
var offsetWidth = document.getElementById('goods').offsetWidth;
var offsetHeight = document.getElementById('goods').offsetHeight;

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
		menu.find('.human').removeClass('slide active');
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
      let pagePosition=window.scrollY;
      body.classList.add('disable-scroll');
      body.dataset.position =pagePosition;
      body.style.top=-innerHeight+'px';
    });
  }

})
$(".app-close-modal").click(e=>{
e.preventDefault();
$.fancybox.close();
let pagePosition=parseInt(body.dataset.position,10);
body.style.top='avto';
body.classList.remove('disable-scroll');
window.scroll({top:pagePosition,left:0});
body.removeAttribute('data-position');
});

const lines = document.querySelectorAll('.slide-acco__line');

for (let index = 0; index < lines.length; index++) {
  const element = lines[index]
  element.addEventListener('click', e => {
    e.preventDefault()
    if (e.target.classList.contains('slide-acco__content')) return
    
    const currentLine = e.target.closest('.slide-acco__line');
    
    for (let i = 0; i < lines.length; i++) {
      if (lines[i] !== currentLine)
      lines[i].classList.remove('slide-acco__line_active')
    } 
    
    if (currentLine.classList.contains('slide-acco__line_active')) {
      currentLine.classList.remove('slide-acco__line_active')
    } else {
      currentLine.classList.add('slide-acco__line_active')
    } 
    const closeElement = overlayElement.querySelector(".close-slide");
    closeElement.addEventListener("click", e => {
      e.preventDefault();
      body.removeChild(overlayElement);
    })
  });
};
let player;
const playerContainer = $(".player");

let eventsInit = () => {
  $(".player__start").click(e => {
    e.preventDefault();
  
    if (playerContainer.hasClass("paused")) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  });

  $(".player__playback").click(e => {
    const bar = $(e.currentTarget);
    const clickedPosition = e.originalEvent.layerX;
    
    const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
    const newPlaybackPositionSec =
      (player.getDuration() / 100) * newButtonPositionPercent;
    
    $(".player__playback-button").css({
      left: `${newButtonPositionPercent}%`
    });
    
    player.seekTo(newPlaybackPositionSec);
   });

   $(".player__splash").click(e => {
    player.playVideo();
  })
};

const formatTime=timeSec=>{
  const roundTime=Math.round(timeSec);

  const minutes=addZero(Math.floor(roundTime/60));
  const seconds=addZero(roundTime-minutes*60);

  function addZero(num) {
    return num<10?`0${num}`:num;
  }

  return `${minutes}:${seconds}`
}

const onPlayerReady =()=>{
  const durationSec=player.getDuration();
  $(".player__duration-estimate").text(formatTime(durationSec));

  if (typeof interval !== "undefined") {
    clearInterval(interval);
  }
 
  interval = setInterval(() => {
    const completedSec = player.getCurrentTime();
    const completedPercent=(completedSec/durationSec)*100;

    $(".player__playback-button").css({
      left:`${completedPercent}%`
    })
    $(".player__duration-completed").text(formatTime(completedSec));
  }, 1000);
}
const onPlayerStateChange = event => {
  /*
    -1 (воспроизведение видео не начато)
    0 (воспроизведение видео завершено)
    1 (воспроизведение)
    2 (пауза)
    3 (буферизация)
    5 (видео подают реплики).
  */
  switch (event.data) {
    case 1:
      playerContainer.addClass("active");
      playerContainer.addClass("paused");
      break;
  
    case 2:
      playerContainer.removeClass("active");
      playerContainer.removeClass("paused");
      break;
  }
};

function onYouTubeIframeAPIReady() {
  player = new YT.Player('yt-player', {
    height: '405',
    width: '660',
    videoId: 'ma67yOdMQfs',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    },
    playerVars: {
      controls: 0,
      disablekb: 1,
      showinfo: 0,
      rel: 0,
      autoplay: 0,
      modestbranding: 0
    }
  });
}
eventsInit();

let myMap;
const init = () => {
 myMap = new ymaps.Map("map", {
   center: [55.752004, 37.576133],
   zoom: 13,
   controls: [],
 });
 
 let coords = [
     [55.752044, 37.599649]
  ],
  myCollection = new ymaps.GeoObjectCollection({}, {
    draggable: false,
    iconLayout: 'default#image',
    iconImageHref: './img/map.svg',
    iconImageSize: [46, 57],
    iconImageOffset: [-35, -52]
  });
 
 for (let i = 0; i < coords.length; i++) {
   myCollection.add(new ymaps.Placemark(coords[i]));
 }
 
 myMap.geoObjects.add(myCollection);
 
 myMap.behaviors.disable('scrollZoom');
};
 
ymaps.ready(init);


const sections=$(".section");
const display=$(".maincontent")
const sidemenu=$(".fixed-menu");
const menuItems=sidemenu.find(".fixed-menu__item")

const mobileDetect= new MobileDetect(window.navigator.userAgent);
const isMobile=mobileDetect.mobile();

let inscroll=false;

sections.first().addClass("active");

const countSectionPosition=sectionEq=>{
  const position=sectionEq*-100;
  if (isNaN(position)) {
    console.error('передано неверное значение в countSectionPosition');
    return0;
  }
  return position;
}

const changeMenuThemeForSection=(sectionEq)=>{
  const currentsection=sections.eq(sectionEq);
  const menuTheme=currentsection.attr("data-sidemenu-theme");
  const activeClass="fixed-menu--shadowed"

  if (menuTheme=="black") {
    sidemenu.addClass(activeClass);
  } else {
    sidemenu.removeClass(activeClass);
  }
}

const resetActiveClassForItem=(items,itemEq,activeClass)=>{
  items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
}

const performTransition=sectionEq=>{
  if (inscroll) return;

  const transitionOver=1000;
  const mouseInertiaOver=300;

  inscroll=true;

  const position=countSectionPosition(sectionEq);

  changeMenuThemeForSection(sectionEq);

  display.css({
    transform:`translateY(${position}%)`
  });

  resetActiveClassForItem(sections,sectionEq,"active");

  setTimeout(() => {
    inscroll=false;
    resetActiveClassForItem(menuItems,sectionEq,"fixed-menu__item--active")
  }, transitionOver+mouseInertiaOver );
}

const viewportScroller=()=>{
  const activesection=sections.filter(".active");
  const nextsection=activesection.next();
  const prevsection=activesection.prev();

  return {
    next(){
      if (nextsection.length) {
        performTransition(nextsection.index());
      }
    },
    prev(){
      if (prevsection.length) {
        performTransition(prevsection.index());
      }
    }
  }
}

$(window).on("wheel",e=>{
  const deltaY=e.originalEvent.deltaY;
  const scroller=viewportScroller();
  if (deltaY>0) {
    scroller.next();
  }
  if (deltaY<0) {
    scroller.prev();
  }
})

$(".wraper").on("touchmove", e => e.preventDefault());

$("[data-scroll-to]").click(e=>{
  e.preventDefault();

  const $this=$(e.currentTarget);
  const target=$this.attr("data-scroll-to");
  const reqsection=$(`[data-section-id=${target}]`);

  performTransition(reqsection.index());
})

//https://github.com/mattbryson/TouchSwipe-Jquery-Plugin#bower
if (isMobile) {
  $("body").swipe( {
    swipe:function(event, direction, ) {
      const scroller=viewportScroller();
      let scrollDirection="";
  
      if (direction=="up") scrollDirection="next";
      if (direction=="down") scrollDirection="prev";
  
      scroller[scrollDirection]();
    }
  });
}
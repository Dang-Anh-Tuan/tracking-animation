let lastScrollTop = 0;
const DOWN = true
const UP = false

let directionScroll = 'down'

window.addEventListener('scroll', function () {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // down => true
    directionScroll = DOWN
  } else {
    // up => true
    directionScroll = UP
  }

  lastScrollTop = scrollTop;
});

function addTypeFlex(el, isActive) {
  const type = ['column', 'column-reverse']

  // true & true => 1
  // true & false => 0
  // false & true => 0
  // false & false => 1
  el.style.flexDirection = type[directionScroll ^ isActive]
}

window.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      if (entry.intersectionRatio > 0) {
        const parentElement = document.getElementById(`tracking-${id}`).parentElement
        const containerMaker = parentElement.querySelector('.container-maker')
        addTypeFlex(containerMaker, true)
        parentElement.classList.add('active')

        // check horizontal and vertical maker 
        console.log(containerMaker.getAttribute('name'));
        if(containerMaker.getAttribute('name') === 'sub-title') {
          const makerHTML = `
          <div class="marker-horizontal marker-horizontal-show"></div>
          <div class="marker-verticle marker-vertical-show"></div>
          `
          containerMaker.innerHTML = makerHTML
        }
      } else {
        const parentElement = document.getElementById(`tracking-${id}`).parentElement
        const containerMaker = parentElement.querySelector('.container-maker')
        addTypeFlex(containerMaker, false)
        parentElement.classList.remove('active')
        
        // check horizontal and vertical maker 
        if(containerMaker.getAttribute('name') === 'sub-title') {
          const makerHTML = `
          <div class="marker-horizontal marker-horizontal-hide"></div>
          <div class="marker-verticle marker-vertical-hide"></div>
          `
          containerMaker.innerHTML = makerHTML
        }
      }
    })
  })

  const sectionEls = document.querySelectorAll('section')
  sectionEls.forEach(section => observer.observe(section))
})
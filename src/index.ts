/**
 * load sass style files
 */
import 'normalize.css'
import './font-awesome/css/all.min.css'
import './index.scss'

let video_width = 1920
let video_height = 1080
let rat = video_width / video_height

var _header = document.querySelector('header')
var _title: HTMLElement | null = document.querySelector('#title')
var _title_space: HTMLElement | null = document.querySelector('#title-space')
var _caption_main_visual: HTMLElement | null = document.querySelector('#caption-main-visual')
var _main = document.querySelector('main')
var _h1s: HTMLElement | null = document.querySelector('#h1-heading')
var _container: HTMLElement | null = document.querySelector('div#container')
var _nav: HTMLElement | null = document.querySelector('section#navigation-bar')
var _video = document.querySelector('video')
var _navButton = document.querySelectorAll('.nav-scroll')

var _width = window.innerWidth
var _height = window.innerHeight

var scrollOffset = 0
var headerOffset = 0

var fixFlag = false

detectDisplay()

window.addEventListener('resize', () => {
  _width = window.innerWidth
  _height = window.innerHeight

  detectDisplay()
})

window.addEventListener('scroll', () => {
  if(_container!.getBoundingClientRect().top <= 0) {
    fixedNavBar()
  } else {
    relatedNavBar()
  }

  if(fixFlag == true || _title!.getBoundingClientRect().bottom > _title_space!.getBoundingClientRect().bottom) {
    fixFlag = true
    relatedTitle()
  } else {
    fixedTitle()
  }
})

function detectDisplay() {

  // horizontal wide
  if(_width > _height) {
    setHorizontalWideStyle()
  }
  // vertical wide 
  else {
    setVerticalWideStyle()
  }

}

function setHorizontalWideStyle () {
  _video!.setAttribute('poster', './assets/header.jpg')

  let top = (_width / video_width) * video_height

  _header!.style.height = ``
  _header!.style.overflow = ``
  _video!.style.transform = ``
  _video!.style.objectFit = `contain`
  _container!.style.top = `${top}px`
  _title!.style.height = `${_width / rat}px`
  _title_space!.style.height = `${_title!.clientHeight + _nav!.clientHeight}px`

  scrollOffset = 20

  headerOffset = _video!.clientHeight + _nav!.clientHeight + _caption_main_visual!.clientHeight
}

function setVerticalWideStyle () { 
  _video!.setAttribute('poster', './assets/header_sp.jpg')

  _header!.style.height = `${_width}px`
  _header!.style.overflow = `hidden`
  _video!.style.transform = `scale(1.96, 1.96) translate(0, ${19.7}%)`
  _video!.style.objectFit = ``
  _container!.style.top = `${_width}px`
  _title!.style.height = `${_width}px`
  _title_space!.style.height = `${_title!.clientHeight + _nav!.clientHeight}px`

  scrollOffset = 18

  headerOffset = _header!.clientHeight + _nav!.clientHeight + _caption_main_visual!.clientHeight
}

function fixedNavBar () {
  _nav!.style.position = 'fixed'
  _nav!.style.top = '0'
  _nav!.style.zIndex = '70'
  _main!.style.zIndex = '10'

//  _main!.style.paddingTop = `${headerOffset}px`
}
function relatedNavBar () {
  _nav!.style.position = 'absolute'
  _nav!.style.top = '0'
  _nav!.style.zIndex = ''

//  _main!.style.paddingTop = `${headerOffset}px`
}

function fixedTitle () {
  _title!.style.position = 'fixed'
  _title!.style.top = ``
}
function relatedTitle () {
  _title!.style.position = 'absolute'
  _title!.style.top = `${headerOffset}px`
}

for(let i = 0; i < _navButton.length; i++) {
  let elem = <HTMLElement>_navButton.item(i)
  elem.addEventListener('click', () => {
    scrollToSection(`${elem.getAttribute('value')}`)
  })
}

function scrollToSection (id: string) {
  let startPosition = window.scrollY
  let targetPosition = document.getElementById(id)!.getBoundingClientRect().top + 10

  for(let i = 0; i <= 100; i++) {
    setTimeout(() => {
      window.scrollTo(0, startPosition + (ease(i) * (targetPosition - scrollOffset)))
    }, i * 10)
  }
}

const ease = (x: number) => (Math.cos(x * Math.PI / 100) / 2 - 0.5) * -1
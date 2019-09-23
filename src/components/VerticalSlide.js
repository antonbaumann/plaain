import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Swiper from 'swiper'
import 'swiper/swiper.scss'
import './VerticalSlide.scss'

import Cover from './Cover'

class VerticalSlide extends Component {
  componentDidMount() {
    new Swiper(document.querySelector(`.VerticalSlide#${this.props.id} .swiper-container`), {
      direction: 'vertical',
      grabCursor: true,
      slidesPerView: 'auto',
      centeredSlides: true,
      autoHeight: true,
      effect: 'coverflow',
      coverflowEffect: {
        rotate: 0,
        stretch: 450,
        depth: 125,
        modifier: 1,
        slideShadows : false,
      }
    })
  }

  render() {
    return (
      <div className='VerticalSlide' id={this.props.id}>
        <div className='swiper-container'>
          <div className='swiper-wrapper'>
            {this.props.items.length ? this.props.items.map(item => {
              return (
                <div className='swiper-slide' key={item.id}>
                  <Link to={`/app${item.path}`}>
                    <Cover url={item.posterUrl || '/cover.png'} alt={item.name} width='100%' />
                  </Link>
                </div>
              )
            }) : (
              <div className='swiper-slide'>
                <h3>Nothing found.</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default VerticalSlide

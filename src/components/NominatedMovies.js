import React from 'react';
import { connect } from 'react-redux';
import '../App.css';
import { removeNominationThunk } from '../redux/app-redux';
import { Button } from './Button';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import 'swiper/swiper-bundle.css'

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

function NominatedMovies({ nominatedMovies, removeNomination }) {
  return (
    <div className="darkBackground">
      <h2 className="nominations-title">Nominated Movies</h2>
      <section className="nominations">
          <Swiper
            spaceBetween={10}
            slidesPerView={5}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            loop={true}
            speed={500}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
          >
          {nominatedMovies.map((movie) => {
            return (
              <SwiperSlide key={movie.imdbID}>
                <div className="swiper-slide">
                  <img src={movie.Poster} alt={movie.Title} />
                  <p>{movie.Title} ({movie.Year})</p>
                  <Button buttonStyle="btn--remove" onClick={() => removeNomination(movie.imdbID)}>Remove Nomination</Button>
                </div>
              </SwiperSlide>
            )
          })}
          </Swiper>
      </section>
    </div>
  );
}

const mapState = (state) => {
  return {
    nominatedMovies: state,
  };
};

const mapDispatch = (dispatch) => {
  return {
    removeNomination: (imdbId) => dispatch(removeNominationThunk(imdbId))
  };
};

export default connect(mapState, mapDispatch)(NominatedMovies);

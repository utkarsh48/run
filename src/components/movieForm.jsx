import React from 'react';
import Form from './common/Form';
import {getMovie, saveMovie} from '../services/fakeMovieService';
import {getGenres} from '../services/fakeGenreService';
import Joi from 'joi-browser';

class MovieForm extends Form {
  state = { 
    data:{
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    genres:[],
    errors:{}
   }

   schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().min(0).max(100).label("Number in stock"),
    dailyRentalRate: Joi.number().min(0).max(10).label("Daily rental rate"),
   }

  componentDidMount(){
    const genres = getGenres();
    this.setState({genres});

    const movieId = this.props.match.params.id;
    if(movieId === "new") return;

    const movie = getMovie(movieId);
    if(!movie) return this.props.history.replace("/not-found");

    this.setState({data: this.mapToViewModel(movie)});
  }

  mapToViewModel(movie){
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }

  doSubmit(){
    saveMovie(this.state.data);

    this.props.history.push("/movies");
  }

  render() { 
    return ( 
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderInput("numberInStock", "In Stock", "number")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}
 
export default MovieForm;
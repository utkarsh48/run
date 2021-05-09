import React, { Component } from "react";
import Pagination from "./common/pagination";
import MoviesTable from "./moviesTable";
import { paginate } from "../util/paginate";
import { getMovies } from "../services/fakeMovieService.js";
import { getGenres } from "../services/fakeGenreService.js";
import ListGroup from "./common/listGroup";
import _ from "lodash";
import { Link } from "react-router-dom";

export default class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		pageSize: 4,
		currentPage: 1,
		sortColumn: {path: "title", order: "asc"}
	}

	componentDidMount(){
		const genres = [{_id: "", name: "All Movies"},...getGenres()];

		this.setState({
			movies: getMovies(),
			genres
		});
	}

	handleDelete = movie => {
		const movies = this.state.movies.filter(m => m._id !== movie._id);
		this.setState({ movies });
	}

	handleLike = movie => {
		const movies = [...this.state.movies];
		const index = movies.indexOf(movie);
		movies[index] = { ...movies[index] };
		movies[index].liked = !movies[index].liked;
		this.setState({ movies });
	}

	handlePageChange = page => {
		this.setState({ currentPage: page });
	}

	handleGenreSelect = genre =>{
		this.setState({selectedItem: genre, currentPage: 1});
	}

	handleSort = sortColumn =>{
		this.setState({sortColumn});
	}

	getPageData=()=>{
		const { currentPage, selectedItem, pageSize, movies: allMovies, sortColumn } = this.state;

		const filtered = selectedItem && selectedItem._id
		? allMovies.filter(m=>m.genre._id===selectedItem._id) 
		: allMovies;
	
		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

		const movies = paginate(sorted, currentPage, pageSize);

		return {totalCount: filtered.length, data: movies}
	}

	render() {
		const { length: count } = this.state.movies;
		if (count === 0) return <p>There are no movies.</p>

		const { currentPage, selectedItem, pageSize, sortColumn } = this.state;


		const {totalCount, data: movies} = this.getPageData();

		return (
			<div className="row">
				<div className="col-3">
					<ListGroup 
					items={this.state.genres} 
					selectedItem={selectedItem} 
					onItemSelect={this.handleGenreSelect}/>
				</div>
				<div className="col">
					<Link to="/movies/new" className="btn btn-primary" style={{marginBottom: 20}}>
						New Movie
					</Link>
					<p>There are {totalCount} movies.</p>
					<MoviesTable 
						onDelete={this.handleDelete} 
						sortColumn={sortColumn}
						onLike={this.handleLike} 
						onSort={this.handleSort}
						movies={movies}/>
					<Pagination itemsCount={totalCount}
						pageSize={pageSize}
						currentPage={currentPage}
						onPageChange={this.handlePageChange}/>
				</div>
			</div>
		);
	}
}
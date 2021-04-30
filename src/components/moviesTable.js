import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./common/like";
import Table from "./common/table";

class MoviesTable extends Component {
	columns=[
		{path: "title", label: "Title", content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>},
		{path: "genre.name", label: "Genre"},
		{path: "dailyRentalRate", label: "Rate"},
		{path: "numberInStock", label: "Stock"},
		{key: "like", content: movie=>{
			return (<Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />);
		}},
		{key: "delete", content: movie=>{
			return (<button onClick={() => this.props.onDelete(movie)} className="btn btn-danger btn-sm">Delete</button>);
		}},
	]
	render(){
		const { movies, onSort, sortColumn } = this.props;

		return (
			<Table columns={this.columns} onSort={onSort} sortColumn={sortColumn} data={movies}/>
		);
	}
}

export default MoviesTable;
import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({sortColumn, onSort, columns, data: movies}) => {
	return (
		<table className="table">
			<TableHeader 
			sortColumn={sortColumn} 
			onSort={onSort} 
			columns={columns}/>
			<TableBody 
			data={movies} 
			columns={columns}/>
		</table>
	);
}

export default Table;
import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({pageSize, itemsCount, onPageChange, currentPage}) => {

	const pagesCount = Math.ceil(itemsCount / pageSize);

	const pages = _.range(1, pagesCount+1);

	if(pagesCount===1) return null;


	return (
		<nav>
			<ul className="pagination">
				{pages.map(page => (
					<li key={page} 
					className={currentPage===page?"page-item active":"page-item"}>
						<a className="page-link" 
						onClick={()=>onPageChange(page)}>
							{page}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
}

Pagination.propTypes = {
	pageSize: PropTypes.number.isRequired,
	itemsCount: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
	currentPage: PropTypes.number.isRequired
}

export default Pagination;
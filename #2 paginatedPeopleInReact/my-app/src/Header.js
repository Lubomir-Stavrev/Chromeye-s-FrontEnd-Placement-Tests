import "./App.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect, useState } from "react";

function Header({ pagesCount, changePerPage, onChangePage, onSearch }) {
	const [getPageCount, setPageCount] = useState(3);

	const [pageIndex, setPageIndex] = useState(1);

	useEffect(() => {
		setPageCount(pagesCount);
	}, [pagesCount]);

	function changePeopePerPage(e) {
		let count = e.target?.value;
		setPageIndex(1);

		if (count === "all") {
			changePerPage({ pageIndex: 1, getPeoplePerPage: 8, pageCount: 1 });
			return;
		}

		changePerPage({ pageIndex: 1, getPeoplePerPage: count });
	}
	function changePage(e) {
		let pageCount = e.target.innerHTML;
		setPageIndex(pageCount);
		onChangePage(pageCount);
	}
	function nextPage(e) {
		setPageIndex((prev) => Number(prev) + 1);
		onChangePage(pageIndex + 1);
	}
	function prevPage(e) {
		setPageIndex((prev) => Number(prev) - 1);
		onChangePage(pageIndex - 1);
	}

	function searchPeople(e) {
		e.preventDefault();
		let searchValue = e.target.value.toLowerCase();
		onSearch(searchValue);
	}
	return (
		<header>
			<div className="container">
				<div className="searchContainer">
					<input
						onChange={(e) => searchPeople(e)}
						placeholder="Enter Keyword"
						type="search"
					/>
				</div>
				<div className="rightItems">
					<div className="pages">
						{Array.from(Array(getPageCount)).map((x, i) => {
							if (i === pageIndex - 1) {
								return (
									<button
										style={{
											color: "#fff",
											backgroundColor: "#3f51b5"
										}}
										onClick={(e) => changePage(e)}
										key={i}
										type="">
										{i + 1}
									</button>
								);
							}
							return (
								<button
									onClick={(e) => changePage(e)}
									key={i}
									type="">
									{i + 1}
								</button>
							);
						})}
					</div>
					<div className="arrow">
						{pageIndex - 1 > 0 ? (
							<span onClick={(e) => prevPage(e)}>
								<ArrowBackIosIcon></ArrowBackIosIcon>
							</span>
						) : null}
						{pageIndex < getPageCount ? (
							<span onClick={(e) => nextPage(e)}>
								<ArrowForwardIosIcon></ArrowForwardIosIcon>
							</span>
						) : null}
					</div>
					<div className="perPageContainer">
						<div>
							<span>Per Page</span>
						</div>
						<select onChange={(e) => changePeopePerPage(e)}>
							<option value="1">--- 1 ---</option>
							<option selected value="3">
								--- 3 ---
							</option>
							<option value="5">--- 5 ---</option>
							<option value="all">--- All ---</option>
						</select>
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;

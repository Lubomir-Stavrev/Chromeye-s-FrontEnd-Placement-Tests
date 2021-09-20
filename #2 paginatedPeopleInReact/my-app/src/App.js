import "./App.css";
import { useEffect, useState } from "react";
import Header from "./Header.js";

import services from "./services";

function App() {
	const [getPeople, setPeople] = useState([]);
	const [getPageCount, setPageCount] = useState(3);
	const [getPeoplePerPage, setPeoplePerPage] = useState(3);
	const [pageIndex, setPageIndex] = useState(1);
	const [searchValue, setSearchValue] = useState(0);

	useEffect(() => {
		async function setData() {
			let people = await services();
			let sortedPeople = [];
			let currList = [];
			let counter = getPeoplePerPage;
			await people.forEach((p, index) => {
				if (
					p.firstName.toLowerCase().includes(searchValue) ||
					p.lastName.toLowerCase().includes(searchValue) ||
					!searchValue
				) {
					currList.push(p);
					counter--;
				}
				if (counter === 0 || index === people.length - 1) {
					sortedPeople.push(currList);
					currList = [];
					counter = getPeoplePerPage;
				}
			});
			setPeople(sortedPeople);
			setPageCount(sortedPeople.length);
		}
		setData();
	}, [getPeoplePerPage, searchValue]);

	function handleChangePeopePerPage(e) {
		setPageIndex((prev) => e.pageIndex);
		setPeoplePerPage((prev) => e.getPeoplePerPage);
		if (e.getPageCount) {
			setPageCount((prev) => e.getPageCount);
		}
	}

	function handleChangePage(count) {
		setPageIndex(count);
	}

	function handleSearch(search) {
		setSearchValue(search);
	}
	return (
		<div id="app">
			<Header
				pagesCount={getPageCount}
				changePerPage={(e) => handleChangePeopePerPage(e)}
				onChangePage={(e) => handleChangePage(e)}
				onSearch={(e) => handleSearch(e)}></Header>
			<main>
				{getPeople[pageIndex - 1]?.length > 0 ? (
					<table>
						<thead>
							<tr className="tableHeader">
								<th>Avatar</th>
								<th>ID</th>
								<th>First Name</th>
								<th>Last Name</th>
								<th>Email</th>
								<th>Compony</th>
								<th>Department</th>
								<th>Start Date</th>
							</tr>
						</thead>
						<tbody>
							{getPeople[pageIndex - 1]
								? getPeople[pageIndex - 1].map((p, index) => {
										return (
											<tr key={p.id}>
												<td>
													<img
														src={
															"http://apis.chromeye.com:9191" +
															p.avatar.url
														}
														alt=""
													/>
												</td>
												<td>{p.id}</td>
												<td>{p.firstName}</td>
												<td>{p.lastName}</td>
												<td>
													<a
														href={
															"mailto:" + p.email
														}
														target="_blank"
														rel="noreferrer">
														{p.email}
													</a>
												</td>
												<td>{p.company.name}</td>
												<td>{p.company.department}</td>
												<td>{p.company.startDate}</td>
											</tr>
										);
								  })
								: null}
						</tbody>
					</table>
				) : (
					<span>No matched people found</span>
				)}
			</main>
		</div>
	);
}

export default App;

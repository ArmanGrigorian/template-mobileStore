import "./SingleItem.scss";
import { useEffect } from "react";
import { LS, PATH } from "../../types/types";
import Magnifier from "../magnifier/Magnifier";
import { DownloadIcon, StarIcon } from "../svgs";
import { dataRevealer } from "../../utilities/index.ts";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addToCart, selectCurrentItem, singleItemFetch } from "../../redux/slices/productsSlice";

const SingleItem = () => {
	const currentItem = useAppSelector(selectCurrentItem);
	const dispatch = useAppDispatch();
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (id && Number(id) <= JSON.parse(localStorage.getItem(LS.ALL_ITEMS)!).length) {
			dispatch(singleItemFetch(id));
		} else navigate({ pathname: PATH.ERROR });
	}, [dispatch, id, navigate]);

	return (
		<div className={"SingleItem"}>
			<table>
				<caption>Specifications</caption>
				<tbody>
					<tr>
						<td rowSpan={8} className={"SingleItem__imgTd"}>
							<Magnifier src={currentItem.src} />
						</td>
						<th>Brand</th>
						<td>{currentItem.brand}</td>
					</tr>
					<tr>
						<th>Model</th>
						<td>{currentItem.model}</td>
					</tr>

					<tr>
						<th>Release date</th>
						<td>{dataRevealer(currentItem.release as number)}</td>
					</tr>

					<tr>
						<th>OS</th>
						<td>{currentItem.brand} OS</td>
					</tr>

					<tr>
						<th>CPU</th>
						<td>{currentItem.brand} CPU</td>
					</tr>

					<tr>
						<th>GPU</th>
						<td>{currentItem.brand} GPU</td>
					</tr>

					<tr>
						<th>RAM</th>
						<td>{currentItem.brand} RAM</td>
					</tr>

					<tr>
						<th>Storage</th>
						<td>128GB / 256GB / 512GB / 1TB</td>
					</tr>

					<tr>
						<td>
							{[...new Array(currentItem.rating)].map(() => {
								return <StarIcon key={crypto.randomUUID()} size={10} />;
							})}
						</td>
						<th>Rating</th>
						<td>{currentItem.rating} / 10</td>
					</tr>

					<tr>
						<td>
							<button type={"button"} onClick={() => dispatch(addToCart(currentItem))}>
								ADD TO CART
							</button>
							<button
								type={"button"}
								className="SingleItem__downloadButton"
								title={`download image of ${currentItem.model}`}>
								<a href={currentItem.src} download={`${currentItem.model}`}>
									<DownloadIcon size={18} />
								</a>
							</button>
						</td>
						<th>Price</th>
						<td>{currentItem.price}&#36;</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default SingleItem;

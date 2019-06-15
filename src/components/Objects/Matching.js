import React from 'react';
import axios from 'axios';


class Matching extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			matching_items_list: ''
		}

	}

	componentWillReceiveProps(item) {
		if (sessionStorage.getItem('userData') !== null) {
			var userData = JSON.parse(sessionStorage.getItem('userData'))
			if (userData.email === item.owner) {
				if (item.item.matching_items !== 'undefined') {
					Object.keys(item.item).map((key) => {
						var ids = item.item[key].itemId
						axios.post('https://lost-and-share.herokuapp.com/items/getItemById', { id: ids })
							.then((data) => {
								this.setState({ matching_items_list: [...this.state.matching_items_list, data.data] })
							})
							.catch(function (error) {
								if (error.response) {
									console.log(error.response.headers);
								}
								else if (error.request) {
									console.log(error.request);
								}
								else {
									console.log(error.message);
								}
								console.log(error.config);
							});
						return;

					})

				} else {
					this.setState({ matching_items_list: '' })
				}
			}
			else {

			}

		}

	}




	render() {
		if (this.state.matching_items_list.length > 0) {
			console.log(this.state.matching_items_list.length)
			return (
				<div className="item_matching"  >
					{
						Object.keys(this.state.matching_items_list).map((key) => {
							var item = this.state.matching_items_list[key]
							return (

								<a className="match_item" href={'../item/' + item._id}>
									<img alt="pic" className="match_item_img" src={item.picpath} />

									<p className="match_item_title">{item.title}</p>
									<p className="match_item_description" >{item.desc}</p>
								</a>
							)
						})
					}
				</div>
			);
		} else {
			return (
				<span>There is no matching item for this yet!</span>
			)
		}
	}
}
export default Matching;


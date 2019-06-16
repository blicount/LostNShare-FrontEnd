import React from 'react';
//import axios from 'axios';
import { withRouter } from 'react-router-dom';
//import {Redirect} from 'react-router-dom';
//import "../../../../css/report.css";
import "../../../../css/bootstrap.min.css"
import axios from 'axios';

//import LoginPage from '../Pages/LoginPage';

class UpdateItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            file: '',
            image: '',
            item_state: 'lost',
            item_type: 'lost',
            location: [],
            location_selected: 'none',
            location:[],
            imagePreviewUrl: '',
            selected_category: '',
            selected_sub_category: '',
            sub_category: [],
            category: [],
            selected_item_id: '',
            shape_selected: 'none',
            color_selected: 'none',
            shape: [],
            color: []


        };
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeSubCategory = this.onChangeSubCategory.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onChangeShape = this.onChangeShape.bind(this);
        this.onChangeColor = this.onChangeColor.bind(this);
    }


    componentWillMount() {

        axios.get('https://lost-and-share.herokuapp.com/Categories/getAllCategories')
            .then((data) => {
                this.setState({ category: data.data, selected_category: data.data[0]._id })
                axios.post('https://lost-and-share.herokuapp.com/subcategories/getAllSubCategoryByCategory', { category: data.data[0].name })
                    .then((data) => {
                        console.log(data);

                        this.setState({
                            sub_category: data.data.subcategorylist,
                            selected_sub_category: data.data.subcategorylist[0]
                        })
                        data.data.subcategorylist.map((sub_cat, i) => {
                            var op = document.createElement("option");
                            var textnode = document.createTextNode(sub_cat);
                            op.className = 'sub_category';
                            op.key = i;
                            op.appendChild(textnode);
                            document.getElementById('subCategory').appendChild(op);
                            return (null);
                        })
                    }).catch((error) => (console.log(error)));
            });
        axios.get('https://lost-and-share.herokuapp.com/Locations/getAllLocatoins')
            .then((data) => {
                this.setState({ location: data.data })
            }
            ).catch((error) => (console.log(error)))

        axios.get('https://lost-and-share.herokuapp.com/shapes/getAllShapes')
            .then((data) => {
                console.log(data)
                this.setState({ shape: data.data })
            }
            ).catch(err => console.log(err))

        axios.get('https://lost-and-share.herokuapp.com/colors/getAllColors')
            .then((data) => {
                this.setState({ color: data.data })
                console.log(data)
            }
            ).catch(err => console.log(err))
        window.addEventListener('scroll', this.listenScrollEvent);


    }

    componentWillReceiveProps(p) {
        console.log(p.item)
        if (p.item !== null) {
            this.setState({
                selected_item_id: p.item._id,
                title: p.item.title ? p.item.title : '',
                description: p.item.desc ? p.item.desc : '',
                item_state: p.item.itemstate,
                item_type: p.item.itemtype,
                location_selected: p.item.location ,
                imagePreviewUrl: p.item.picpath ? p.item.picpath : '',
                shape_selected :p.item.shape,
                color_selected: p.item.color
            })

        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.listenScrollEvent);
    }


    listenScrollEvent() {
        document.getElementsByClassName("update_item")[0].style.top = (window.scrollY) + 'px';
    }

    onChangeCategory(e) {
        var index = e.target.selectedIndex
        document.getElementById('subCategory').innerHTML = '';
        this.setState({ selected_category: this.state.category[index].name })
        axios.post('https://lost-and-share.herokuapp.com/subcategories/getAllSubCategoryByCategory', { category: this.state.category[index].name })
            .then((data) => {
                //console.log(data.data)
                this.setState({
                    sub_category: data.data.subcategorylist,
                    selected_sub_category: data.data.subcategorylist[0]
                })
                data.data.subcategorylist.map((sub_cat, i) => {
                    var op = document.createElement("option");
                    var textnode = document.createTextNode(sub_cat);
                    op.className = 'sub_category';
                    op.key = i;
                    op.appendChild(textnode);
                    document.getElementById('subCategory').appendChild(op);
                    return (null);
                })
            }).catch((error) => (console.log(error)));

    }

    onChangeSubCategory(e) {
        var index = e.target.selectedIndex;
        var selectedSubCategory = this.state.sub_category[index];
        this.setState({ selected_sub_category: selectedSubCategory });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    fileSelectedHandler(e) {
        e.preventDefault();
        if (!e.target.files[0].type.match(/image.*/)) {
            //console.log("this is not an image");
            return;
        };
        const fd = new FormData();
        console.log(e.target.files[0])
        console.log(e.target.files[0].name)

        fd.append('image', e.target.files[0], e.target.files[0].name)
        this.setState({ image: e.target.files[0] })

        console.log(fd);
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }

    
    onChangeLocation(e) {
        console.log(e.target.value)
        this.setState({ location_selected: e.target.value })
    }

    onChangeShape(e) {
        console.log(e.target.value)
        this.setState({ shape_selected: e.target.value })
    }

    onChangeColor(e) {
        console.log(e.target.value)
        this.setState({ color_selected: e.target.value })
    }


    onSubmit(e) {
        e.preventDefault();
        const fd = new FormData();
        fd.append('ItemImage', this.state.image, 'plaeholder')
        fd.append("id", this.state.selected_item_id)
        fd.append("state", this.state.item_state)
        fd.append("type", this.state.item_type)
        fd.append("title", this.state.title)
        fd.append("category", this.state.selected_category)
        fd.append("subcategory", this.state.selected_sub_category)
        fd.append("location", this.state.location_selected)
        fd.append("desc", this.state.description)
        fd.append("shape", this.state.shape_selected)
        fd.append("color", this.state.color_selected)
        fd.append("location", this.state.location_selected)

        this.props.userUpdateRequest(fd).then(
            ({ data }) => {
                //window.location.reload();
                console.log(data);
                this.props.hideUpdateForm();
            }
        ).catch((error) => {
            console.log(error);
        });
    }



    render() {



        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img alt="pic" src={imagePreviewUrl} />);
        } else {
            $imagePreview = ('');
        }
        return (
            <div className="update_item">
                <div className="row mt-5 row-report">
                    <div className="col-md-6 m-auto">
                        <div className="card card-body report-card">
                            <h3>Item Information</h3>
                            <button onClick={this.props.hideUpdateForm} className="btn btn-primary exit">
                                X
                            </button>
                            <form onSubmit={this.onSubmit} encType="multipart/form-data">
                                <div className="form-group">
                                    <label htmlFor="title">Tilte</label>
                                    <input
                                        value={this.state.title}
                                        onChange={this.onChange}
                                        type="title"
                                        id="title"
                                        name="title"
                                        required
                                        className="form-control form-control-report"
                                        placeholder="Enter Item Title"

                                    ></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <input
                                        value={this.state.description}
                                        onChange={this.onChange}
                                        type="description"
                                        id="description"
                                        name="description"
                                        required
                                        className="form-control form-control-report"
                                        placeholder={this.props.item ? this.props.item.description : ''}

                                    ></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="type">Item type:</label>
                                    <input type="radio"
                                        checked={this.state.item_type === 'lost' || this.state.item_type === 'Lost'}
                                        value="lost"
                                        onChange={this.onChange}
                                        name="item_type"
                                        className="radio"

                                    /> lost
                            <input type="radio"
                                        checked={this.state.item_type === 'found' || this.state.item_type === 'Found'}
                                        value="found"
                                        onChange={this.onChange}
                                        name="item_type"
                                        className="radio"

                                    /> found
                                </div>
                                <div className="form-group upload_photo ">
                                    <label htmlFor="file-upload" className="custom-file-upload">
                                        <i className="fa fa-cloud-upload"></i> Upload Photo
                                    </label>
                                    <input id="file-upload" type="file" onChange={this.fileSelectedHandler} />
                                    <div className="imgPreview">{$imagePreview}</div>
                                    <div className="form-group ">
                                        <label id="shape_select_label" className="shape" htmlFor="shape">Shape</label>
                                        <select required id="shape_select" className="form-control" onChange={this.onChangeShape}>
                                            {
                                                this.state.shape.map((shp, i) => {
                                                    return (
                                                        <option className="shape" key={i}>{shp.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label id="color_select_label" className="select" htmlFor="color" >Color</label>
                                        <select required id="shape_color" className="form-control" onChange={this.onChangeColor}>
                                            {
                                                this.state.color.map((col, i) => {
                                                    return (
                                                        <option className="color" key={i}>{col.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="state">Item State:</label>
                                    <input type="radio"
                                        checked={this.state.item_state === 'passive' || this.state.item_state === 'Passive'}
                                        value="passive"
                                        onChange={this.onChange}
                                        name="item_state"
                                        className="radio"

                                    /> passive
                                     <input type="radio"
                                        checked={this.state.item_state === 'active' || this.state.item_state === 'Active'}
                                        value="active"
                                        onChange={this.onChange}
                                        name="item_state"
                                        className="radio"

                                    /> active
                                </div>
                                <div className="form-group">
                                    <label id="category_select" className="select" htmlFor="catagory">Catagory</label>
                                    <select required className="form-control-report form-control" onChange={this.onChangeCategory}>
                                        {
                                            this.state.category.map((cat, i) => {
                                                return (
                                                    <option className="category" key={i}>{cat.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <label id="sub_category_select" className="select" htmlFor="subcatagory">Sub Catagory</label>
                                    <select required id="subCategory" className="form-control-report form-control"
                                        onChange={this.onChangeSubCategory}>
                                    </select>
                                    <label id="location_select" className="select" htmlFor="location">Location</label>
                                    <select required id="location" className="form-control-report form-control" onChange={this.onChangeLocation}>
                                        {
                                            this.state.location.map((loc, i) => {
                                                return (
                                                    <option className="location" key={i}>{loc.name}</option>
                                                )
                                            })
                                        }
                                    </select>

                                </div>
                                <button type="submit" className="btn btn-primary btn-block">
                                    Update
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}






export default withRouter(UpdateItem);

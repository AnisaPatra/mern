import React, { Component } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import Layout from '../../components/Layout';
import SideNavigation from '../../components/sideNavigation';
import axios from 'axios';
import './index.css';
import { MDBIcon, MDBInput } from 'mdbreact';
import { Link } from 'react-router-dom';
import $ from 'jquery';

/**
* @author
* @function AddProducts
**/

export default class AddProducts extends Component {
 
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            brand:null,
            description:null,
            m_c:"Keep Dry",
            price:null,
            moq:null,
            ProductImages: [],
            parentCategory: "Food",
            sub_category: "Personal Care",
            parents: [],
            sub:[],
            result:[]
        };

        this.onChangehandle = this.onChangehandle.bind(this);
        this.onChangeProductImages = this.onChangeProductImages.bind(this);
        this.onChangeparentCategory = this.onChangeparentCategory.bind(this);
        this.onChangesubCategory = this.onChangesubCategory.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    onChangehandle(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onChangeProductImages(e) {
        var fileName = e.target.files[0].name;
        $('.custom-file-label').html(fileName)
        this.state.ProductImages.push(e.target.files);
        this.state.ProductImages = this.state.ProductImages[0]
        console.log(this.state.ProductImages[0][0]);
    }

    

    onChangeparentCategory(e) {
        this.setState({
            parentCategory: e.target.value
        })
    }

    onChangesubCategory(e){
        this.setState({
            sub_category:e.target.value
        })
    }
    componentDidMount() {
        axios.get('http://localhost:2000/api/category/parentCategory')
            .then(response => {
                this.setState({ parents: response.data.map(parent => parent.name) })
                return axios.get('http://localhost:2000/api/category/subcategory')
            })
            .then(response=>{
                this.setState({sub: response.data.map(subcat =>subcat.name)})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    onSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", this.state.name);
        formData.append("brand",this.state.brand);
        formData.append("price",this.state.price);
        formData.append("quantity",this.state.moq);
        formData.append("description",this.state.description);
        formData.append("parent_category",this.state.parentCategory);
        formData.append("sub_category",this.state.sub_category);
        formData.append("m_c",this.state.m_c);
        for (let pic of this.state.ProductImages) {
            formData.append("productPicture", pic);
          }
        axios.post('http://localhost:2000/api/product/create', formData,
            {
                headers: {
                    'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                }
            })
            .then(
                response => {
                    this.setState({ result: response.data });
                }
            );

        window.alert("Product Created Successfully");
        this.setState({
            name: "",
            brand: "",
            price: "",
            moq: "",
            description: "",
            parentCategory: "Food",
            sub_category: "Personal Care",
            m_c : "Keep Dry",
            ProductImages:[]
        })
    }

    render() {

        return (

            <div>
                <Layout></Layout>
                <div className="flexible-content">
                    <SideNavigation />
                    <main id="content" className="p-5" >
                        <Container style={{ backgroundColor: "white" }}>
                            <br /><br />
                            <label class="filter">Add Product: &nbsp;&nbsp; </label>
                            <br /><br /><br />
                            <div>
                                <form onSubmit={this.onSubmit}>
                                
                                    <table cellPadding="20" cellSpacing="25" style={{ float: "left", marginTop: '30px' }}>
                                        <tbody class="tbody">
                                            <tr>
                                                <td>
                                                    <label>Name: </label>
                                                </td>
                                                <td>
                                                    <MDBInput type="text"
                                                        required
                                                        maxlength="200"
                                                        minlength="3"
                                                        style={{ width: "250px" }}
                                                        value={this.state.name}
                                                        onChange={this.onChangehandle}
                                                        name="name"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label>Brand: </label>
                                                </td>
                                                <td>
                                                    <MDBInput type="text"
                                                        required
                                                        maxlength="200"
                                                        minlength="2"
                                                        style={{ width: "250px" }}
                                                        value={this.state.brand}
                                                        onChange={this.onChangehandle}
                                                        name="brand"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label>Product Images: </label>
                                                </td>
                                                <td>
                                                    <div className="custom-file">
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            className="custom-file-input"
                                                            aria-describedby="inputGroupFileAddon01"
                                                            required
                                                            onChange={this.onChangeProductImages}
                                                            style={{ width: "250px" }}
                                                            multiple
                                                        />
                                                        <label className="custom-file-label" htmlFor="inputGroupFile01">
                                                            Choose file</label>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label>Price: </label>
                                                </td>
                                                <td>
                                                    <MDBInput type="text"
                                                        required
                                                        min = "1"
                                                        maxlength="50"
                                                        minlength="1"
                                                        style={{ width: "250px" }}
                                                        value={this.state.price}
                                                        onChange={this.onChangehandle}
                                                        name="price"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label>Minimum Quantity: </label>
                                                </td>
                                                <td>
                                                    <MDBInput type="text"
                                                        required
                                                        min="1"
                                                        maxlength="10"
                                                        minlength="1"
                                                        style={{ width: "250px" }}
                                                        value={this.state.moq}
                                                        onChange={this.onChangehandle}
                                                        name="moq"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                        <td>
                                                            <label>Parent Category: </label>
                                                        </td>
                                                        <td>
                                                            <select ref="userInput"
                                                                style={{ width: "250px" }}
                                                                required
                                                                maxlength="40"
                                                                minlength="3"
                                                                className="form-control"
                                                                value={this.state.parentCategory}
                                                                onChange={this.onChangeparentCategory}>
                                                                {
                                                                    this.state.parents.map(function (parent) {
                                                                        return <option
                                                                            key={parent}
                                                                            value={parent}>{parent}
                                                                        </option>;
                                                                    })
                                                                }
                                                            </select>
                                                        </td>
                                                    </tr>      
                                                    <tr>
                                                        <td>
                                                            <label>Sub Category: </label>
                                                        </td>
                                                        <td>
                                                            <select ref="userInput"
                                                                style={{ width: "250px" }}
                                                                required
                                                                maxlength="40"
                                                                minlength="3"
                                                                className="form-control"
                                                                value={this.state.sub_category}
                                                                onChange={this.onChangesubCategory}>
                                                                {
                                                                    this.state.sub.map(function (subcat) {
                                                                        return <option
                                                                            key={subcat}
                                                                            value={subcat}>{subcat}
                                                                        </option>;
                                                                    })
                                                                }
                                                            </select>
                                                        </td>
                                                    </tr> 
                                                    <tr>
                                                <td>
                                                    <label>Material and Care: </label>
                                                </td>
                                                <td>
                                                    <MDBInput type="text"
                                                        required
                                                        maxlength="200"
                                                        minlength="3"
                                                        style={{ width: "250px" }}
                                                        value={this.state.m_c}
                                                        onChange={this.onChangehandle}
                                                        name="m_c"
                                                    />
                                                </td>
                                            </tr>     
                                            <tr>
                                                <td>
                                                    <label>Description: </label>
                                                </td>
                                                <td>
                                                    <MDBInput type="text"
                                                        required
                                                        maxlength="5000"
                                                        minlength="3"
                                                        style={{ width: "250px" }}
                                                        value={this.state.description}
                                                        onChange={this.onChangehandle}
                                                        name="description"
                                                    />
                                                </td>
                                            </tr>
                                                    
                                            <br /><br />
                                            <tr>
                                                <td>
                                                    <Link to="/products"><Button variant="outline-secondary" class="btn">Back</Button></Link>
                                                </td>
                                                <td>
                                                    <Button type="submit" variant="outline-success" class="btn">Add</Button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </form>
                            </div>
                            <br />
                        </Container>
                    </main>
                </div>
            </div>
        )
    }


}

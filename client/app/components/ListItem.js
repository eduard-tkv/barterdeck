import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { checkLength, convertToCamelcase } from './Helpers';

import '../../build/assets/css/style.css';

class ListItem extends Component{
  constructor(props){
    super(props);

    this.onChange = this.onChange.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(e){
    e.preventDefault();
    let form = this.props.listItem.form;
      this.props.listItemSubmit(
        form.itemOffered,
        form.itemSought, 
        form.sellFor,
        form.description,
        form.image
      );
  }

  handleUserInput(e){
    //e.preventDefault();
    //alert(`haha`);
    const name = convertToCamelcase(e.target.name);
    const value = e.target.value;
    //console.log(`inside handleUserInput, name and value below`);
    //console.log(`${name} : ${value}`);
    this.props.listItemFormValues(name, value);
  }

  onChange(e) {
    console.log(`inside onchange attach image and size below`);
    console.log(e.target.files[0].size);
    this.props.listItemAttachImage(e.target.files[0]);
  }

  /*
  fileUpload(file){
    const url = 'http://example.com/file-upload';
    const formData = new FormData();
    formData.append('file',file)
    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
    }
    return  post(url, formData,config)
  }
  */
  render(){
    console.log(`inside render listItem, props below`);
    console.log(this.props.listItem);
    return(
    <div className="container">

        <div className="mt-5">
        </div>

        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <div className="header-content text-center">
              <h2>List Your Item</h2>
          </div>
          </div>
      </div>

      <div className="row">
          <div className="col-md-7">
              <div className="form-block">
                <h2>Item Details</h2>
                <div className="form login-form">
                  <form className="form-horizontal" id="list-item" onSubmit={ this.submitForm }>
                    <div className="form-group">
                      <label className="control-label" htmlFor="item-offered">Item Offered:</label>
                      <div>
                        <input type="text" className="form-control" name="item-offered" 
                        value={this.props.listItem.form.itemOffered}
                        onChange={this.handleUserInput}/>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="control-label" htmlFor="item-sought">Item Sought:</label>
                      <div>          
                        <input type="text" className="form-control" name="item-sought" 
                        value={this.props.listItem.form.itemSought}
                        onChange={this.handleUserInput}/>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="control-label" htmlFor="sell-for">Or Sell For:</label>
                      <div>          
                        <input type="text" className="form-control" name="sell-for" 
                        value={this.props.listItem.form.sellFor}
                        onChange={this.handleUserInput}/>
                      </div>
                    </div>   
                    <div className="form-group">
                      <label htmlFor="description">Description:</label>
                      <textarea className="form-control" rows="10" name="description"
                        value={this.props.listItem.form.description}
                        onChange={this.handleUserInput}/>
                    </div>
                    <div className="form-group">
                      <label className="control-label" htmlFor="image">Attach Image</label>
                      <div>          
                      <input type="file" id="image" onChange={ this.onChange } placeholder="browse..." name="image" />
                      </div>
                    </div>                                      
                    <div className="form-group">        
                      <div className="text-center">
                        <button type="submit" className="btn btn-default">Submit</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
          </div>
          <div className="col-md-5">
              <div className="form-block">
                  <h2>Attach Image</h2>
                  <div className="form login-form">
                  <form>
                      <div className="form-group">
                          <input type="file" id="image" placeholder="browse..." name="image" />
                      </div>
                  </form>
                  </div>
              </div>
          </div>
      </div>
      </div> 
    )
  }
}

export default ListItem;
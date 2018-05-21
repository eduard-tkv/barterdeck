import React, { Component } from 'react';
import { incrementCount, postObject } from '../actions/index';
//import 'babel-polyfill';

import { Route, Link } from 'react-router-dom';
import Loader from './Loader';
import Header from './Header';

import '../../build/assets/css/app.css';

export default class Home extends Component {
  constructor(props) {
    super(props);
    console.log(`inside home component and props below`);
    console.log(props);
    props.handleInitialState();
  }

  componentDidMount(){
    console.log(`home comp i did mount and props below`);

    console.log(this.props);
  }
  
  render(){
    // If isFetching is false then the data from the server has been loaded
    if(!this.props.isFetching){
      var tempArr = [];
      var list28new = [];
      var list28 = this.props.listings28;

      /* Iterate over retrieved listings and push them into a temp array
       * 4 listings at a time. 
       */
      for(var j=4; j<=list28.length; j+=4){
        //console.log(`inside first FOR`);
        for(var i=(j-4); i<j; i++){
          tempArr.push(
            <div key={i} className="col-sm-3 mt-2">
              <div className="card text-center">
                <div className="card-header">{list28[i].item_listed}</div>
                <div className="card-body">
                  <h4 className="card-title"></h4>
                </div>
                <a href="listgear.com/powertools">
                  <img className="img-fluid" src="./assets/img/thumb_sample.jpg"/>
                </a>
                <p className="card-text">${list28[i].sell_for}</p>
                <div className="card-body">
                  <div className="card-footer">{list28[i].item_desired}</div>
                </div>
              </div>
            </div>
          );

          //console.log(`j is ${j}`);
          //console.log(`i is ${i}`);

          // Take 4 listings generated above and envelope them in 'row' classname
          // and then push them into the final array (list28new) so we have rows with 4 columns. 
          // Then reset the tempArray
          if(i==(j-1)){
            //console.log(`below is tempArr`);
            //console.log(tempArr);
            list28new.push(
              <div key={j} className="row">
                { tempArr }
              </div>
            );
            tempArr = [];
          }
          
        }

        // In case there is an uneven number of listings available and the last
        // row is less than 4 listings, we use a different logic to push the leftover
        // listings into the final array
        if((j+list28.length%4) == list28.length){
          //{console.log(`inside first IF`)}
          if(list28.length%4 !== 0){
            //{console.log(`inside second IF`)}
            var leftOvers = list28.length%4;
            for(var r=0; r<leftOvers; r++){
              //{console.log(`inside for`);}
              tempArr.push(
                <div key={r} className="col-sm-3 mt-2">
                  <div className="card text-center">
                    {/*console.log(list28.length-(leftOvers - r))*/}
                    {/*console.log(list28[list28.length-(leftOvers - r)])*/}
                    <div className="card-header">{list28[list28.length-(leftOvers - r)].item_listed}</div>
                    <div className="card-body">
                      <h4 className="card-title"></h4>
                    </div>
                    <a href="listgear.com/powertools">
                      <img className="img-fluid" src="./assets/img/thumb_sample.jpg"/>
                    </a>
                    <p className="card-text">${list28[list28.length-(leftOvers - r)].sell_for}</p>
                    <div className="card-body">
                      <div className="card-footer">{list28[list28.length-(leftOvers - r)].item_desired}</div>
                    </div>
                  </div>
                </div>
              );
              
              //console.log(`r is ${r}`);
              //console.log(`leftovers is ${leftOvers}`);
  
              if(r == (leftOvers-1)){
                //console.log(`inside last push`);
                list28new.push(
                  <div key={r} className="row">
                    { tempArr }
                  </div>
                );
                tempArr = [];
              }
  
            }
          }
        }        


      }

    }

    return (
      <div>
    <Header loggedIn = { this.props.user.loggedIn } />
    <div className="container">
      <div className="jumbotron mt-5">
        <p className="lead">Trade unwanted stuff for something you need or sell it</p>
        <p>
          <Link to="/login" className="btn btn-success" href="#" role="button">Sign up</Link>&nbsp;
          <Link to="/login" className="btn btn-secondary" href="#" role="button">Log in</Link>
        </p>
      </div>

      <div>
        { console.log(`inside return home, this.props.isFetching: ${this.props.isFetching}`) }
          { this.props.isFetching ? <Loader /> : <div>{ list28new }</div>  }
      </div>
      <div>
        <a href="#" id="pagePrev">{'<<'}</a>
        <a id="page1" onClick={this.props.getPage}>Page 1</a> | 
        <a id="page2">Page 2</a> | 
        <a href="#" id="page3">Page 3</a>
        <a href="#" id="pageNext">{'>>'}</a>
      </div>
      <div>          
        <input type="text" id="autocomplete" className="form-control" placeholder="start typing your city" name="set-location" />
      </div>
    </div>
    </div>
  
    )
  }
}
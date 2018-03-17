import React from 'react';
import Pagination from './Pagination';

import '../../build/assets/css/app.css';

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        props.handleInitialState();

        // an example array of items to be paged
        var arrayExample = [];

        for (var i = 1; i <= 152; i++) {
          arrayExample.push(i);
        }

        //var exampleItems = arrayExample.map((i) => { return { id: i, name: item_listed[i] }; });
        //var exampleItems = _.range(1, 151).map(i => { return { id: i, name: 'Item ' + i }; });
        
        /*
        this.state = {
          exampleItems: exampleItems,
          pageOfItems: []
        };
        */
        // bind function in constructor instead of render()
        this.onChangePage = this.onChangePage.bind(this);
    }

    componentDidMount(){
      console.log(`home comp i did mount and props below`);
  
      console.log(this.props);
      //this.setState(this.props.store.getState());
    }
 
    onChangePage(pageOfItems) {

      //with redux supposed to make a dispatch call not use setState

      // update state with new page of items
      //this.setState({ pageOfItems: pageOfItems });
      this.props.getPageOfItems();
    }
 
    render() {
      if(!this.props.isFetching){
        var list28 = this.props.listings28;
      }
      return (
        <div className="container">
          <div className="text-center mt-5">
            <h1>React - Pagination Example with logic like Google</h1>
              {this.props.pageOfItems.map(item =>
                  <div key={item.id}>{item.name}</div>)}
            <Pagination items={list28} onChangePage={this.onChangePage} />
          </div>
        </div>
      );
    }
}

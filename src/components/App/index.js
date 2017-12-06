import React, { Component } from 'react';

function Products({list}){
  
  return(
    <table className='products-list table table-hover' >
    <tr>
     <th>id</th>
     <th>Name</th> 
     <th>Description</th>
    </tr>
    {list.map(item=>(
      <tr>
      <th key={item.id}>{item.id}</th>
      <th key={item.id}>{item.name}</th>
      <th key={item.id}>{item.description}</th>
      </tr>
      ))}
    </table>
  )
}

class App extends Component {
  constructor(props){
    super(props);
 
    this.state = {
      data: null,
      urlrepo:[]
    }
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
  }
  fetchSearchTopStories(searchTerm){    
    fetch(searchTerm ,{ method: 'GET'})
     .then(response => response.json())
     .then(data => this.setState({data: data})
     )
     .catch(e => e);
  }
componentDidMount(){

this.fetchSearchTopStories("http://127.0.0.1/acmeproducts-master/api/read_all_products.php");
}

  render() {
    
    const data = this.state.data;
    console.log(data)
    if(!data){
      return null
    }

    return (
      <div className="App">
        <header className="App-header">
          
          <h1 className="App-title">Categories</h1>
        </header>
        <Products list={data}/>
        <p className="App-intro">
        Available Categories
        </p>
      </div>
    );
  }
}

export default App;

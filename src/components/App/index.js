import React, { Component } from 'react';

function Categories({list,handleClick}){
  
  return(
    <table className='products-list table table-hover' >
    <thead>
    <tr>
     <th>ID</th>
     <th>Name</th> 
     <th>Description</th>
     <th>Products</th>
    </tr>
    </thead>
    <tbody>
    {list.map(item=>(
      <tr key={item.id}>
      <th >{item.id}</th>
      <th >{item.name}</th>
      <th >{item.description}</th>
      <th ><button type="button" className="btn btn-primary"  onClick={()=>handleClick(item.id)}>>>></button></th>
      </tr>
      ))}
        </tbody>
    </table>
  )
}
function Products({list}){
  
  return(
    <table className='products-list table table-hover' >
    <thead>
    <tr>
     <th>ID</th>
     <th>Name</th> 
     <th>Description</th>
     <th>Price</th>
    </tr>
    </thead>
    <tbody>
    {list.map(item=>(
      <tr key={item.id}>
      <th >{item.id}</th>
      <th >{item.name}</th>
      <th >{item.description}</th>
      <th >${item.price}</th>
      </tr>
      ))}
        </tbody>
    </table>
  )
}

class App extends Component {
  constructor(props){
    super(props);
 
    this.state = {
      data:null,
      position:"categories"
      
    }
    this.handleClick = this.handleClick.bind(this);
    this.fetchSearchcategory = this.fetchSearchcategory.bind(this);

  }
  handleClick(id) {
    console.log(id);
    fetch("http://127.0.0.1/acmeproducts-master/api/read_one_product.php?prod_id="+id ,{ method: 'GET'})
    .then(response => response.json())
    .then(data => this.setState({
      data: data,
      position: "products"})
    )
    .catch(e => e);

  }
  fetchSearchcategory(){    
    fetch("http://127.0.0.1/acmeproducts-master/api/read_all_categories.php" ,{ method: 'GET'})
     .then(response => response.json())
     .then(data => this.setState({data: data})
     )
     .catch(e => e);
  }



  
componentDidMount(){

this.fetchSearchcategory();
}

  render() {

    const data = this.state.data;
    const position = this.state.position;
    console.log(data);
    console.log(position);
    if(!data){
      return null
    }

    return (
      <div className="App">
        <header className="app-header">
          
          <h1 className="app-title">ACME CATEGORIES</h1>
        </header>
        <div className="data-container">
        <span className="coyote-img"></span>
        {position==="products"?<span className="products-table"><Products list={data} /></span>:<span className="categories-table"><Categories list={data} handleClick={this.handleClick}/></span>}
        

        </div>
  
        <p className="app-info">
        Available Categories, for more information ask to roadrunners. If you can catch him!!!
        </p>
      </div>
    );
  }
}

export default App;

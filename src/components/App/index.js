import React, { Component } from 'react';
var qs = require('qs');
function Categories({list,SearchHandleClick,DeleteHandleClick,AddCategory,handleChange}){

  return(
    <table className='products-list table table-hover' >
    <thead>
    <tr>
     <th>Name</th> 
     <th>Description</th>
     <th></th>
     <th></th>
     <th></th>

    </tr>
    </thead>
    <tbody>
    {list.map(item=>(
      <tr key={item.id}>
      <th >{item.name}</th>
      <th >{item.description}</th>
      <th ><button type="button" className="btn btn-success"  onClick={()=>SearchHandleClick(item.id)}><i className="fa fa-search" ></i></button></th>
      <th ><button type="button" className="btn btn-warning"  onClick={()=>SearchHandleClick(item.id)}><i className="fa fa-edit" ></i></button></th>
      <th ><button type="button" className="btn btn-danger"  onClick={()=>DeleteHandleClick(item.id)}><i className="material-icons" >delete_forever</i></button></th>
      </tr>
      ))}
     
        </tbody>



    </table>
  )
}
function Products({list, returnButton}){
  if(list.length===0){
    return(
      
      <div>
        <button type="button" className="btn btn-success return-btn" onClick={()=>returnButton()} ><i className="material-icons">keyboard_return</i></button>
        <div>No products found...</div>
        </div>
    )
  }
  return(
    <div>
    <button type="button" className="btn btn-success return-btn" onClick={()=>returnButton()} ><i className="material-icons">keyboard_return</i></button>
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
    </div>
  )
}

class App extends Component {
  constructor(props){
    super(props);
 
    this.state = {
      inName:"",
      inDescription:"",
      data:"",
      position:"categories",
      page:0
    }
    this.handleChange = this.handleChange.bind(this);
    this.SearchHandleClick = this.SearchHandleClick.bind(this);
    this.DeleteHandleClick = this.DeleteHandleClick.bind(this);
    this.AddCategory = this.AddCategory.bind(this);
    this.fetchSearchcategory = this.fetchSearchcategory.bind(this);
    this.returnButtonHandle = this.returnButtonHandle.bind(this);

  }
  handleChange(e){
this.setState({[e.target.name]:e.target.value})
  }
  AddCategory(){
console.log("adding");
var execute =this.fetchSearchcategory();

fetch("http://localhost/acmeproducts-master/api/create_category.php",{
 mode: 'cors',
  headers: {
    'Acept':'aplication/json',
    "Content-Type": "application/x-www-form-urlencoded",

  },
   method: 'post',
   body: qs.stringify({"name":this.state.inName,"description":this.state.inDescription})
  
  }).then(function(res){if(res.status===200)this.execute()})
  .catch(function(res){ console.log(res) })
}


  returnButtonHandle(){
    this.fetchSearchcategory();
    this.setState({
      position: "category"})
  }
  SearchHandleClick(id) {
    console.log(id);
    fetch("http://localhost/acmeproducts-master/api/read_one_product.php?prod_id="+id ,{ method: 'GET'})
    .then(response => response.json())
    .then(data => this.setState({
      data: data,
      position: "products"})
    )
    .catch(e => e);

  }
  DeleteHandleClick(id) {
    console.log(id);
    fetch("http://localhost/acmeproducts-master/api/delete_category.php?del_ids="+id ,{ method: 'GET'})
    .then(response => response.json())
   .then(this.fetchSearchcategory())
    .catch(e => e);

  }
  fetchSearchcategory(){  

   setTimeout(() => {
    fetch("http://localhost/acmeproducts-master/api/read_all_categories.php" ,{ method: 'GET'})
    .then(response => response.json())
    .then(newData => this.setState({data: newData, position:"categories"}))
    .catch(e => e);
 
   },100); 
  }


  
componentDidMount(){

this.fetchSearchcategory();
}

render() {

    const data = this.state.data;
    const position = this.state.position;
console.log(data)
    console.log("render position "+position);
    if(!data){
      return null
    }

    return (
      <div className="App">
        <header className="app-header">
          
          <h1 className="app-title">ACME-{position==="products"?"PRODUCTS":"CATEGORIES"}</h1>
        </header>
        <div className="data-container">
        <span className="coyote-img"></span>
        {position==="products"?<span className="products-table">
        <Products list={data} returnButton={this.returnButtonHandle}/></span>
        :
        <span className="categories-table"><Categories list={data}
        
         SearchHandleClick={this.SearchHandleClick} 
         DeleteHandleClick={this.DeleteHandleClick} 
         AddCategory={this.AddCategory}/>
           <span className="category-form">
             <input type="text" name="inName" value={this.state.inName} onChange={this.handleChange} className="form-control" id="name-category"  placeholder="Name"/>
             <input type="text" name="inDescription" value={this.state.inDescription} onChange={this.handleChange} className="form-control" id="des-category" placeholder="Description" />
             <button type="button" onClick={this.AddCategory} className="btn btn-primary btn-add-category" ><i className="material-icons" >playlist_add</i></button>
           </span>
         </span>}
        

        </div>
  
        <p className="app-info">
        Available Categories, for more information ask to roadrunners. If you can catch him!!!
        </p>
      </div>
    );
  }
}

export default App;

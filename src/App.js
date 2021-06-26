import {useEffect,useState} from 'react'
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
// import $ from 'jquery'


function App() {

  const [Data,setData] = useState([])
  const [FilteredData,setFilteredData] = useState([])
  const [Loading,setLoading] = useState(true)
  const [ActiveDropDownValue,setActiveDropDownValue] = useState('10')

  const filter=(e)=>{

    const links=document.querySelectorAll('.link')

       for(var i=0;i<links.length;i++) {

          links[i].classList.remove('active')

       }

       e.target.classList.add('active')
       setActiveDropDownValue(e.target.innerText)

       const filteredArray =Data.slice(0,e.target.innerText)

       setFilteredData(filteredArray)
       

  }


  const searchByName=(e)=> {



     const searchResults= Data.filter((EI)=>{

           if(EI.name.toUpperCase().includes(e.target.value.toUpperCase())) {
                return EI
           }

  
            console.log('lll')

      })

      console.log('len',searchResults.length)

      setFilteredData(searchResults)



  }

  useEffect(()=>{

    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${ActiveDropDownValue}&page=1&sparkline=false`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "67756b98c6msh5a463d891d9f6d8p136adajsnb60985bb154b",
		"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
	}
})
.then(response => {
    
      // console.log('json',response.json())
     response.json().then((data)=>{
  
       if(data){
         setData(data)
         setFilteredData(data)
         setLoading(false)
       }
            
     }).catch(err => {
      console.error(err);
    });
})
.catch(err => {
	console.error(err);
});



  },[])

  return (
    <div className="App">

         <div className="navigation-wrapper">
           <div className="navigation">
           <nav class="navbar navbar-expand-lg navbar-dark">
           <a class="navbar-brand" href="#">Coins</a>
           <a class="navbar-brand" href="#">Cryptocurrency</a>
           <a class="navbar-brand" href="#">CoinsliveData</a>
           <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
             <span class="navbar-toggler-icon"></span>
           </button>
        
         </nav>
           </div>
         </div>


         <div className="filters-wrapper">
         <div class="dropdown">  
         <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
           {ActiveDropDownValue}
         </button>
         <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
           <li><a onClick={(e)=>{
            filter(e)
        }} class="dropdown-item active link" href="#">10</a></li>
           <li><a onClick={(e)=>{
               filter(e)
           }}   class="dropdown-item link" href="#">5</a></li>
           <li onClick={(e)=>{
               filter(e)
        }} ><a class="dropdown-item link" href="#">2</a></li>
         </ul>
       </div>
       <div className="input">
       <label htmlFor="Search">Search:</label>
          <input type="text" onChange={(e)=>searchByName(e)}  placeholder="search by name" />
       </div>
         </div>

        <div className="table-wrapper">
            <div className="table-box">
            <table class="table">
  <thead>
    <tr>
      <th scope="col">IMAGE</th>
      <th scope="col">NAME</th>
      <th scope="col">CURRENT_PRICE</th>
      <th scope="col">MARKET_CAP</th>
      <th scope="col">LOW_24H</th>
      <th scope="col">HIGH_24H</th>
 
    </tr>
  </thead>


  {Loading ? <h2>Loading...</h2> :    <tbody>{ FilteredData.map((ER)=>{
    return   <tr> <th scope="col"> <img src={ER.image} /> </th><th scope="col">{ER.name}</th>  <th scope="col">{ER.current_price}</th>  <th scope="col">{ER.market_cap}</th>  <th scope="col">{ER.low_24h}</th> <th scope="col">{ER.high_24h}</th>  </tr>
  })   } </tbody>  }


</table>
            </div>
        </div>
    </div>
  );
}

export default App;

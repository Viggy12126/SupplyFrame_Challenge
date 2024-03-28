var expess=require("express");

var app=expess();
var bodyParser=require("body-parser");
const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));


const PORT=3000;

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));

app.get('/',async (req,res)=>{


try {
   
    var currSearch = "Sandwich";


    const APP_ID = "72b759e9";
    const APP_KEY = "91ca6d8205ca79ceb94a852ea8d81ad5";

  
    const url = `https://api.edamam.com/search?q=${currSearch}&app_id=${APP_ID}&app_key=${APP_KEY}`;


    const response = await fetch(url);
    const data = await response.json();
     
    // console.log(data);
   
    res.render("recipe", { data: data.hits, currSearch:currSearch }); 
} catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data. Please try again later.");
}
})

app.post("/search", async (req, res) => {
    const { search } = req.body; 
    console.log(search);


    const APP_ID = "72b759e9";
    const APP_KEY = "91ca6d8205ca79ceb94a852ea8d81ad5";
    const url = `https://api.edamam.com/search?q=${search}&app_id=${APP_ID}&app_key=${APP_KEY}`;

    try {

        const response = await fetch(url);
        const data = await response.json();

   

        res.render("recipe", { data: data.hits, currSearch:search
         });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Error fetching data. Please try again later.");
    }
});

const server =app.listen(PORT,()=>{
    console.log(`Server is listenting on PORT ${PORT}`);
})

module.exports=server;
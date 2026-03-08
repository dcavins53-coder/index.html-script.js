# index.html-script.js

//helper function example (for strings)
function buildEmail(firstName, lastName){
    const firstNameLower= firstName.toLowerCase()
    const lastNameLower= lastName.toLowerCase()
    const domain ="@gmail.com"
    const username= firstNameLower.charAt(0)+lastNameLower;
    const email= username + domain;
    return email
}
//specific fetch function
async function getPokemon(id){
try {
 const res = await fetch("https://pokeapi.co/api/v2/pokemon/" +id);
 if(!res.ok){
 throw new Error("Something broke with fetching Pokemon")
 }   

const data = await res.json

return data


} catch (error) {
    console.error(error);
}

async function fetchData(url,option){
    try {
      const res = await fetch(url,options)  

      if(!res.ok){
        throw new Error("Error in fetch")

      }
      const data = await res.json()
      return data

    } catch (error) {
        
    }
}
function renderDog(){

}



async function main() {
    const email = buildEmail("Deirdre","Cavins")
    console.log(email)
    const charmander= await getPokemon(4)
    console.log(charmander)
    const balbasaur = await getPokemon(1)
console.log(balbasaur)
   } catch (error){
     console.error(error)
  }  
}
main();
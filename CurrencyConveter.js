const Base_url="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";

const dropdowns= document.querySelectorAll(".dropdown select");
const btn= document.querySelector("button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg= document.querySelector(".msg");

for(let select of dropdowns)
{
    for(Currcode in CountryList)
    {
        let newOption=document.createElement("option");
        newOption.innerText=Currcode;
        newOption.value=Currcode;
        if(select.name ==="from" && Currcode==="USD")
        {
            newOption.selected="selected";
        }
        else if(select.name ==="to" && Currcode==="INR")
        {
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) =>{
        updateFlag(evt.target);
    });
}



const updateFlag =(element) =>{
    let currCode=element.value;
    let countryCode= CountryList[currCode];
    let newSrc= `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img= element.parentElement.querySelector("img");
    img.src=newSrc;
};


btn.addEventListener("click", async(evt) =>{
    evt.preventDefault();
        let amount=document.querySelector(".amount input");
        let amtVal=amount.value;

        if(amount==="" || amount <1 )
        {
            amtVal=1;
            amount.value="1";
        }
        const URL= `${Base_url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
        let respose= await fetch(URL);
        console.log(respose);
        let data= await respose.json();
        let rate= data[toCurr.value.toLowerCase()];
        console.log(rate);

        let finalAmt= amtVal* rate;
        msg.innerText=`${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
});
   

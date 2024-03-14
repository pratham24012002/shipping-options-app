const addShipMethod=document.getElementById("bt1");

const initalCost=document.getElementById("Cost");

const additionalCost=document.getElementById("additional");

const helpGuide=document.getElementsByClassName("help-guide");

const guidePanel=document.getElementById("helpGuide");

const display=document.getElementById("display");

const dropdown=document.querySelector("select")

const errorArea=document.getElementById("error");

guidePanel.style.display='none';

function showHide(){
    guidePanel.style.display = (guidePanel.style.display === 'none') ? 'block' : 'none';
}

for(var i=0;i<helpGuide.length;i++){
    helpGuide[i].addEventListener("click",showHide);
}

for(let method in shippingList){
    let newOption=document.createElement("option");
    newOption.innerText=shippingList[method];
    newOption.value=shippingList[method];
    dropdown.append(newOption);

}


function displayData(option,amount,additionalCostValue){
    if(option==""){
        dropdown.focus()
        errorMsg("select shipping method");
    }
    else if(isNaN(amount) || amount===""){
        initalCost.focus();
        errorMsg("enter the proper amount");
        
    }
    else if(isNaN(additionalCostValue)){
        additionalCost.focus();
        errorMsg("enter the proper amount");
    }
    else{
        errorArea.innerText="";
        const additional=additionalAmount(additionalCostValue);
        const div=createDiv(option,amount,additional);
        display.append(div);
        initalCost.value = "";
        document.getElementById("additional").value="";
        dropdown.remove(dropdown.selectedIndex);
        
        div.querySelector(".remove-btn").addEventListener("click", removeOption);
        disableOption();
    
    }
}

function createDiv(option,amount,additional){

    const div=document.createElement("div");
    const span=document.createElement("span");
    const btn=document.createElement("button");
    const para=document.createElement("p");

    para.innerText=option;
    span.innerText="$ "+Number(amount).toFixed(2)+" "+additional;
    btn.innerText="Remove";

    btn.classList.add("remove-btn")
    div.classList.add("display")
    para.classList.add("view")
    span.style.padding="0px 5px";

    div.appendChild(para,span,btn);
    div.appendChild(span);
    div.appendChild(btn);

    return div;
}

function additionalAmount(value){
    return value!=""?`($${Number(value).toFixed(2)})`:""; 
}

function removeOption(event){
    let parent=event.target.parentElement;
    let text=parent.textContent;
    parent.remove();
    let indexof$=text.indexOf("$");
   
    let textcontent = text.slice(0, indexof$);
    let newOption =document.createElement("option");
    newOption.innerText=textcontent;
    newOption.value=textcontent;
    dropdown.appendChild(newOption);

    enableOption();
}

function enableOption(){
    dropdown.disabled=false;
    initalCost.disabled=false;
    additionalCost.disabled=false;
    addShipMethod.disabled=false;
}

function errorMsg(error){
    errorArea.innerText=error;
}

const disableOption=()=>{
    const count=dropdown.options.length;
    if(count==1){
        dropdown.disabled=true;
        addShipMethod.disabled=true;
        initalCost.disabled=true;
        additionalCost.disabled=true;
    }
}

addShipMethod.addEventListener("click",()=>{
    displayData(dropdown.value,initalCost.value,additionalCost.value);
})







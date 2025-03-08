import { useState } from "react";
import Button from "./components/Button"
import Input from "./components/Input"
import Label from "./components/Label"
import ReferenceTable from "./components/ReferenceTable"
import { calculateIMC, imcResult } from "./lib/IMC.ts"
import ResultsTable from "./components/ResultsTable.tsx";
function App() {
  const [ IMCData, setIMCData ] = useState<null | {
     weight: number;
     height: number;
     IMC: number;
     imcResult: string}>(null);


  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
   e.preventDefault();
    
   //get data from form
   const formData = new FormData(e.currentTarget);
   const data = Object.fromEntries(formData) as { weight: string, height: string };

   // handle empty fields
   const { weight, height } = data
   if(!weight || !height){
    alert("Ops...você precisa preencher todos os campos!")
    return
   }

   //parse and handle string to number 
   const weightNumber = parseFloat(weight.replace(",", "."))
   const heightNumber = parseFloat(height.replace(",", ".")) / 100;


  if (isNaN(weightNumber) || isNaN(heightNumber)) { 
    alert("Ops... você precisa preencher os campos com números válidos")
    return;

   }
  
   //handle invalid numbers
   if (weightNumber < 2 || weightNumber > 500){
    alert("Ops... o peso precisa ser maior que 2kg ou menor que 500Kg!")
   }
   if (heightNumber < 0.5 || heightNumber > 2.5){
    alert("Ops... a altura precisa ser maior que 50cm e menor que 2.5m!")
   }

   // calculate imc
const imc = calculateIMC(weightNumber, heightNumber);
const imcResultString = imcResult(imc)
console.log(imcResultString);
   // set result
  setIMCData({
    height: heightNumber,
    weight: weightNumber,
    IMC: imc,
    imcResult: imcResultString,
  });

  // clear form
  e.currentTarget.reset();
 }


function handleClickReset(e: React.MouseEvent<HTMLButtonElement>){
  e.preventDefault()
  setIMCData(null);
}

  return (
      <main className="bg-white max-w-4xl mx-auto md:py-24 md:px-48 px-5 py-10">
        <section id="form">
        <form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="weight">Peso(kg)</Label>
          <Input disabled={!!IMCData} className="mt-1"  type="text" id="weight" name="weight"/>
          </div>
          <div className="mt-4">
            <Label htmlFor="heigth">Altura(cm)</Label>
           <Input disabled={!!IMCData}  className="mt-1" type="text" id="height" name="height"/>
          </div>
          {IMCData ? (
            <Button onClick={handleClickReset} type={"button"}>Refazer</Button>
          ) : (
            <Button type="submit" >Calcular</Button>
          )}
        
       </form>
       </section>
       <section id="result" className="py-10 px-4 h-40">
        {IMCData ? (
         <ResultsTable IMCData={IMCData}/>
      
        ) : (
        <p className="text-center text-neutral-400 text-xl">Saiba se está no seu peso ideal!</p>
        )}
       </section>
       <section id="reference-table">
       <ReferenceTable/>
       </section>
      </main>
    
  )
}

export default App

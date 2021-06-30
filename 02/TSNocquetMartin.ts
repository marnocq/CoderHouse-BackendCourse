
const operacion = async(num1:number, num2:number, op:string) =>{
    
    let res:number = 0
    if(op == 'suma'){                    
        let realizaOp = await import("./suma")                   
        let cosa = new realizaOp.Suma(num1, num2)
        res = cosa.getResult()
        
    }else{
        let realizaOp = await import("./resta")  
        let cosa = new realizaOp.Resta(num1, num2)
        res = cosa.getResult()                   
    }
    return res
}

const operaciones = async (pruebas:any[][]) =>{
    let pos:number = 0 
    for(let i = 0; i < pruebas.length; i++){        
        const result = await operacion(pruebas[i][pos],pruebas[i][pos+1], pruebas[i][pos+2])
        console.log(result)        
    }
}

const cuentas:any[][] = [[2, 3, "suma"], [2, 3, "resta"], [5, 18, "suma"], [9, 4, "resta"]] 

operaciones(cuentas)
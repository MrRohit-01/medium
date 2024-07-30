export default function randomColor() {
  
const color = Math.random()
    if(color <= 0.2){
    return "bg-[#DBDFAC] text-black"
    }
    else if(color > 0.2 && color <= 0.4){
    return "bg-[#32322C]"
    }
    else if(color > 0.4 && color <= 0.6){
    return "bg-[#EDC9FF] text-black"
    }
    else if(color > 0.6 && color <= 0.8){
    return "bg-[#DB2955]"
    }
    else{
    return "bg-[#1D2EC3]"
    }
}

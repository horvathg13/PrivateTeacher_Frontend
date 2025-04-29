import moment from "moment";

class Date {
    static today=()=>{
        let today = moment().format("L")

        if(today.includes(".")){
            today=today.replaceAll(".", "-").slice(0,-1).toString()
        }
        if(today.includes("/")){
            today=today.replaceAll("/", "-").slice(0,-1)
        }

        return today;
    }
    static specificDate=(date)=>{
        let d = moment(date).format("L")

        if(d.includes(".")){
            d=d.replaceAll(".", "-").slice(0,-1).toString()
        }
        if(d.includes("/")){
            d=d.replaceAll("/", "-").slice(0,-1)
        }

        return d;
    }

    static yesterday=()=>{
        let y = moment().subtract(1, "days").format("L")

        if(y.includes(".")){
            y=y.replaceAll(".", "-").slice(0,-1).toString()
        }
        if(y.includes("/")){
            y=y.replaceAll("/", "-").slice(0,-1)
        }

        return y;
    }

    static tomorrow=()=>{
        let t= moment().add(1, "days").format("L")

        if(t.includes(".")){
            t=t.replaceAll(".", "-").slice(0,-1).toString()
        }
        if(t.includes("/")){
            t=t.replaceAll("/", "-").slice(0,-1)
        }

        return t;
    }
}

export default Date;
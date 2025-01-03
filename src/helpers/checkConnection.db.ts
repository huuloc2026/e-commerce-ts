import mongoose from "mongoose"
import os from "os"

const _SECOND = 5000
const connection = 5
export const CountConnect = () => {
    const numberConection = mongoose.connections.length
    console.log(`Number of connection:::${numberConection}`);
}
export const checkOverload = () => {
    setInterval(()=>{
        const numberConection = mongoose.connections.length
        CountConnect()
        const numCore = os.cpus().length
        const MemoryUsage = process.memoryUsage().rss
        console.log(`MemoryUsage: ${MemoryUsage/1024/1024}MB`);
        const maxConnection = numCore * connection
        if (numberConection > maxConnection){
            console.log(`Connection overload deteted`);
        }
    },_SECOND)
}


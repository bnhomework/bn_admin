
import cfg from '@/config'
import {api} from '@/api'
import store from '@/store'

const consoleWriter=function(msg,level){
    console.log(level+'|'+msg);
}
const dbWriter=function(msg,level){
    var tags=[level];
    tags.push='ClientSide';
    var message={Subject:level,Sender:store.state.LoginName,Tags:tags,Status:"1",Content:msg}
    api.message.Send(message)
}

const write=function(msg,level){
    consoleWriter(msg,level);
    dbWriter(msg,level);
}
export const info=function(msg){
    if(cfg.logLevel<3)
        return;
    write(msg,"[info]")
}
export const warn=function(msg){
     if(cfg.logLevel<2)
        return;
    write(msg,"[warn]")
}
export const err=function(msg){
     if(cfg.logLevel<1)
        return;
    write(msg,"[err]")
}
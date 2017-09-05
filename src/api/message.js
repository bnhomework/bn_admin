
import axios from '@/extends/http'
const Send=function(msg){
	return axios.post( 'Message/Send',msg);
}

export default{
	Send
}
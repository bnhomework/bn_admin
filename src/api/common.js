import axios from '@/extends/http'
const GetLangByComponentName=function(name){
	return axios.get( 'Common/GetLangByComponentName',{params:{name:name}});
}
const GetCurrentIdentity=function(name){
	return axios.post( 'Common/GetCurrentIdentity');
}
const GetEnumItems=function(enumTypes){
	return axios.post( 'Common/GetEnumItems',enumTypes);
}
const BuildMenu=function(name){
	return axios.post( 'Common/BuildMenu');
}

export default{
	GetLangByComponentName,
	GetCurrentIdentity,
	GetEnumItems,
	BuildMenu
}
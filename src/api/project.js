
import axios from '@/extends/http'

const GetOrderIdByTrackingNumber=function(id){
	return axios.get( 'Project/GetOrderIdByTrackingNumber',{params:{query:id}});
}
const GetProjectHeaderInfo=function(id){
	return axios.get( 'Project/GetProjectHeaderInfo',{params:{orderId:id}});
}
const GetProjectProgressStatus=function(id){
	return axios.get( 'Project/GetProjectProgressStatus',{params:{orderId:id}});
}
const LoadSampleInfo=function(orderId){
	return axios.get( 'Project/LoadSampleInfo',{params:{orderId:orderId}});
}

const LoadOrderToLab=function(orderId){
	return axios.post( 'Project/LoadOrderToLab?orderId='+orderId);
}

export default{
	GetOrderIdByTrackingNumber,	
	GetProjectHeaderInfo,	
	GetProjectProgressStatus,
	LoadSampleInfo,
	LoadOrderToLab,
}
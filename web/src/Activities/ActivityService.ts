import axios from 'axios';
import { GetAllResponse, PointResponse, ActivityTypeAggregation, Activity } from './models';


export const ActivityService = {
  baseUrl: process.env.REACT_APP_BASE_API_URL,

  getAllActivities(pageNumber: number, pageSize: number, filter: string | null = null) {
    const filerVal = filter === 'All' ? null : filter;
    return axios.get<GetAllResponse>(this.baseUrl + '/activities', {
      params: {
        pageNumber: pageNumber,
        pageSize: pageSize,
        type: filerVal
      }
    })
  },

  getActivity(id: string) {
    return axios.get<Activity>(this.baseUrl + '/activities/' + id)
  },

  upload(file: File) {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return axios.post(this.baseUrl + '/upload', formData);
  },

  getFilters() {
    const url = this.baseUrl + '/filters';

    return axios.get<ActivityTypeAggregation[]>(url);
  },

  getPoints(id: string) {
    const url = this.baseUrl + '/activities/' + id + '/points';

    return axios.get<PointResponse>(url);
  }
}
import axios from 'axios';
import { GetAllResponse, ActivityTypeAggregation, Activity } from './models';

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
    const url = '/filters';

    return axios.get<ActivityTypeAggregation[]>(url);
  }
}
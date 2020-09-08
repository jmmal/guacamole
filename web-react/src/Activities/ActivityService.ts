import axios from 'axios';
import { GetAllResponse, PointResponse, ActivityTypeAggregation, Activity } from './models';

var baseUrl = 'http://localhost:8080';

export const ActivityService = {
  getAllActivities: (pageNumber: number, pageSize: number, filter: string | null = null) => {
    return axios.get<GetAllResponse>(baseUrl + '/activities', {
      params: {
        pageNumber: pageNumber,
        pageSize: pageSize,
        type: filter
      }
    })
  },

  getActivity: (id: string) => {
    return axios.get<Activity>(baseUrl + '/activities/' + id)
  },

  upload: (file: File) => {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return axios.post(baseUrl + '/upload', formData);
  },

  getFilters: () => {
    const url = baseUrl + '/filters';

    return axios.get<ActivityTypeAggregation[]>(url);
  },

  getPoints: (id: string) => {
    const url = baseUrl + '/activities/' + id + '/points';

    return axios.get<PointResponse>(url);
  }
}
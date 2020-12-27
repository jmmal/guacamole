import { action, computed, makeObservable, observable } from "mobx";
import { ActivityService } from "../Activities/ActivityService";

import { Activity, ActivityTypeAggregation } from '../Activities/models';

export class ActivityStore {
  @observable
  activities: Activity[] = [];

  @observable
  totalActivities = 0;

  @observable
  filter?: string;

  @observable
  loading = false;

  @observable
  filters: ActivityTypeAggregation[] = [];

  private service = ActivityService;
  pageNumber = 1;

  constructor() {
    makeObservable(this);
  }

  @action
  nextPage = async () => {
    this.loading = true;
    let resp = await this.service.getAllActivities(this.pageNumber, 5, this.filter);
    this.loading = false;
    this.activities.push(...resp.data.results);
    this.totalActivities = resp.data.totalCount;
    this.pageNumber++;
  }

  @action
  loadFilters = async () => {
    const filters = await this.service.getFilters();
    this.filters.push(...filters.data);
  }

  @computed
  get allActivities() {
    return this.activities;
  }

  @action
  setFilter(filter: string) {
    this.filter = filter;
    this.pageNumber = 1;
    this.activities = [];
    this.nextPage();
  }
}
// Core Imports
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';

// Third Party Imports
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { SubSink } from 'subsink';

// App Imports
import { ActivityService } from '../activity.service';
import { Activity, ActivityTypeAggregation } from '../activity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  dataSource: ActivityDataSource;
  filters: ActivityTypeAggregation[];

  constructor(
    private activityService: ActivityService,
    private router: Router
  ) {
    this.dataSource = new ActivityDataSource(activityService);
  }

  onChange(value: string): void {
    this.dataSource.filterType = value;
  }

  ngOnInit(): void {
    this.subs.sink = this.activityService.getFilters().subscribe(resp => {
      this.filters = resp;
    });
  }

  onActivityClick(activity: Activity): void {
    this.router.navigate(['/activities', activity.id]);
  }

  /**
   * Used by cdkVirtuaFor to track elements rendered on the screen.
   */
  trackById(index: number, activity: Activity): string {
    return activity.id;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

/**
 * ActivityDataSource implements the DataSource interface used by the cdk-virtual-scroll-viewport
 * element within ActivityPreviewComponent.
 *
 * It is used to automatically load new data as the page scrolls.
 */
class ActivityDataSource extends DataSource<Activity | undefined> {
  private cachedActivities = Array.from<Activity>({ length: 0 });
  private dataStream = new BehaviorSubject<(Activity | undefined)[]>(this.cachedActivities);
  private subscription = new Subscription();

  private pageSize = 4;
  private lastPage = 0;
  private typeFilter = '';

  isLoading = false;

  set filterType(v: string) {
    this.typeFilter = v;
    this.cachedActivities = [];
    this.dataStream.next([]);
    this.fetchPage(1);
  }

  constructor(private activityService: ActivityService) {
    super();

    this.fetchPage(1);
  }

  connect(collectionViewer: CollectionViewer): Observable<(Activity | undefined)[] | ReadonlyArray<Activity | undefined>> {
    this.subscription.add(collectionViewer.viewChange.subscribe(range => {
      const currentPage = Math.floor(range.end / this.pageSize);

      if (currentPage > this.lastPage) {
        this.lastPage = currentPage;
        this.fetchPage(currentPage + 1);
      }
    }));

    return this.dataStream;
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.subscription.unsubscribe();
  }

  private fetchPage(pageNumber: number): void {
    this.isLoading = true;
    this.activityService.getAllRuns(pageNumber, this.pageSize, this.typeFilter).subscribe(resp => {
      this.cachedActivities = this.cachedActivities.concat(resp.results);
      this.dataStream.next(this.cachedActivities);
      this.isLoading = false;
    });
  }
}

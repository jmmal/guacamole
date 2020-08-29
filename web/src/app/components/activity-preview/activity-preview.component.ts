// Core Imports
import { Component } from '@angular/core';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';

// Third Party Imports
import { BehaviorSubject, Subscription, Observable } from 'rxjs';

// App Imports
import { ActivityService } from '../../core/activity.service';
import { Activity } from '../../core/activity';

@Component({
  selector: 'app-activity-preview',
  templateUrl: './activity-preview.component.html',
  styleUrls: ['./activity-preview.component.scss']
})
export class ActivityPreviewComponent {
  dataSource: ActivityDataSource;

  constructor(private activityService: ActivityService) {
    this.dataSource = new ActivityDataSource(activityService);
  }

  /**
   * Used by cdkVirtuaFor to track elements rendered on the screen.
   */
  trackById(index: number, activity: Activity): string {
    return activity.id;
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

  private pageSize = 5;
  private lastPage = 0;

  total = 10;
  isLoading = false;

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
    this.activityService.getAllRuns(pageNumber, this.pageSize).subscribe(resp => {
      this.cachedActivities = this.cachedActivities.concat(resp.results);
      this.total = resp.totalCount;
      this.dataStream.next(this.cachedActivities);
      this.isLoading = false;
    });
  }
}

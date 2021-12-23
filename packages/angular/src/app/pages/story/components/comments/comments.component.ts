import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { of, from, Subscription } from 'rxjs';
import { delay, tap, mergeMap, repeat } from 'rxjs/operators';

import { IDs, StoryInterface } from '@test-task-avito/shared';
import {
  APIService,
  CommentTreeData,
  CommentTreeNode,
} from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit, OnDestroy {
  treeControl = new NestedTreeControl<CommentTreeNode>((node) => node.children);

  commentTree = new MatTreeNestedDataSource<CommentTreeNode>();

  commentsQty = 0;

  loadingComments = false;

  private subscription: Subscription | null = null;

  @Input() story!: StoryInterface;

  @Input() loadingStory = false;

  constructor(private apiService: APIService) {}

  ngOnInit() {
    this.onClickRefreshCommentsButton();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onClickRefreshCommentsButton() {
    this.startPolling();
  }

  fetchCommentsTreeData(kids: IDs = this.story.kids || []) {
    this.loadingComments = true;

    return this.apiService.getCommentTree(kids).then((data) => {
      this.loadingComments = false;

      return data;
    });
  }

  setCommentsTreeData({ children, qty }: CommentTreeData) {
    this.commentTree.data = children;
    this.commentsQty = qty;
  }

  startPolling() {
    if (this.subscription) this.subscription.unsubscribe();

    const polling$ = of({}).pipe(
      mergeMap(() => from(this.fetchCommentsTreeData())),
      tap((data) => this.setCommentsTreeData(data)),
      delay(environment.POLLING_INTERVAL),
      repeat(),
    );

    this.subscription = polling$.subscribe();
  }
}

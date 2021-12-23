import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { from } from 'rxjs';

import { IDs, StoryInterface } from '@test-task-avito/shared';
import {
  APIService,
  CommentTreeData,
  CommentTreeNode,
} from 'src/app/services/api.service';
import polling, { PollingSubscription } from 'src/app/lib/polling';


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

  private subscription: PollingSubscription = null;

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

  fetchCommentsTreeData = (kids: IDs = this.story.kids || []) => {
    this.loadingComments = true;

    return this.apiService.getCommentTree(kids).then((data) => {
      this.loadingComments = false;

      return data;
    });
  };

  setCommentsTreeData = ({ children, qty }: CommentTreeData) => {
    this.commentTree.data = children;
    this.commentsQty = qty;
  };

  startPolling() {
    polling({
      subscription: this.subscription,
      setSubscription: (subscription) => {
        this.subscription = subscription;
      },
      streamFactory: () => from(this.fetchCommentsTreeData()),
      successCallback: this.setCommentsTreeData,
    });
  }
}

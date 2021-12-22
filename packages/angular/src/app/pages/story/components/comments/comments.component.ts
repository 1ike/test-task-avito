import { Component, OnInit, Input } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

import { IDs, StoryInterface } from '@test-task-avito/shared';
import { APIService, CommentTreeNode } from 'src/app/services/api.service';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  treeControl = new NestedTreeControl<CommentTreeNode>(node => node.children);

  commentTree = new MatTreeNestedDataSource<CommentTreeNode>();

  commentsQty = 0;

  loadingComments = false;

  @Input() story!: StoryInterface;

  @Input() loadingStory = false;

  constructor(
    private apiService: APIService,
  ) {}

  ngOnInit() {
    this.onClickRefreshCommentsButton();
  }

  onClickRefreshCommentsButton(){
    this.getCommentsTree(this.story.kids);
  }

  getCommentsTree(kids: IDs = []){
    this.loadingComments = true;

    this.apiService.getCommentTree(kids).then(({ children, qty }) => {
      this.commentTree.data = children;
      this.commentsQty = qty;
      this.loadingComments = false;
    });
  }
}

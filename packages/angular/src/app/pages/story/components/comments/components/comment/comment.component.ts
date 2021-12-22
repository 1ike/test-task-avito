import { Component, Input } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';

import { CommentTreeNode } from 'src/app/services/api.service';
import { DateService } from 'src/app/services/date.service';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  @Input() node!: CommentTreeNode;

  @Input() level!: ReturnType<NestedTreeControl<CommentTreeNode>['getLevel']>;

  @Input() isExpanded!: ReturnType<NestedTreeControl<CommentTreeNode>['isExpanded']>;

  constructor(public dateService: DateService) { }
}

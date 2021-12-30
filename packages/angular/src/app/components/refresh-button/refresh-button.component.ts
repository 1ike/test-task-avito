import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TooltipPosition } from '@angular/material/tooltip';


@Component({
  selector: 'app-refresh-button',
  templateUrl: './refresh-button.component.html',
  styleUrls: ['./refresh-button.component.scss'],
})
export class RefreshButtonComponent {
  @Input() loading!: boolean;

  @Input() tooltipText: string = 'Refresh';

  @Input() tooltipPlacement: TooltipPosition = 'above';

  @Output() clickEmmiter = new EventEmitter<void>();

  onClick() {
    this.clickEmmiter.emit();
  }
}

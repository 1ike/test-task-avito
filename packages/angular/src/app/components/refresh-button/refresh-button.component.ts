import { Component, Input } from '@angular/core';
import { TooltipPosition } from '@angular/material/tooltip';


@Component({
  selector: 'app-refresh-button',
  templateUrl: './refresh-button.component.html',
  styleUrls: ['./refresh-button.component.scss'],
})
export class RefreshButtonComponent {
  @Input() onClick!: () => void;

  @Input() loading!: boolean;

  @Input() tooltipText: string = 'Refresh';

  @Input() tooltipPlacement: TooltipPosition = 'above';
}

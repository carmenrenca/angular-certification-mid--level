import { Component, inject } from '@angular/core';
import { ConfiguratorService } from '../configurator.service';

@Component({
  selector: 'app-step2',
  standalone: true,
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.scss',
})
export class Step2Component {
  service = inject(ConfiguratorService);
}

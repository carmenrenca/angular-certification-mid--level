import {
  Component,
  inject,
  OnInit,
  viewChild,
  HostBinding,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfiguratorService } from '../configurator.service';

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.scss',
})
export class Step1Component implements AfterViewInit {
  @ViewChild('model') model: ElementRef;
  @ViewChild('color') color: ElementRef;
  ngAfterViewInit(): void {
    this.model.nativeElement.value = this.service.currentCar()?.code ?? 0;
    this.color.nativeElement.value = this.service.currentColor()?.code ?? 0;
  }

  service = inject(ConfiguratorService);
}

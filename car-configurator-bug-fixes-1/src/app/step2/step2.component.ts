import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfiguratorService } from '../configurator.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.scss',
})
export class Step2Component implements AfterViewInit {
  @ViewChild('config') config: ElementRef;
  @ViewChild('hitch') hitch: ElementRef;
  @ViewChild('yoke') yoke: ElementRef;

  service = inject(ConfiguratorService);
  ngAfterViewInit(): void {
    this.config.nativeElement.value = this.service.currentConfig()?.id ?? 0;
    this.hitch.nativeElement.value = this.service.currentTowHitchIsSelected();
    this.yoke.nativeElement.value = this.service.currentWheelIsYoke();
  }
}

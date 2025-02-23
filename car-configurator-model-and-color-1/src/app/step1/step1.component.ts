import { Component, computed, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfiguratorService } from '../configurator.service';

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.scss',
})
export class Step1Component {
  configuratorService = inject(ConfiguratorService);
  models = this.configuratorService.allModels;
  colors = computed(() =>
    this.configuratorService.currentCar()
      ? this.configuratorService.currentCar()?.colors
      : []
  );

  changeModel(code: string) {
    const model_selected = this.models().find((item) => item.code === code);
    this.configuratorService.currentCar.set(model_selected);
  }
}

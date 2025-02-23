import {
  computed,
  effect,
  inject,
  Injectable,
  signal,
  Signal,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { CarModel, CarOptions, Color, Config } from './models.type';

@Injectable({
  providedIn: 'root',
})
export class ConfiguratorService {
  private http = inject(HttpClient);
  readonly allModels: Signal<CarModel[]> = toSignal(
    this.http.get<CarModel[]>('models'),
    { initialValue: [] }
  );

  readonly selectableColors = computed(() => this.currentCar()?.colors);
  readonly selectableOptions = signal<CarOptions | null>(null);

  readonly currentColor = signal<Color | undefined>(undefined);
  readonly currentCar = signal<CarModel | undefined>(undefined);
  readonly currentConfig = signal<Config | undefined>(undefined);
  readonly currentWheelIsYoke = signal<boolean>(false);
  readonly currentTowHitchIsSelected = signal<boolean>(false);
  readonly currentImage = computed(() => {
    const car = this.currentCar();
    const color = this.currentColor();
    if (car && color)
      return `https://interstate21.com/tesla-app/images/${car.code}/${color.code}.jpg`;
    else return null;
  });

  readonly priceTotal = computed(() => {
    const yoke = this.currentWheelIsYoke() ? 1000 : 0;
    const hitch = this.currentTowHitchIsSelected() ? 1000 : 0;

    if (this.currentConfig() && this.currentColor()) {
      return (
        this.currentConfig()!.price + this.currentColor()!.price + yoke + hitch
      );
    }
    return 0;
  });

  readonly step2Ready: Signal<boolean> = computed(
    () => this.currentCar() != undefined && this.currentColor() != undefined
  );
  readonly step3Ready: Signal<boolean> = computed(
    () => this.step2Ready() && this.currentConfig() !== undefined
  );
  constructor() {
    effect(() => {
      if (this.currentCar()?.code)
        this.http
          .get<CarOptions>('options/' + this.currentCar()?.code)
          .subscribe((options) => this.selectableOptions.set(options));
    });
  }

  selectModel(code: CarModel['code']) {
    const model = this.allModels().find((model) => model.code === code);
    this.currentCar.set(model);
    this.currentColor.set(model?.colors[0]);
    this.currentWheelIsYoke.set(false);
    this.currentTowHitchIsSelected.set(false);
    this.currentConfig.set(undefined);
  }

  selectColor(code: Color['code']) {
    const color = this.selectableColors()?.find((color) => color.code === code);
    this.currentColor.set(color);
  }

  selectConfig(id: string) {
    const config = this.selectableOptions()?.configs.find((c) => c.id === +id);
    this.currentConfig.set(config);
  }
}

import {
  computed,
  effect,
  inject,
  Injectable,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { CarModel, CarOptions, Color, Config } from './models.type';
import { filter, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfiguratorService {
  constructor() {
    effect(() => {
      if (this.currentCar()) {
        this.http
          .get<CarOptions>(`options/${this.currentCar()?.code}`)
          .subscribe((res) => this.selectableConfig.set(res));
      }
    });
  }
  private readonly http = inject(HttpClient);

  readonly allModels: Signal<CarModel[]> = toSignal(
    this.http.get<CarModel[]>('models'),
    { initialValue: [] }
  );

  readonly selectableColors = computed(() => this.currentCar()?.colors);

  readonly currentConfig = signal<Config | undefined>(undefined);
  readonly currentColor = signal<Color | undefined>(undefined);
  readonly currentCar = signal<CarModel | undefined>(undefined);

  readonly step2Ready = computed(
    () => this.currentCar() && this.currentColor()
  );
  readonly currentImage = computed(() => {
    const car = this.currentCar();
    const color = this.currentColor();
    if (car && color)
      return `https://interstate21.com/tesla-app/images/${car.code}/${color.code}.jpg`;
    else return null;
  });

  readonly selectableConfig: WritableSignal<CarOptions | undefined> =
    signal(undefined);

  selectConfig(id: string) {
    this.currentConfig.set(
      this.selectableConfig()?.configs.find((item) => item.id === Number(id))
    );
  }
  selectModel(code: CarModel['code']) {
    const model = this.allModels().find((model) => model.code === code);
    this.currentCar.set(model);
    this.currentColor.set(model?.colors[0]);
  }

  selectColor(code: Color['code']) {
    const color = this.selectableColors()?.find((color) => color.code === code);
    this.currentColor.set(color);
  }
}

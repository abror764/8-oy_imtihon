import { SliderService } from './slider.service';
export declare class SliderController {
    private svc;
    constructor(svc: SliderService);
    create(body: any): Promise<import("./slider.entity").Slider>;
    list(): Promise<import("./slider.entity").Slider[]>;
    get(id: string): Promise<import("./slider.entity").Slider>;
    update(id: string, body: any): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}

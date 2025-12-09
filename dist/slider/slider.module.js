"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SliderModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const slider_entity_1 = require("./slider.entity");
const slider_service_1 = require("./slider.service");
const slider_controller_1 = require("./slider.controller");
let SliderModule = class SliderModule {
};
exports.SliderModule = SliderModule;
exports.SliderModule = SliderModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([slider_entity_1.Slider])],
        providers: [slider_service_1.SliderService],
        controllers: [slider_controller_1.SliderController],
    })
], SliderModule);
//# sourceMappingURL=slider.module.js.map
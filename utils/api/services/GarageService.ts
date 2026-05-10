import { APIRequestContext, expect } from '@playwright/test';

export default class GarageService {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async getAllBrands() {
        const response = await this.request.get('/api/cars/brands');
        const responseJson = await response.json();
        expect(response.status()).toBe(200);
        return responseJson.data;
    }

    async getAllModels() {
        const response = await this.request.get('/api/cars/models');
        const responseJson = await response.json();
        expect(response.status()).toBe(200);
        return responseJson.data;
    }

    async getModel(id: number, isPositive: boolean = true) {
        const response = await this.request.get(`/api/cars/models/${id}`);
        if (isPositive) {
            const responseJson = await response.json();
            expect(response.status()).toBe(200);
            return responseJson.data;
        } else {
            return response;
        }
    }

    async removeCar(sid: string, id: string, isPositive: boolean = true) {
        const response = await this.request.delete(`/api/cars/${id}`, {
            headers: {
                'cookie': sid
            }
        });
        if (isPositive) {
            return response;
        } else {
            const responseJson = await response.json();
            return responseJson.data;            
        }
    }

    async addCar(sid: string, newCar: { carBrandId: number, carModelId: number, mileage: number }, isPositive: boolean = true) {
        const response = await this.request.post('/api/cars', {
            data: newCar,
            headers: {
                cookie: sid,
            },
        });
        if (isPositive) {
            const responseJson = await response.json();
            expect(response.status()).toBe(201);
            return responseJson.data;
        } else {
            return response;
        }

    }

    async getUserCars(sid: string) {
        const response = await this.request.get('/api/cars', {
            headers: {
                'cookie': sid
            }
        });

        expect(response.status()).toBe(200);
        const responseJson = await response.json();
        return responseJson.data;

    }
}

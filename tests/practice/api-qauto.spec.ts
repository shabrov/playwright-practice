import { test, expect } from '@playwright/test';

test('Get all brands', async ({ request }) => {
    const response = await request.get('api/cars/brands');
    const responseJson = await response.json();
    const brands = responseJson.data;
    console.log(response);
    console.log(brands);
    expect(response.status()).toBe(200);
});

test('Get all models', async ({ request }) => {
    const response = await request.get('api/cars/models');
    const responseJson = await response.json();
    const models = responseJson.data;
    console.log(response);
    console.log(models);
    expect(response.status()).toBe(200);
    expect(models).toHaveLength(23);
});

test('Add new car', async ({ request }) => {
    const response = await request.post('/api/cars', {
        data: {
            "carBrandId": 1,
            "carModelId": 1,
            "mileage": 122
        }
    });

});
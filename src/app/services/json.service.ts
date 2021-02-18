import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {from} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class JsonService {

  constructor(public http: HttpClient) {

  }
  colors:any[]=[
    {
      type: 'Corn',
      color: '#ffd300'
    },
    {
      type: 'Cotton',
      color: '#ff2626'
    },
    {
      type: 'Rice',
      color: '#00a8e2'
    },
    {
      type: 'Sorghum',
      color: '#ff9e0a'
    },
    {
      type: 'Soybeans',
      color: '#267000'
    },
    {
      type: 'Sunflower',
      color: '#ffff00'
    },
    {
      type: 'Peanuts',
      color: '#70a500'
    },
    {
      type: 'Tobacco',
      color: '#00af49'
    },
    {
      type: 'Sweet Corn',
      color: '#dda50a'
    },
    {
      type: 'Pop or Orn Corn',
      color: '#dda50a'
    },
    {
      type: 'Mint',
      color: '#7cd3ff'
    },
    {
      type: 'Barley',
      color: '#e2007c'
    },
    {
      type: 'Durum Wheat',
      color: '#896054'
    },
    {
      type: 'Wheat',
      color: '#896054'
    },
    {
      type: 'Spring Wheat',
      color: '#d8b56b'
    },
    {
      type: 'Winter Wheat',
      color: '#a57000'
    },
    {
      type: 'Other Small Grains',
      color: '#d69ebc'
    },
    {
      type: 'Dbl Crop WinWht/Soybeans',
      color: '#707000'
    },
    {
      type: 'Rye',
      color: '#aa007c'
    },
    {
      type: 'Oats',
      color: '#a05989'
    },
    {
      type: 'Millet',
      color: '#700049'
    },
    {
      type: 'Speltz',
      color: '#d69ebc'
    },
    {
      type: 'Canola',
      color: '#d1ff00'
    },
    {
      type: 'Flaxseed',
      color: '#7c99ff'
    },
    {
      type: 'Safflower',
      color: '#d6d600'
    },
    {
      type: 'Rape Seed',
      color: '#d1ff00'
    },
    {
      type: 'Mustard',
      color: '#00af49'
    },
    {
      type: 'Alfalfa',
      color: '#ffa5e2'
    },
    {
      type: 'Other Hay/Non Alfalfa',
      color: '#a5f28c'
    },
    {
      type: 'Camelina',
      color: '#00af49'
    },
    {
      type: 'Buckwheat',
      color: '#d69ebc'
    },
    {
      type: 'Sugarbeets',
      color: '#a800e2'
    },
    {
      type: 'Dry Beans',
      color: '#a50000'
    },
    {
      type: 'Potatoes',
      color: '#702600'
    },
    {
      type: 'Other Crops',
      color: '#00af49'
    },
    {
      type: 'Sugarcane',
      color: '#af7cff'
    },
    {
      type: 'Sweet Potatoes',
      color: '#702600'
    },
    {
      type: 'Misc Vegs & Fruits',
      color: '#ff6666'
    },
    {
      type: 'Watermelons',
      color: '#ff6666'
    },
    {
      type: 'Onions',
      color: '#ffcc66'
    },
    {
      type: 'Cucumbers',
      color: '#ff6666'
    },
    {
      type: 'Chick Peas',
      color: '#00af49'
    },
    {
      type: 'Lentils',
      color: '#00ddaf'
    },
    {
      type: 'Peas',
      color: '#54ff00'
    },
    {
      type: 'Tomatoes',
      color: '#f2a377'
    },
    {
      type: 'Caneberries',
      color: '#ff6666'
    },
    {
      type: 'Hops',
      color: '#00af49'
    },
    {
      type: 'Herbs',
      color: '#7cd3ff'
    },
    {
      type: 'Clover/Wildflowers',
      color: '#e8bfff'
    },
    {
      type: 'Sod/Grass Seed',
      color: '#afffdd'
    },
    {
      type: 'Switchgrass',
      color: '#00af49'
    },
    {
      type: 'Fallow Idle Cropland',
      color: '#bfbf77'
    },
    {
      type: 'Forest',
      color: '#93cc93'
    },
    {
      type: 'Shrubland',
      color: '#c6d69e'
    },
    {
      type: 'Barren',
      color: '#ccbfa3'
    },
    {
      type: 'Cherries',
      color: '#ff00ff'
    },
    {
      type: 'Peaches',
      color: '#ff8eaa'
    },
    {
      type: 'Apples',
      color: '#ba004f'
    },
    {
      type: 'Grapes',
      color: '#704489'
    },
    {
      type: 'Christmas Trees',
      color: '#007777'
    },
    {
      type: 'Other Tree Crops',
      color: '#af9970'
    },
    {
      type: 'Citrus',
      color: '#ffff7c'
    },
    {
      type: 'Pecans',
      color: '#b5705b'
    },
    {
      type: 'Almonds',
      color: '#00a582'
    },
    {
      type: 'Walnuts',
      color: '#e8d6af'
    },
    {
      type: 'Pears',
      color: '#af9970'
    },
    {
      type: 'Clouds/No Data',
      color: '#f2f2f2'
    },
    {
      type: 'Developed',
      color: '#999999'
    },
    {
      type: 'Water',
      color: '#4970a3'
    },
    {
      type: 'Wetlands',
      color: '#7cafaf'
    },
    {
      type: 'Nonag/Undefined',
      color: '#e8ffbf'
    },
    {
      type: 'Aquaculture',
      color: '#00ffff'
    },
    {
      type: 'Open Water',
      color: '#4970a3'
    },
    {
      type: 'Perennial Ice/Snow',
      color: '#d3e2f9'
    },
    {
      type: 'Developed/Open Space',
      color: '#999999'
    },
    {
      type: 'Developed/Low Intensity',
      color: '#999999'
    },
    {
      type: 'Developed/Med Intensity',
      color: '#999999'
    },
    {
      type: 'Developed/High Intensity',
      color: '#999999'
    },
    {
      type: 'Barren',
      color: '#ccbfa3'
    },
    {
      type: 'Deciduous Forest',
      color: '#93cc93'
    },
    {
      type: 'Evergreen Forest',
      color: '#93cc93'
    },
    {
      type: 'Mixed Forest',
      color: '#93cc93'
    },
    {
      type: 'Shrubland',
      color: '#c6d69e'
    },
    {
      type: 'Grassland Pasture',
      color: '#e8ffbf'
    },
    {
      type: 'Woody Wetlands',
      color: '#7cafaf'
    },
    {
      type: 'Herbaceous Wetlands',
      color: '#7cafaf'
    },
    {
      type: 'Pistachios',
      color: '#00ff8c'
    },
    {
      type: 'Triticale',
      color: '#d69ebc'
    },
    {
      type: 'Carrots',
      color: '#ff6666'
    },
    {
      type: 'Asparagus',
      color: '#ff6666'
    },
    {
      type: 'Garlic',
      color: '#ff6666'
    },
    {
      type: 'Cantaloupes',
      color: '#ff6666'
    },
    {
      type: 'Prunes',
      color: '#ff8eaa'
    },
    {
      type: 'Olives',
      color: '#334933'
    },
    {
      type: 'Oranges',
      color: '#e27026'
    },
    {
      type: 'Honeydew Melons',
      color: '#ff6666'
    },
    {
      type: 'Broccoli',
      color: '#ff6666'
    },
    {
      type: 'Peppers',
      color: '#ff6666'
    },
    {
      type: 'Pomegranates',
      color: '#af9970'
    },
    {
      type: 'Nectarines',
      color: '#ff8eaa'
    },
    {
      type: 'Greens',
      color: '#ff6666'
    },
    {
      type: 'Plums',
      color: '#ff8eaa'
    },
    {
      type: 'Strawberries',
      color: '#ff6666'
    },
    {
      type: 'Squash',
      color: '#ff6666'
    },
    {
      type: 'Apricots',
      color: '#ff8eaa'
    },
    {
      type: 'Vetch',
      color: '#00af49'
    },
    {
      type: 'Dbl Crop WinWht/Corn',
      color: '#ffd300'
    },
    {
      type: 'Dbl Crop Oats/Corn',
      color: '#ffd300'
    },
    {
      type: 'Lettuce',
      color: '#ff6666'
    },
    {
      type: 'Pumpkins',
      color: '#ff6666'
    },
    {
      type: 'Dbl Crop Lettuce/Durum Wht',
      color: '#896054'
    },
    {
      type: 'Dbl Crop Lettuce/Cantaloupe',
      color: '#ff6666'
    },
    {
      type: 'Dbl Crop Lettuce/Cotton',
      color: '#ff2626'
    },
    {
      type: 'Dbl Crop Lettuce/Barley',
      color: '#e2007c'
    },
    {
      type: 'Dbl Crop Durum Wht/Sorghum',
      color: '#ff9e0a'
    },
    {
      type: 'Dbl Crop Barley/Sorghum',
      color: '#ff9e0a'
    },
    {
      type: 'Dbl Crop WinWht/Sorghum',
      color: '#a57000'
    },
    {
      type: 'Dbl Crop Barley/Corn',
      color: '#ffd300'
    },
    {
      type: 'Dbl Crop WinWht/Cotton',
      color: '#a57000'
    },
    {
      type: 'Dbl Crop Soybeans/Cotton',
      color: '#267000'
    },
    {
      type: 'Dbl Crop Soybeans/Oats',
      color: '#267000'
    },
    {
      type: 'Dbl Crop Corn/Soybeans',
      color: '#ffd300'
    },
    {
      type: 'Blueberries',
      color: '#000099'
    },
    {
      type: 'Cabbage',
      color: '#ff6666'
    },
    {
      type: 'Cauliflower',
      color: '#ff6666'
    },
    {
      type: 'Celery',
      color: '#ff6666'
    },
    {
      type: 'Radishes',
      color: '#ff6666'
    },
    {
      type: 'Turnips',
      color: '#ff6666'
    },
    {
      type: 'Eggplants',
      color: '#ff6666'
    },
    {
      type: 'Gourds',
      color: '#ff6666'
    },
    {
      type: 'Cranberries',
      color: '#ff6666'
    },
    {
      type: 'Dbl Crop Barley/Soybeans',
      color: '#267000'
    }
  ]
  getData(){
     return this.http.get('assets/json/nebraska_field_mock_data.json')
  }
  getColor(){
    //创建一个可观察对象，this.colors就是可观察对象
    return this.colors
  }
}

const QQMapWX = require('../libs/qqmap-wx-jssdk.min.js');
export const qqmapsdk = new QQMapWX({
    key: 'XGBBZ-HYV6W-MJ3RA-OHQCA-FGNYS-2WFW4'
});

export const key = 'XGBBZ-HYV6W-MJ3RA-OHQCA-FGNYS-2WFW4'

export const initCurrentLocation = () => {
    qqmapsdk.reverseGeocoder({
        success(res) {
          wx.setStorageSync('userCurrentLocation', res.result['ad_info'])
        }
      })
}

export const getCurrentLocation = () => {
        if (!wx.getStorageSync('userCurrentLocation')) {
            initCurrentLocation()
        }
        return wx.getStorageSync('userCurrentLocation')
}

export const initProvincesAndCities = () => {
    qqmapsdk.getCityList({
        success: function(res) {//成功后的回调
          wx.setStorageSync('provinces', res.result[0])
          wx.setStorageSync('cities', res.result[1])
        }
      });
}

export const getProvincesAndCitiesTree = () => {
    let allCities =  wx.getStorageSync('cities')
    let allCitiesGroupByProvice = []
    let index = 0;
    let prevItem;
    allCities.forEach(item => {
        if(allCitiesGroupByProvice.length === 0) {
            allCitiesGroupByProvice.push([item])
        } else {
            if(item.id.slice(0, 2) === prevItem.id.slice(0, 2)) {
                allCitiesGroupByProvice[index].push(item);
            } else {
                allCitiesGroupByProvice.push([item])
                index++;
            }
        }
        prevItem = item;
    });
    let provinces = wx.getStorageSync('provinces')
    let tree = [];
    provinces.forEach((item, index)=> {
        item['children'] = allCitiesGroupByProvice[index]
        tree.push(item)
    })
    return tree;
}
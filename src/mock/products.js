var Mock = require('mockjs')

const List = []
const count = 20

const baseContent = '<p>Wello World</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = [
    'https://picsum.photos/200/300/?random',
    'https://picsum.photos/200/301/?random',
    'https://picsum.photos/201/300/?random',
    'https://picsum.photos/200/302/?random',
    'https://picsum.photos/202/300/?random',
    'https://picsum.photos/203/304/?random',
]
// image: 'https://picsum.photos/200/300?image=@integer(1, 999)',

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    price: [
        { id: '@increment', price: '@float(0, 100, 2, 2)' },
    ],
    feedstock: [
        { id:'@integer(1, 999)', name: '@first'},
        { id:'@integer(1, 999)', name: '@first'},
        { id:'@integer(1, 999)', name: '@first'},
        { id:'@integer(1, 999)', name: '@first'},
    ],
    side_dish: [
        { id:'@integer(1, 999)', name: '@first', price: '@float(0, 100, 2, 2)'},
        { id:'@integer(1, 999)', name: '@first', price: '@float(0, 100, 2, 2)'},
        { id:'@integer(1, 999)', name: '@first', price: '@float(0, 100, 2, 2)'},
        { id:'@integer(1, 999)', name: '@first', price: '@float(0, 100, 2, 2)'},
        { id:'@integer(1, 999)', name: '@first', price: '@float(0, 100, 2, 2)'},
        { id:'@integer(1, 999)', name: '@first', price: '@float(0, 100, 2, 2)'},
    ],
    'image|1': image_uri,
    create_at: +Mock.Random.date('T'),
    // title: '@title(5, 10)',
  }))
}

export default {
    getList: () => {
        return List
    }
}

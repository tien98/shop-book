var Product = require('../models/products');
var mongoose = require('mongoose');
var products = [
    new Product({
        imagePath: '/images/doremon.jpg',
        title: 'Doremon',
        description: 'Some quick example text to build on the card title and make up the bulk of the card is content.',
        price: 20
    }),
    new Product({
        imagePath: '/images/conan.jpg',
        title: 'Conan',
        description: 'Some quick example text to build on the card title and make up the bulk of the card is content.',
        price: 12
    }),
    new Product({
        imagePath: '/images/7vienngocrong.jpg',
        title: '7 Vien Ngọc Rồng',
        description: 'Some quick example text to build on the card title and make up the bulk of the card is content.',
        price: 15
    }),
    new Product({
        imagePath: '/images/conan.jpg',
        title: 'Conan',
        description: 'Some quick example text to build on the card title and make up the bulk of the card is content.',
        price: 12
    }),
    new Product({
        imagePath: '/images/conan.jpg',
        title: 'Conan',
        description: 'Some quick example text to build on the card title and make up the bulk of the card is content.',
        price: 12
    })
];
var done = 0;
for (var i=0; i<products.length; i++){
    products[i].save(function(err , result ){
        done++;
        if(done === products.length){
            exit();
        }
    });
}
function exit(){
    mongoose.disconnect();
}
[{
    "imagePath": "/images/doremon.jpg",
    "title": "Doremon",
    "description": "Some quick example text to build on the card title and make up the bulk of the card is content.",
    "price": 20
  }, 
 {
    "imagePath": '/images/conan.jpg',
    "title": 'Conan',
    "description": 'Some quick example text to build on the card title and make up the bulk of the card is content.',
    "price": 12
 },
{
    "imagePath": '/images/7vienngocrong.jpg',
    "title": '7 Vien Ngọc Rồng',
    "description": 'Some quick example text to build on the card title and make up the bulk of the card is content.',
    "price": 15
}]
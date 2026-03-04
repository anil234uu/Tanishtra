const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'products.json');
let products = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

products = products.map(p => {
    const slug = p.id;
    const existingImages = p.images || {};

    return {
        ...p,
        images: {
            primary: existingImages.primary || `/images/products/${slug}-1.jpg`,
            gallery: [
                existingImages.primary || `/images/products/${slug}-1.jpg`,
                existingImages.hover || `/images/products/${slug}-2.jpg`,
                `/images/products/${slug}-3.jpg`,
                `/images/products/${slug}-4.jpg`,
                `/images/products/${slug}-5.jpg`,
                `/images/products/${slug}-6.jpg`,
            ],
            hover: existingImages.hover || `/images/products/${slug}-2.jpg`,
            video: ""
        }
    };
});

fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
console.log("Migrated data/products.json");

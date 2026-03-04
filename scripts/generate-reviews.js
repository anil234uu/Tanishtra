const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '..', 'data', 'products.json');
const reviewsPath = path.join(__dirname, '..', 'data', 'reviews.json');

const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

const names = ["Varun S.", "Rahul K.", "Amit P.", "Priya M.", "Neha G.", "Siddharth R.", "Karan B.", "Anjali D.", "Vikram T."];
const locations = ["Mumbai", "Delhi", "Bangalore", "Pune", "Hyderabad", "Chennai", "Ahmedabad", "Kolkata", "Jaipur"];

const reviews = [];

products.forEach((product, index) => {
    // Review 1 (5 STAR)
    reviews.push({
        id: `rev_${product.id}_1`,
        productId: product.id,
        rating: 5,
        title: "Premium quality at an unbelievable price",
        text: `This ${product.name.toLowerCase()} offers a good balance of style and comfort. The finish feels premium for the price. Wearing it daily for 3 months and the anti-tarnish coating actually works. Getting compliments everywhere I go. Already ordered the matching accessory.`,
        author: names[(index * 3) % names.length],
        location: locations[(index * 3) % locations.length],
        date: "27 Feb 2026",
        verified: true,
        helpfulCount: Math.floor(Math.random() * 15) + 2
    });

    // Review 2 (5 STAR)
    reviews.push({
        id: `rev_${product.id}_2`,
        productId: product.id,
        rating: 5,
        title: "Better than what I expected",
        text: "The look is clean and modern. Exactly what I wanted — bold but not over the top. My friends asked which international brand this is from. That says everything about the quality.",
        author: names[(index * 3 + 1) % names.length],
        location: locations[(index * 3 + 1) % locations.length],
        date: "25 Feb 2026",
        verified: true,
        helpfulCount: Math.floor(Math.random() * 8) + 1
    });

    // Review 3 (4 STAR)
    reviews.push({
        id: `rev_${product.id}_3`,
        productId: product.id,
        rating: 4,
        title: "Great product, minor clasp concern",
        text: "The piece itself is fantastic — weight, color, finish are all top tier for this price. The clasp feels a tiny bit stiff initially but loosened up after a few days. Overall very happy with the purchase.",
        author: names[(index * 3 + 2) % names.length],
        location: locations[(index * 3 + 2) % locations.length],
        date: "22 Feb 2026",
        verified: true,
        helpfulCount: 0
    });
});

fs.writeFileSync(reviewsPath, JSON.stringify(reviews, null, 2));
console.log(`Generated ${reviews.length} reviews for ${products.length} products.`);

const clientId = 'JZOhmklUT-5DNf7tDijddA';
const secret = 'fKXjse1Vn6B6FfZZQIpVTU00MZaZVn2X1sR4gbAAmHOINP55VGyaoq0pTve48hPc';

let accessToken;

let Yelp = {
    getAccessToken: function() {
        if (accessToken) {
            return new Promise(resolve => resolve(accessToken));
        }
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${secret}`, { 
        method: 'POST'}
        ).then(response => {
            return response.json()
        }).then(jsonResponse => {
            accessToken = jsonResponse.access_token;
        });
    },
    search: function(term, location, sortBy) {
        return Yelp.getAccessToken().then(() => {
            fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy})`, {
                headers: {
                Authorization: `Bearer ${accessToken}`
                    }
                })
            }).then(response => {
            return response.json()
        }).then((jsonResponse) => {
            if (jsonResponse.businesses) {
                return jsonResponse.businesses.map(business => {
                    return {
                        id: business.id,
                        imageSrc: business.imageSrc,
                        name: business.name,
                        address: business.address,
                        city: business.city,
                        state: business.state,
                        zipCode: business.zipCode,
                        category: business.category,
                        rating: business.rating,
                        reviewCount: business.reviewCount
                    }
                });
            }
        });
    }   
}

export default Yelp;